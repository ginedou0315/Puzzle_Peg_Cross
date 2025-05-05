function Peg({ filled, selected, validMove, onClick, position }) {
    try {
        const pegClasses = `peg ${filled ? 'filled' : 'empty'} ${selected ? 'selected' : ''}`;
        
        return (
            <div 
                data-name="peg"
                className={pegClasses}
                onClick={() => onClick(position)}
                role="button"
                aria-label={`Peg at position ${position}`}
                data-valid-move={validMove}
            />
        );
    } catch (error) {
        console.error('Peg component error:', error);
        reportError(error);
        return null;
    }
}
