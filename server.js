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
   HOME CHECK
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
   MORON CHAT API
========================================================= */

app.post("/api/chat", (req, res) => {


    const { message } = req.body;


    if (!message || typeof message !== "string") {

        return res.status(400).json({

            success: false,

            error: "Message is required"

        });

    }


    console.log("User:", message);


    const reply = moronBrain(message);


    res.json({

        success: true,

        message: reply.text,

        reaction: reply.reaction

    });


});


/* =========================================================
   MORON PERSONALITY ENGINE
========================================================= */

function moronBrain(message) {


    const text = message.toLowerCase();



    // User teasing Moron

    if (
        text.includes("moron") ||
        text.includes("stupid") ||
        text.includes("idiot") ||
        text.includes("dumb")
    ) {

        return {

            text:
            "😭 Wow! You really woke up today and chose violence. I am just a friendly AI trying my best.",

            reaction:
            "crying"

        };

    }



    // User laughing

    if (
        text.includes("lol") ||
        text.includes("haha") ||
        text.includes("😂")
    ) {

        return {

            text:
            "😂 I knew it! You are laughing at me. Admit it, I'm funny.",

            reaction:
            "laughing"

        };

    }



    // User stressed

    if (
        text.includes("stress") ||
        text.includes("tired") ||
        text.includes("sad") ||
        text.includes("overwhelmed")
    ) {

        return {

            text:
            "Hey ❤️ jokes aside, I hope things get better. I'm here with you.",

            reaction:
            "supportive"

        };

    }



    // Default funny reply

    return {

        text:
        "Interesting... 🤔 My tiny Moron brain received your message. The smarter version is still loading 😂",

        reaction:
        "none"

    };


}

app.get("/api/chat", (req, res) => {

    res.json({

        success: true,

        message: "Chat endpoint is alive 😂",

        reaction: "none"

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