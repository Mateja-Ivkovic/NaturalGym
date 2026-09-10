
document.addEventListener("DOMContentLoaded", async function () {

    const kontroleJezika =
        document.getElementById("kontrole-jezika");

    if (!kontroleJezika) {
        return;
    }

    let prevodi = {};

    let trenutniJezik =
        localStorage.getItem("jezik") || "sr";


    // ============================================
    // UČITAVANJE PREVODA
    // ============================================

    try {

        const odgovor =
            await fetch("prevod.json");

        if (!odgovor.ok) {
            throw new Error("prevod.json nije pronađen.");
        }

        const podaci =
            await odgovor.json();

        prevodi =
            podaci.translations || {};

    }
    catch (greska) {

        console.error(
            "Greška pri učitavanju prevoda:",
            greska
        );

        return;
    }


    // ============================================
    // DUGMAD ZA JEZIK
    // ============================================

    kontroleJezika.innerHTML = `
    <button
        type="button"
        class="dugme-jezika"
        data-language="sr">
        SR
    </button>

    <button
        type="button"
        class="dugme-jezika"
        data-language="en">
        EN
    </button>
`;

    kontroleJezika
        .querySelectorAll(".dugme-jezika")
        .forEach(function (dugme) {

            dugme.addEventListener(
                "click",
                function () {

                    trenutniJezik =
                        dugme.dataset.language;

                    localStorage.setItem(
                        "jezik",
                        trenutniJezik
                    );

                    primeniJezik(
                        trenutniJezik
                    );

                }
            );

        });


    // ============================================
    // NORMALIZACIJA TEKSTA
    // ============================================

    function normalizujTekst(tekst) {

        return tekst
            .replace(/\s+/g, " ")
            .trim();

    }


    // ============================================
    // PRONAĐI PREVOD
    // ============================================

    function pronadjiPrevod(
        tekst,
        jezik
    ) {

        const original =
            normalizujTekst(tekst);

        if (
            prevodi[jezik] &&
            Object.prototype.hasOwnProperty.call(
                prevodi[jezik],
                original
            )
        ) {

            return prevodi[jezik][original];

        }

        return null;

    }


    // ============================================
    // ČUVAMO ORIGINALNE TEKSTOVE
    // ============================================

    const originalniTekstovi =
        new WeakMap();


    function sacuvajOriginalneTekstove() {

        const pretrazivac =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );


        let cvor;


        while (
            cvor = pretrazivac.nextNode()
        ) {

            if (!cvor.parentElement) {
                continue;
            }


            const roditelj =
                cvor.parentElement;


            if (
                roditelj.tagName === "SCRIPT" ||
                roditelj.tagName === "STYLE" ||
                roditelj.closest("#kontrole-jezika")
            ) {

                continue;

            }


            const tekst =
                normalizujTekst(
                    cvor.nodeValue
                );


            if (
                tekst &&
                !originalniTekstovi.has(cvor)
            ) {

                originalniTekstovi.set(
                    cvor,
                    tekst
                );

            }

        }

    }


    // ============================================
    // PREVOD SVAKOG TEKSTUALNOG ČVORA
    // ============================================

    function prevediTekstNaStranici(
        jezik
    ) {

        const pretrazivac =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );


        let cvor;


        while (
            cvor = pretrazivac.nextNode()
        ) {

            if (!cvor.parentElement) {
                continue;
            }


            const roditelj =
                cvor.parentElement;


            // Preskoči JavaScript i CSS
            if (
                roditelj.tagName === "SCRIPT" ||
                roditelj.tagName === "STYLE"
            ) {

                continue;

            }


            // Preskoči dugmad za jezik
            if (
                roditelj.closest(
                    "#kontrole-jezika"
                )
            ) {

                continue;

            }


            const original =
                originalniTekstovi.get(cvor);


            if (!original) {
                continue;
            }


            const prevedeno =
                pronadjiPrevod(
                    original,
                    jezik
                );


            if (prevedeno !== null) {

                const pocetniRazmak =
                    cvor.nodeValue.match(
                        /^\s*/
                    )?.[0] || "";


                const zavrsniRazmak =
                    cvor.nodeValue.match(
                        /\s*$/
                    )?.[0] || "";


                cvor.nodeValue =
                    pocetniRazmak +
                    prevedeno +
                    zavrsniRazmak;

            }

        }

    }


    // ============================================
    // PREVOD PLACEHOLDER / ALT / TITLE
    // ============================================

    function prevediAtribute(
        jezik
    ) {

        const elementi =
            document.querySelectorAll(
                "[placeholder], [alt], [title], [aria-label]"
            );


        elementi.forEach(function (element) {

            const atributi = [
                "placeholder",
                "alt",
                "title",
                "aria-label"
            ];


            atributi.forEach(function (atribut) {

                if (
                    !element.hasAttribute(
                        atribut
                    )
                ) {

                    return;

                }


                const nazivPodatka =
                    "i18n" +
                    atribut
                        .charAt(0)
                        .toUpperCase() +
                    atribut.slice(1);


                let original =
                    element.dataset[nazivPodatka];


                if (!original) {

                    original =
                        element.getAttribute(
                            atribut
                        );

                    element.dataset[nazivPodatka] =
                        original;

                }


                const prevedeno =
                    pronadjiPrevod(
                        original,
                        jezik
                    );


                if (prevedeno !== null) {

                    element.setAttribute(
                        atribut,
                        prevedeno
                    );

                }

            });

        });

    }


    // ============================================
    // PREVOD
    // ============================================

    function primeniJezik(
        jezik
    ) {

        // Originalne tekstove čuvamo samo prvi put
        sacuvajOriginalneTekstove();


        // Prevod svih tekstova
        prevediTekstNaStranici(
            jezik
        );


        // Prevod placeholdera, alt itd.
        prevediAtribute(
            jezik
        );


        // HTML jezik
        document.documentElement.lang =
            jezik;


        // Aktivno dugme
        kontroleJezika
            .querySelectorAll(
                ".dugme-jezika"
            )
            .forEach(function (dugme) {

                dugme.classList.toggle(
                    "active",
                    dugme.dataset.language === jezik
                );

            });


        console.log(
            "Jezik promenjen na:",
            jezik
        );

    }


    // ============================================
    // POKRETANJE
    // ============================================

    sacuvajOriginalneTekstove();

    primeniJezik(
        trenutniJezik
    );

});

