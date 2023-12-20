import CanvasRenderer from './CanvasRenderer.js';

export default class Enemie {
  private posX: number;

  private posY: number;

  private image: HTMLImageElement;

  private maxX: number;

  public constructor(canvasWidth: number, canvasHeight: number) {
    this.image = CanvasRenderer.loadNewImage('assets/boss.png');
    this.posX = 1300;
    this.posY = canvasHeight / 2.4;
    this.maxX = canvasWidth;
  }

  /**
   * Update the position of the player. If the the movingLEft or movingRight
   * flag has been set, the player will move accordingly.
   * @param elapsed the number of ms that has passed since the last update
   */
  public update(elapsed: number): void {
  }

  /**
   * Render the GameItem to the canvas
   *
   * @param canvas canvas to render the GameItem to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
