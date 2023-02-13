var films = [
    { name: "Deadpool", years: 2016, authors: "Tim Miller" },
    { name: "Spiderman", years: 2002, authors: "Sam Raimi" },
    { name: "Scream", years: 1996, authors: "Wes Craven" },
    { name: "It: chapter 1", years: 2019, authors: "Andy Muschietti" }
];

// TODO

// intégration de films au tableau html 
let table = document.getElementById('myTable');
let rows = table.rows;

function myTable() {
    for (let i = 0; i < films.length; i++) {
        let obj = films[i];
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = obj['name'];
        cell2.innerHTML = obj['years'];
        cell3.innerHTML = obj['authors'];
        let button = document.createElement("button");
        button.innerHTML = "Supprimer";
        button.id = "button" + (i + 1);
        button.classList.add('btn', 'btn-outline-danger')
        cell4.appendChild(button);
    }
}
myTable();

// button Add, to bring up forms
let buttonAdd = document.querySelector('#add');
let buttonSave = document.createElement("button");
let inputTitle = document.createElement("input");
let inputYear = document.createElement("input");
let inputAuthor = document.createElement("input");
let addNewFilmSection = document.querySelector('#addNewFilm')


let addFilm = function () {
    buttonAdd.disabled = true;
    buttonAdd.style.visibility = "hidden"
    //for input title
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "inputTitle");
    inputTitle.setAttribute('placeholder', 'Entrez un titre');
    inputTitle.setAttribute("minlength", "2");
    addNewFilmSection.appendChild(inputTitle);
    // for input year
    inputYear.setAttribute("type", "number");
    inputYear.setAttribute("id", "inputYear");
    inputYear.setAttribute('placeholder', 'Entrez une année');
    inputYear.setAttribute('min', '1900');
    addNewFilmSection.appendChild(inputYear);
    //for input author
    inputAuthor.setAttribute("type", "text");
    inputAuthor.setAttribute("id", "inputAuthor");
    inputAuthor.setAttribute('placeholder', 'Entrez un réalisateur');
    inputTitle.setAttribute("minlength", "5");
    addNewFilmSection.appendChild(inputAuthor);
    //for buttonSave
    buttonSave.innerHTML = "Save"
    buttonSave.classList.add('btn', 'btn-outline-success')
    addNewFilmSection.appendChild(buttonSave);
    inputTitle.style.visibility = "visible";
    inputYear.style.visibility = "visible";
    inputAuthor.style.visibility = "visible";
    buttonSave.style.visibility = "visible";
};
buttonAdd.addEventListener("click", addFilm);

// add film by buttonSave
let nextIdButton = 4
buttonSave.addEventListener("click", () => {
    if (true && inputTitle.value.length >= 2 && inputYear.value >= 1900 && inputAuthor.value.length >= 5) {
        films.push({ name: inputTitle.value, years: inputYear.value, authors: inputAuthor.value });
        table.innerHTML = "";
        myTable();
        swal('Le film a bien été ajouté !', {
            icon: 'success',
            timer: "3000",
        });
        buttonAdd.disabled = false;
        buttonAdd.style.visibility = "visible";
    } else {
        swal({
            icon: "warning",
            title: "Attention les informations rentrées ne sont pas valides !",
            text: "Le titre doit avoir 2 caractères minimum \n L'année doit faire 4 chiffres et ne peut être inférieure à l'année 1900 \n L'auteur doit avoir 5 caractères minimum",
            timer: "5000",
        })
        // rajouter les zones d'erreur d'input
        buttonAdd.disabled = false;
        buttonAdd.style.visibility = "visible";
    }
    let inputsAdd = document.querySelectorAll('input');
    for (let input of inputsAdd) {
        let parent = input.parentNode;
        parent.removeChild(input);
    }
    let parent = buttonSave.parentNode;
    parent.removeChild(buttonSave)
});


// add event on filter select

let selectFilter = document.getElementById("filter");


    selectFilter.addEventListener("change", () => {
        switch (selectFilter.value) {
            case "title":
                films.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                table.innerHTML = "";
                myTable();
                break;
            case "year":
                films.sort(function (a, b) {
                    return b.years - a.years;
                });
                table.innerHTML = "";
                myTable();
                break;
            case "author":
                films.sort(function (a, b) {
                    return a.authors.localeCompare(b.authors);
                });
                table.innerHTML = "";
                myTable();
                break;
        }
    });


// add event on delete buttons
// event do not work 
document.addEventListener('click', function (event) {
    const clickedButton = event.target.closest('button[id^="button"][id$="button"]');
    if (!clickedButton) return;
    const row = clickedButton.closest('tr');
    if (!row) return;
    while (row.firstChild) {
        row.removeChild(row.firstChild);
    }
});



