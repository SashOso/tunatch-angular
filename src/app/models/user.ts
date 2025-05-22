import { Role } from "./role";

export class User {
    id:number=1;
    username:string;
    password:string;
    profile_picture:string;
    roles:Role[];
}
