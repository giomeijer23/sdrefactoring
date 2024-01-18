import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Level1 from '../Levels/Level1.js';
import MouseListener from '../MouseListener.js';
import Scene from '../Scene.js';
import Speler from '../Speler.js';

export default class OpenWereld1 extends Scene {
  private goToNextScene: boolean;

  private player: Speler;

  private textScene: boolean;

  private escPressed: boolean;

  private showImage: boolean;

  private logo: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.player = new Speler(maxX, maxY);
    this.player.setPosX(198);
    this.player.setPosY(424);
    this.logo = CanvasRenderer.loadNewImage('./assets/Controlsscreen 1.png');
    this.escPressed = false;
    this.showImage = false;
  }

  /**
   *
   * @param mouseListener -
   * @param keyListener t
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    // Define the regions on the X and Y axes
    const xRegions: { lb: number; rb: number; } = { lb: 165, rb: 230 };
    const yRegions: { lo: number; ro: number } = { ro: 660, lo: 575 };


    // Check if the mouse position is within the specified regions
    if (
      mouseX >= xRegions.lb && mouseX <= xRegions.rb &&
      mouseY >= yRegions.lo && mouseY <= yRegions.ro
    ) {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.textScene = true;
      }
    }
    if (keyListener.isKeyDown('KeyE')) {
      this.goToNextScene = true;
    }
    if (keyListener.isKeyDown(KeyListener.KEY_ESC)) {
      if (!this.escPressed) {
        // Toggle de zichtbaarheid van het plaatje
        this.showImage = !this.showImage;
        this.escPressed = true;
      }
    } else {
      this.escPressed = false;
    }
    if (keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_W)) {
      this.player.moveUp();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.player.moveDown();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_A)) {
      this.player.moveLeft();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_D)) {
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
      return new Level1(this.maxX, this.maxY);
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
    if (this.showImage) {
      // eslint-disable-next-line max-len
      CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2 - this.logo.height / 2);
    }
  }
}
