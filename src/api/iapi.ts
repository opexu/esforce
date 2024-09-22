import type { Resource } from "@/scripts/config";

export interface IPost {
    id: number,
    userId: number,
    title: string,
    body: string,
    isViewed: boolean,
}

export type TPostWUser = IPost & { user: Pick<IUser,'name'>['name'] | null };

export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany;
}

export type TUser = Record<number, IUser>;

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: IGeo,
}

export interface IGeo {
    lat: number,
    lng: number,
}

export interface IAPI {
    findPostArr(): Promise<IPost[]>;
    findAuthorArr(): Promise<IUser[]>;
    findResource( resource: Resource ): Promise<IPost[]|IUser[]>
}