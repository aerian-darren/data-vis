import http from "http";
import fs from "fs";
import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));

// app.get("/", (req, res) => res.sendFile(`/public/ar.html`));
// app.get("/a", (req, res) => res.sendFile(`/public/index.html`));
// app.get("/ar", (req, res) => res.sendFile(`/public/index.html`));

const options = {};

const PORT = process.env.PORT || 3099;
http.createServer(options, app).listen(
    PORT,
    console.log(`server runs on port ${PORT}`)
);
