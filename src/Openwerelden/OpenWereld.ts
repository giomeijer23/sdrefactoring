import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Scene from '../Scene.js';
import Shop from '../Shops/Shop.js';
import Speler from '../Speler.js';

export default class OpenWereld extends Scene {
  private textScene: boolean;

  private goToNextScene: boolean;

  private player: Speler;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.textScene = false;
    this.player = new Speler(maxX, maxY);
  }

  /**
   *
   * @param mouseListener -
   */
  public override processInput(mouseListener: MouseListener): void {
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    // Define the regions on the X and Y axes
    const xRegions: { lb: number; rb: number; } = { lb: 160, rb: 240 };
    const yRegions: { lo: number; ro: number } = { ro: 476, lo: 0 };


    // Check if the mouse position is within the specified regions
    if (
      mouseX >= xRegions.lb && mouseX <= xRegions.rb &&
      mouseY >= yRegions.lo && mouseY <= yRegions.ro
    ) {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.textScene = true;
      }
    }
  }

  /**
   *
   * @param keylistener -
   */
  public override processInput2(keylistener: KeyListener): void {
    if (keylistener.isKeyDown('KeyE')) {
      this.goToNextScene = true;
    }
    if (keylistener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_W)) {
      this.player.moveUp();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_S)) {
      this.player.moveDown();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_A)) {
      this.player.moveLeft();
    }
    if (keylistener.isKeyDown(KeyListener.KEY_D)) {
      this.player.moveRight();
    }
  }

  /**
   *
   * @param elapsed -
   */
  public override update(elapsed: number): void {
    this.player.update(elapsed);
  }

  public override getNextScene(): Scene | null {
    if (this.goToNextScene) {
      return new Shop(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas -
   */
  public override render(canvas: HTMLCanvasElement): void {
    this.player.render(canvas);
    if (this.textScene) {
      CanvasRenderer.writeText(canvas, 'Druk op toets E', canvas.width / 2, canvas.height / 2, 'center', 'arial', 50, 'gold');

      const displayDuration: number = 3000;

      // Start de timer om de tekst na de opgegeven duur te verbergen
      setTimeout(() => {
        this.textScene = false;
      }, displayDuration);
    }
  }
}
