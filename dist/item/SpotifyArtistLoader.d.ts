import { Loader } from "../abstract/Loader";
import { SpotifyItemType } from "../abstract/SpotifyItem";
import { SpotifyArtist } from "./SpotifyArtist";
import type { SpotifyManager } from "../SpotifyManager";
export declare class SpotifyArtistLoader extends Loader {
    itemType: SpotifyItemType;
    matchers: RegExp[];
    load(manager: SpotifyManager, [, id]: RegExpExecArray): Promise<SpotifyArtist>;
}
