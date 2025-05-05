function DifficultySelector({ onSelect, currentDifficulty }) {
    try {
        const difficulties = {
            easy: { name: 'Easy', description: 'Start with fewer pegs' },
            medium: { name: 'Medium', description: 'Standard game' },
            hard: { name: 'Hard', description: 'More pegs, more challenge' }
        };

        return (
            <div data-name="difficulty-selector" className="difficulty-selector">
                <h2>Select Difficulty</h2>
                <div className="difficulty-options">
                    {Object.entries(difficulties).map(([key, { name, description }]) => (
                        <button
                            key={key}
                            className={`difficulty-option ${currentDifficulty === key ? 'selected' : ''}`}
                            onClick={() => onSelect(key)}
                        >
                            <h3>{name}</h3>
                            <p>{description}</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('DifficultySelector component error:', error);
        reportError(error);
        return null;
    }
}
