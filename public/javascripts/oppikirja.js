let titleField = document.getElementById('title');
let tunnusField = document.getElementById('identification');
let descField = document.getElementById('description');
let timeTMField = document.getElementById('timeTM');
let timeSField = document.getElementById('timeS');
let sourceField = document.getElementById('source');
let startDateField = document.getElementById('startL');
let inProgress = document.getElementById('completion');
let compDate = document.getElementById('dateC');

titleList = [];

window.onload = function WindowLoad(event) {
    haeTitlet();
}

function Title(title, tunnus, description, timeToMaster, timeSpent, source, startLearningDate, inProgress, completionDate) {
    this.title = title;
    this.tunnus = tunnus;
    this.description = description;
    this.timeToMaster = timeToMaster;
    this.timeSpent = timeSpent;
    this.source = source;
    this.startLearningDate = startLearningDate;
    this.inProgress = inProgress;
    this.completionDate = completionDate
}

function createTitle() {
    const title = new Title(
        titleField.value.trim(),
        tunnusField.value.trim(),
        descField.value.trim(),
        timeTMField.value,
        timeSField.value,
        sourceField.value.trim(),
        startDateField.value,
        inProgress.checked,
        compDate.value
    );
    return title;
}

async function lisaaTitle() {
    let uusiTitle = createTitle();
    let dataJson = JSON.stringify(uusiTitle);
    /*console.log(uusiTitle)
    console.log(JSON.stringify(dataJson));*/

    const url = "http://localhost:3000";
    fetch(url, {
        method: 'POST',
        body: dataJson,
        headers: {'Content-Type': 'application/json'}
        })
        .then(function(response) {
            haeTitlet();
            if(response.status == 200) {
                console.log("luotu")
            } else {
                console.log("virhe: ", response.statusText);
        }
    }); haeTitlet();
}

async function haeTitlet() {
    fetch('http://localhost:3000')
    .then(function(response) { return response.json(); })
    .then(function(titleLista) {
        console.log('Get toimii ja saa kiinni titlelistasta');
        paivitaLista(titleLista);
    })
}

function paivitaLista(array) {

    let naytaLista = document.getElementById('cardContainer');
   
    function createList(titleRow, tunnusRow, descRow, timeTRow, timeSRow, sourceRow, startRow, inPRow, compRow, idUni) {
        let flipCardDiv = document.createElement('div');
        let cardInner = document.createElement('div');
        let cardFront = document.createElement('div');
        let cardFrontHeading = document.createElement('div'); /*(tänne title)*/
        let cardFrontContent = document.createElement('div'); /*tänne p + id*/
        let cardBack = document.createElement('div');
        let cardBackDescrip = document.createElement('div'); /*Tänne h1 desc*/
        let cardBackContent = document.createElement('div'); /*tänne p + source*/
        flipCardDiv.classList.add("flip-card");
        cardInner.classList.add("flip-card-inner");
        cardFront.classList.add("flip-card-front");
        cardBack.classList.add("flip-card-back");
        cardFrontHeading.innerHTML = "<div class=\"heading\"><h1>" + titleRow + "</h1></div>";
        cardFrontContent.innerHTML = "<div class=\"content\"><p>" + tunnusRow + "<p></div>"
        cardBackDescrip.innerHTML = "<div class=\"descrip\"><h1>Description</h1></div>";
        cardBackContent.innerHTML = "<div class:\"backcontent\"><p>" + descRow + "</p></div>";
        flipCardDiv.append(cardInner);
        cardInner.append(cardFront);
        cardFront.append(cardFrontHeading);
        cardFront.append(cardFrontContent);
        cardInner.append(cardBack);
        cardBack.append(cardBackDescrip);
        cardBackDescrip.append(cardBackContent);
        naytaLista.append(flipCardDiv);
    }

    naytaLista.innerHTML = "";

    array.forEach(function(otsake) {
        let idUni = otsake.id;
        let titleRow = otsake.title;
        let tunnusRow = otsake.tunnus;
        let descRow = otsake.description;
        let timeTRow = otsake.timeToMaster;
        let timeSRow = otsake.timeSpent;
        let sourceRow = otsake.source;
        let startRow = new Date(otsake.startLearningDate).toLocaleDateString();
        let inPRow = checkCheck(otsake.inProgress);
        let compRow = new Date(otsake.completionDate).toLocaleDateString();

        createList(titleRow, tunnusRow, descRow, timeTRow, timeSRow, sourceRow, startRow, inPRow, compRow, idUni);
    })
}
function checkCheck(check) {
    if (check == true) {
        return 'Completed'
    } else {
        return 'In-progress'
    }
}

async function removeThis(id) {
    console.log(id);
    fetch('http://localhost:3000/api/topics/'+id, {
    method: 'DELETE',
    headers: {'content-type': 'application/json'}
        })
    /*.then(res => res.json())
    .then(res => console.log(res))*/
    .then(function(response) {
        haeTitlet();
        if(response.status === 201) {
            console.log("poistettu")
        } else {
            console.log("virhe: ", response.statusText);
    }
    })
}

