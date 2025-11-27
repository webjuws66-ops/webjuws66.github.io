// =============================
// VARIABLES
// =============================
const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const currentTrackTitle = document.getElementById("currentTrack");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");

// On récupère la playlist déjà dans ton HTML
const tracks = Array.from(document.querySelectorAll(".track"));

let currentIndex = 0;
let isPlaying = false;


// =============================
// MET A JOUR LA TRACK
// =============================
function loadTrack(index) {
    currentIndex = index;

    const track = tracks[index];
    const src = track.dataset.src;
    const label = track.textContent.replace(/\s*\d+:\d+\s*/, "").trim();

    audio.src = src;

    currentTrackTitle.textContent = label;

    highlightTrack();
}


// =============================
// HIGHLIGHT VISUEL
// =============================
function highlightTrack() {
    tracks.forEach(t => t.classList.remove("active"));
    tracks[currentIndex].classList.add("active");
}


// =============================
// PLAY / PAUSE
// =============================
function playTrack() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    if (!audio.src) loadTrack(0);
    isPlaying ? pauseTrack() : playTrack();
});


// =============================
// PRECEDENT / SUIVANT
// =============================
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        loadTrack(currentIndex - 1);
        playTrack();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < tracks.length - 1) {
        loadTrack(currentIndex + 1);
        playTrack();
    }
});


// =============================
// CLIQUER SUR UNE PISTE
// =============================
tracks.forEach((track, index) => {
    track.addEventListener("click", () => {
        loadTrack(index);
        playTrack();
    });
});


// =============================
// BARRE DE PROGRESSION
// =============================
audio.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);

    if (audio.duration) {
        progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});


// =============================
// FORMAT TEMPS
// =============================
function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
}


// =============================
// AUTO NEXT
// =============================
audio.addEventListener("ended", () => {
    if (currentIndex < tracks.length - 1) {
        loadTrack(currentIndex + 1);
        playTrack();
    } else {
        playBtn.textContent = "▶";
        isPlaying = false;
    }
});


// =============================
// INIT
// =============================
loadTrack(0);
