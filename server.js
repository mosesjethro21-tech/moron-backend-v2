"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());

app.use(express.json());


/* =========================================================
   HOME / HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {

    res.json({
        success: true,
        app: "Moron AI",
        status: "online",
        message: "Moron backend is alive 😂"
    });

});


/* =========================================================
   TEST API
========================================================= */

app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "Moron API is working 🚀"
    });

});


/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Moron backend running on port ${PORT}`
    );

});
