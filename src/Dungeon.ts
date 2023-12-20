import Game from './Game.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Startscherm from './Startscherm.js';
import Scene from './Scene.js';
import KeyListener from './KeyListener.js';
import Vragen from './Vragen.js';

export default class Dungeon extends Game {
  private canvas: HTMLCanvasElement;

  private keylistener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  private vragen: Vragen[];

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(this.canvas);
    this.keylistener = new KeyListener();
    this.currentScene = new Startscherm(canvas.width, canvas.height);
    // eslint-disable-next-line max-len
    // this.vragen = new Vragen('Na hoeveel tijd heb je een pauze nodig als je achter een scherm zit? (computer ,nintendo switch, playstation)', ['60 min', '30 min', '120 min', '90 min'], '120 min');
  }

  /**
   *
   */
  public processInput(): void {
    this.currentScene.processInput(this.mouseListener);
    this.currentScene.processInput2(this.keylistener);
  }

  /**
   *
   * @param elapsed
   */
  public update(elapsed: number): boolean {
    this.currentScene.update(elapsed);
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
