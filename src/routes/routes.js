const express = require("express");
const jokes = require("../data/JokesAPI.collection");

const router = express.Router();

const masterKey = "4VGP2DN-6EWM4SJ-96FGRHV-Z3PR3TT";

// GET - Fetch a Random Joke from Joke API
router.get("/random", (req, res) => {
  const randomJokesIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomJokesIndex]);
});

// GET - Fetch a specific joke with requested id
router.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const findJoke = jokes.find((joke) => joke.id === id);
  res.json(findJoke);
});

// GET - Filter Joke By Type
router.get("/filter", (req, res) => {
  const type = req.query.typeOfJoke;
  const filteredJoke = jokes.filter((joke) => joke.jokeType === type);
  res.json(filteredJoke);
});

// POST - Create a new Joke
router.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.textOfJoke,
    jokeType: req.body.typeOfJoke,
  };
  jokes.push(newJoke);
  console.log(jokes.splice(-1));
  res.json(newJoke);
});

// PUT - Replace  previous Joke using id
router.put("/jokes/:id", (req, res) => {
  const jokeId = parseInt(req.params.id);
  const updatedJoke = {
    id: jokeId,
    jokeText: req.body.textOfJoke,
    jokeType: req.body.typeOfJoke,
  };

  const searchIndex = jokes.findIndex((ele) => ele.id === jokeId);

  jokes[searchIndex] = updatedJoke;
  res.json(updatedJoke);
});

// PATCH - Edit a particular property of a Joke using id. It can be either jokeText or jokeType.
router.patch("/jokes/:id", (req, res) => {
  const jokeId = parseInt(req.params.id);
  const existingJoke = jokes.find((ele) => ele.id === jokeId);
  const replacementJoke = {
    id: jokeId,
    jokeText: req.body.textOfJoke || existingJoke.jokeText,
    jokeType: req.body.typeOfJoke || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((ele) => ele.id === jokeId);
  jokes[searchIndex] = replacementJoke;
  console.log(jokes[searchIndex]);
  res.json(replacementJoke);
});

// DELETE - Delete a single joke from the collection of jokes based on the path parameter provided for the joke id.
router.delete("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const searchIndexOfJokeToDelete = jokes.findIndex((ele) => ele.id == id);
  if (searchIndexOfJokeToDelete > -1) {
    jokes.splice(searchIndexOfJokeToDelete, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `Joke with id: ${id} not found, No Jokes were deleted.` });
  }
});

// DELETE ALL - Delete all jokes from the collection but using API Key Type authentication
router.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    jokes.length = 0;
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `You are not authorized to perform this action.` });
  }
});

module.exports = router;
