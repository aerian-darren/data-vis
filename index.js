import http from "http";
import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));

const options = {};

const PORT = process.env.PORT || 3099;
http.createServer(options, app).listen(
    PORT,
    console.log(`server runs on port ${PORT}`)
);
