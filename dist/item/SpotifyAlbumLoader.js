"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAlbumLoader = void 0;
const Loader_1 = require("../abstract/Loader");
const SpotifyAlbum_1 = require("./SpotifyAlbum");
const SpotifyItem_1 = require("../abstract/SpotifyItem");
class SpotifyAlbumLoader extends Loader_1.Loader {
    constructor() {
        super(...arguments);
        this.itemType = SpotifyItem_1.SpotifyItemType.Album;
        this.matchers = [
            /^(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/album\/([a-zA-Z\d-_]+)/,
            /^spotify:album:([a-zA-Z\d-_]+)$/,
        ];
    }
    static async loadTracks(manager, album) {
        let next = album.tracks.next, page = 1;
        const limit = manager.options.albumPageLimit, tracks = SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, album.tracks.items);
        while (next != null && limit === -1 ? true : page < limit) {
            const { items, next: _next } = await manager.makeRequest(next, false);
            tracks.push(...SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, items));
            next = _next;
            page++;
        }
        return tracks;
    }
    async load(manager, [, id]) {
        const album = await manager.makeRequest(`/albums/${id}`);
        return new SpotifyAlbum_1.SpotifyAlbum(manager, album, await SpotifyAlbumLoader.loadTracks(manager, album));
    }
}
exports.SpotifyAlbumLoader = SpotifyAlbumLoader;
