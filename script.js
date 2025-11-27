// Navigation entre sections
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMusicPlayer();
    initGallery();
    initParticles();
});

// ========== NAVIGATION ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const heroButtons = document.querySelectorAll('.hero-buttons a');

    // Navigation depuis le menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Navigation depuis les boutons de la page d'accueil
    heroButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Fonction pour afficher une section
    function showSection(targetId) {
        // Mise à jour des liens actifs
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks.forEach(l => {
            if (l.getAttribute('href') === `#${targetId}`) {
                l.classList.add('active');
            }
        });

        // Affichage de la section correspondante
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========== LECTEUR DE MUSIQUE ==========
function initMusicPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const playlistContainer = document.getElementById('playlist');

    // Playlist - Remplacez par vos vrais fichiers audio
    const playlist = [
        {
            title: "Du Chaos au lendemain",
            artist: "webjuws66",
            duration: "3:45",
            url: "musique/001-Du-Chaos-au-lendemain.mp3"
        },
        {
            title: "Digital Horizon",
            artist: "webjuws66",
            duration: "4:12",
            url: "musique/track2.mp3"
        },
        {
            title: "Neon Nights",
            artist: "webjuws66",
            duration: "3:28",
            url: "musique/track3.mp3"
        },
        {
            title: "AI Symphony",
            artist: "webjuws66",
            duration: "5:03",
            url: "musique/track4.mp3"
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Génération de la playlist
    function renderPlaylist() {
        playlistContainer.innerHTML = '';
        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
            item.innerHTML = `
                <div class="playlist-item-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                </div>
                <span class="playlist-item-duration">${track.duration}</span>
            `;
            item.addEventListener('click', () => loadTrack(index));
            playlistContainer.appendChild(item);
        });
    }

    // Charger une piste
    function loadTrack(index) {
        currentTrackIndex = index;
        const track = playlist[currentTrackIndex];
        
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        audioPlayer.src = track.url;
        
        // Mise à jour de la playlist visuelle
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === currentTrackIndex);
        });

        if (isPlaying) {
            audioPlayer.play().catch(err => console.log('Erreur lecture audio:', err));
        }
    }

    // Lecture/Pause
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        } else {
            audioPlayer.play().catch(err => console.log('Erreur lecture audio:', err));
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>';
        }
        isPlaying = !isPlaying;
    });

    // Piste précédente
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audioPlayer.play().catch(err => console.log('Erreur lecture audio:', err));
    });

    // Piste suivante
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audioPlayer.play().catch(err => console.log('Erreur lecture audio:', err));
    });

    // Mise à jour de la progression
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });

    // Durée de la piste
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    // Clic sur la barre de progression
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });

    // Piste suivante automatique
    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play().catch(err => console.log('Erreur lecture audio:', err));
    });

    // Formater le temps
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Animation des ondes
    audioPlayer.addEventListener('play', () => {
        document.querySelectorAll('.wave').forEach(wave => {
            wave.style.animationPlayState = 'running';
        });
    });

    audioPlayer.addEventListener('pause', () => {
        document.querySelectorAll('.wave').forEach(wave => {
            wave.style.animationPlayState = 'paused';
        });
    });

    // Initialisation
    renderPlaylist();
    loadTrack(0);
}

// ========== GALERIE D'IMAGES ==========
function initGallery() {
    const galleryContainer = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Galerie - Remplacez par vos vraies images
    const images = [
        {
            url: "images/image1.jpg",
            title: "Cybernetic Vision",
            description: "Création Midjourney - Thème cyberpunk"
        },
        {
            url: "images/image2.jpg",
            title: "Digital Dreams",
            description: "Création Midjourney - Surréalisme numérique"
        },
        {
            url: "images/image3.jpg",
            title: "Neon Future",
            description: "Création Midjourney - Architecture futuriste"
        },
        {
            url: "images/image4.jpg",
            title: "Abstract Mind",
            description: "Création Midjourney - Art abstrait"
        },
        {
            url: "images/image5.jpg",
            title: "Virtual Reality",
            description: "Création Midjourney - Mondes virtuels"
        },
        {
            url: "images/image6.jpg",
            title: "Tech Paradise",
            description: "Création Midjourney - Nature et technologie"
        }
    ];

    // Génération de la galerie
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x600/0a0a0f/00f3ff?text=Image+${index+1}'">
            <div class="gallery-item-overlay">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        galleryContainer.appendChild(item);
    });

    // Ouvrir la lightbox
    function openLightbox(index) {
        const image = images[index];
        lightboxImg.src = image.url;
        lightboxCaption.textContent = `${image.title} - ${image.description}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ========== PARTICULES D'ARRIÈRE-PLAN ==========
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Délai d'animation aléatoire
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// ========== ANIMATIONS AU SCROLL ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
