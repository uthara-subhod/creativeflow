export class User {
    _id?:string;
    user_id?:string;
    fullname?: string;
    email?: string;
    password?: string;
    joinedAt?: Date;
    profile?: string;
    access?: boolean;
    bio?:string;
    followers?:string[];
    following?:string[];
    blocked?:string[];
    artist?:boolean;
    author?:boolean;
    premium?:boolean;
}
