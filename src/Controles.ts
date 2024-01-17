/* eslint-disable max-len */
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import OpenWereld from './OpenWerelden/OpenWereld.js';
import Scene from './Scene.js';

export default class Controles extends Scene {
  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/controlscherm.jpg');
  }

  /**
   *
   * @param mouseListener t
   */
  public override processInput(mouseListener: MouseListener): void {

  }

  /**
   *
   * @param keylistener t
   */
  public override processInput2(keylistener: KeyListener): void {
    if (keylistener.keyPressed(KeyListener.KEY_ENTER)) {
      this.goToNextScene = true;
    }
    if (keylistener.keyPressed(KeyListener.KEY_SPACE)) {
      this.goToNextScene = true;
    }
  }

  /**
   *
   * @param elapsed t
   */
  public override update(elapsed: number): void {
  }

  public override getNextScene(): Scene | null {
    if (this.goToNextScene) {
      return new OpenWereld(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas t
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2 - this.logo.height / 2);
  }
}
