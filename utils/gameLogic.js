function createInitialBoard() {
    const board = Array(49).fill().map(() => ({ filled: false, valid: false }));
    
    // Create the cross pattern
    const validPositions = [];
    
    // Add middle 3x3 section
    for (let row = 2; row <= 4; row++) {
        for (let col = 2; col <= 4; col++) {
            validPositions.push([row, col]);
        }
    }
    
    // Add top arm (2 rows x 3 columns)
    for (let row = 0; row <= 1; row++) {
        for (let col = 2; col <= 4; col++) {
            validPositions.push([row, col]);
        }
    }
    
    // Add bottom arm (2 rows x 3 columns)
    for (let row = 5; row <= 6; row++) {
        for (let col = 2; col <= 4; col++) {
            validPositions.push([row, col]);
        }
    }
    
    // Add left arm (3 rows x 2 columns)
    for (let row = 2; row <= 4; row++) {
        for (let col = 0; col <= 1; col++) {
            validPositions.push([row, col]);
        }
    }
    
    // Add right arm (3 rows x 2 columns)
    for (let row = 2; row <= 4; row++) {
        for (let col = 5; col <= 6; col++) {
            validPositions.push([row, col]);
        }
    }
    
    // Mark valid positions and fill with pegs
    validPositions.forEach(([row, col]) => {
        const index = row * 7 + col;
        board[index].valid = true;
        board[index].filled = true;
    });

    // Clear only the center peg
    const centerIndex = 3 * 7 + 3; // Center of the board
    board[centerIndex].filled = false;

    return board;
}

function getValidMoves(board, selectedPeg) {
    if (selectedPeg === null) return [];
    
    const moves = [];
    const directions = [
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 },  // right
        { dx: 0, dy: 1 },  // down
        { dx: -1, dy: 0 }  // left
    ];
    
    const selectedRow = Math.floor(selectedPeg / 7);
    const selectedCol = selectedPeg % 7;
    
    directions.forEach(({ dx, dy }) => {
        // Check immediate neighbor
        const neighborRow = selectedRow + dy;
        const neighborCol = selectedCol + dx;
        
        // Check landing position (two spaces away)
        const targetRow = selectedRow + (dy * 2);
        const targetCol = selectedCol + (dx * 2);
        
        // Check if both positions are within bounds
        if (targetRow >= 0 && targetRow < 7 && targetCol >= 0 && targetCol < 7) {
            const neighborPos = neighborRow * 7 + neighborCol;
            const targetPos = targetRow * 7 + targetCol;
            
            // Valid move if: neighbor has peg and target is empty
            if (board[neighborPos].valid && board[neighborPos].filled &&
                board[targetPos].valid && !board[targetPos].filled) {
                moves.push(targetPos);
            }
        }
    });
    
    return moves;
}

function makeMove(board, from, to) {
    const newBoard = board.map(peg => ({ ...peg }));
    const fromRow = Math.floor(from / 7);
    const fromCol = from % 7;
    const toRow = Math.floor(to / 7);
    const toCol = to % 7;
    
    // Calculate middle position (jumped peg)
    const middleRow = fromRow + (toRow - fromRow) / 2;
    const middleCol = fromCol + (toCol - fromCol) / 2;
    const middlePos = middleRow * 7 + middleCol;
    
    // Remove jumped peg
    newBoard[middlePos].filled = false;
    
    // Move the peg
    newBoard[from].filled = false;
    newBoard[to].filled = true;
    
    return newBoard;
}

function checkWin(board) {
    // Count total remaining pegs
    let pegsRemaining = 0;
    board.forEach(peg => {
        if (peg.valid && peg.filled) {
            pegsRemaining++;
        }
    });
    return pegsRemaining === 1;
}

function checkGameOver(board) {
    // Check if any peg has valid moves
    for (let i = 0; i < board.length; i++) {
        if (board[i].filled && board[i].valid) {
            const moves = getValidMoves(board, i);
            if (moves.length > 0) {
                return false;
            }
        }
    }
    return true;
}
