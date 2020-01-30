import { importSchema } from 'graphql-import';

const typeDefs = `
""" Query """

type Query {
  getAllCountries(limit: Int): [Country]
}

""" Mutations """
type Mutation {
    """ Create Couintry """
    createCountry(input: CountryInput): Country
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