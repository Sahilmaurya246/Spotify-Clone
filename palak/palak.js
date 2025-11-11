console.log("Welcome to Spotify");

// variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let playPauseBtn = document.getElementById('playPauseBtn');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let SongName = document.getElementById('SongName');

let songs = [
    { songName: "Kaun Tujhe – M.S. Dhoni........", filePath: "../songs/1.mp3" },
    { songName: "Teri Meri Kahaani........", filePath: "../songs/2.mp3" },
    { songName: "Jumme Ki Raat (Female)........", filePath: "../songs/3.mp3" },
    { songName: "Prem Ratan Dhan Payo........", filePath: "../songs/4.mp3" },
    { songName: "Chaahu Main Ya Naa........", filePath: "../songs/5.mp3" },
    { songName: "Tu Hi Hai Aashiqui........", filePath: "../songs/6.mp3" },
    { songName: "Dekhne Hai Tumhein.......", filePath: "../songs/7.mp3" },
    { songName: "Nainon Ne Naina........", filePath: "../songs/8.mp3" },
    { songName: "Aye Dil Bata........", filePath: "../songs/9.mp3" },
    { songName: "Kaisa Yeh Ishq Hai........", filePath: "../songs/10.mp3" },
    { songName: "Nainon Ne Baandhi........", filePath: "../songs/11.mp3" },
    { songName: "Dhokha Dhadi (Female)........", filePath: "../songs/12.mp3" },
];

// Select all song cards from BOTH lists
let songCards = document.querySelectorAll('.FirstsongList > div, .SecondsongList > div');

// reset all Play icons
function makeAllPlayIcons() {
    document.querySelectorAll('.play-icon i').forEach(icon => {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    });
}

// update play pause button
function updateMainButton(isPlaying) {
    playPauseBtn.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
}

// click on song card
songCards.forEach((card, index) => {
    const playIcon = card.querySelector('.play-icon i');

    card.addEventListener('click', () => {

        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            updateMainButton(false);
            gif.style.opacity = 0;
        } else {
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

// play pause btn
playPauseBtn.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateMainButton(true);
        gif.style.opacity = 1;

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

// progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// seek
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// next song
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

// prev song
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

// auto play next
audioElement.addEventListener('ended', () => {
    document.getElementById('nextBtn').click();
});



// Same tab me open hone le liye hai ye function 


function openSingerPage(page){
    window.location.href = page;   // same tab open
}



