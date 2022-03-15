import type * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";
import { SpotifyTrack } from "./SpotifyTrack";
export declare class SpotifyArtist extends SpotifyItem {
    type: SpotifyItemType.Artist;
    readonly data: Spotify.Artist;
    readonly topTracks: SpotifyTrack[];
    constructor(manager: SpotifyManager, data: Spotify.Artist, topTracks: Spotify.Track[]);
    get name(): string;
    get artwork(): string;
    resolveYoutubeTracks(): Promise<[Lavalink.Track[], number]>;
}
