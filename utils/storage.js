function saveGameStats(stats) {
    const allStats = getGameStats();
    allStats.gamesPlayed = (allStats.gamesPlayed || 0) + 1;
    allStats.totalMoves = (allStats.totalMoves || 0) + stats.moves;
    allStats.totalTime = (allStats.totalTime || 0) + stats.time;
    allStats.wins = (allStats.wins || 0) + (stats.won ? 1 : 0);
    localStorage.setItem('pegsCrossStats', JSON.stringify(allStats));
}

function getGameStats() {
    return {
        gamesPlayed: 0,
        wins: 0,
        totalMoves: 0,
        totalTime: 0
    };
}
