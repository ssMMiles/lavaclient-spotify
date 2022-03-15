import type * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";

export class SpotifyTrack extends SpotifyItem {
    type: SpotifyItemType.Track = SpotifyItemType.Track;

    /**
     * The spotify track data.
     */
    data: Spotify.Track;

    /**
     * The lavalink track.
     * @private
     */
    #track: Lavalink.Track | null = null;

    /**
     * @param manager The spotify manager.
     * @param track The spotify track data.
     */
    constructor(manager: SpotifyManager, track: Spotify.Track) {
        super(manager);

        this.data = track;
    }

    /**
     * The name of this track.
     */
    get name(): string {
        return this.data.name;
    }

    /**
     * The artists that made this track.
     */
    get artists(): Spotify.Artist[] {
        return this.data.artists;
    }

    /**
     * The album data for this track.
     */
    get album(): Spotify.Album {
        return this.data.album;
    }

    /**
     * The artwork for this track.
     */
    get artwork(): string {
        const undef = this.album.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.album.images[0].url;
        }

        return this.album.images.sort((a, b) => b.width! - a.width!)[0].url;
    }

    /**
     * Resolves the YouTube track that can be played.
     */
    resolveYoutubeTrack(): Promise<Lavalink.Track> {
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

            const searchResults = await this.manager.lavaclient.rest.loadTracks(
                query
            );

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
