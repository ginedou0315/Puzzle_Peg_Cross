function Timer({ isRunning, elapsedTime }) {
    try {
        return (
            <div data-name="game-timer" className="timer text-white text-xl">
                <i className="fas fa-clock mr-2"></i>
                <span className="time-display">
                    {formatTime(Math.floor(elapsedTime / 1000))}
                </span>
            </div>
        );
    } catch (error) {
        console.error('Timer component error:', error);
        reportError(error);
        return null;
    }
}
