/* ==================================================
NATURAL GYM - JAVASCRIPT
================================================== */

/* ==================================================
KONTAKT FORMA
================================================== */

const kontaktForma =
    document.getElementById("kontakt-forma");

if (kontaktForma) {

    
/* ==================================================
   ELEMENTI FORME
================================================== */

const ime =
    document.getElementById("ime");

const email =
    document.getElementById("email");

const telefon =
    document.getElementById("telefon");

const poruka =
    document.getElementById("poruka");

const porukaForma =
    document.getElementById("poruka-forme");


/* ==================================================
   VALIDACIJA FORME
================================================== */

kontaktForma.addEventListener("submit", function (dogadjaj) {

    dogadjaj.preventDefault();


    let ispravniPodaci = true;


    /* ==================================================
       UKLANJANJE STARIH GREŠAKA
    ================================================== */

    ime.classList.remove("greska-polja");

    email.classList.remove("greska-polja");

    telefon.classList.remove("greska-polja");

    poruka.classList.remove("greska-polja");


    /* ==================================================
       PROVERA IMENA
    ================================================== */

    if (ime.value.trim() === "") {

        ime.classList.add("greska-polja");

        ispravniPodaci = false;

    }
    else if (ime.value.trim().length < 3) {

        ime.classList.add("greska-polja");

        ispravniPodaci = false;

    }


    /* ==================================================
       PROVERA EMAILA
    ================================================== */

    const obrazacEmaila =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        email.value.trim() === "" ||
        !obrazacEmaila.test(email.value.trim())
    ) {

        email.classList.add("greska-polja");

        ispravniPodaci = false;

    }


    /* ==================================================
       PROVERA TELEFONA
    ================================================== */

    const obrazacTelefona =
        /^[0-9+\-\s()]{8,20}$/;


    if (
        telefon.value.trim() === "" ||
        !obrazacTelefona.test(telefon.value.trim())
    ) {

        telefon.classList.add("greska-polja");

        ispravniPodaci = false;

    }


    /* ==================================================
       PROVERA PORUKE
    ================================================== */

    if (poruka.value.trim() === "") {

        poruka.classList.add("greska-polja");

        ispravniPodaci = false;

    }
    else if (poruka.value.trim().length < 10) {

        poruka.classList.add("greska-polja");

        ispravniPodaci = false;

    }


    /* ==================================================
       REZULTAT
    ================================================== */

    if (ispravniPodaci) {

        porukaForma.textContent =
            "Podaci su ispravni. Poruka je spremna za slanje.";

        porukaForma.style.color =
            "#e89b25";

        kontaktForma.reset();

    }
    else {

        porukaForma.textContent =
            "Molimo vas da pravilno popunite sva polja forme.";

        porukaForma.style.color =
            "#ff5555";

    }

});


}
