const request = require("request");

const forecast = (latitude, longitude, callback) => {
   const url =
      "https://api.darksky.net/forecast/19639371dff7d6bd0cefffa1edaddcac/" +
      latitude +
      "," +
      longitude;
   request({ url, json: true }, (error, { body }) => {
      if (error) {
         callback("Unable to connect to weather services!", undefined);
      } else if (body.error) {
         callback("Unable to find location!", undefined);
      } else {
         const summary = body.daily.data[0].summary;
         const temperature = body.currently.temperature;
         const precipProbability = body.currently.precipProbability;
         callback(
            undefined,
            summary +
               " It is currently " +
               Math.ceil(((temperature - 32) * 5) / 9) +
               " degrees out. There is a " +
               precipProbability +
               "% chance of rain."
         );
      }
   });
};

module.exports = forecast;
