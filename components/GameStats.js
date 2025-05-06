function GameStats({ stats }) {
  try {
    return (
      <div data-name="game-stats" className="game-stats">
        <h2>Game Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <i className="fas fa-gamepad"></i>
            <span>Games Played</span>
            <div>{stats.gamesPlayed || 0}</div>
          </div>
          <div className="stat-item">
            <i className="fas fa-trophy"></i>
            <span>Games Won</span>
            <div>{stats.wins || 0}</div>
          </div>
          <div className="stat-item">
            <i className="fas fa-arrows-alt"></i>
            <span>Average Moves</span>
            <div>
              {stats.gamesPlayed
                ? Math.round(stats.totalMoves / stats.gamesPlayed)
                : 0}
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-clock"></i>
            <span>Average Time</span>
            <div>
              {stats.gamesPlayed
                ? formatTime(
                    Math.round(stats.totalTime / stats.gamesPlayed / 1000)
                  )
                : "0:00"}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("GameStats component error:", error);
    reportError(error);
    return null;
  }
}
