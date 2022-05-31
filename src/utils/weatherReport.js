const request = require("request");
const weatherReport = (coordinates, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8169befc9262c0947093b18e617ab970&query=" +
    encodeURIComponent(coordinates) +
    "&units=m";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      callback(undefined, {
        location: response.body.location.name,
        temperature: response.body.current.temperature,
        feelsLikeTemperature: response.body.current.feelslike,
        weather: response.body.current.weather_descriptions[0],
        humidity: response.body.current.humidity,
      });
    }
  });
};

module.exports = weatherReport;
