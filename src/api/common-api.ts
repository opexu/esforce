export class CommonApi {

    constructor(
        protected readonly _baseUrl: string,
    ){}

    protected async _fetch<T>( url: URL ): Promise<T> {
        const res = await fetch( url );
        const data = await res.json() as T;
        return data;
    }
}