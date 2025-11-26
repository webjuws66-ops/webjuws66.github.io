// ==== ELEMENTS DU LECTEUR ====
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');

const trackTitleEl = document.getElementById('currentTrack');

// Playlist
const playlistItems = Array.from(document.querySelectorAll('.playlist-item'));

let currentIndex = 0;
let isPlaying = false;

// ==== FONCTIONS UTILITAIRES ====
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function loadTrack(index) {
  const item = playlistItems[index];
  if (!item) return;

  const src = item.dataset.src;
  const name = item.querySelector('.track-name')?.textContent || 'Titre';

  audio.src = src;
  trackTitleEl.textContent = name;

  // Marquage visuel de la piste active
  playlistItems.forEach(el => el.classList.remove('active-track'));
  item.classList.add('active-track');
}

function playTrack() {
  if (!audio.src) {
    loadTrack(currentIndex);
  }
  audio.play().then(() => {
    isPlaying = true;
    playBtn.textContent = '⏸';
  }).catch(err => {
    console.error('Erreur lecture audio :', err);
  });
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
}

function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playNext() {
  currentIndex = (currentIndex + 1) % playlistItems.length;
  loadTrack(currentIndex);
  playTrack();
}

function playPrev() {
  currentIndex = (currentIndex - 1 + playlistItems.length) % playlistItems.length;
  loadTrack(currentIndex);
  playTrack();
}

// ==== EVENEMENTS ====
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

// Clique sur une piste dans la playlist
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    loadTrack(currentIndex);
    playTrack();
  });
});

// Mise à jour du temps + barre de progression
audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);

  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
  }
});

// Seek : clic dans la barre de progression
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  audio.currentTime = percent * audio.duration;
});

// Quand la piste est finie → passe à la suivante
audio.addEventListener('ended', playNext);

// Charger la première piste au démarrage
if (playlistItems.length > 0) {
  loadTrack(0);
}


// Raccourcis clavier
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        playBtn.click();
    }
    if (e.code === 'ArrowRight') {
        nextBtn.click();
    }
    if (e.code === 'ArrowLeft') {
        prevBtn.click();
    }
});

// Navigation smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments de galerie
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(item);
});

// ============================================
// 🆕 FONCTION D'IMPORT D'IMAGES - NOUVEAU CODE
// ============================================

const fileUpload = document.getElementById('file-upload');
const galleryGrid = document.querySelector('.gallery-grid');

// Compteur pour les nouvelles créations
let creationCounter = 7; // On commence à 7 car il y a déjà 6 créations

fileUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            // Créer un nouvel élément de galerie
            const newItem = document.createElement('article');
            newItem.className = 'gallery-item';
            
            // Créer le contenu HTML
            newItem.innerHTML = `
                <img src="${event.target.result}" alt="Création ${creationCounter}">
                <h3>Création ${creationCounter}</h3>
                <p>Titre de l'œuvre ${creationCounter}</p>
            `;
            
            // Ajouter l'animation d'apparition
            newItem.style.opacity = '0';
            newItem.style.transform = 'translateY(20px)';
            newItem.style.transition = 'opacity 0.5s, transform 0.5s';
            
            // Ajouter à la galerie
            galleryGrid.appendChild(newItem);
            
            // Animation d'apparition après un court délai
            setTimeout(() => {
                newItem.style.opacity = '1';
                newItem.style.transform = 'translateY(0)';
            }, 100);
            
            // Observer le nouvel élément
            observer.observe(newItem);
            
            // Incrémenter le compteur
            creationCounter++;
            
            // Message de confirmation dans la console
            console.log(`✅ Image ajoutée : Création ${creationCounter - 1}`);
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('⚠️ Veuillez sélectionner un fichier image valide (JPG, PNG, etc.)');
    }
    
    // Réinitialiser l'input pour permettre d'ajouter la même image plusieurs fois
    e.target.value = '';
});

// ============================================
// FIN DU NOUVEAU CODE
// ============================================

// Charger la première piste au chargement
window.addEventListener('load', () => {
    if (playlistItems.length > 0) {
        loadTrack(0);
    }
});

console.log('🎵 WEBJUWS66 Site loaded successfully!');
console.log('⌨️ Raccourcis: Espace = Play/Pause, ← → = Piste précédente/suivante');
console.log('📸 Fonction d\'import d\'images activée !');
