import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/definitions", async (req, res) => {
    try {
        const word = req.body.word;
        const definitions = await axios.get(API_URL + word);

        res.render("definition.ejs", {
            definitions: JSON.stringify(definitions.data[0])
        });
    } catch (error) {
        res.status(500).send("Error retrieving definitions");
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
