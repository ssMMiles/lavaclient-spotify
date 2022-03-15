"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyTrack = void 0;
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
    resolveYoutubeTrack() {
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
                case "LOAD_FAILED":
                case "NO_MATCHES":
                    return reject(new Error("No songs found."));
                case "PLAYLIST_LOADED":
                    return resolve(searchResults.tracks[0]);
                case "TRACK_LOADED":
                case "SEARCH_RESULT":
                    return resolve(searchResults.tracks[0]);
            }
            return reject(new Error("Failed to load."));
        });
    }
}
exports.SpotifyTrack = SpotifyTrack;
