"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyArtist = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyTrack_1 = require("./SpotifyTrack");
class SpotifyArtist extends SpotifyItem_1.SpotifyItem {
    constructor(manager, data, topTracks) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Artist;
        this.data = data;
        this.topTracks = topTracks.map(track => new SpotifyTrack_1.SpotifyTrack(manager, track));
    }
    get name() {
        return this.data.name;
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
        for (const track of this.topTracks) {
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
exports.SpotifyArtist = SpotifyArtist;
