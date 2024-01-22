import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Hearts extends CanvasItem {
  private lives: HTMLImageElement;

  private heartPosX: number;

  private heartPosY: number;

  private numberOfHearts: number = 3;

  public constructor(maxX: number) {
    super();
    this.lives = CanvasRenderer.loadNewImage('assets/lives.png');
    this.heartPosX = maxX - 210;
    this.heartPosY = 30;
  }

  /**
   *
   */
  public decreaseLives(amount: number = 1): void {
    if (this.numberOfHearts >= amount) {
      this.numberOfHearts -= amount;
    }
  }

  /**
   *
   * @param elapsed
   */
  public update(elapsed: number): void {
  }

  /**
   *
   * @param canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    for (let i: number = 0; i < this.numberOfHearts; i++) {
      this.heartPosX = canvas.width - 210 + i * 30;
      this.heartPosY = 30;
      CanvasRenderer.drawImage(canvas, this.lives, this.heartPosX, this.heartPosY);
    }
  }
}
