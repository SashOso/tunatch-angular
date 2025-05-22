import { Album } from "./album";
import { Artist } from "./artist";
import { Genre } from "./genre";

export class Song {
    id:number=1;
    title:string;
    file_path:string;
    image_path:string;
    artist:Artist;
    album:Album;
    genre:Genre
}
