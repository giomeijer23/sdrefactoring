import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Level1 from './Level1.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Speler from './Speler.js';

export default class OpenWereld extends Scene {
  private starting: boolean;

  private keylistener: KeyListener;

  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  private posX: number;

  private posY: number;

  private player: Speler;

  private keyListener: KeyListener;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.player = new Speler(maxX, maxY);
    this.posX = 100;
    this.posY = 100;
    this.keyListener = new KeyListener();
    this.logo = CanvasRenderer.loadNewImage('./assets/MicrosoftTeams-image (11).png');
  }

  /**
   *
   * @param mouseListener
   */
  public override processInput(mouseListener: MouseListener): void {

  }


  public override processInput2(keylistener: KeyListener): void {
    if (keylistener.isKeyDown('KeyE')) {
      this.goToNextScene = true;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
      this.player.moveUp();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.player.moveDown();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
      this.player.moveLeft();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
      this.player.moveRight();
    }
  }

  /**
   *
   * @param elapsed
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
   * @param canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'rgb(231, 206, 162)');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 1.85 - this.logo.height / 2);
    this.player.render(canvas);
  }
}
