import cors from "cors";
import express from "express";
import morgan from "morgan";

export default (app) => {
    app.use(cors());

    app.use(express.json())
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan("tiny"));
    }

}