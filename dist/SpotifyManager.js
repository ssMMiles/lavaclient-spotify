"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyManager = void 0;
const centra_1 = __importDefault(require("centra"));
const SpotifyItem_1 = require("./abstract/SpotifyItem");
const SpotifyAlbumLoader_1 = require("./item/SpotifyAlbumLoader");
const SpotifyPlaylistLoader_1 = require("./item/SpotifyPlaylistLoader");
const SpotifyTrackLoader_1 = require("./item/SpotifyTrackLoader");
const SpotifyArtistLoader_1 = require("./item/SpotifyArtistLoader");
class SpotifyManager {
    constructor(lavaclient, options) {
        this.#token = null;
        this.lavaclient = lavaclient;
        this.options = Object.assign(SpotifyManager.DEFAULTS, options);
        this.loaders = [
            new SpotifyAlbumLoader_1.SpotifyAlbumLoader(),
            new SpotifyPlaylistLoader_1.SpotifyPlaylistLoader(),
            new SpotifyTrackLoader_1.SpotifyTrackLoader(),
            new SpotifyArtistLoader_1.SpotifyArtistLoader(),
        ].filter(l => this.options.loaders.includes(l.itemType) ?? false);
        this.searchPrefix =
            SpotifyManager.SOURCE_PREFIX[options.searchPrefix ?? "youtube"];
        this.#client = options.client;
    }
    static { this.API_URL = "https://api.spotify.com/v1"; }
    static { this.SOURCE_PREFIX = {
        youtube: "ytsearch:",
        "youtube music": "ytmsearch:",
        soundcloud: "scsearch:",
    }; }
    static { this.DEFAULTS = {
        albumPageLimit: -1,
        playlistPageLimit: -1,
        autoResolveYoutubeTracks: false,
        loaders: [
            SpotifyItem_1.SpotifyItemType.Album,
            SpotifyItem_1.SpotifyItemType.Artist,
            SpotifyItem_1.SpotifyItemType.Track,
            SpotifyItem_1.SpotifyItemType.Playlist,
        ],
        market: "US",
        searchFormat: "{track} {artist}",
        searchPrefix: "youtube",
    }; }
    #token;
    #client;
    get token() {
        return this.#token;
    }
    get encoded() {
        return Buffer.from(`${this.#client.id}:${this.#client.secret}`).toString("base64");
    }
    isSpotifyUrl(url) {
        const matchers = this.loaders.reduce((rs, loader) => [...rs, ...loader.matchers], []);
        return matchers.some(r => r.test(url));
    }
    async makeRequest(endpoint, prefixBaseUrl = true) {
        if (!this.#token) {
            await this.renew();
        }
        return (0, centra_1.default)(`${prefixBaseUrl ? SpotifyManager.API_URL : ""}${endpoint}`)
            .header("Authorization", `Bearer ${this.token}`)
            .send()
            .then(r => r.json());
    }
    async load(url) {
        if (!this.isSpotifyUrl(url)) {
            return null;
        }
        const loader = this.loaders.find(l => l.matchers.some(r => r.test(url)));
        if (!loader) {
            return null;
        }
        const item = await loader.load(this, loader.match(url));
        if (!item) {
            return null;
        }
        if (this.options.autoResolveYoutubeTracks) {
            switch (item.type) {
                case SpotifyItem_1.SpotifyItemType.Album:
                case SpotifyItem_1.SpotifyItemType.Artist:
                case SpotifyItem_1.SpotifyItemType.Playlist:
                    await item.resolveYoutubeTracks();
                    break;
                case SpotifyItem_1.SpotifyItemType.Track:
                    await item.resolveYoutubeTrack();
                    break;
            }
        }
        return item;
    }
    async renew() {
        const { expires_in, access_token } = await (0, centra_1.default)("https://accounts.spotify.com/api/token?grant_type=client_credentials", "POST")
            .header({
            authorization: `Basic ${this.encoded}`,
            "content-type": "application/x-www-form-urlencoded",
        })
            .send()
            .then(r => r.json());
        if (!access_token) {
            throw new Error("Invalid spotify client id.");
        }
        this.#token = access_token;
        setTimeout(this.renew.bind(this), expires_in * 1000);
    }
}
exports.SpotifyManager = SpotifyManager;
