import { Loader } from "../abstract/Loader";
import { SpotifyAlbum } from "./SpotifyAlbum";
import { SpotifyItemType } from "../abstract/SpotifyItem";
import type { SpotifyManager } from "../SpotifyManager";
export declare class SpotifyAlbumLoader extends Loader {
    itemType: SpotifyItemType.Album;
    matchers: RegExp[];
    private static loadTracks;
    load(manager: SpotifyManager, [, id]: RegExpExecArray): Promise<SpotifyAlbum>;
}
