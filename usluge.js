document.addEventListener("DOMContentLoaded", function () {

 
const dugmeTeme = document.getElementById("dugme-tema");
const povecajFont = document.getElementById("povecaj-font");
const smanjiFont = document.getElementById("smanji-font");

if (!dugmeTeme || !povecajFont || !smanjiFont) {
    console.error("Dugmad nisu pronađena!");
    return;
}


/* ==================================================
   TEMA
================================================== */

let svetlaTema =
    localStorage.getItem("uslugeTheme") === "light";


function postaviSvetluTemu() {

    document.body.classList.remove("bg-dark", "text-white");
    document.body.classList.add("bg-light", "text-dark");


    document.querySelectorAll(".bg-dark").forEach(function (element) {

        element.classList.remove("bg-dark");
        element.classList.add("bg-light");

    });


    document.querySelectorAll(".bg-black").forEach(function (element) {

        element.classList.remove("bg-black");
        element.classList.add("bg-white");

    });


    document.querySelectorAll(".text-white").forEach(function (element) {

        element.classList.remove("text-white");
        element.classList.add("text-dark");

    });


    document.querySelectorAll(".text-light").forEach(function (element) {

        element.classList.remove("text-light");
        element.classList.add("text-dark");

    });


    document.querySelectorAll(".dropdown-menu-dark").forEach(function (element) {

        element.classList.remove("dropdown-menu-dark");
        element.classList.add("bg-white");

    });


    document.querySelectorAll(".dropdown-item").forEach(function (element) {

        element.classList.remove("text-white");
        element.classList.add("text-dark");

    });


    dugmeTeme.textContent = "🌙 Tamna tema";

}


function postaviTamnuTemu() {

    document.body.classList.remove("bg-light", "text-dark");
    document.body.classList.add("bg-dark", "text-white");


    document.querySelectorAll(".bg-light").forEach(function (element) {

        element.classList.remove("bg-light");
        element.classList.add("bg-dark");

    });


    document.querySelectorAll(".bg-white").forEach(function (element) {

        element.classList.remove("bg-white");
        element.classList.add("bg-black");

    });


    document.querySelectorAll(".text-dark").forEach(function (element) {

        element.classList.remove("text-dark");
        element.classList.add("text-white");

    });


    document.querySelectorAll(".dropdown-menu-dark").forEach(function (element) {

        element.classList.remove("bg-white");
        element.classList.add("dropdown-menu-dark");

    });


    document.querySelectorAll(".dropdown-item").forEach(function (element) {

        element.classList.remove("text-dark");
        element.classList.add("text-white");

    });


    dugmeTeme.textContent = "☀ Svetla tema";

}


/* UČITAVANJE TEME */

if (svetlaTema) {

    postaviSvetluTemu();

} else {

    postaviTamnuTemu();

}


/* PROMENA TEME */

dugmeTeme.addEventListener("click", function () {

    svetlaTema = !svetlaTema;

    localStorage.setItem(
        "uslugeTheme",
        svetlaTema ? "light" : "dark"
    );


    if (svetlaTema) {

        postaviSvetluTemu();

    } else {

        postaviTamnuTemu();

    }

});



/* ==================================================
   FONT
================================================== */

let velikiFont =
    localStorage.getItem("uslugeFont") === "large";


function postaviFont() {

    if (velikiFont) {

        document.body.style.fontSize = "1.15rem";

    } else {

        document.body.style.fontSize = "";

    }

}


/* UČITAJ FONT */

postaviFont();


/* A+ */

povecajFont.addEventListener("click", function () {

    velikiFont = true;

    localStorage.setItem(
        "uslugeFont",
        "large"
    );

    postaviFont();

});


/* A- */

smanjiFont.addEventListener("click", function () {

    velikiFont = false;

    localStorage.setItem(
        "uslugeFont",
        "normal"
    );

    postaviFont();

});


});
