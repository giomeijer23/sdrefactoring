/* eslint-disable max-len */
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Speler from './Speler.js';

export default class Level1 extends Scene {
  private goToNextScene: boolean;

  private player: Speler;

  private logo: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.player = new Speler(maxX, maxY);
    this.goToNextScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/blue-dungeon.png');
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
   * @param keylistener t
   */
  public override processInput2(keylistener: KeyListener): void {
    // Hoeft niks te doen
  }

  /**
   *
   * @param elapsed t
   */
  public override update(elapsed: number): void {
    // Hoeft niks te doen
  }

  public override getNextScene(): Scene {
    if (this.goToNextScene) {
      return new Level1(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas t
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
    this.player.render(canvas);
  }

  // /**
  //  *
  //  */
  // public nextLevel(): Level {
  //   // Hoeft niks te doen
  // }
}
