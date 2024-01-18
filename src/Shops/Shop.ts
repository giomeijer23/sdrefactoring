/* eslint-disable max-len */
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import OpenWereld1 from '../Openwerelden/OpenWereld1.js';
import Scene from '../Scene.js';

export default class Shop extends Scene {
  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  private textScene: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.textScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/NPC_grass_house 2.png');
  }

  /**
   *
   * @param mouseListener t
   * @param keyListener t
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    const xRegions: { lb: number; rb: number; } = { lb: 67, rb: 386 };
    const yRegions: { lo: number; ro: number } = { ro: 122, lo: 0 };


    if (
      mouseX >= xRegions.lb && mouseX <= xRegions.rb &&
      mouseY >= yRegions.lo && mouseY <= yRegions.ro
    ) {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.textScene = true;
      }
    }
    if (keyListener.keyPressed(KeyListener.KEY_ENTER)) {
      this.goToNextScene = true;
    }
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
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
      return new OpenWereld1(this.maxX, this.maxY);
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
    if (this.textScene) {
      CanvasRenderer.writeText(canvas, 'hoi', canvas.width / 2, canvas.height / 2, 'center', 'arial', 50, 'white');

      const displayDuration: number = 3000;

      // Start de timer om de tekst na de opgegeven duur te verbergen
      setTimeout(() => {
        this.textScene = false;
      }, displayDuration);
    }
  }
}
