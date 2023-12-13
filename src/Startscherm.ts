import MouseListener from './MouseListener.js';
import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import Controles from './Controles.js';

export default class Startscherm extends Scene {
  private starting: boolean;

  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  private posX: number;

  private posY: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.posX = 100;
    this.posY = 100;
    this.logo = CanvasRenderer.loadNewImage('./assets/MicrosoftTeams-image (1).png');
  }

  /**
   *
   * @param mouseListener
   */
  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.goToNextScene = true;
    }
  }

  /**
   *
   * @param elapsed
   */
  public override update(elapsed: number): void {
  }

  public override getNextScene(): Scene | null {
    if (this.goToNextScene) {
      return new Controles(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'rgb(231, 206, 162)');
    CanvasRenderer.writeText(canvas, 'Click to start!', canvas.width / 2, 809, 'center', 'sans-serif', 50, 'black');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2 - this.logo.height / 2);
  }
}
