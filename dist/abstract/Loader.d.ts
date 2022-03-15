import type { SpotifyItemType } from "./SpotifyItem";
import type { SpotifyManager } from "../SpotifyManager";
import type { SpotifyTrack } from "../item/SpotifyTrack";
import type { SpotifyAlbum } from "../item/SpotifyAlbum";
import type { SpotifyPlaylist } from "../item/SpotifyPlaylist";
import type { SpotifyArtist } from "../item/SpotifyArtist";
export declare abstract class Loader {
    abstract itemType: SpotifyItemType;
    abstract matchers: RegExp[];
    abstract load(manager: SpotifyManager, execArray: RegExpExecArray): Promise<Item>;
    match(identifier: string): RegExpExecArray | null;
}
export declare type Item = SpotifyTrack | SpotifyAlbum | SpotifyPlaylist | SpotifyArtist;
