import { SpotifyManager, SpotifyManagerOptions } from "./SpotifyManager";
export declare const _manager: unique symbol;
export declare function load(options: SpotifyManagerOptions): void;
declare module "lavaclient" {
    interface Node {
        readonly spotify: SpotifyManager;
    }
    interface Cluster {
        readonly spotify: SpotifyManager;
    }
}
