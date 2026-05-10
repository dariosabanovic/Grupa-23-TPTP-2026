// ============================================================
// TEMA - postavlja temu pri učitavanju stranice
// Čita iz localStorage i primjenjuje dark-theme klasu
// ============================================================
function postaviTemu() {
    const trenutnaTema = localStorage.getItem("tema");
    if (trenutnaTema === "dark") {
        document.body.classList.add("dark-theme");
    }
}
postaviTemu();

// ============================================================
// TOGGLE TAMNI/SVJETLI MOD
// Prebacuje dark-theme klasu i pamti izbor u localStorage
// ============================================================
function toggleTema() {
    document.body.classList.toggle("dark-theme");
    const trenutnaTema = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("tema", trenutnaTema);

    const dugme = document.getElementById("tema-dugme");
    if (dugme) {
        dugme.textContent = trenutnaTema === "dark" ? "☀️ Svjetli mod" : "🌙 Tamni mod";
    }
}



// FILTRIRANJE KARTICA
// Prolazi kroz sve kartice i prikazuje samo one koje
// odgovaraju odabranoj kategoriji. "sve" prikazuje sve kartice.
// Koristi data-kategorija atribut na karticama.
// ============================================================
function filtrirajKartice(kategorija) {
    const kartice = document.querySelectorAll(".kartica");
    kartice.forEach(function(kartica) {
        if (kategorija === "sve" || kartica.dataset.kategorija === kategorija) {
            kartica.style.display = "block";
        } else {
            kartica.style.display = "none";
        }
    });

    // Označi aktivno filter dugme
    document.querySelectorAll(".filter-btn").forEach(function(btn) {
        btn.classList.remove("aktivan");
    });
    const aktivnoDugme = document.querySelector(`[data-filter="${kategorija}"]`);
    if (aktivnoDugme) aktivnoDugme.classList.add("aktivan");
}



// ============================================================
// REGEX FUNKCIJE ZA VALIDACIJU
// Koriste se u validirajFormu() ispod
// ============================================================

// Regex za email: traži format nesto@nesto.nesto
// ^ = početak stringa
// [^\s@]+ = jedan ili više znakova koji nisu razmak ili @
// @ = literal obavezan znak
// \. = tačka (escaped jer tačka u regexu znači bilo koji znak)
// [^\s@]+ = domen ekstenzija (npr. com, ba, org)
// $ = kraj stringa
// Uz pomoć Claude-a sam razumio svaki dio ovog patterna
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex za telefon: dozvoljava brojeve, crtice i razmake
// ^ = početak stringa
// [0-9\s\-] = cifra, razmak ili crtica
// {9,15} = minimalno 9, maksimalno 15 znakova ukupno
// $ = kraj stringa
// Uz pomoć Claude-a sam razumio da \- mora biti escaped u character classu
const regexTelefon = /^[0-9\s\-]{9,15}$/;

function provjeriEmail(email) {
    return regexEmail.test(email);
}

function provjeriTelefon(telefon) {
    return regexTelefon.test(telefon);
}

// ============================================================
// VALIDACIJA FORME
// Provjerava svako polje pri kliku na "Pošalji"
// Prikazuje grešku pored svakog neispravnog polja
// Pri uspjehu prikazuje personaliziranu poruku sa imenom
// ============================================================

function prikaziGresku(idGreske, poruka) {
    const el = document.getElementById(idGreske);
    if (el) {
        el.textContent = poruka;
        el.style.color = "red";
    }
}

function obrisiGresku(idGreske) {
    const el = document.getElementById(idGreske);
    if (el) el.textContent = "";
}

function validirajFormu() {
    let ispravno = true;

    // Provjera: Ime
    const ime = document.getElementById("ime").value.trim();
    if (ime === "") {
        prikaziGresku("greska-ime", "Ime je obavezno.");
        ispravno = false;
    } else {
        obrisiGresku("greska-ime");
    }

    // Provjera: Prezime
    const prezime = document.getElementById("prezime").value.trim();
    if (prezime === "") {
        prikaziGresku("greska-prezime", "Prezime je obavezno.");
        ispravno = false;
    } else {
        obrisiGresku("greska-prezime");
    }

    // Provjera: Email
    const email = document.getElementById("email").value.trim();
    if (!provjeriEmail(email)) {
        prikaziGresku("greska-email", "Unesite ispravan email (npr. ime@domen.com).");
        ispravno = false;
    } else {
        obrisiGresku("greska-email");
    }

    // Provjera: Telefon
    const telefon = document.getElementById("telefon").value.trim();
    if (!provjeriTelefon(telefon)) {
        prikaziGresku("greska-telefon", "Telefon: samo brojevi, crtice i razmaci (9-15 znakova).");
        ispravno = false;
    } else {
        obrisiGresku("greska-telefon");
    }

    // Provjera: Dropdown tema upita
    const temaUpita = document.getElementById("tema-upita").value;
    if (temaUpita === "" || temaUpita === "odaberi") {
        prikaziGresku("greska-tema", "Odaberite temu upita.");
        ispravno = false;
    } else {
        obrisiGresku("greska-tema");
    }

    // Provjera: Textarea poruka (min. 10 znakova)
    const poruka = document.getElementById("poruka").value.trim();
    if (poruka.length < 10) {
        prikaziGresku("greska-poruka", "Poruka mora imati najmanje 10 znakova.");
        ispravno = false;
    } else {
        obrisiGresku("greska-poruka");
    }

    // Sve ispravno — prikaži uspješnu poruku sa imenom
    if (ispravno) {
        const uspjesna = document.getElementById("uspjesna-poruka");
        if (uspjesna) {
            uspjesna.textContent = `Hvala, ${ime}! Vaša poruka je uspješno poslana.`;
            uspjesna.style.color = "green";
            uspjesna.style.fontWeight = "bold";
        }
    }

    return ispravno;
}

