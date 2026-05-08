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