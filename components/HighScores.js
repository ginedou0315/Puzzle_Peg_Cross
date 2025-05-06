function HighScores({ scores }) {
    try {
        return (
            <div data-name="high-scores" className="high-scores-container">
                <h2 className="text-xl text-white mb-4">Most Patient Players</h2>
                <div className="scores-list">
                    {scores.length === 0 ? (
                        <div className="text-white text-center py-4">No scores yet</div>
                    ) : (
                        scores.map((score, index) => (
                            <div key={index} className="score-item">
                                <span className="rank">{index + 1}.</span>
                                <span className="name">{score.name}</span>
                                <span className="time">{formatTime(Math.floor(score.time / 1000))}</span>
                                <span className="moves">{score.moves} moves</span>
                            </div>
                        ))
                    )}
                </div>
                <div className="text-white text-sm mt-4 text-center italic">
                    Ranked by longest completion time - true masters take their time!
                </div>
            </div>
        );
    } catch (error) {
        console.error('HighScores component error:', error);
        reportError(error);
        return null;
    }
}
