"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlaylistLoader = void 0;
const Loader_1 = require("../abstract/Loader");
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyAlbum_1 = require("./SpotifyAlbum");
const SpotifyPlaylist_1 = require("./SpotifyPlaylist");
class SpotifyPlaylistLoader extends Loader_1.Loader {
    constructor() {
        super(...arguments);
        this.itemType = SpotifyItem_1.SpotifyItemType.Playlist;
        this.matchers = [
            /^(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/playlist\/([a-zA-Z\d-_]+)/,
            /spotify:playlist:([a-zA-Z\d-_]+)$/,
        ];
    }
    static async loadTracks(manager, playlist) {
        let next = playlist.tracks.next, page = 1;
        const limit = manager.options.playlistPageLimit, tracks = SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, playlist.tracks.items.map(i => i.track));
        while (next != null && limit === -1 ? true : page < limit) {
            const { items, next: _next } = await manager.makeRequest(next, false);
            tracks.push(...SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, items.map(i => i.track)));
            next = _next;
            page++;
        }
        return tracks;
    }
    async load(manager, [, id]) {
        const playlist = await manager.makeRequest(`/playlists/${id}`);
        return new SpotifyPlaylist_1.SpotifyPlaylist(manager, playlist, await SpotifyPlaylistLoader.loadTracks(manager, playlist));
    }
}
exports.SpotifyPlaylistLoader = SpotifyPlaylistLoader;
