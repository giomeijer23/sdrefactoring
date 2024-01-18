import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Scene from '../Scene.js';
import Shop2 from '../Shops/Shop2.js';
import Speler from '../Speler.js';

export default class OpenWereld4 extends Scene {
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
    this.player.setPosX(600);
    this.player.setPosY(242);
    this.logo = CanvasRenderer.loadNewImage('./assets/controlscherm.jpg');
    this.escPressed = false;
    this.showImage = false;
  }

  /**
   *
   * @param mouseListener -
   * @param keylistener -
   */
  public override processInput(mouseListener: MouseListener, keylistener: KeyListener): void {
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    // Define the regions on the X and Y axes
    const xRegions: { lb: number; rb: number; } = { lb: 940, rb: 1055 };
    const yRegions: { lo: number; ro: number } = { ro: 300, lo: 180 };


    // Check if the mouse position is within the specified regions
    if (
      mouseX >= xRegions.lb && mouseX <= xRegions.rb &&
      mouseY >= yRegions.lo && mouseY <= yRegions.ro
    ) {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.textScene = true;
      }
    }
    if (keylistener.isKeyDown('KeyE')) {
      this.goToNextScene = true;
    }
    if (keylistener.isKeyDown(KeyListener.KEY_ESC)) {
      if (!this.escPressed) {
        // Toggle de zichtbaarheid van het plaatje
        this.showImage = !this.showImage;
        this.escPressed = true;
      }
    } else {
      this.escPressed = false;
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
      return new Shop2(this.maxX, this.maxY);
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
      CanvasRenderer.writeText(canvas, 'Press Key E', canvas.width / 2, canvas.height / 2, 'center', 'arial', 50, 'gold');

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
