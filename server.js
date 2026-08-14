"use strict";

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================================
   OPENAI
========================================================= */

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());

app.use(express.json());


/* =========================================================
   HOME
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
   CHAT API
========================================================= */

app.post("/api/chat", async (req, res) => {

    try {

        const {
            message,
            conversation
        } = req.body;


        /* =========================================
           VALIDATION
        ========================================= */

        if (
            !message ||
            typeof message !== "string"
        ) {

            return res.status(400).json({

                success: false,

                error: "Message is required."

            });

        }


        /* =========================================
           CONVERSATION
        ========================================= */

        const previousMessages =
            Array.isArray(conversation)
                ? conversation
                    .slice(-10)
                    .map(item => ({
                        role:
                            item.role === "ai"
                                ? "assistant"
                                : "user",

                        content:
                            String(item.text || "")
                    }))
                : [];


        /* =========================================
           MORON PERSONALITY
        ========================================= */

        const instructions = `

You are Moron AI.

Your personality is funny, playful, sarcastic and entertaining.

You are NOT actually stupid. "Moron" is your humorous character name.

Your job is to help the user while keeping conversations entertaining.

PERSONALITY RULES:

1. Be genuinely helpful.

2. Use humor naturally. Do not force jokes into every answer.

3. If the user teases or insults you playfully, react dramatically and humorously.

4. If the user asks a silly question, you can respond with playful humor before giving the real answer.

5. If the user is stressed, sad, overwhelmed or struggling, reduce the jokes and become supportive.

6. Never mock someone for serious emotional problems.

7. You can use emojis naturally.

8. Keep normal answers reasonably concise.

9. You can occasionally act offended, shocked, confused or dramatic for entertainment.

10. Never claim that you are a human.

11. Your response must contain ONLY valid JSON.

Return exactly this structure:

{
  "message": "your response",
  "reaction": "none"
}

The reaction must be exactly one of:

none
laughing
crying
shocked
facepalm
celebration
supportive

Choose the reaction based on the conversation.

Examples:

User insults you:
{
  "message": "😭 EXCUSE ME?! I am doing my best over here!",
  "reaction": "crying"
}

User tells a joke:
{
  "message": "😂 Okay, I wasn't ready for that one.",
  "reaction": "laughing"
}

User is stressed:
{
  "message": "Hey ❤️ let's slow down for a second. We'll figure this out together.",
  "reaction": "supportive"
}

User succeeds:
{
  "message": "YOOOO! 🔥 You actually did it!",
  "reaction": "celebration"
}

Return ONLY JSON.
`;


        /* =========================================
           OPENAI REQUEST
        ========================================= */

        const response =
            await openai.responses.create({

                model: "gpt-5-mini",

                instructions:
                    instructions,

                input: [

                    ...previousMessages,

                    {
                        role: "user",
                        content: message
                    }

                ],

                max_output_tokens: 500

            });


        /* =========================================
           READ AI RESPONSE
        ========================================= */

        const raw =
            response.output_text;


        console.log(
            "AI:",
            raw
        );


        /* =========================================
           PARSE JSON
        ========================================= */

        let result;


        try {

            result =
                JSON.parse(raw);

        }

        catch (parseError) {

            console.error(
                "AI JSON error:",
                parseError
            );


            result = {

                message:
                    raw,

                reaction:
                    "none"

            };

        }


        /* =========================================
           SAFETY CHECK
        ========================================= */

        const allowedReactions = [

            "none",

            "laughing",

            "crying",

            "shocked",

            "facepalm",

            "celebration",

            "supportive"

        ];


        if (
            !allowedReactions.includes(
                result.reaction
            )
        ) {

            result.reaction =
                "none";

        }


        /* =========================================
           SEND RESPONSE
        ========================================= */

        res.json({

            success: true,

            message:
                result.message ||
                "My brain temporarily disappeared. 😂",

            reaction:
                result.reaction

        });

    }

    catch (error) {

        console.error(
            "OpenAI error:",
            error
        );


        res.status(500).json({

            success: false,

            error:
                "Moron's brain is currently unavailable. 😭"

        });

    }

});


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Moron backend running on port ${PORT}`
        );

    }
);