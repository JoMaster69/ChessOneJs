
class Game {
    constructor(width) {
        this.size = width;
        this.board = new Board();
    }

    Draw() {
        ctx.drawImage(img, 0, 0, this.size, this.size);
        this.board.Draw();
    }

    Update(posX, posY) {
        let tileX = posX / (this.size/8), tileY = posY / (this.size/8);
        tileX = Math.floor(tileX), tileY = Math.floor(tileY);
        this.board.Update(new Point(tileX, tileY));
    }
}