import gql from 'graphql-tag'
import { Country } from './type';

// 2
export const ALL_COUNTRIES = gql`
  query getAllCountries {
    getAllCountries{
        name
        code
        }
    }
`;

export const GET_COUNTRY = gql `
    query getCountry($code : String){
        getCountry(code: $code){
            name
            img
            code
            latitud
            longitude
        }
    }
`;
export const GET_WHEATER = gql `
    query getWheaterCountry($latitud: Float, $longitude: Float, $time: Int){
        getWheaterCountry(latitud: $latitud, longitude: $longitude, time: $time){
            latitud
            longitude
            time
            temperature
            summary
        }
    }
`;

// 3
export interface AllLinkQueryResponse {
    getAllCountries: Country[];
    loading: boolean;
}