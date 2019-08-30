class Minimax {
    constructor() {

    }

    nextAiMove(position) {
        let a = [];
        for (let move of position.allValidMoves(pieceColor.BLACK)) {
            a.push(move)
        }
        position.PlayMove(a[Math.floor(Math.random()*a.length)]);
    }
}
