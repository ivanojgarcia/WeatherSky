export class Country {
    id: number;
    code: string;
    name: string;
    latitud: string;
    longitude: string;
    img: string;
    created_at: string;
}

export type Query = {
    getAllCountries: Country[];
}