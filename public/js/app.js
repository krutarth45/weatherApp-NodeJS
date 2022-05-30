const weatherForm = document.querySelector("form");
const searchEl = document.querySelector("input");
const msg1 = document.querySelector("#message-1");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchEl.value;
  msg1.innerHTML = "Loading...";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.innerHTML = `<p>Error<br><br>${data.error}</p>`;
        } else {
          msg1.innerHTML = `<p>
                Location: ${data.location} <br>
                Latitude: ${data.latitude} <br>
                Longitude: ${data.longitude} <br>
                Temperature: ${data.temperature} <br>
                Feels Like: ${data.feels_like} <br>
                Weather: ${data.weather}
            </p>`;
        }
      });
    }
  );
});
