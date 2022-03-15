"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlaylist = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
class SpotifyPlaylist extends SpotifyItem_1.SpotifyItem {
    constructor(manager, album, tracks) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Playlist;
        this.data = album;
        this.tracks = tracks;
    }
    get name() {
        return this.data.name;
    }
    get owner() {
        return this.data.owner;
    }
    get artwork() {
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }
        return this.data.images.sort((a, b) => b.width - a.width)[0].url;
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
exports.SpotifyPlaylist = SpotifyPlaylist;
