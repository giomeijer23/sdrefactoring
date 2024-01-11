import Game from './Game.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Startscherm from './Startscherm.js';
import Scene from './Scene.js';
import KeyListener from './KeyListener.js';
import Vragen from './Vragen.js';
import Sprite from './Sprite.js';

export default class Dungeon extends Game {
  private canvas: HTMLCanvasElement;

  private keylistener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  private vragen: Vragen[];

  private sprites: Sprite[] = [];

  private currentSprite: number = 0;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(this.canvas);
    this.keylistener = new KeyListener();
    this.currentScene = new Startscherm(canvas.width, canvas.height);
    this.sprites.push(new Sprite(199, 620));
    this.sprites.push(new Sprite(242, 600));
    this.sprites.push(new Sprite(561, 1000));
    this.sprites.push(new Sprite(186, 1399));
  }

  /**
   *
   */
  public processInput(): void {
    this.currentScene.processInput(this.mouseListener);
    this.currentScene.processInput2(this.keylistener);
  }

  /**
   *@returns -
   * @param elapsed -
   */
  public update(elapsed: number): boolean {
    for (let i: number = 0; i < this.sprites.length; i++) {
      this.currentScene.update(elapsed, this.sprites[this.currentSprite]);
      this.currentScene = this.currentScene.getNextScene();
      console.log(this.currentScene);
    }
    return this.currentScene != null;
  }

  /**
   *
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    if (this.currentScene != null) {
      this.currentScene.render(this.canvas);
    }
  }
}
