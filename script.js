// ==========================
// CONFIGURATION DES MORCEAUX
// ==========================
const tracks = [
    { title: "Du Chaos au lendemain", file: "audio/track1.mp3", duration: "3:30" },
    { title: "Ce monde entre leurs mains", file: "audio/track2.mp3", duration: "3:30" },
    { title: "Écoute", file: "audio/track3.mp3", duration: "3:30" },
    { title: "Le monde qu'on veut encore", file: "audio/track4.mp3", duration: "3:30" },
    { title: "Les enfants d'aujourd'hui", file: "audio/track5.mp3", duration: "3:30" },
    { title: "Un avenir debout", file: "audio/track6.mp3", duration: "3:30" }
];

let currentTrack = 0;
let isPlaying = false;

const audio = new Audio(tracks[currentTrack].file);

// Elements
const titleEl = document.getElementById("current-title");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const playlistEl = document.getElementById("playlist");

// ==========================
// CONSTRUCTION DE LA PLAYLIST
// ==========================
tracks.forEach((track, index) => {
    const div = document.createElement("div");
    div.classList.add("track");
    div.dataset.index = index;

    div.innerHTML = `
        <span>${String(index + 1).padStart(2, "0")}</span>
        <span>${track.title}</span>
        <span>${track.duration}</span>
    `;

    playlistEl.appendChild(div);
});

// ==========================
// METTRE À JOUR L'AFFICHAGE
// ==========================
function updateTrack() {
    audio.src = tracks[currentTrack].file;
    titleEl.textContent = tracks[currentTrack].title;
    totalTimeEl.textContent = tracks[currentTrack].duration;

    highlightTrack();
}

function highlightTrack() {
    document.querySelectorAll(".track").forEach(el => el.classList.remove("active"));
    playlistEl.children[currentTrack].classList.add("active");
}

// ==========================
// LECTURE / PAUSE
// ==========================
function playTrack() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = "⏸️";
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = "▶️";
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseTrack() : playTrack();
});

// ==========================
// BOUTONS SUIVANT / PRECEDENT
// ==========================
nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    updateTrack();
    playTrack();
});

prevBtn.addEventListener("click", () => {
    currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    updateTrack();
    playTrack();
});

// ==========================
// PROGRESSION DU MORCEAU
// ==========================
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + "%";

    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// ==========================
// CLIC SUR UN MORCEAU
// ==========================
playlistEl.addEventListener("click", (event) => {
    const trackDiv = event.target.closest(".track");
    if (!trackDiv) return;

    currentTrack = parseInt(trackDiv.dataset.index);
    updateTrack();
    playTrack();
});

// ==========================
// FONCTION FORMATAGE TEMPS
// ==========================
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
}

// ==========================
// LECTURE AUTO MORCEAU SUIVANT
// ==========================
audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    updateTrack();
    playTrack();
});

// Init affichage
updateTrack();
