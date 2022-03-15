import { Loader } from "../abstract/Loader";
import { SpotifyItemType } from "../abstract/SpotifyItem";
import { SpotifyTrack } from "./SpotifyTrack";
import type { SpotifyManager } from "../SpotifyManager";
export declare class SpotifyTrackLoader extends Loader {
    itemType: SpotifyItemType.Track;
    matchers: RegExp[];
    load(manager: SpotifyManager, [, id]: RegExpExecArray): Promise<SpotifyTrack>;
}
