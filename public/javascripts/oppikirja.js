let titleField = document.getElementById('title');
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

function Title(title, description, timetomaster, timespent, source, startdate, inprogress, completiondate) {
    this.title = title;
    this.description = description;
    this.timetomaster = timetomaster || null;
    this.timespent = timespent || null;
    this.source = source;
    this.startdate = startdate || null;
    this.inprogress = inprogress;
    this.completiondate = completiondate || null;
}

function createTitle() {
    const title = new Title(
        titleField.value.trim(),
        descField.value.trim(),
        timeTMField.value,
        timeSField.value,
        sourceField.value.trim(),
        startDateField.value,
        inProgress.checked,
        compDate.value
    );
    console.log(title);
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
            if(response.status == 201) {
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
        console.log(titleLista)
        console.log('Get toimii ja saa kiinni titlelistasta');
        paivitaLista(titleLista);
    })
}

function paivitaLista(array) {

    let naytaLista = document.getElementById('cardContainer');
   
    function createList(titleRow, descRow, timeTRow, timeSRow, sourceRow, startRow, inPRow, compRow, idUni) {
        let card = document.createElement('div');
        let cardText = document.createElement('div');
        let cardButtons = document.createElement('div'); 
        let cardBottom = document.createElement('div'); 
        let titleElement = document.createElement('h2');     
        card.classList.add("card");
        cardText.classList.add("card-text");
        cardButtons.classList.add("card-buttons");
        cardBottom.classList.add("card-bottom");
        card.id = idUni;
        titleElement.innerHTML = titleRow;
        cardButtons.innerHTML = '<button id=\"btnRemove\" onclick=\"removeThis('+idUni+')\" class=\"btnRemove\"><img src=\"stylesheets/trashbin.png\"></button><button id=\"btnEdit\" class=\"btnEdit\"><img src=\"stylesheets/pencil3.png\"></button>';
        cardBottom.innerHTML = "<p>"+startRow+"-"+compRow + " " + inPRow+"</p>";
        cardText.append(cardButtons);
        cardText.append(titleElement);
        card.append(cardText);
        card.append(cardBottom);
        naytaLista.append(card);

        card.onclick = function(e) {
            if (e.target.id=="btnRemove" || e.target.id=="btnEdit") {
                e.stopPropagation();
            } else {
            let modal = document.getElementById('myModal');
            document.getElementById('modalP').innerHTML = 
            "<h2>"+titleRow+"</h2><p>"+sourceRow+"<br>"+ descRow+"<br>Suunniteltu aika: "+timeTRow+"h<br>Käytetty aika: "+timeSRow+"h<br>"+startRow+" - "+compRow+"<br>"+inPRow+"</p>"
            modal.style.display = "block";
            console.log(e.target.id)
            }
        }
    }

    naytaLista.innerHTML = "";

    array.forEach(function(otsake) {
        let idUni = otsake.id;
        let titleRow = otsake.title;
        let descRow = otsake.description;
        let timeTRow = otsake.timetomaster;
        let timeSRow = otsake.timespent;
        let sourceRow = otsake.source;
        let startRow = new Date(otsake.startdate).toLocaleDateString();
        let inPRow = checkCheck(otsake.inprogress);
        let compRow = new Date(otsake.completiondate).toLocaleDateString();

        createList(titleRow, descRow, timeTRow, timeSRow, sourceRow, startRow, inPRow, compRow, idUni);
    })
}


let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];

span.onclick = function() {
modal.style.display = "none";
}
    
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
    }
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



