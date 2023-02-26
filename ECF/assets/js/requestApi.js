// request OMDB

// key api  431b17b0
//link api  http://www.omdbapi.com/?i=tt3896198&apikey=431b17b0
// http://www.omdbapi.com/?s=" + ${titleMovie.value} + "&y=" + ${yearMovie.value} + "&type=" + ${typeChoose.value} + "&apikey=431b17b0"`
let titleMovie = document.querySelector('#titleMovie')
let typeChoose = document.querySelector('#typeMovie')
let buttonSearch = document.querySelector('#search')
let yearMovie = document.querySelector('#yearMovie')
let currentPage = 1;

function accueil() {
    let displaySearch = document.querySelector('#resultRequest');
    displaySearch.innerHTML = "";
    const titleSelection = document.createElement('h3');
    titleSelection.id = "titleSelection";
    titleSelection.innerHTML = "Notre Selection";
    displaySearch.appendChild(titleSelection);
    const galleryImage = document.createElement('div');
    galleryImage.id = "galleryImage";
    displaySearch.appendChild(galleryImage);

    fetch(`http://www.omdbapi.com/?apikey=431b17b0&r=json&s=avengers`)
        .then(response => response.json())
        .then(data => {

            if (data.Response === 'False') {
                swal({
                    icon: 'error',
                    text: "Aucun résultat n'a été trouvé",
                    timer: '2000',
                })
            }
            else {
                const results = data.Search.slice(0, 9);
                results.forEach(movie => {
                    const item = document.createElement('figure');
                    let br = document.createElement('br');
                    let poster = movie.Poster;
                    item.classList.add('imgGallery');

                    let legendHover = document.createElement('figcaption');
                    legendHover.classList.add('legendHover')
                    legendHover.innerHTML = `<span>${movie.Title}</span><span>${movie.Year}</span>`;
                    legendHover.insertBefore(br,legendHover.lastChild);
                    legendHover.style.display = "none";
                    item.appendChild(legendHover);
                    if (poster !== 'N/A') {

                        let img = document.createElement('img');
                        img.src = poster;
                        item.appendChild(img);
                    }
                    displaySearch.appendChild(item);
                    item.addEventListener('mouseover', function () {
                        legendHover.style.display = "block";
                    })
                    item.addEventListener('mouseout', function () {
                        legendHover.style.display = "none";
                    })
                })
            }
        });
    ;
}

accueil();
// document.addEventListener("load", accueil);



function searchOmdb(page) {
    pagination.innerHTML = "";
    if (page == undefined) {
        page = 1;
    }

    let displaySearch = document.querySelector('#resultRequest');
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
                    text: "Aucun résultat n'a été trouvé",
                    timer: '2000',
                })
                return;
            }

            function affichage(data) {
                data.Search.slice(0, 9).forEach(movie => {
                            const item = document.createElement('figure');
                            let poster = movie.Poster;
                            item.classList.add('imgGallery');
        
                            let legendHover = document.createElement('figcaption');
                            legendHover.classList.add('legendHover')
                            legendHover.innerHTML = `<span>${movie.Title}</span><span>${movie.Year}</span>`;
                            legendHover.style.display = "none";
                            item.appendChild(legendHover);
                            
                            if (poster !== 'N/A') {
                                let img = document.createElement('img');
                                img.src = poster;
                                item.appendChild(img);
                            } else {
                                let img = document.createElement('img');
                                img.src = `./assets/img/errorNoPngOups.png`;
                                item.appendChild(img);
                            }
                            displaySearch.appendChild(item);
                            item.addEventListener('mouseover', function () {
                                legendHover.style.display = "block";
                            })
                            item.addEventListener('mouseout', function () {
                                legendHover.style.display = "none";
                            })
                        
                    }
                )
            }
            let numberOfPage = Math.floor(data.totalResults / data.Search.length);
            if (numberOfPage >= 10) {
                numberOfPage = 10;
            }

            affichage(data);

            pagination(numberOfPage)
            function pagination(pages) {
                let pagination = document.querySelector('#pagination');
                let ul = document.createElement('ul');
                ul.classList.add('pagination');
                for (let i = 1; i <= pages; i++) {
                    let li = document.createElement('li');
                    li.classList.add('page-item');
                    let a = document.createElement('a');
                    a.classList.add('page-link');
                    a.href = i;
                    a.innerHTML = i;
                    a.addEventListener('click', function (e) {
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