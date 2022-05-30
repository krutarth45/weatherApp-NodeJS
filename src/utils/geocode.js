const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia3J1dGQzMyIsImEiOiJjbDNsODQ4b3IwM2tkM2NteWdtcm04b3d6In0.byrk3iAs5TnDZO1qpdNCjw&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to get location services.", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find a location! Try another search.", undefined);
    } else {
      callback(undefined, {
        placeName: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
