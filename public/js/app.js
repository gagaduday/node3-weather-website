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

	let longitude = 0;
	let latitude = 0;

	window.navigator.geolocation.getCurrentPosition(
		(position) => {
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;

			fetch(
				"/weather-auto?latitude=" + latitude + "&longitude=" + longitude
			).then((response) => {
				response.json().then((data) => {
					if (data.error) {
						messageOne.textContent = data.error;
					} else {
						messageOne.textContent = "";
						messageTwo.textContent = data.forecast;
					}
				});
			});
		},
		(error) => console.log(error)
	);
});
