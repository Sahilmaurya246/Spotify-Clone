console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let playPauseBtn = document.getElementById('playPauseBtn');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let SongName = document.getElementById('SongName');


let songs = [
    { songName: "Tum Hi Ho........", filePath: "songs/1.mp3" },
    { songName: "Channa Mereya.......", filePath: "songs/2.mp3" },
    { songName: "Kesariya.......", filePath: "songs/3.mp3" },
    { songName: "Shayad........", filePath: "songs/4.mp3" },
    { songName: "Hawayein........", filePath: "songs/5.mp3" },
    { songName: "Agar Tum Saath Ho........", filePath: "songs/6.mp3" },
    { songName: "Tera Yaar Hoon Main........", filePath: "songs/7.mp3" },
    { songName: "Khairiyat........", filePath: "songs2/8.mp3" },
];

// Select all song cards
let songCards = document.querySelectorAll('.FirstsongList > div');

// Utility: reset all play icons to "play"
function makeAllPlayIcons() {
    document.querySelectorAll('.play-icon i').forEach(icon => {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    });
}

// Utility: update main play/pause button
function updateMainButton(isPlaying) {
    playPauseBtn.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
}

// Handle card click (play/pause song)
songCards.forEach((card, index) => {
    const playIcon = card.querySelector('.play-icon i');

    card.addEventListener('click', () => {
        if (songIndex === index && !audioElement.paused) {
            // Pause if same song clicked again
            audioElement.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            updateMainButton(false);
            gif.style.opacity = 0;
        } else {
            // Play new song
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            SongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();

            makeAllPlayIcons();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');

            updateMainButton(true);
            gif.style.opacity = 1;
        }
    });
});

// Play/pause button logic
playPauseBtn.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateMainButton(true);
        gif.style.opacity = 1;

        // Highlight current song card
        makeAllPlayIcons();
        songCards[songIndex].querySelector('.play-icon i').classList.remove('fa-play');
        songCards[songIndex].querySelector('.play-icon i').classList.add('fa-pause');
    } else {
        audioElement.pause();
        updateMainButton(false);
        gif.style.opacity = 0;
        makeAllPlayIcons();
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek bar control
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Next button
document.getElementById('nextBtn').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    SongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateMainButton(true);
    gif.style.opacity = 1;
    makeAllPlayIcons();
    songCards[songIndex].querySelector('.play-icon i').classList.remove('fa-play');
    songCards[songIndex].querySelector('.play-icon i').classList.add('fa-pause');
});

// Previous button
document.getElementById('prevBtn').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    SongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateMainButton(true);
    gif.style.opacity = 1;
    makeAllPlayIcons();
    songCards[songIndex].querySelector('.play-icon i').classList.remove('fa-play');
    songCards[songIndex].querySelector('.play-icon i').classList.add('fa-pause');
});

// When song ends → auto move to next
audioElement.addEventListener('ended', () => {
    document.getElementById('nextBtn').click();
});
function openSingerPage(page) {
  window.open(page, '_blank'); // naye tab me open hoga
  // Agar same page me open karna hai to:
  // window.location.href = page;
}





// Same tab me open hone le liye hai ye function 


function openSingerPage(page){
    window.location.href = page;   // same tab open
}


// Same tab me open hone le liye hai ye function 


function openSingerPage(page){
    window.location.href = page;   // same tab open
}


