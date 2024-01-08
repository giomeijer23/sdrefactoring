/* eslint-disable max-len */
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Level1 from './Level1.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Speler from './Speler.js';

export default class OpenWereld extends Scene {
  private starting: boolean;

  private logo: HTMLImageElement;

  private dungeon1: HTMLImageElement;

  private goToNextScene: boolean;

  private posX: number;

  private posY: number;

  private player: Speler;

  public constructor(maxX: number, maxY: number, level1Completed: boolean = false) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.player = new Speler(maxX, maxY);
    this.player.setLevel1Completed(level1Completed);
    this.posX = 100;
    this.posY = 100;
    this.dungeon1 = CanvasRenderer.loadNewImage('./assets/afbeelding (1).png');
  }

  /**
   *
   * @param mouseListener
   */
  public override processInput(mouseListener: MouseListener): void {

  }


  /**
   *
   * @param keylistener
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
   * @param elapsed t
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
    this.player.render(canvas);
  }
}
