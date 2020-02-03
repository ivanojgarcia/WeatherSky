import mongoose from "mongoose";
import { rejects } from 'assert';
import { Countries, ErrorLogs } from "./db";

import fetch from 'node-fetch';
const apiBase = 'https://api.darksky.net/forecast/6098079a8488d722d90ebd5cddbb72b0/'
const lang = '?lang=es'

export const resolvers = {
    Query: {
        getAllCountries: async (root) => {
            try {
                return await Countries.find({});
                
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
        getAllErrors: async (root) => {
            try {
                return await ErrorLogs.find({});
                
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
        getCountry: async (root, {code}) => {
            try {
                const countryData = await Countries.findOne({
                    code
                })
                if (Math.random(0, 1) < 0.1) {
                    const errorLogsSave = await ErrorLogs.create({
                        code: "500",
                        description: `[${new Date()}][500] How unfortunate! The API Request Failed`,
                        created_at: new Date()
                    })
                    throw new Error('How unfortunate! The API Request Failed') 
                }

                const apiWheater = await fetch(`${apiBase}${countryData.latitud},${countryData.longitude}?lang=es`)
                .then(res => res.json())
                let temperature =  (apiWheater.currently.temperature - 32) * 5 / 9; //Fahrenheit to Celsius
                const countryFullData = {
                    id: countryData._id,
                    code: countryData.code,
                    name: countryData.name,
                    latitud: countryData.latitud,
                    longitude: countryData.longitude,
                    img: countryData.img,
                    created_at: countryData.created_at,
                    wheater: {
                        latitud: apiWheater.latitude,
                        longitude: apiWheater.longitude,
                        temperature: parseInt(temperature) ,
                        timezone: apiWheater.timezone,
                        summary: apiWheater.currently.summary,
                        time: apiWheater.currently.time
                    }

                }
                return countryFullData;
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
        getWheaterCountry: async (root,{latitud, longitude, time}) => {
            try {
                if (Math.random(0, 1) < 0.1) {
                    const errorLogsSave = await ErrorLogs.create({
                        code: "500",
                        description: `[${new Date()}][500] How unfortunate! The API Request Failed`,
                        created_at: new Date()
                    })
                    throw new Error('How unfortunate! The API Request Failed') 
                }
                const apiWheater = await fetch(`${apiBase}${latitud},${longitude},${time}?lang=es`)
                .then(res => res.json())
                return {

                    latitud: apiWheater.latitude,
                    longitude: apiWheater.longitude,
                    temperature: apiWheater.currently.temperature,
                    timezone: apiWheater.timezone,
                    summary: apiWheater.currently.summary,
                    time
                }
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        }
    },

    Mutation: {
        createCountry : async (root, { input }) => {
            try {
                const countryDB = await Countries.findOne({
                    code: input.code
                })
                if(countryDB){
                    throw new Error('Ya se encuentra la ciudad creada con ese código')
                }
                return await Countries.create({
                    code: input.code,
                    name: input.name,
                    longitude: input.longitude,
                    latitud: input.latitud,
                    img: input.img,
                    created_at: new Date()
                    
                })
            } catch (error) {
                console.log(error)
                throw new Error(error)
            } 
        },

        createErrorLog: async (root, {input}) => {
            try {
                return await ErrorLogs.create({
                    code: input.code,
                    description: input.description,
                    created_at: new Date()
                })
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        }
    }
}