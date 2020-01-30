import mongoose from "mongoose";

import { Countries, ErrorLogs } from "./db";
import { rejects } from "assert";

import fetch from 'node-fetch';

export const resolvers = {
    Query: {
        getAllCountries: async (root, {limit}) => {
            try {
                return await Countries.find({});
                
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
    },

    Mutation: {
        createCountry : async (root, { input }) => {
            try {
                const countryDB = await Countries.findOne({
                    code: input.code
                })
                if(countryDB){
                    throw new Error('Ya se encuentra la ciudad creada cpn ese código')
                }
                return await Countries.create({
                    code: input.code,
                    name: input.name,
                    longitud: input.longitud,
                    latitude: input.latitude,
                    img: input.img,
                    created_at: new Date()
                    
                })
            } catch (error) {
                console.log(error)
                throw new Error(error)
            } 
        },
    }
}