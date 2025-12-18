export function setupMusicPlayer(audioElement, $musicToggleIcon) {
    let isMusicPlaying = false;
    audioElement.volume = 0.5;

    return function toggleMusic() {
        if (isMusicPlaying) {
            audioElement.pause();
            $musicToggleIcon.text("🔈");
            isMusicPlaying = false;
        } else {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    $musicToggleIcon.text("🔊");
                    isMusicPlaying = true;
                }).catch(error => {
                    console.warn("Audio playback blocked.", error);
                    $musicToggleIcon.text("🚫");
                    setTimeout(() => { $musicToggleIcon.text("🔈"); }, 1500);
                    isMusicPlaying = false;
                });
            }
        }
    };
}