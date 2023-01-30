import * as dotenv from 'dotenv';
dotenv.config();
import { Application } from "express";
import cors from 'cors';
import cookieSession from 'cookie-session';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';


export class AppModule {
    constructor(public app: Application){
        app.set('trust-proxy', true)

        app.use(cors({
            origin: "*",
            credentials: true,
            optionsSuccessStatus: 200
        }))

        app.use(express.json())
        app.use(morgan('dev'))
        app.use(cookieSession({
            signed: false,
            secure: false
        }))
    }

    async start() {
        if(!process.env.MONGO_URI){
            throw new Error('mongo_uri must be defined');
        }

        if(!process.env.JWT_KEY){
            throw new Error('jwt_key must be defined');
        }

        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect(process.env.MONGO_URI);
        } catch (err){
            throw new Error('database connect error')
        }

        this.app.listen(8080, () => console.log("ok! port:8080"))
    }
}