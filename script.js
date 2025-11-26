// Audio Player
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const currentTrackEl = document.getElementById('currentTrack');
const playlistItems = document.querySelectorAll('.playlist-item');

let currentTrackIndex = 0;
let isPlaying = false;

// Charger une piste
function loadTrack(index) {
    const item = playlistItems[index];
    const src = item.getAttribute('data-src');
    const name = item.querySelector('.track-name').textContent;
    
    audioPlayer.src = src;
    currentTrackEl.textContent = name;
    
    // Retirer la classe active de tous les items
    playlistItems.forEach(item => item.classList.remove('active'));
    // Ajouter la classe active à l'item actuel
    item.classList.add('active');
    
    currentTrackIndex = index;
}

// Play/Pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.textContent = '▶';
    } else {
        audioPlayer.play();
        playBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

// Bouton précédent
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlistItems.length) % playlistItems.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audioPlayer.play();
});

// Bouton suivant
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audioPlayer.play();
});

// Clic sur un item de la playlist
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        loadTrack(index);
        audioPlayer.play();
        playBtn.textContent = '⏸';
        isPlaying = true;
    });
});

// Mise à jour de la barre de progression
audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percent + '%';
    
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
});

// Clic sur la barre de progression
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Piste suivante automatique à la fin
audioPlayer.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
});

// Formater le temps
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
