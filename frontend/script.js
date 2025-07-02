// Navbar background change on scroll
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchResultsOverlay = document.querySelector('.search-results-overlay');
    const searchResultsGrid = document.querySelector('.search-results-grid');
    const closeSearchBtn = document.querySelector('.close-search');

    // Get all movies from the page
    function getAllMovies() {
        const movies = [];
        document.querySelectorAll('.movie-card').forEach(card => {
            const title = card.querySelector('h3').textContent;
            const img = card.querySelector('img').src;
            const year = card.querySelector('.movie-meta span:first-child').textContent;
            const duration = card.querySelector('.movie-meta span:last-child').textContent;
            movies.push({ title, img, year, duration });
        });
        return movies;
    }

    // Create movie card for search results
    function createMovieCard(movie, searchTerm) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        // Highlight matching text
        const titleHtml = movie.title.replace(
            new RegExp(searchTerm, 'gi'),
            match => `<span class="highlight">${match}</span>`
        );

        card.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${titleHtml}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.duration}</span>
                </div>
            </div>
        `;

        // Add click handler for the video player
        card.addEventListener('click', () => {
            openVideoPlayer(movie.title);
        });

        return card;
    }

    // Search movies
    function searchMovies(searchTerm) {
        const movies = getAllMovies();
        const results = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        searchResultsGrid.innerHTML = '';

        if (results.length === 0) {
            searchResultsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No movies found matching "${searchTerm}"</p>
                </div>
            `;
        } else {
            results.forEach(movie => {
                searchResultsGrid.appendChild(createMovieCard(movie, searchTerm));
            });
        }
    }

    // Debounce function to limit search frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Search input handler
    const debouncedSearch = debounce((searchTerm) => {
        if (searchTerm.length >= 2) {
            searchMovies(searchTerm);
            searchResultsOverlay.style.display = 'flex';
        } else {
            searchResultsOverlay.style.display = 'none';
        }
    }, 300);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        debouncedSearch(searchTerm);
    });

    // Close search results
    closeSearchBtn.addEventListener('click', () => {
        searchResultsOverlay.style.display = 'none';
        searchInput.value = '';
    });

    // Close search results when clicking outside
    searchResultsOverlay.addEventListener('click', (e) => {
        if (e.target === searchResultsOverlay) {
            searchResultsOverlay.style.display = 'none';
            searchInput.value = '';
        }
    });

    // Close search results with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchResultsOverlay.style.display === 'flex') {
            searchResultsOverlay.style.display = 'none';
            searchInput.value = '';
        }
    });

    // Movie card hover effect enhancement
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const info = card.querySelector('.movie-info');
            info.style.opacity = '1';
            info.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', () => {
            const info = card.querySelector('.movie-info');
            info.style.opacity = '0';
            info.style.transform = 'translateY(20px)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // User profile dropdown toggle
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', () => {
        // Add your dropdown menu logic here
        console.log('User profile clicked');
    });

    // Play button click handler
     const playBtn = document.querySelector('.play-btn');
    playBtn.addEventListener('click', () => {
        const heroSection = document.querySelector('.hero');
        const videoUrl = heroSection.getAttribute('data-video-url');
        openVideoPlayer('Oppenheimer', videoUrl); 
        
        // Pass the title and URL
    });

    // Info button click handler
    const infoBtn = document.querySelector('.info-btn');
    infoBtn.addEventListener('click', () => {
        // Add your movie info display logic here
        console.log('Info button clicked');
    });

    // Video Player Implementation
    const videoOverlay = document.querySelector('.video-player-overlay');
    const videoPlayer = document.querySelector('.video-player');
    const videoTitle = document.querySelector('.video-title');
    const closeButton = document.querySelector('.close-player');
    const playPauseBtn = document.querySelector('.play-pause');
    const rewindBtn = document.querySelector('.rewind');
    const forwardBtn = document.querySelector('.forward');
    const volumeBtn = document.querySelector('.volume');
    const volumeSlider = document.querySelector('.volume-slider');
    const progressBar = document.querySelector('.progress-bar');
    const progressFilled = document.querySelector('.progress-bar-filled');
    const timeDisplay = document.querySelector('.time-display');
    const fullscreenBtn = document.querySelector('.fullscreen');
    const loadingSpinner = document.querySelector('.loading-spinner');

    movieCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const videoUrl = card.getAttribute('data-video-url');
        openVideoPlayer(title, videoUrl);
    });
});

    function openVideoPlayer(title, videoUrl = '') {
    videoTitle.textContent = title;
    videoPlayer.src = videoUrl || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

        videoOverlay.style.display = 'flex';
        loadingSpinner.style.display = 'block';
        
        videoPlayer.addEventListener('canplay', () => {
            loadingSpinner.style.display = 'none';
        });
    }

    // Close player
    closeButton.addEventListener('click', () => {
        videoPlayer.pause();
        videoOverlay.style.display = 'none';
        videoPlayer.src = '';
    });

    // Play/Pause
    playPauseBtn.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('click', togglePlay);

    function togglePlay() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // Rewind/Forward
    rewindBtn.addEventListener('click', () => {
        videoPlayer.currentTime -= 10;
    });

    forwardBtn.addEventListener('click', () => {
        videoPlayer.currentTime += 10;
    });

    // Volume control
    let previousVolume = 1;
    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value / 100;
        videoPlayer.volume = value;
        updateVolumeIcon(value);
    });

    volumeBtn.addEventListener('click', () => {
        if (videoPlayer.volume > 0) {
            previousVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            videoPlayer.volume = previousVolume;
            volumeSlider.value = previousVolume * 100;
            updateVolumeIcon(previousVolume);
        }
    });

    function updateVolumeIcon(value) {
        if (value === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (value < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // Progress bar
    videoPlayer.addEventListener('timeupdate', () => {
        const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressFilled.style.width = `${percent}%`;
        
        // Update time display
        const currentTime = formatTime(videoPlayer.currentTime);
        const duration = formatTime(videoPlayer.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    });

    progressBar.addEventListener('click', (e) => {
        const progressTime = (e.offsetX / progressBar.offsetWidth) * videoPlayer.duration;
        videoPlayer.currentTime = progressTime;
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        const container = document.querySelector('.video-player-container');
        const videoOverlay = document.querySelector('.video-player-overlay');
        
        if (!document.fullscreenElement) {
            // Prevent default fullscreen behavior
            videoPlayer.style.pointerEvents = 'none';
            
            if (videoOverlay.requestFullscreen) {
                videoOverlay.requestFullscreen();
            } else if (videoOverlay.webkitRequestFullscreen) {
                videoOverlay.webkitRequestFullscreen();
            } else if (videoOverlay.msRequestFullscreen) {
                videoOverlay.msRequestFullscreen();
            }
            
            // Add fullscreen class to container
            container.classList.add('fullscreen-active');
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            
            // Remove fullscreen class
            container.classList.remove('fullscreen-active');
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    function handleFullscreenChange() {
        const container = document.querySelector('.video-player-container');
        const videoOverlay = document.querySelector('.video-player-overlay');
        
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // Exited fullscreen
            container.classList.remove('fullscreen-active');
            videoPlayer.style.pointerEvents = 'auto';
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }

    // Quality selector
    const qualityOptions = document.querySelectorAll('.quality-option');
    qualityOptions.forEach(option => {
        option.addEventListener('click', () => {
            const quality = option.getAttribute('data-quality');
            // In a real implementation, you would switch video sources here
            console.log(`Switching to ${quality}p`);
            document.querySelector('.quality-button').textContent = `${quality}p`;
        });
    });

    // Helper function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (videoOverlay.style.display === 'flex') {
            switch(e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'f':
                    fullscreenBtn.click();
                    break;
                case 'arrowleft':
                    videoPlayer.currentTime -= 5;
                    break;
                case 'arrowright':
                    videoPlayer.currentTime += 5;
                    break;
                case 'm':
                    volumeBtn.click();
                    break;
                case 'escape':
                    if (videoOverlay.style.display === 'flex') {
                        closeButton.click();
                    }
                    break;
            }
        }
    });

    // Horizontal scrolling for movie rows
    const movieSections = document.querySelectorAll('.movie-section');
    
    movieSections.forEach(section => {
        const movieRow = section.querySelector('.movie-row');
        const leftBtn = section.querySelector('.scroll-btn.left');
        const rightBtn = section.querySelector('.scroll-btn.right');
        const scrollAmount = 1000; // Adjust this value to control scroll distance

        // Hide left button initially
        leftBtn.style.opacity = '0';
        leftBtn.style.pointerEvents = 'none';

        // Show/hide scroll buttons based on scroll position
        movieRow.addEventListener('scroll', () => {
            leftBtn.style.opacity = movieRow.scrollLeft > 0 ? '1' : '0';
            leftBtn.style.pointerEvents = movieRow.scrollLeft > 0 ? 'auto' : 'none';
            
            rightBtn.style.opacity = 
                (movieRow.scrollWidth - movieRow.clientWidth - movieRow.scrollLeft) > 0 ? '1' : '0';
            rightBtn.style.pointerEvents = 
                (movieRow.scrollWidth - movieRow.clientWidth - movieRow.scrollLeft) > 0 ? 'auto' : 'none';
        });

        // Scroll left
        leftBtn.addEventListener('click', () => {
            movieRow.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Scroll right
        rightBtn.addEventListener('click', () => {
            movieRow.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Mouse wheel horizontal scrolling
        movieRow.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                movieRow.scrollBy({
                    left: e.deltaY,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 