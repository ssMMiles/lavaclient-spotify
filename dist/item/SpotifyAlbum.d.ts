import type * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";
import { SpotifyTrack } from "./SpotifyTrack";
export declare class SpotifyAlbum extends SpotifyItem {
    readonly type: SpotifyItemType.Album;
    data: Spotify.Album;
    readonly tracks: SpotifyTrack[];
    constructor(manager: SpotifyManager, album: Spotify.Album, tracks: Array<SpotifyTrack>);
    get name(): string;
    get artists(): Spotify.Artist[];
    get artwork(): string | null;
    static convertTracks(manager: SpotifyManager, tracks: Spotify.Track[]): SpotifyTrack[];
    resolveYoutubeTracks(): Promise<[Lavalink.Track[], number]>;
}
