// request OMDB

// key api  431b17b0
//link api  http://www.omdbapi.com/?i=tt3896198&apikey=431b17b0
// http://www.omdbapi.com/?s=" + ${titleMovie.value} + "&y=" + ${yearMovie.value} + "&type=" + ${typeChoose.value} + "&apikey=431b17b0"`
let titleMovie = document.querySelector('#titleMovie')
let typeChoose = document.querySelector('#typeMovie')
let buttonSearch = document.querySelector('#search')
let yearMovie = document.querySelector('#yearMovie')
let currentPage = 1


function searchOmdb() {
    let displaySearch = document.querySelector('#resultRequest')
    displaySearch.innerHTML = "";
    let query = `http://www.omdbapi.com/?apikey=431b17b0&page=${currentPage}&r=json`;

    if (titleMovie.value !== "") {
        query += `&s=${titleMovie.value}`;
    }

    if (typeChoose.value !== "") {
        query += `&type=${typeChoose.value}`;
    }

    if (yearMovie.value !== "") {
        query += `&y=${yearMovie.value}`;
    }

    if (titleMovie.value === "" && yearMovie.value === "" && typeChoose.value === "") {
        swal({
            icon: 'warning',
            text: 'Vous devez au moins préciser 2 champs',
            timer: '2000',
        })
        return;
    }

    fetch(query)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False') {
                swal({
                    icon: 'error',
                    text: data.Error,
                    timer: '2000',
                })
                return;
            }
            data.Search.forEach(movie => {
                const item = document.createElement('div');
                item.id = "cardResult";
                let poster = movie.Poster;
                item.innerHTML = `
                  <h2>${movie.Title}</h2>
                  <p>Released: ${movie.Year}</p>
                `;
                if (poster !== 'N/A') {
                    let img = document.createElement('img');
                    img.src = poster;
                    item.appendChild(img);
                }
                displaySearch.appendChild(item);
            });
        })
        .catch(error => console.error(error));
    titleMovie.value = "";
    yearMovie.value = "";
    typeChoose.value = "";
};

buttonSearch.addEventListener('click', searchOmdb)