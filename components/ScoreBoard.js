function ScoreBoard({ currentScore, highScores, difficulty }) {
    try {
        return (
            <div data-name="score-board" className="score-board">
                <div className="current-score">
                    <h3>Current Score</h3>
                    <div className="score">{currentScore}</div>
                </div>
                <div className="high-scores">
                    <h3>High Scores ({difficulty})</h3>
                    <ul>
                        {(highScores[difficulty] || []).map((score, index) => (
                            <li key={index}>{score}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ScoreBoard component error:', error);
        reportError(error);
        return null;
    }
}
