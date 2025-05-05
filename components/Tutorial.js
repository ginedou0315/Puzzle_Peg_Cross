function Tutorial({ onClose }) {
    try {
        return (
            <div data-name="tutorial" className="tutorial-overlay">
                <div className="tutorial-content">
                    <h2>How to Play</h2>
                    <div className="tutorial-steps">
                        <p>1. Click on a peg to select it</p>
                        <p>2. Jump over another peg to remove it</p>
                        <p>3. The jumped-over peg will be removed</p>
                        <p>4. Your goal is to remove pegs until only one remains</p>
                    </div>
                    <div className="tutorial-tips">
                        <h3>Tips:</h3>
                        <ul>
                            <li>Plan your moves carefully</li>
                            <li>Try to keep pegs close together</li>
                            <li>Watch out for isolated pegs</li>
                            <li>Think several moves ahead</li>
                            <li>The final peg can be anywhere on the board</li>
                        </ul>
                    </div>
                    <button 
                        className="close-tutorial"
                        onClick={onClose}
                    >
                        Got it!
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Tutorial component error:', error);
        reportError(error);
        return null;
    }
}
