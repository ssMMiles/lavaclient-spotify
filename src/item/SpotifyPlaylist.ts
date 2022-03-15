import type * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";
import type { SpotifyTrack } from "./SpotifyTrack";


export class SpotifyPlaylist extends SpotifyItem {
    readonly type: SpotifyItemType.Playlist = SpotifyItemType.Playlist;

    /**
     * The playlist data.
     */
    readonly data: Spotify.Playlist;

    /**
     * The spotify tracks of this playlist.
     * @private
     */
    readonly tracks: SpotifyTrack[];

    /**
     * @param manager The spotify manager.
     * @param album
     * @param tracks
     */
    constructor(
        manager: SpotifyManager,
        album: Spotify.Playlist,
        tracks: Array<SpotifyTrack>
    ) {
        super(manager);

        this.data = album;
        this.tracks = tracks;
    }

    /**
     * The name of this track.
     */
    get name(): string {
        return this.data.name;
    }

    /**
     * The owner of this playlist.
     */
    get owner(): Spotify.User {
        return this.data.owner;
    }

    /**
     * The artwork for this playlist.
     */
    get artwork(): string {
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }

        return this.data.images.sort((a, b) => b.width! - a.width!)[0].url;
    }

    /**
     * Resolves every track in this playlist.
     * @returns The resolved lavalink tracks.
     */
    async resolveYoutubeTracks(): Promise<[Lavalink.Track[], number]> {
        return new Promise((resolve, _) => {

          const tracks: Lavalink.Track[] = [];
          let failures: number = 0;

          const handleTrack = async (track: SpotifyTrack) => {
              try {
                const resolvedTrack = await track.resolveYoutubeTrack();
                tracks.push(resolvedTrack);
              } catch (e) {
                failures++;
              } finally {
                if (tracks.length + failures === this.tracks.length) {
                  resolve([tracks, failures]);
                }
              }
          };

          this.tracks.map(handleTrack);
          
        });
    }
}
