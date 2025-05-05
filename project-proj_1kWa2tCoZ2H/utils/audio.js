function playMoveSound() {
    const sound = document.getElementById('moveSound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}

function playInvalidSound() {
    const sound = document.getElementById('invalidSound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}

function playWinSound() {
    const sound = document.getElementById('winSound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}
