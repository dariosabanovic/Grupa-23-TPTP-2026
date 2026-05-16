function postaviTemu() {
    const trenutnaTema = localStorage.getItem("tema");

    if (trenutnaTema === "light") {
        document.body.classList.add("light-theme");
    }
}

postaviTemu();

function toggleTema() {
    document.body.classList.toggle("light-theme");

    const trenutnaTema = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("tema", trenutnaTema);

    const dugme = document.getElementById("tema-dugme");

    if (dugme) {
        dugme.textContent = trenutnaTema === "light"
            ? "🌙 Tamni mod"
            : "☀️ Svijetli mod";
    }
}
function otvoriSekciju(id) {

    // sakrij sve sekcije
    const sekcije = document.querySelectorAll(".sekcija");

    sekcije.forEach(function(sekcija) {
        sekcija.classList.remove("aktivna-sekcija");
    });

    // kartice
    const cards = document.querySelector(".cards");

    // ako je kliknuto "legende"
    // prikaži slike/kartice
    if (id === "legende") {

        if (cards) {
            cards.style.display = "grid";
        }

    } else {

        // za ostale sakrij kartice
        if (cards) {
            cards.style.display = "none";
        }
    }

    // prikaži sekciju
    const odabranaSekcija = document.getElementById(id);

    if (odabranaSekcija) {

        odabranaSekcija.classList.add("aktivna-sekcija");

        odabranaSekcija.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
const forma = document.getElementById("kontaktForma");

if (forma) {
    forma.addEventListener("submit", function(e) {
        e.preventDefault();

        let ispravno = true;

        let ime = document.getElementById("ime").value.trim();
        let prezime = document.getElementById("prezime").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefon = document.getElementById("telefon").value.trim();
        let tema = document.getElementById("tema").value;
        let poruka = document.getElementById("poruka").value.trim();

        let samoSlova = /^[A-Za-zČĆŽŠĐčćžšđ\s]+$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let telefonRegex = /^[0-9]+$/;

        let zabranjeneRijeci = ["glup", "budala", "psovka", "asdf", "qwerty"];

        function greska(id, tekst) {
            document.getElementById(id).textContent = tekst;
        }

        greska("imeError", "");
        greska("prezimeError", "");
        greska("emailError", "");
        greska("telefonError", "");
        greska("temaError", "");
        greska("porukaError", "");
        document.getElementById("success").textContent = "";

        function sadrziZabranjeno(tekst) {
            return zabranjeneRijeci.some(function(rijec) {
                return tekst.toLowerCase().includes(rijec);
            });
        }

        if (ime === "" || !samoSlova.test(ime) || sadrziZabranjeno(ime)) {
            greska("imeError", "Unesite ispravno ime.");
            ispravno = false;
        }

        if (prezime === "" || !samoSlova.test(prezime) || sadrziZabranjeno(prezime)) {
            greska("prezimeError", "Unesite ispravno prezime.");
            ispravno = false;
        }

        if (email === "" || !emailRegex.test(email)) {
            greska("emailError", "Unesite ispravan email.");
            ispravno = false;
        }

        if (telefon === "" || !telefonRegex.test(telefon)) {
            greska("telefonError", "Telefon smije sadržavati samo brojeve.");
            ispravno = false;
        }

        if (tema === "") {
            greska("temaError", "Odaberite temu upita.");
            ispravno = false;
        }

        if (poruka === "" || sadrziZabranjeno(poruka)) {
            greska("porukaError", "Poruka nije ispravna.");
            ispravno = false;
        }

        if (ispravno) {
            document.getElementById("success").textContent = "Upit je uspješno poslan.";
            forma.reset();
        }
    });
}
function toggleInfo() {
    const panel = document.getElementById("infoPanel");
    panel.classList.toggle("active");
}
let posjete = localStorage.getItem("brojPosjeta");

if(posjete === null){
    posjete = 0;
}

posjete++;

localStorage.setItem("brojPosjeta", posjete);

document.getElementById("brojPosjeta").textContent = posjete;