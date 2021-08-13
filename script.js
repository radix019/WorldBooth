// DOM elements
const getFindBtn = document.querySelector(".find");
const getCountryName = document.querySelector(".country-name");
const getListEl = document.querySelector(".list-group");
const getListContainer = document.querySelector(".result");
const getLoading = document.querySelector(".loading");
const getClosebtn = document.querySelector(".cross");
const getToMessage = document.querySelector(".top_message");

// Closing the top message
getClosebtn.addEventListener("click", function () {
  getToMessage.classList.add("none");
});

// main function (FETCH API)
async function getCountryInfo(country) {
  const getC = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((res) => {
      getLoading.classList.remove("none");
      return res.json();
    })
    .then((data) => {
      const population_raw = data[0].population;
      const population = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const html_card = `<div class="card shadow p-3 mb-5 bg-white rounded" style="width: 20rem;">
        <img src="${data[0].flag}" class="card-img-top" alt="Flag of ${
        data[0].name
      }">
          <div class="card-body">
            <h5 class="card-title">${data[0].name}</h5>
          </div>
          <ul class="list-group list-group-flush">
             <li class="list-group-item">Capital: ${data[0].capital}</li>
             <li class="list-group-item">Native Name: ${data[0].nativeName}</li>
             <li class="list-group-item">Region: ${data[0].region}</li>
             <li class="list-group-item">Population: ${population(
               population_raw
             )}</li>
            <li class="list-group-item">Currency: ${
              data[0].currencies[0].symbol
            } (${data[0].currencies[0].name} )</li>
            <li class="list-group-item">Languages: ${
              data[0].languages[0].name
            }</li>
            <li class="list-group-item">Timezones: ${data[0].timezones}</li>
          </ul>`;

      getLoading.classList.add("none");
      getListEl.innerHTML = html_card;
    })
    .catch((err) => {
      getLoading.classList.add("none");
      const errorMessage = `<p class = 'error_message'>Sorry! That is not a valid country name. Please try with correct name</p>`;
      getListEl.innerHTML = errorMessage;
    });
}

// INput field event
getCountryName.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    findCountry();
  }
});

// Find button event
getFindBtn.addEventListener("click", findCountry);

// Primary function
function findCountry() {
  const countryName = getCountryName.value;
  if (countryName === "") {
    getListEl.innerHTML =
      "<p class = 'error_message'>Please enter a country name</p>";
    return;
  }
  getCountryInfo(countryName);
  getCountryName.value = "";
}
