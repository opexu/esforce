import { Resource } from "@/scripts/config";
import { CommonApi } from "./common-api";
import type { IAPI, IPost, IUser } from "./iapi";

export class API extends CommonApi implements IAPI {
    
    constructor(
        baseUrl: string,
    ){ super( baseUrl )}

    async findPostArr(): Promise<IPost[]> {
        
        const url = new URL( this._baseUrl + '/' + Resource.Posts );
        return this._fetch( url );
    }

    async findAuthorArr(): Promise<IUser[]> {
        const url = new URL( this._baseUrl + '/' + Resource.Users );
        return this._fetch( url );
    }

    async findResource( resource: Resource.Users ): Promise<IUser[]>;
    async findResource( resource: Resource.Posts ): Promise<IPost[]>;
    async findResource( resource: Resource ): Promise<IPost[] | IUser[]> {
        return resource === Resource.Posts ? this.findPostArr() : this.findAuthorArr();
    }
}