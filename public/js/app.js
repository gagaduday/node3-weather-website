const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const manualButton = document.querySelector(".manual-button");
const automaticButton = document.querySelector(".automatic-button");

manualButton.addEventListener("click", (e) => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	fetch("/weather?address=" + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});

automaticButton.addEventListener("click", (e) => {
	e.preventDefault();

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	let longitude = 0;
	let latitude = 0;

	window.navigator.geolocation.getCurrentPosition(
		(position) => {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

			fetchLocationAndWeather(latitude, longitude).then((data) => {
				messageOne.textContent = data.locationData.placeName;
				messageTwo.textContent = data.weatherData.forecast;
			});
		},
		(error) => {
			messageOne.textContent = error.message;
		}
	);
});

const fetchLocationAndWeather = async (latitude, longitude) => {
	const locationResponse = await fetch(
		"/location-auto?latitude=" + latitude + "&longitude=" + longitude
	);

	const weatherResponse = await fetch(
		"/weather-auto?latitude=" + latitude + "&longitude=" + longitude
	);

	const locationData = await locationResponse.json();
	const weatherData = await weatherResponse.json();

	return {
		locationData,
		weatherData,
	};
};
