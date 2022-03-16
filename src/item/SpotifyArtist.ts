import type * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";
import { SpotifyTrack } from "./SpotifyTrack";

export class SpotifyArtist extends SpotifyItem {
    type: SpotifyItemType.Artist = SpotifyItemType.Artist;

    /**
     * The spotify data for this artist.
     */
    readonly data: Spotify.Artist;

    /**
     * The top tracks for this artist.
     */
    readonly topTracks: SpotifyTrack[];

    /**
     * @param manager The spotify manager.
     * @param data The data for this artist.
     * @param topTracks The top tracks for this artist.
     */
    constructor(
        manager: SpotifyManager,
        data: Spotify.Artist,
        topTracks: Spotify.Track[]
    ) {
        super(manager);

        this.data = data;
        this.topTracks = topTracks.map(
            track => new SpotifyTrack(manager, track)
        );
    }

    /**
     * This artist's name.
     */
    get name(): string {
        return this.data.name;
    }

    /**
     * The artwork for this artist.
     */
    get artwork(): string {
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }

        return this.data.images.sort((a, b) => b.width! - a.width!)[0].url;
    }

    /**
     * Resolves every top track of this artist..
     * @returns The resolved lavalink tracks.
     */
    async resolveYoutubeTracks(): Promise<[Lavalink.Track[], number]> {
        const loadBatch = async (
            startIndex: number
        ): Promise<[Lavalink.Track[], number]> => {
            return new Promise((resolve, _) => {
                const resolvedTracks: Lavalink.Track[] = [];
                let failures: number = 0;

                const tracks: SpotifyTrack[] = this.topTracks.slice(
                    startIndex,
                    startIndex + 10
                );

                tracks.map(async (track: SpotifyTrack) => {
                    try {
                        const resolvedTrack = await track.resolveYoutubeTrack();
                        resolvedTracks.push(resolvedTrack);
                    } catch (e) {
                        failures++;
                    } finally {
                        if (
                            tracks.length + failures ===
                            this.topTracks.length
                        ) {
                            resolve([resolvedTracks, failures]);
                        }
                    }
                });
            });
        };

        const resolvedTracks: Lavalink.Track[] = [];
        let failures: number = 0;

        for (let i = 0; i < this.topTracks.length; i += 10) {
            const [batch, batchFailures] = await loadBatch(i);
            resolvedTracks.push(...batch);
            failures += batchFailures;
        }

        return [resolvedTracks, failures];
    }
}
