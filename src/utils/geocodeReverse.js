const request = require("request");

const geocodeReverse = (latitude, longitude, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		longitude +
		"," +
		latitude +
		".json?access_token=pk.eyJ1IjoiZ2FnYWR1ZGF5IiwiYSI6ImNrMmJiN2xlczM4cDEzY21sMzhoYjc4MjEifQ.PXE-BRMbhrINaV-IR8L40A&limit=1";
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to location services.", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to retrieve location. Try again.", undefined);
		} else {
			const placeName = body.features[0].place_name;
			callback(undefined, {
				placeName,
			});
		}
	});
};

module.exports = geocodeReverse;
