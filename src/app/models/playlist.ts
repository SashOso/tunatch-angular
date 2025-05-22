import { PublicUser } from "./public-user";
import { Song } from "./song";

export class Playlist {
    id:number=1;
    name:string;
    image_path:string;
    user:PublicUser;
    songs:Song[];
}
