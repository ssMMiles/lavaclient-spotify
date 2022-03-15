import * as Lavalink from "@lavaclient/types";
import { SpotifyItem, SpotifyItemType } from "../abstract/SpotifyItem";
import type { Spotify } from "../spotify";
import type { SpotifyManager } from "../SpotifyManager";
export declare class SpotifyTrack extends SpotifyItem {
    #private;
    type: SpotifyItemType.Track;
    data: Spotify.Track;
    constructor(manager: SpotifyManager, track: Spotify.Track);
    get name(): string;
    get artists(): Spotify.Artist[];
    get album(): Spotify.Album;
    get artwork(): string;
    resolveYoutubeTrack(): Promise<Lavalink.Track>;
}
