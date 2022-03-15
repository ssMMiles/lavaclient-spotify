import { Loader } from "../abstract/Loader";
import { SpotifyItemType } from "../abstract/SpotifyItem";
import { SpotifyPlaylist } from "./SpotifyPlaylist";
import type { SpotifyManager } from "../SpotifyManager";
export declare class SpotifyPlaylistLoader extends Loader {
    itemType: SpotifyItemType.Playlist;
    matchers: RegExp[];
    private static loadTracks;
    load(manager: SpotifyManager, [, id]: RegExpExecArray): Promise<SpotifyPlaylist>;
}
