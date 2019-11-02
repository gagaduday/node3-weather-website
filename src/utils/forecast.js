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
         const temperature = Math.ceil(
            ((body.currently.temperature - 32) * 5) / 9
         );
         const precipProbability = body.currently.precipProbability;
         const temperatureHigh = Math.ceil(
            ((body.daily.data[0].temperatureHigh - 32) * 5) / 9
         );
         const temperatureLow = Math.ceil(
            ((body.daily.data[0].temperatureLow - 32) * 5) / 9
         );
         callback(
            undefined,
            summary +
               " It is currently " +
               temperature +
               " degrees out. This high today is " +
               temperatureHigh +
               " with a low of " +
               temperatureLow +
               ". There is a " +
               precipProbability +
               "% chance of rain."
         );
      }
   });
};

module.exports = forecast;
