function Board({ board, selectedPeg, validMoves, onPegClick }) {
    try {
        const boardRef = React.useRef(null);
        const [rotation, setRotation] = React.useState({ x: 20, y: 0 });
        const [isDragging, setIsDragging] = React.useState(false);
        const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });
        const [showNoMoves, setShowNoMoves] = React.useState(false);

        React.useEffect(() => {
            const hasValidMoves = board.some((peg, index) => 
                peg.filled && getValidMoves(board, index).length > 0
            );

            if (!hasValidMoves && !showNoMoves) {
                setShowNoMoves(true);
                setTimeout(() => setShowNoMoves(false), 2000);
            }
        }, [board]);

        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartPosition({
                x: e.clientX - rotation.y,
                y: e.clientY - rotation.x
            });
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const newY = e.clientX - startPosition.x;
            const newX = e.clientY - startPosition.y;

            setRotation({
                x: Math.min(Math.max(newX, -30), 45),
                y: newY
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const getPlayerArea = (index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            
            if (row >= 3 && row <= 5 && col >= 3 && col <= 5) return 0;
            if (row >= 0 && row <= 2 && col >= 3 && col <= 5) return 1;
            if (row >= 6 && row <= 8 && col >= 3 && col <= 5) return 2;
            if (row >= 3 && row <= 5 && col >= 0 && col <= 2) return 3;
            if (row >= 3 && row <= 5 && col >= 6 && col <= 8) return 4;
            
            return -1;
        };

        const isCrossHole = (index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            
            if (row >= 3 && row <= 5 && col >= 3 && col <= 5) return true;
            if (row >= 0 && row <= 2 && col >= 3 && col <= 5) return true;
            if (row >= 6 && row <= 8 && col >= 3 && col <= 5) return true;
            if (row >= 3 && row <= 5 && col >= 0 && col <= 2) return true;
            if (row >= 3 && row <= 5 && col >= 6 && col <= 8) return true;
            
            return false;
        };

        return (
            <div 
                ref={boardRef}
                data-name="game-board" 
                className="board grid grid-cols-9 gap-2"
                style={{
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="player-label top">Player 1</div>
                <div className="player-label bottom">Player 2</div>
                <div className="player-label left">Player 3</div>
                <div className="player-label right">Player 4</div>

                {board.map((peg, index) => {
                    const isValidHole = isCrossHole(index);
                    const playerArea = getPlayerArea(index);
                    return (
                        <div key={index} className={`relative ${!isValidHole ? 'hidden-hole' : ''}`}>
                            <div className="board-hole absolute top-0 left-0"></div>
                            <Peg
                                filled={isValidHole && peg.filled}
                                selected={selectedPeg === index}
                                validMove={validMoves.includes(index)}
                                onClick={onPegClick}
                                position={index}
                                playerArea={playerArea}
                            />
                        </div>
                    );
                })}
                {showNoMoves && (
                    <div className="no-moves-notification">
                        No More Valid Moves Available!
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Board component error:', error);
        reportError(error);
        return null;
    }
}
