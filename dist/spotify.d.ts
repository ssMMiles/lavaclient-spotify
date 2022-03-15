export declare namespace Spotify {
    interface PagingObject<T> {
        href: string;
        items: T[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string;
        total: number;
    }
    interface ExternalIdObject {
        isrc?: string;
        ean?: string;
        upc?: string;
    }
    interface ExternalUrlObject {
        spotify: string;
    }
    interface ContextObject {
        type: "artist" | "playlist" | "album" | "track" | "show" | "episode";
        href: string;
        external_urls: ExternalUrlObject;
        uri: string;
    }
    interface ImageObject {
        height?: number;
        url: string;
        width?: number;
    }
    interface FollowersObject {
        href: null;
        total: number;
    }
    interface RestrictionsObject {
        reason: string;
    }
    interface Album extends ContextObject {
        album_group?: "album" | "single" | "compilation" | "appears_on";
        album_type: "album" | "single" | "compilation";
        artists: Artist[];
        available_markets?: string[];
        id: string;
        images: ImageObject[];
        name: string;
        release_date: string;
        release_date_precision: "year" | "month" | "day";
        restrictions?: RestrictionsObject;
        type: "album";
        copyrights: CopyrightObject[];
        external_ids: ExternalIdObject;
        genres: string[];
        label: string;
        popularity: number;
        tracks: PagingObject<Track>;
    }
    interface CopyrightObject {
        text: string;
        type: "C" | "P";
    }
    interface Artist extends ContextObject {
        name: string;
        id: string;
        type: "artist";
        followers: FollowersObject;
        genres: string[];
        images: ImageObject[];
        popularity: number;
    }
    interface Playlist extends ContextObject {
        collaborative: boolean;
        description: string | null;
        id: string;
        images: ImageObject[];
        name: string;
        owner: User;
        public: boolean | null;
        snapshot_id: string;
        type: "playlist";
        followers: FollowersObject;
        tracks: PagingObject<PlaylistTracks>;
    }
    interface PlaylistTracks {
        added_at: string;
        added_by: User;
        is_local: boolean;
        track: Track;
    }
    interface User {
        display_name?: string;
        external_urls: ExternalUrlObject;
        followers?: FollowersObject;
        href: string;
        id: string;
        images?: ImageObject[];
        type: "user";
        uri: string;
    }
    interface Track {
        artists: Artist[];
        available_markets?: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_urls: ExternalUrlObject;
        href: string;
        id: string;
        is_playable?: boolean;
        linked_from?: TrackLinkObject;
        restrictions?: RestrictionsObject;
        name: string;
        preview_url: string | null;
        track_number: number;
        type: "track";
        uri: string;
        album: Album;
        external_ids: ExternalIdObject;
        popularity: number;
        is_local?: boolean;
    }
    interface TrackLinkObject {
        external_urls: ExternalUrlObject;
        href: string;
        id: string;
        type: "track";
        uri: string;
    }
}
