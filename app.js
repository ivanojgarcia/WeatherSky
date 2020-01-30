  
import express from 'express';

// Apollo server
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./data/schema";
import { resolvers } from "./data/resolvers";
import { connectDB } from './data/db';


const PORT = process.env.port || 3000;
const app = express();

const server = new ApolloServer({typeDefs, resolvers});
connectDB();

server.applyMiddleware({app});

app.listen({port: PORT}, () => {
    console.log(`The server run on port: ${PORT} and graphql route ${server.graphqlPath}`)
})