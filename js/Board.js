class Board {
    constructor() {
        this.position = new Position();
        this.position.init();
        this.pieceSelected = false;
        this.selectedPiece = null;
        this.AiPlayer = new Minimax();
    }

    Draw() {
        this.position.Draw();
    }

    Update(ClickedAt) {
        let piece = this.position.PieceAt(ClickedAt);
        if (this.pieceSelected) {
            if (!this.position.PlayMove({start: this.selectedPiece.position, end: ClickedAt})) {
                this.pieceSelected = false;
                this.selectedPiece.deSelect();
                return;
            }
            this.pieceSelected = false;
            this.selectedPiece.deSelect();
            this.AiPlayer.nextAiMove(this.position);
            return;
        }

        if (!this.pieceSelected) {
            if (this.position.PieceAtBool(ClickedAt) && piece.color === pieceColor.WHITE) {
                this.selectedPiece = piece;
                piece.select();
                this.pieceSelected = true;
                return;
            }
        }

    }
}