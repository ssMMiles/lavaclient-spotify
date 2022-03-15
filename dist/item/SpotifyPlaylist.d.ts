import type * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";
import type { SpotifyTrack } from "./SpotifyTrack";
export declare class SpotifyPlaylist extends SpotifyItem {
    readonly type: SpotifyItemType.Playlist;
    readonly data: Spotify.Playlist;
    readonly tracks: SpotifyTrack[];
    constructor(manager: SpotifyManager, album: Spotify.Playlist, tracks: Array<SpotifyTrack>);
    get name(): string;
    get owner(): Spotify.User;
    get artwork(): string;
    resolveYoutubeTracks(): Promise<[Lavalink.Track[], number]>;
}
