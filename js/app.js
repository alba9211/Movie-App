const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_URL_ID = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

function showDataFilmID(data) {
  const modalEl = document.querySelector(".modal");

  modalEl.innerHTML = `
  <div class="modal__card">
    <img class="modal__movie-backdrop" src=${data.posterUrlPreview} alt="">
    <h2>
      <span class="modal__movie-title">${data.nameRu}</span>
      <span class="modal__movie-release-year">${data.year}</span>
    </h2>
    <ul class="modal__movie-info">
      <div class="loader"></div>
      <li class="modal__movie-genre">${data.genres.map(
        (genre) => ` ${genre.genre}`
      )}</li>
      <li class="modal__movie-runtime">${data.filmLength} минут</li>
      <li>Сайт: <a class="modal__movie-site">${data.webUrl}</a></li>
      <li class="modal__movie-overview">${data.description}</li>
    </ul>
    <button type="button" class="modal__button-close">Закрыть</button>
  </div>
`;
  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");
  const modalBtnClose = modalEl.querySelector(".modal__button-close");
  modalBtnClose.addEventListener("click", function (e) {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modalEl) {
      modalEl.classList.remove("modal--show");
      document.body.classList.remove("stop-scrolling");
    }
  });
}

async function fetchData(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  return resp.json();
}

async function getMovieID(url) {
  const respData = await fetchData(url);
  showDataFilmID(respData);
}

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
  const respData = await fetchData(url);

  showMovies(respData);
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = "";
  data.films.forEach((film) => {
    const cartFilm = document.createElement("div");
    cartFilm.id = film.filmId;
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
  openModal();
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const url = `${API_URL_SEARCH}${search.value}`;
  getMovies(url);
  search.value = "";
});

// Modal
function openModal() {
  const moviesEl = document.querySelector(".movies");

  moviesEl.addEventListener("click", function (e) {
    const movie = e.target.closest(".movie");
    const url = `${API_URL_ID}${movie.id}`;

    if (movie) {
      console.log(movie.id);
      getMovieID(url);
    }
  });
}
