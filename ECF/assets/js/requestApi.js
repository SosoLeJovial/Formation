// request OMDB

// key api  431b17b0
//link api  http://www.omdbapi.com/?i=tt3896198&apikey=431b17b0
// http://www.omdbapi.com/?s=" + ${titleMovie.value} + "&y=" + ${yearMovie.value} + "&type=" + ${typeChoose.value} + "&apikey=431b17b0"`
let titleMovie = document.querySelector('#titleMovie')
let typeChoose = document.querySelector('#typeMovie')
let buttonSearch = document.querySelector('#search')
let yearMovie = document.querySelector('#yearMovie')
let currentPage = 1;


function searchOmdb(page) {
    pagination.innerHTML = "";
    if(page == undefined){
        page = 1;
    }

    let displaySearch = document.querySelector('#resultRequest')
    displaySearch.innerHTML = "";
    let query = `http://www.omdbapi.com/?apikey=431b17b0&page=${page}&r=json`;

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

            function affichage(data) {
                data.Search.forEach(movie => {
                const item = document.createElement('div');
                item.id = "cardResult";
                let poster = movie.Poster;
                item.innerHTML = `
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                `;
                if (poster !== 'N/A') {
                    let img = document.createElement('img');
                    img.src = poster;
                    item.appendChild(img);
                }
                if (poster == 'N/A') {
                    let img = document.createElement('img');
                    img.src = './assets/img/errorNoPngOups.png' ;
                    item.appendChild(img);
                }
                displaySearch.appendChild(item);
            })
            } 
            let numberOfPage = Math.floor(data.totalResults/data.Search.length);
            if(numberOfPage >= 10){
                numberOfPage = 10;
            }
            
            affichage(data);

            pagination(numberOfPage)
            function pagination(pages){
                let pagination = document.querySelector('#pagination');
                let ul = document.createElement('ul');
                ul.classList.add('pagination');
                for(let i =1; i <= pages; i++){
                    let li = document.createElement('li');
                    li.classList.add('page-item');
                    let a = document.createElement('a');
                    a.classList.add('page-link');
                    a.href = i; 
                    a.innerHTML = i;
                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                       searchOmdb(this.getAttribute('href'))
                    })
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                pagination.appendChild(ul)
            }
            
        })
        .catch(error => console.error(error));
};

buttonSearch.addEventListener('click', searchOmdb);