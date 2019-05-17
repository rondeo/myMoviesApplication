const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/myMoviesDB",
    { useNewUrlParser: true }
  )
  .catch(function(err) {
    console.error("mongoose.connect error: " + err);
  });

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    title: "The Godfather",
    description:
      "American crime film about the Mafia based on novel by Mario Puzo.",
    director: "Francis Ford Coppola",
    genre: "crime",
    imageUrl: "https://www.rottentomatoes.com/m/godfather",
    ifFeatured: "yes"
  },
  {
    title: "The Shawshank Redemption",
    description:
      "American drama film about a banker sentenced to life in Shawshank State Prison.",
    director: "Frank Darabont",
    genre: "drama",
    imageUrl:
      "https://resizing.flixster.com/k6HGNQn7mJviYejJCX50YuYsYSo=/206x305/v1.bTsxMTE2NjcyNztqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Pulp Fiction",
    description:
      "American crime film about two mob hitmen, a boxer, a gangster's wife, and two bandits intertwine.",
    director: "Quentin Tarantino",
    genre: "crime",
    imageUrl:
      "https://resizing.flixster.com/0i1hnI180unVoxhpNmimKw4qwTQ=/206x305/v1.bTsxMTE3NjEwNTtqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Star Wars",
    description:
      "American epic space opera film about battle between good and evil forces.",
    director: "George Lucas",
    genre: "science fiction",
    imageUrl:
      "https://resizing.flixster.com/cMFtFH6RRzLT5IuwitAtzoaCSxs=/fit-in/200x296.2962962962963/v1.bTsxMjMwMzAzODtqOzE4MDUyOzEyMDA7NDgwOzcxMQ",
    ifFeatured: "yes"
  },
  {
    title: "The Dark Knight",
    description: "Superhero film based on DC Comics character Batman.",
    director: "Christopher Nolan",
    genre: "science fiction",
    imageUrl:
      "https://resizing.flixster.com/Oa0UCsaN1J_EK4FaWugBqnTppaQ=/206x305/v1.bTsxMTE2NTE2MDtqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Goodfellas",
    description:
      "Crime film about the rise and fall of a crime family associate and his friends.",
    director: "Martin Scorsese",
    genre: "crime",
    imageUrl:
      "https://resizing.flixster.com/C6vAATK9W_nlgNUwd0CXjPBEC-c=/206x305/v1.bTsxMTE2NjcyMztqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "The Godfather Part II",
    description: "Prequel and sequel to The Godfather.",
    director: "Francis Ford Coppola",
    genre: "crime",
    imageUrl:
      "https://resizing.flixster.com/-oP3lUcfjUt7BJgtcKh80XWIEXU=/fit-in/200x296.2962962962963/v1.bTsxMTE2OTc4MztqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "The Matrix",
    description:
      "A dystopian future with a similated reality to subdue the human population.",
    director: "The Wachowskis",
    genre: "science fiction",
    imageUrl:
      "https://resizing.flixster.com/MAbDE_svTjKNoxhiOXCtrWZ-G6g=/206x305/v1.bTsxMTE2ODA5NjtqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Schindler's List",
    description:
      "Based on life of a German businessman who saved the lives of over a thousand Jewish refugees during the Holocaust.",
    director: "Steven Spielberg",
    genre: "historical",
    imageUrl:
      "https://resizing.flixster.com/0P5G_GOzKWSC8NyR5KaZJgcvZX0=/206x305/v1.bTsxMTIwODUwODtqOzE4MTI5OzEyMDA7ODUyOzExMzY",
    ifFeatured: "yes"
  },
  {
    title: "Raiders of the Lost Ark",
    description:
      "A treasure hunter tries to find the Ark of the Covenant before a group of Nazis.",
    director: "Steven Spielberg",
    genre: "adventure",
    imageUrl:
      "https://resizing.flixster.com/K_KyKtlrMBtOHsvG39r3e4mhjkQ=/fit-in/200x296.2962962962963/v1.bTsxMTE1NzYxNDtqOzE4MTI5OzEyMDA7MTAxMDsxNTAw",
    ifFeatured: "yes"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to My Movies!");
});

// log all requests
app.use(morgan("common"));

// get list of all movies

app.get("/movies", (req, res) => {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get list of all users

app.get("/users", (req, res) => {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get data about a single movie by title

app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(function(movie) {
      res.json(movie);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get data about a genre by name

app.get("/movies/list/:Genre", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Genre })
    .then(function(movie) {
      res.json(movie.Genre);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get data about a director by name

app.get("/movies/directors/:Name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function(movie) {
      res.json(movie.Director);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// add a new user
/* JSON in this format is expected:
{
  ID : Integer,
  Username : String,
  Password : String,
  Email : String,
  Birthday : Date
}
*/

app.post("/users", function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists.");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
          });
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// add a new movie
/* JSON in this format is expected:
{
  ID : Integer,
  Title: String,
  Description: String,
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Number,
    Death: Number
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});
*/

app.post("/movies", function(req, res) {
  Movies.findOne({ Title: req.body.Title })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Title + " already exists.");
      } else {
        Movies.create({
          Title: req.body.Title,
          Description: req.body.Description,
          "Genre.Name": req.body.Genre.Name,
          "Genre.Description": req.body.Genre.Description,
          "Director.Name": req.body.Director.Name,
          "Director.Bio": req.body.Director.Bio,
          "Director.Birth": req.body.Director.Birth,
          "Director.Death": req.body.Director.Death,
          ImagePath: req.body.ImagePath,
          Featured: req.body.Featured
        })
          .then(function(movie) {
            res.status(201).json(movie);
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
          });
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// update a user's info

app.put("/users/:Username", (req, res) => {
  /*
based on JSON in this format:
{
  Username: String,
    (required)
  Password: String,
    (required)
  Email: String,
    (required)
  Birthday: Date
}
  */
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

// add a movie to a user's list of favorites by username

app.post("/users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

// delete a movie from a user's list of favorites by username

app.delete("/users/:Username/:MovieID", (req, res) => {
  Users.updateOne(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } }
  )
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res
          .status(201)
          .send(req.params.MovieID + " was deleted for " + req.params.Username);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// delete user from the list of users
// needs troubleshooting
app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(201).send(req.params.Username + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// delete movie from movie list

app.delete("/movies/:Title", function(req, res) {
  Movies.findOneAndRemove({ Title: req.params.Title })
    .then(function(movie) {
      if (!movie) {
        res.status(400).send(req.params.Title + " was not found.");
      } else {
        res.status(201).send(req.params.Title + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// go to this folder for file requests
app.use(express.static("public"));

// log all application errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
});

app.listen(8080, () => console.log("Your app is running on port 8080"));
