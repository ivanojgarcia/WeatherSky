import { importSchema } from 'graphql-import';

const typeDefs = `
""" Query """

type Query {
  getAllCountries: [Country]
  getAllErrors: [Errors]
  getCountry(code: String): Country
  getWheaterCountry(latitud: Float, longitude: Float, time: Int): Wheater
}

""" Mutations """
type Mutation {
    """ Create Couintry """
    createCountry(input: CountryInput): Country
    createErrorLog(input: ErrorsInput): Errors
}

type Country {
    id: ID
    code: String
    name: String
    latitud: String
    longitude: String
    img: String
    created_at: String
}

type Wheater {
    latitud: Float
    longitude: Float
    temperature: Float
    timezone: String
    summary: String
    time: Int
}

input CountryInput {
    code: String
    name: String
    latitud: String
    longitude: String
    img: String
}

type Errors {
    id: ID
    code: String
    description: String
    created_at: String
}
input ErrorsInput {
    code: String
    description: String
    created_at: String
}
`;

export { typeDefs }; 