function resetujFormu() {
    // Briše sva polja forme
    const forma = document.getElementById("kontakt-forma");
    if (forma) forma.reset();

    // Briše sve poruke o greškama
    document.querySelectorAll(".greska").forEach(function(g) {
        g.textContent = "";
    });

    // Briše uspješnu poruku
    const uspjesna = document.getElementById("uspjesna-poruka");
    if (uspjesna) uspjesna.textContent = "";
}




// ============================================================================================================

// LEBRON JAMES NBA TAJMER
// Računa koliko dugo LeBron igra u NBA ligi
// Ažurira se svakih 60 sekundi automatski
// ============================================================================================================
function azurirajTajmer() {
    const pocetakKarijere = new Date("October 29, 2003").getTime();
    const sada = new Date().getTime();
    const razlika = sada - pocetakKarijere;

    // Math.floor zaokružuje prema dolje na cijeli broj
    const godine = Math.floor(razlika / (1000 * 60 * 60 * 24 * 365.25));
    const dani = Math.floor((razlika % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const sati = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));

    const tajmerElement = document.getElementById("lebron-tajmer");
    if (tajmerElement) {
        tajmerElement.innerHTML =
            `LeBron James je u NBA ligi već: 
            <strong>${godine} godina, ${dani} dana, ${sati} sati i ${minute} minuta!</strong>`;
    }
}
azurirajTajmer();
setInterval(azurirajTajmer, 1000 * 60); // ažurira svakih minut



// ============================================================
// NBA FUN FACT
// Prikazuje nasumičnu zanimljivost o NBA ligi
// Poziva se odmah pri učitavanju, a na klik dugmeta
// listener je dodan u DOMContentLoaded bloku ispod
// ============================================================
function prikaziFunFact() {
    const facts = [
        "LeBron James je u NBA ligi proveo više od 50% svog života!",
        "Kada je LeBron počeo karijeru 2003., Facebook još nije ni postojao.",
        "LeBron je igrao protiv očeva i sinova u NBA ligi (Gary Payton i Gary Payton II).",
        "Wilt Chamberlain je jedini igrač koji je postigao 100 poena na jednoj utakmici.",
        "Michael Jordan je imao prosječno 30.1 poen po utakmici tokom karijere — najviše ikad.",
        "Bill Russell je osvojio 11 NBA titula u 13 sezona — rekord koji vjerovatno nikad neće biti srušen.",
        "NBA liga je osnovana 1946. godine, što znači da postoji skoro 80 godina!"
    ];

    const factElement = document.getElementById("nba-fact");
    if (factElement) {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        factElement.textContent = randomFact;
    }
}
prikaziFunFact();


// Smooth scroll za sve anchor linkove (#nesto)
    // Npr. "Skoči na vrh" link na sadrzaj.html
    // ----------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const cilj = document.querySelector(this.getAttribute("href"));
            if (cilj) {
                cilj.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

// ============================================================
// EVENT LISTENERI
// ============================================================

// Tema dugme
const temaDugme = document.getElementById("tema-dugme");

if (temaDugme) {
    temaDugme.addEventListener("click", toggleTema);
}

// Filter dugmad
const filterDugmad = document.querySelectorAll(".filter-btn");

filterDugmad.forEach(function(dugme) {
    dugme.addEventListener("click", function() {
        filtrirajKartice(this.dataset.filter);
    });
});

// Fun fact dugme
const funFactDugme = document.getElementById("fun-fact-dugme");

if (funFactDugme) {
    funFactDugme.addEventListener("click", prikaziFunFact);
}

// Posalji dugme — poziva validaciju forme
const posaljiDugme = document.getElementById("posalji-dugme");
if (posaljiDugme) {
    posaljiDugme.addEventListener("click", function(e) {
        e.preventDefault();
        validirajFormu();
    });
}

// Reset dugme — brise formu i poruke o greskama
const resetDugme = document.getElementById("reset-dugme");
if (resetDugme) {
    resetDugme.addEventListener("click", resetujFormu);
}

