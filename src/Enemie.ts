import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Enemie extends CanvasItem {
  public constructor(canvasWidth: number, canvasHeight: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/boss.png');
    this.posX = 1300;
    this.posY = canvasHeight / 2.4;
  }

  /**
   * Render the GameItem to the canvas
   *
   * @param canvas canvas to render the GameItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
