const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");
const songs = [
    {
        title: "Lofi beat 1",
        artist: "ABC",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Lofi beat 2",
        artist: "ABC",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Lofi beat 3",
        artist: "ABC",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];
let currentSong = 0;
function loadSong(index){

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    cover.src = songs[index].cover;

    audio.src = songs[index].src;

}
function formatTime(seconds){

    let minutes = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);

    if(secs < 10){
        secs = "0" + secs;
    }

    return minutes + ":" + secs;

}
loadSong(currentSong);
renderPlaylist();
let isPlaying = false;

playBtn.addEventListener("click", function () {

    if (isPlaying) {
        audio.pause();
        playBtn.textContent = "▶";
        isPlaying = false;
    } else {
        audio.play();
        playBtn.textContent = "⏸";
        isPlaying = true;
    }

});
nextBtn.addEventListener("click", function(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";

    isPlaying = true;
    renderPlaylist(); 

});
prevBtn.addEventListener("click", function(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";

    isPlaying = true;
    renderPlaylist();

});
audio.addEventListener("timeupdate", function(){

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent;
    currentTime.textContent = formatTime(audio.currentTime);

});
volume.addEventListener("input", function () {

    audio.volume = volume.value;

});
progress.addEventListener("input", function(){

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});
audio.addEventListener("loadedmetadata", function () {
    duration.textContent = formatTime(audio.duration);
});
audio.addEventListener("ended", function(){
    nextBtn.click();
});
function renderPlaylist(){
    playlist.innerHTML = "";

    songs.forEach(function(song, index){
        const li = document.createElement("li");
        li.textContent = song.title + " - " + song.artist;

        if(index === currentSong){
            li.classList.add("active");
        }

        li.addEventListener("click", function(){
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            playBtn.textContent = "⏸";
            isPlaying = true;
            renderPlaylist();
        });

        playlist.appendChild(li);
    });
}