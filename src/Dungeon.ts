import Game from './Game.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import KeyListener from './KeyListener.js';
import Startscherm from './Startscherm.js';
import Scene from './Scene.js';
import Speler from './Speler.js';

export default class Dungeon extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  private player: Speler;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(this.canvas);
    this.currentScene = new Startscherm(canvas.width, canvas.height);
    this.keyListener = new KeyListener();

    this.player = new Speler(this.canvas.width, this.canvas.height);
  }

  /**
   *
   */
  public processInput(): void {
    this.currentScene.processInput(this.mouseListener);
  }

  /**
   *
   * @param elapsed
   */
  public update(elapsed: number): boolean {
    this.currentScene.update(elapsed);
    this.currentScene = this.currentScene.getNextScene();
    this.player.update(elapsed);
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
    this.player.render(this.canvas);
  }
}

console.log(Speler);
