/* eslint-disable max-len */
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import OpenWereld from './OpenWereld.js';
import Scene from './Scene.js';
import Vragen from './Vragen.js';
import Speler from './Speler.js';
import Enemie from './Enemie.js';

export default class Level1 extends Scene {
  private goToNextScene: boolean;

  private player: Speler;

  private enemie: Enemie;

  private logo: HTMLImageElement;

  private vragen: Vragen[];

  private answerValue: boolean;

  private correctOptions: boolean;

  private correctOptions1: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.enemie = new Enemie(maxX, maxY);
    this.player = new Speler(maxX, maxY);
    this.goToNextScene = false;
    this.correctOptions1 = true;
    this.correctOptions = false;
    this.answerValue = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/blue-dungeon.png');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.vragen = [
      new Vragen('Na hoeveel tijd heb je een pauze nodig als je achter een scherm zit? (computer ,nintendo switch, playstation)', ['A 60 min', 'B 30 min', 'C 120 min', 'D 90 min'], 'C 120 min'),
      new Vragen('Wat is een sterk wachtwoord', ['A #1Patat12?', 'B HetIsPatat', 'C Wachtwoord', 'D WZAWZDB'], 'A #1Patat12?'),
      new Vragen('Welke informatie zou je nooit met vreemden moeten delen?', ['A Persoonlijke informatie', 'B Het weer en nieuwsbericht', 'C Hobby', 'D Je mening'], 'A Persoonlijke informatie')
    ];
  }

  /**
   *
   * @param mouseListener t
   */
  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.goToNextScene = true;
    }
  }

  /**
   *
   * @param keylistener
   */
  public override processInput2(keylistener: KeyListener): void {
    if (keylistener.isKeyDown(KeyListener.KEY_A)) {
      if(this.vragen[0].options[0] === this.vragen[0].getCorrectOption()) {
        console.log('ok');
      }
      if(this.vragen[1].options[0] === this.vragen[1].getCorrectOption()) {
        this.correctOptions = true;
      }
      if(this.vragen[2].options[0] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
    }
    if (keylistener.isKeyDown(KeyListener.KEY_B)) {
      if(this.vragen[0].options[1] === this.vragen[0].getCorrectOption()) {
        console.log('ok');
      }
      if(this.vragen[1].options[1] === this.vragen[1].getCorrectOption()) {
        console.log('ok');
      }
      if(this.vragen[2].options[1] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
    }
    if (keylistener.keyPressed(KeyListener.KEY_C)) {
      if(this.vragen[0].options[2] === this.vragen[0].getCorrectOption()) {
        this.answerValue = true;
      }
      if(this.vragen[1].options[2] === this.vragen[1].getCorrectOption()) {
        console.log('ok');
      }
      if(this.vragen[2].options[2] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
    }
    if (keylistener.isKeyDown(KeyListener.KEY_D)) {
      if(this.vragen[0].options[3] === this.vragen[0].getCorrectOption()) {
        console.log('ok');
      }
      if(this.vragen[1].options[3] === this.vragen[1].getCorrectOption()) {
        console.log('ok');
      }
      if(this.vragen[2].options[3] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
    }
  }

  /**
   *
   * @param elapsed t
   */
  public override update(elapsed: number): void {
    // Hoeft niks te doen
  }

  public override getNextScene(): Scene {
    if (this.goToNextScene) {
      return new OpenWereld(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas t
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
    CanvasRenderer.drawRectangle(canvas, 350, 100, 800, 160, 'white');
    CanvasRenderer.fillRectangle(canvas, 350, 100, 800, 160, 'black');
    CanvasRenderer.fillRectangle(canvas, 360, 110, 780, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 360, 160, 380, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 360, 210, 380, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 760, 160, 380, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 760, 210, 380, 40, 'white');

    if (this.correctOptions1 = true) {
      CanvasRenderer.writeText(canvas, `${this.vragen[0].question}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[2]}`, 765, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[3]}`, 765, 240, 'left', 'sans-serif', 20, 'black');
    }
    if (this.answerValue) {
      CanvasRenderer.clearCanvas(canvas);
      CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
      CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
      CanvasRenderer.drawRectangle(canvas, 350, 100, 800, 160, 'white');
      CanvasRenderer.fillRectangle(canvas, 350, 100, 800, 160, 'black');
      CanvasRenderer.fillRectangle(canvas, 360, 110, 780, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 160, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 210, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 760, 160, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 760, 210, 380, 40, 'white');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].question}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[2]}`, 765, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[3]}`, 765, 240, 'left', 'sans-serif', 20, 'black');
    }
    if (this.correctOptions) {
      CanvasRenderer.clearCanvas(canvas);
      CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
      CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
      CanvasRenderer.drawRectangle(canvas, 350, 100, 800, 160, 'white');
      CanvasRenderer.fillRectangle(canvas, 350, 100, 800, 160, 'black');
      CanvasRenderer.fillRectangle(canvas, 360, 110, 780, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 160, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 210, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 760, 160, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 760, 210, 380, 40, 'white');
      CanvasRenderer.writeText(canvas, `${this.vragen[2].question}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[2].options[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[2].options[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[2].options[2]}`, 765, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[2].options[3]}`, 765, 240, 'left', 'sans-serif', 20, 'black');
    }

    this.player.render(canvas);
    this.enemie.render(canvas);
  }

  // /**
  //  *
  //  */
  // public nextLevel(): Level {
  //   // Hoeft niks te doen
  // }
}
