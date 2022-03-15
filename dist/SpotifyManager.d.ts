import { SpotifyItemType } from "./abstract/SpotifyItem";
import type { Cluster, Dictionary, Node } from "lavaclient";
import type { Item, Loader } from "./abstract/Loader";
export declare class SpotifyManager {
    #private;
    static readonly API_URL = "https://api.spotify.com/v1";
    static readonly SOURCE_PREFIX: {
        youtube: string;
        "youtube music": string;
        soundcloud: string;
    };
    static readonly DEFAULTS: Omit<SpotifyManagerOptions, "client">;
    readonly lavaclient: Cluster | Node;
    readonly options: Required<SpotifyManagerOptions>;
    loaders: Loader[];
    searchPrefix: string;
    constructor(lavaclient: Node | Cluster, options: SpotifyManagerOptions);
    get token(): string | null;
    private get encoded();
    isSpotifyUrl(url: string): boolean;
    makeRequest<T extends Dictionary = Dictionary>(endpoint: string, prefixBaseUrl?: boolean): Promise<T>;
    load(url: string): Promise<Item | null>;
    renew(): Promise<void>;
}
export declare type SearchPrefix = "youtube" | "youtube music" | "soundcloud";
export interface SpotifyClientOptions {
    id: string;
    secret: string;
}
export interface SpotifyManagerOptions {
    playlistPageLimit?: number;
    albumPageLimit?: number;
    client: SpotifyClientOptions;
    loaders?: SpotifyItemType[];
    autoResolveYoutubeTracks?: boolean;
    searchPrefix?: SearchPrefix;
    searchFormat?: string;
    market?: string;
}
