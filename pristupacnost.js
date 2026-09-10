/* ==================================================
PRISTUPAČNOST - SVE STRANICE OSIM USLUGE
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    
/* ==================================================
   ELEMENTI
================================================== */

const dugmeTeme =
    document.getElementById("dugme-tema");

const povecajFont =
    document.getElementById("povecaj-font");

const smanjiFont =
    document.getElementById("smanji-font");


/* ==================================================
   UČITAVANJE SAČUVANIH PODEŠAVANJA
================================================== */

const sacuvanaTema =
    localStorage.getItem("theme");

const sacuvanFont =
    localStorage.getItem("fontSize");


/* ==================================================
   SVETLA TEMA
================================================== */

if (sacuvanaTema === "light") {
    document.body.classList.add("svetla-tema");
}


/* ==================================================
   VEĆI FONT
================================================== */

if (sacuvanFont === "large") {
    document.body.classList.add("veliki-font");
}


/* ==================================================
   DUGME ZA TEMU
================================================== */

if (dugmeTeme) {

    if (document.body.classList.contains("svetla-tema")) {
        dugmeTeme.textContent = "🌙 Tamna tema";
    }
    else {
        dugmeTeme.textContent = "☀ Svetla tema";
    }


    dugmeTeme.addEventListener("click", function () {

        document.body.classList.toggle("svetla-tema");


        if (document.body.classList.contains("svetla-tema")) {

            localStorage.setItem("theme", "light");

            dugmeTeme.textContent = "🌙 Tamna tema";

        }
        else {

            localStorage.setItem("theme", "dark");

            dugmeTeme.textContent = "☀ Svetla tema";

        }

    });

}


/* ==================================================
   POVEĆANJE FONTA
================================================== */

if (povecajFont) {

    povecajFont.addEventListener("click", function () {

        document.body.classList.add("veliki-font");

        localStorage.setItem("fontSize", "large");

    });

}


/* ==================================================
   SMANJENJE FONTA
================================================== */

if (smanjiFont) {

    smanjiFont.addEventListener("click", function () {

        document.body.classList.remove("veliki-font");

        localStorage.setItem("fontSize", "normal");

    });

}


});
