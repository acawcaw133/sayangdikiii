
/* =========================
   PAGE NAVIGATION
========================= */
function nextPage() {
    // mainkan musik
    const music = document.getElementById("bgMusic");
    music.play();

    document.getElementById("page1").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");
    startGame();
}

/* =========================
   MEMORY GAME
========================= */
let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const symbols = ["💖","🌸","✨","🎀","💖","🌸","✨","🎀"];

function startGame() {
    const grid = document.getElementById("gameGrid");
    grid.innerHTML = "";
    moves = 0;
    document.getElementById("moves").innerText = moves;

    const shuffled = [...symbols].sort(() => 0.5 - Math.random());

    shuffled.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card-box");
        card.dataset.symbol = symbol;
        card.innerText = "❔";

        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.innerText = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    document.getElementById("moves").innerText = moves;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard = null;
        secondCard = null;

        if (document.querySelectorAll(".card-box").length === 
            document.querySelectorAll(".card-box").length) {

            // cek kalau semua sudah match
            const opened = [...document.querySelectorAll(".card-box")]
                .every(c => c.innerText !== "❔");

            if (opened) {
                setTimeout(() => {
                    document.getElementById("gamePage").classList.add("hidden");
                    document.getElementById("page2").classList.remove("hidden");
                }, 600);
            }
        }

    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.innerText = "❔";
            secondCard.innerText = "❔";
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 800);
    }
}

/* =========================
   REASONS SECTION
========================= */

let totalClicked = 0;
const totalReasons = 5;

function unlockReason(element) {
    if (!element.classList.contains("active")) {
        element.classList.add("active");
        totalClicked++;
    }

    if (totalClicked === totalReasons) {
        document.getElementById("letterBtn").disabled = false;
    }
}

/* =========================
   SHOW LETTER
========================= */

async function showLetter() { 
    document.getElementById("page2").classList.add("hidden");
    const page3 = document.getElementById("page3");
    page3.classList.remove("hidden");

    const letterContent = document.getElementById("letterContent");
    letterContent.innerHTML = "";

    const letterLines = [
        "I LOVE U SO MUCH, SAYANGG",
        "aku cuma mau bilang, i'm sooo lucky to have u! terimakasii yaa udah adaa dan menjadi bagian di hidup akuu...",
        "kamuu itu BAIKKK BANGETT, definisi yang bener bener baikk sebaik itu...",
        "meeting u was one of the best part of my life, i love u dd💭"
    ];

    for (let i = 0; i < letterLines.length; i++) {
        const line = letterLines[i];
        const p = document.createElement("p");

       p.style.textAlign = "justify";
        p.style.margin = "4px 0";
        p.style.fontSize = "14px";
        p.style.fontWeight = "normal";
        p.style.color = "black";

        letterContent.appendChild(p);

        // tampil per huruf
        for (let j = 0; j < line.length; j++) {
            p.textContent += line[j];
            await new Promise(res => setTimeout(res, 15));
        }
    }

    // setelah 5 detik otomatis ke page 4
    setTimeout(() => {
        document.getElementById("page3").classList.add("hidden");
        document.getElementById("page4").classList.remove("hidden");
    }, 5000);
}
function finalAnswer() {
    alert("Ok. I LOVE U DD! babai");
}
