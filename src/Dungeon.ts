import Game from './Game.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Startscherm from './Startscherm.js';
import Scene from './Scene.js';
import KeyListener from './KeyListener.js';

export default class Dungeon extends Game {
  private canvas: HTMLCanvasElement;

  private keylistener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(this.canvas);
    this.keylistener = new KeyListener();
    this.currentScene = new Startscherm(canvas.width, canvas.height);
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
    this.currentScene.update(elapsed); // Pass an array with the current sprite
    this.currentScene = this.currentScene.getNextScene();
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
