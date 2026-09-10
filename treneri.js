/* ==================================================
TRENERI - jQuery
================================================== */

const treneri = [

    
{
    ime: "Marko Petrović",
    pozicija: "Personalni trener",
    slika: "images/trener1.jpg",
    opis:
        "Marko je personalni trener specijalizovan za individualne treninge, razvoj snage i pravilnu tehniku izvođenja vežbi."
},

{
    ime: "Nikola Jovanović",
    pozicija: "Fitness trener",
    slika: "images/trener2.jpg",
    opis:
        "Nikola je fitness trener koji se bavi razvojem kondicije, snage i izgradnjom pravilnih trening navika."
},

{
    ime: "Ana Marković",
    pozicija: "Group Fitness trener",
    slika: "images/trener3.jpg",
    opis:
        "Ana je group fitness trener koja vodi grupne treninge i pomaže članovima da kroz motivaciju i dobar rad ostvare svoje ciljeve."
}


];

let trenutniTrener = 0;

/* ==================================================
PRIKAŽI TRENERA
================================================== */

function prikaziTrenera(indeks) {

    
const trener = treneri[indeks];

$("#ime-trenera, #uloga-trenera, #fotografija-trenera, #opis-trenera")
    .fadeOut(200, function () {

        $("#ime-trenera").text(trener.ime);

        $("#uloga-trenera").text(trener.pozicija);

        $("#fotografija-trenera")
            .attr("src", trener.slika)
            .attr("alt", trener.ime);

        $("#opis-trenera")
            .text(trener.opis);

        $("#ime-trenera, #uloga-trenera, #fotografija-trenera, #opis-trenera")
            .fadeIn(300);

    });

trenutniTrener = indeks;


}

/* ==================================================
PRETHODNI TRENER
================================================== */

$("#prethodni-trener").on("click", function () {

    
trenutniTrener--;

if (trenutniTrener < 0) {

    trenutniTrener = treneri.length - 1;

}

prikaziTrenera(trenutniTrener);


});

/* ==================================================
SLEDEĆI TRENER
================================================== */

$("#sledeci-trener").on("click", function () {

    
trenutniTrener++;

if (trenutniTrener >= treneri.length) {

    trenutniTrener = 0;

}

prikaziTrenera(trenutniTrener);


});

/* ==================================================
POČETNI TRENER
================================================== */

$(document).ready(function () {

    
prikaziTrenera(0);


});
