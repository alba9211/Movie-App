const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

function getClassByRate(rating) {
  if (rating < 5) {
    return "red";
  } else if (rating <= 7) {
    return "orange";
  } else {
    return "green";
  }
}

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();

  console.log(respData);
  showMovies(respData);
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = "";
  data.films.forEach((film) => {
    const cartFilm = document.createElement("div");

    cartFilm.classList.add("movie");
    cartFilm.innerHTML = `
    <div class="movie__cover-inner">
      <img
        src="${film.posterUrl}"
        class="movie__cover"
        alt="${film.nameRu}"
      />
      <div class="movie__cover--darkened"></div>
    </div>
    <div class="movie__info">
      <div class="movie__title">${film.nameRu}</div>
      <div class="movie__category">${film.genres.map(
        (genre) => ` ${genre.genre}`
      )}</div>
      ${
        film.rating
          ? ` <div
            class="movie__average movie__average--${getClassByRate(
              film.rating
            )}"
          >
            ${film.rating}
          </div>`
          : ""
      }
    </div>`;
    moviesEl.append(cartFilm);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${search.value}`;
  getMovies(url);
  search.value = "";
});
