function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getHighScores() {
    const scores = localStorage.getItem('pegsCrossHighScores');
    return scores ? JSON.parse(scores) : [];
}

function saveHighScore(playerName, time, moves) {
    const scores = getHighScores();
    scores.push({
        name: playerName,
        time: time,
        moves: moves,
        avgMoveTime: time / moves
    });
    
    // Sort by time (ascending) and keep top 10
    const updatedScores = scores
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
    
    localStorage.setItem('pegsCrossHighScores', JSON.stringify(updatedScores));
    return updatedScores;
}
