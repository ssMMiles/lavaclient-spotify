"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyTrack = void 0;
const Lavalink = __importStar(require("@lavaclient/types"));
const SpotifyItem_1 = require("../abstract/SpotifyItem");
class SpotifyTrack extends SpotifyItem_1.SpotifyItem {
    constructor(manager, track) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Track;
        this.#track = null;
        this.data = track;
    }
    #track;
    get name() {
        return this.data.name;
    }
    get artists() {
        return this.data.artists;
    }
    get album() {
        return this.data.album;
    }
    get artwork() {
        const undef = this.album.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.album.images[0].url;
        }
        return this.album.images.sort((a, b) => b.width - a.width)[0].url;
    }
    async resolveYoutubeTrack() {
        return new Promise(async (resolve, reject) => {
            if (this.#track != null) {
                return this.#track;
            }
            if (!this.manager.lavaclient.rest)
                return reject(new Error("Lavalink isn't connected."));
            let query = `${this.manager.searchPrefix}`;
            query += this.manager.options.searchFormat
                .replace("{track}", this.data.name)
                .replace("{artist}", this.data.artists[0].name);
            const searchResults = await this.manager.lavaclient.rest.loadTracks(query);
            switch (searchResults.loadType) {
                case Lavalink.LoadType.TrackLoaded:
                    resolve((this.#track = searchResults.tracks[0]));
                    break;
                case Lavalink.LoadType.PlaylistLoaded:
                    resolve((this.#track = searchResults.tracks[0]));
                    break;
                case Lavalink.LoadType.NoMatches:
                    reject(new Error("No matches found."));
                    break;
                case Lavalink.LoadType.SearchResult:
                    reject(new Error("Idk what this means tbh, got LoadType.SearchResult on resolving track"));
                    break;
                default:
                    reject(new Error("Unknown LoadType"));
            }
        });
    }
}
exports.SpotifyTrack = SpotifyTrack;
