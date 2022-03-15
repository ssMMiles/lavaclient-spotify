"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAlbum = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyTrack_1 = require("./SpotifyTrack");
class SpotifyAlbum extends SpotifyItem_1.SpotifyItem {
    constructor(manager, album, tracks) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Album;
        this.data = album;
        this.tracks = tracks;
    }
    get name() {
        return this.data.name;
    }
    get artists() {
        return this.data.artists;
    }
    get artwork() {
        if (!this.data.images?.length) {
            return null;
        }
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }
        return this.data.images.sort((a, b) => b.width - a.width)[0].url;
    }
    static convertTracks(manager, tracks) {
        return tracks.map(t => new SpotifyTrack_1.SpotifyTrack(manager, t));
    }
    async resolveYoutubeTracks() {
        const tracks = [];
        let failures = 0;
        for (const track of this.tracks) {
            try {
                tracks.push(await track.resolveYoutubeTrack());
            }
            catch (err) {
                failures++;
            }
        }
        return [tracks, failures];
    }
}
exports.SpotifyAlbum = SpotifyAlbum;
