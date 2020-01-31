// Definimos los tipos de respuestas para los objetos 
// tomando en cuenta el tipo de valor del response del GraphQL

export type Country = {
    id: number;
    code: string;
    name: string;
    latitud: string;
    longitude: string;
    img: string;
    created_at: string;
}

export type DataCountry = {
    getCountry: Country
}
export type DataCountries = {
    getAllCountries: Country[];
}

export type CountryResponse = {
    data: Country;
}