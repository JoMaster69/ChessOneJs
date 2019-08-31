class Position {
    constructor() {
        this.blackPieces = [];
        this.whitePieces = [];
    }

    * allPieces() {
        for (let piece of this.blackPieces) {
            yield piece;
        }

        for (let piece of this.whitePieces) {
            yield piece;
        }
    }

    RemovePiece(piece) {
        if (piece.color == pieceColor.WHITE) {
            for (let i = 0; i < this.whitePieces.length; i++) {
                if (this.whitePieces[i].position == piece.position) {
                    this.whitePieces.splice(i, 1);
                    return;
                }
            }
        }

        if (piece.color == pieceColor.BLACK) {
            for (let i = 0; i < this.blackPieces.length; i++) {
                if (this.blackPieces[i].position == piece.position) {
                    this.blackPieces.splice(i, 1);
                    return;
                }
            }
        }
    }

    addQueen(pos) {
        if (pos.y == 0) {
            this.whitePieces.push(new Queen('white', pos));
        }
        if (pos.y == 7) {
            this.blackPieces.push(new Queen('black', pos));
        }
    }

    init() {
        this.blackPieces.push(new King('black', new Point(4, 0)));
        this.blackPieces.push(new Queen('black', new Point(3, 0)));
        this.blackPieces.push(new Knight('black', new Point(6, 0)));
        this.blackPieces.push(new Knight('black', new Point(1, 0)));
        this.blackPieces.push(new Rook('black', new Point(0, 0)));
        this.blackPieces.push(new Rook('black', new Point(7, 0)));
        this.blackPieces.push(new Bishop('black', new Point(5, 0)));
        this.blackPieces.push(new Bishop('black', new Point(2, 0)));
        this.blackPieces.push(new Pawn('black', new Point(0, 1)));
        this.blackPieces.push(new Pawn('black', new Point(1, 1)));
        this.blackPieces.push(new Pawn('black', new Point(2, 1)));
        this.blackPieces.push(new Pawn('black', new Point(3, 1)));
        this.blackPieces.push(new Pawn('black', new Point(4, 1)));
        this.blackPieces.push(new Pawn('black', new Point(5, 1)));
        this.blackPieces.push(new Pawn('black', new Point(6, 1)));
        this.blackPieces.push(new Pawn('black', new Point(7, 1)));

        this.whitePieces.push(new King('white', new Point(4, 7)));
        this.whitePieces.push(new Queen('white', new Point(3, 7)));
        this.whitePieces.push(new Knight('white', new Point(6, 7)));
        this.whitePieces.push(new Knight('white', new Point(1, 7)));
        this.whitePieces.push(new Rook('white', new Point(0, 7)));
        this.whitePieces.push(new Rook('white', new Point(7, 7)));
        this.whitePieces.push(new Bishop('white', new Point(5, 7)));
        this.whitePieces.push(new Bishop('white', new Point(2, 7)));
        this.whitePieces.push(new Pawn('white', new Point(0, 6)));
        this.whitePieces.push(new Pawn('white', new Point(1, 6)));
        this.whitePieces.push(new Pawn('white', new Point(2, 6)));
        this.whitePieces.push(new Pawn('white', new Point(3, 6)));
        this.whitePieces.push(new Pawn('white', new Point(4, 6)));
        this.whitePieces.push(new Pawn('white', new Point(5, 6)));
        this.whitePieces.push(new Pawn('white', new Point(6, 6)));
        this.whitePieces.push(new Pawn('white', new Point(7, 6)));
    }

    PlayMove(move) {
        let piece = this.PieceAt(move.start);
        if (piece.isValidMove(move.start, move.end, this)) {
            if (this.PieceAtBool(move.end)) {
                this.RemovePiece(this.PieceAt(move.end));
            }
            if (piece instanceof Pawn && (move.end.y == 7 || move.end.y == 0)) {
                this.RemovePiece(this.PieceAt(move.start));
                this.addQueen(move.end);
                return true;
            }
            piece.updatePosition(move.end);
            this.evaluation();
            return true;
        } else {
            return false;
        }
    }


    PieceAt(point) {
        for (let piece of this.allPieces()) {
            if (piece.position.x == point.x && piece.position.y == point.y) {
                return piece;
            }
        }
    }

    PieceAtBool(point) {
        for (let piece of this.allPieces()) {
            if (piece.position.x === point.x && piece.position.y === point.y) {
                return true;
            }
        }
        return false;
    }

    PieceAtBoolColor(point, color) {
        if (color == pieceColor.WHITE) {
            for (let piece of this.blackPieces) {
                if (piece.position.x === point.x && piece.position.y === point.y) {
                    return true;
                }
            }
        }
        if (color == pieceColor.BLACK) {
            for (let piece of this.whitePieces) {
                if (piece.position.x === point.x && piece.position.y === point.y) {
                    return true;
                }
            }
        }
        return false;
    }

    PieceAtBoolColor2(point, color) {
        if (color == pieceColor.WHITE) {
            for (let piece of this.whitePieces) {
                if (piece.position.x === point.x && piece.position.y === point.y) {
                    return true;
                }
            }
        }
        if (color == pieceColor.BLACK) {
            for (let piece of this.blackPieces) {
                if (piece.position.x === point.x && piece.position.y === point.y) {
                    return true;
                }
            }
        }
        return false;
    }

    blockingPiece(start, end, color) {
        if (color === pieceColor.WHITE) {
            for (let piece of this.whitePieces) {
                if (end.x === piece.position.x && end.y === piece.position.y) {
                    return true;
                }
            }
        }
        if (color === pieceColor.BLACK) {
            for (let piece of this.blackPieces) {
                if (end.x === piece.position.x && end.y === piece.position.y) {
                    return true;
                }
            }
        }

        // horizontal
        if (start.y == end.y && start.x != end.x) {
            let horizontalDiff = Math.abs(start.x-end.x);
            if (start.x < end.x) {
                for (let i = 1; i < horizontalDiff; i++) {
                    if (this.PieceAtBool(new Point(start.x+i, start.y))) { return true; }
                }
            }
            if (start.x > end.x) {
                for (let i = 1; i < horizontalDiff; i++) {
                    if (this.PieceAtBool(new Point(start.x-i, start.y))) { return true; }
                }
            }
        }

        // vertical
        if (start.y != end.y && start.x == end.x) {
            let verticalDiff = Math.abs(start.y-end.y);
            if (start.y < end.y) {
                for (let i = 1; i < verticalDiff; i++) {
                    if (this.PieceAtBool(new Point(start.x, start.y+i))) { return true; }
                }
            }
            if (start.y > end.y) {
                for (let i = 1; i < verticalDiff; i++) {
                    if (this.PieceAtBool(new Point(start.x, start.y-i))) { return true; }
                }
            }
        }

        //diagonal
        let diff = new Point(start.x-end.x, start.y-end.y);
        if (Math.abs(diff.x) == Math.abs(diff.y)) {
            // topLeft
            if (diff.x > 0 && diff.y > 0) {
                for (let i = 1; i < diff.x; i++) {
                    if (this.PieceAtBool(new Point(start.x-i, start.y-i))) { return true; }
                }
            }
            // topRight
            if (diff.x < 0 && diff.y > 0) {
                for (let i = 1; i < Math.abs(diff.x); i++) {
                    if (this.PieceAtBool(new Point(start.x+i, start.y-i))) { return true; }
                }
            }
            // bottomLeft
            if (diff.x > 0 && diff.y < 0) {
                for (let i = 1; i < Math.abs(diff.x); i++) {
                    if (this.PieceAtBool(new Point(start.x-i, start.y+i))) { return true; }
                }
            }
            //bottomRight
            if (diff.x < 0 && diff.y < 0) {
                for (let i = 1; i < Math.abs(diff.x); i++) {
                    if (this.PieceAtBool(new Point(start.x+i, start.y+i))) { return true; }
                }
            }

        }
    }

    * allValidMoves(color) {
        if (color === pieceColor.BLACK) {
            for (let piece of this.blackPieces) {
                for (let move of piece.allValidMoves(this, color)) {
                    yield move;
                }
            }
        }
    }

    Draw() {
        for (let piece of this.allPieces()) {
            piece.Draw();
        }
    }

    evaluation() {
        console.log("hier");
        // create a session
        const myOnnxSession = new onnx.InferenceSession();
        console.log("hier");
        console.log(this.dataFormat());
        // load the ONNX model file
        myOnnxSession.loadModel("http://localhost:63342/Users/johannesmannhardt/PhpstormProjects/ChessOneJs/js/EvalNN.onnx").then(() => {
            console.log("hier");
            const inferenceInputs = new Tensor(new Float32Array(768), "float32");
            // execute the model
            session.run(inferenceInputs).then(output => {
                // consume the output
                const outputTensor = output.values().next().value;
                console.log(`model output tensor: ${outputTensor.data}.`);
            });
        });
    }

    dataFormat() {
        let finalArray = new Float32Array(768);
        for (let piece of this.allPieces()) {
            if (piece.color == pieceColor.WHITE) {
                if (piece instanceof Pawn) {
                    finalArray[this.pointToChessTile(piece.position)] = 1;
                }
                if (piece instanceof King) {
                    finalArray[this.pointToChessTile(piece.position)+64] = 1;
                }
                if (piece instanceof Queen) {
                    finalArray[this.pointToChessTile(piece.position)+64*2] = 1;
                }
                if (piece instanceof Bishop) {
                    finalArray[this.pointToChessTile(piece.position)+64*3] = 1;
                }
                if (piece instanceof Rook) {
                    finalArray[this.pointToChessTile(piece.position)+64*4] = 1;
                }
                if (piece instanceof Knight) {
                    finalArray[this.pointToChessTile(piece.position)+64*5] = 1;
                }
            }
            if (piece.color == pieceColor.BLACK) {
                if (piece instanceof Pawn) {
                    finalArray[this.pointToChessTile(piece.position)+64*6] = 1;
                }
                if (piece instanceof King) {
                    finalArray[this.pointToChessTile(piece.position)+64*7] = 1;
                }
                if (piece instanceof Queen) {
                    finalArray[this.pointToChessTile(piece.position)+64*8] = 1;
                }
                if (piece instanceof Bishop) {
                    finalArray[this.pointToChessTile(piece.position)+64*9] = 1;
                }
                if (piece instanceof Rook) {
                    finalArray[this.pointToChessTile(piece.position)+64*10] = 1;
                }
                if (piece instanceof Knight) {
                    finalArray[this.pointToChessTile(piece.position)+64*11] = 1;
                }
            }
        }
        return finalArray;
    }

    pointToChessTile(point) {
        let posX = point.x+1;
        let posY = 7-point.y;
        return ((posY*8)+posX);
    }
}