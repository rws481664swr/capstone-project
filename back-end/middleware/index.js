import cors from "cors";
import express from "express";
import authenticateJWT from "./authToken.js";
import morgan from "morgan";

export default (app) => {
    app.use(cors());

    app.use(express.json())
    app.use(authenticateJWT);
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan("tiny"));
    }

}