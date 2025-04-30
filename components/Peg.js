function Peg({ filled, selected, validMove, onClick, position, playerArea }) {
    try {
        const getPlayerColor = (area) => {
            switch(area) {
                case 1: return 'player-1'; // Top
                case 2: return 'player-2'; // Bottom
                case 3: return 'player-3'; // Left
                case 4: return 'player-4'; // Right
                case 0: return 'center'; // Center
                default: return '';
            }
        };

        const pegClasses = `peg ${filled ? 'filled' : 'empty'} ${selected ? 'selected' : ''} 
            ${validMove ? 'valid-move' : ''} ${getPlayerColor(playerArea)}`;
        
        return (
            <div 
                data-name="peg"
                className={pegClasses}
                onClick={() => onClick(position)}
                role="button"
                aria-label={`Peg at position ${position}`}
            />
        );
    } catch (error) {
        console.error('Peg component error:', error);
        reportError(error);
        return null;
    }
}
