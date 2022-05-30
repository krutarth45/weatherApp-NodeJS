const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weatherReport = require("./utils/weatherReport");

// creates new express application.
const app = express();

// Paths for Express configs.
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jinki",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jinki",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    template:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nostrum excepturi ipsam blanditiis. Aperiam rem veritatis inventore delectus explicabo itaque tenetur debitis eos minima cum maxime officia id molestiae exercitationem adipisci saepe quod numquam similique, magnam, assumenda at quae omnis quia enim. Culpa cum hic unde dolorem architecto possimus dolore.",
    title: "Help Page!",
    name: "Jinki",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter an Address.",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      } else {
        weatherReport(
          `${latitude},${longitude}`,
          (error, { temperature, feelsLikeTemperature, weather } = {}) => {
            if (error) {
              return res.send({
                error,
              });
            } else {
              return res.send({
                location: placeName,
                latitude,
                longitude,
                temperature,
                feels_like: feelsLikeTemperature,
                weather,
              });
            }
          }
        );
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 ERROR!",
    errorMsg: "Help Page Not Found.",
    name: "Jinki",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ERROR!",
    errorMsg: "Page Not Found.",
    name: "Jinki",
  });
});

// listen method starts up the server.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
