import MouseListener from './MouseListener.js';
import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import KeyListener from './KeyListener.js';
import Startscherm from './Startscherm.js';

export default class Credits extends Scene {
  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/CreditsScene.png');
  }

  /**
   *
   * @param mouseListener t
   * @param keyListener -
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.goToNextScene = true;
    }
  }

  /**
   *
   * @param elapsed t
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  public override update(elapsed: number): void {
  }

  public override getNextScene(): Scene | null {
    if (this.goToNextScene) {
      return new Startscherm(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas t
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'rgb(0, 0, 0)');
    // eslint-disable-next-line max-len
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
  }
}
