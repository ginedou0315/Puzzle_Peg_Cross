function Board({ board, selectedPeg, validMoves, onPegClick, isHammerActive }) {
    try {
        const isCrossHole = (index) => {
            const row = Math.floor(index / 7);
            const col = index % 7;
            
            // Middle 3x3 section
            if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true;
            
            // Top arm (2 rows x 3 columns)
            if (row >= 0 && row <= 1 && col >= 2 && col <= 4) return true;
            
            // Bottom arm (2 rows x 3 columns)
            if (row >= 5 && row <= 6 && col >= 2 && col <= 4) return true;
            
            // Left arm (3 rows x 2 columns)
            if (row >= 2 && row <= 4 && col >= 0 && col <= 1) return true;
            
            // Right arm (3 rows x 2 columns)
            if (row >= 2 && row <= 4 && col >= 5 && col <= 6) return true;
            
            return false;
        };

        return (
            <div 
                data-name="game-board" 
                className="board"
            >
                {board.map((peg, index) => {
                    const isValidHole = isCrossHole(index);
                    const cursor = isHammerActive && peg.filled ? 'cursor-pointer' : '';
                    return (
                        <div key={index} className={`relative ${!isValidHole ? 'hidden-hole' : ''} ${cursor}`}>
                            <div className="board-hole absolute top-0 left-0 right-0 bottom-0"></div>
                            <Peg
                                filled={isValidHole && peg.filled}
                                selected={selectedPeg === index}
                                validMove={validMoves.includes(index)}
                                onClick={onPegClick}
                                position={index}
                                isHammerTarget={isHammerActive && peg.filled}
                            />
                        </div>
                    );
                })}
            </div>
        );
    } catch (error) {
        console.error('Board component error:', error);
        reportError(error);
        return null;
    }
}
