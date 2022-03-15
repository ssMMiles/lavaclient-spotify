import type { SpotifyManager } from "../SpotifyManager";
export declare abstract class SpotifyItem {
    readonly manager: SpotifyManager;
    abstract type: SpotifyItemType;
    protected constructor(manager: SpotifyManager);
}
export declare enum SpotifyItemType {
    Artist = 0,
    Playlist = 1,
    Track = 2,
    Album = 3
}
