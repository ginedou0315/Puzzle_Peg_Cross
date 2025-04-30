function createInitialBoard() {
    const board = Array(81).fill().map(() => ({ filled: false, valid: false }));
    
    // Helper function to determine if a position is part of the cross
    const isInCross = (row, col) => {
        // Center section (3x3)
        if (row >= 3 && row <= 5 && col >= 3 && col <= 5) return true;
        
        // Top section (3x3)
        if (row >= 0 && row <= 2 && col >= 3 && col <= 5) return true;
        
        // Bottom section (3x3)
        if (row >= 6 && row <= 8 && col >= 3 && col <= 5) return true;
        
        // Left section (3x3)
        if (row >= 3 && row <= 5 && col >= 0 && col <= 2) return true;
        
        // Right section (3x3)
        if (row >= 3 && row <= 5 && col >= 6 && col <= 8) return true;
        
        return false;
    };
    
    // Fill the cross pattern
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const index = row * 9 + col;
            if (isInCross(row, col)) {
                board[index].valid = true;
                board[index].filled = true;
            }
        }
    }
    
    // Center hole starts empty (middle of center section)
    board[40].filled = false; // Center position (4,4)
    
    return board;
}

function getValidMoves(board, selectedPeg) {
    if (selectedPeg === null) return [];
    
    const moves = [];
    const directions = [
        { dx: 0, dy: -2 }, // up
        { dx: 2, dy: 0 },  // right
        { dx: 0, dy: 2 },  // down
        { dx: -2, dy: 0 }  // left
    ];
    
    const selectedRow = Math.floor(selectedPeg / 9);
    const selectedCol = selectedPeg % 9;
    
    directions.forEach(({ dx, dy }) => {
        const jumpRow = selectedRow + dy/2;
        const jumpCol = selectedCol + dx/2;
        const targetRow = selectedRow + dy;
        const targetCol = selectedCol + dx;
        
        if (targetRow >= 0 && targetRow < 9 && targetCol >= 0 && targetCol < 9) {
            const jumpPos = jumpRow * 9 + jumpCol;
            const targetPos = targetRow * 9 + targetCol;
            
            if (board[jumpPos].valid && board[jumpPos].filled &&
                board[targetPos].valid && !board[targetPos].filled) {
                moves.push(targetPos);
            }
        }
    });
    
    return moves;
}

function makeMove(board, from, to) {
    const newBoard = board.map(peg => ({ ...peg }));
    const fromRow = Math.floor(from / 9);
    const fromCol = from % 9;
    const toRow = Math.floor(to / 9);
    const toCol = to % 9;
    const middleRow = (fromRow + toRow) / 2;
    const middleCol = (fromCol + toCol) / 2;
    const middlePeg = Math.floor(middleRow * 9 + middleCol);
    
    newBoard[from].filled = false;
    newBoard[middlePeg].filled = false;
    newBoard[to].filled = true;
    
    return newBoard;
}

function checkWin(board) {
    const filledPegs = board.filter(peg => peg.valid && peg.filled).length;
    return filledPegs === 1;
}

function checkGameOver(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].filled && board[i].valid) {
            if (getValidMoves(board, i).length > 0) {
                return false;
            }
        }
    }
    return true;
}

function hasValidMovesForPlayer(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].filled && board[i].valid && getValidMoves(board, i).length > 0) {
            return true;
        }
    }
    return false;
}
