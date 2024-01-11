export default class Sprite {
  private posX: number;

  private posY: number;

  public constructor (posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  public getPosX() : number {
    return this.posX;
  }

  public getPosY() : number {
    return this.posY;
  }
}
