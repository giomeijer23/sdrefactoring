/* eslint-disable max-len */
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Vragen from './Vragen.js';
import Speler from './Speler.js';
import Enemie from './Enemie.js';
import OpenWereld1 from './OpenWerelden/OpenWereld1.js';

export default class Level1 extends Scene {
  private goToNextScene: boolean;

  private player: Speler;

  private enemie: Enemie;

  private logo: HTMLImageElement;

  private logo1: HTMLImageElement;

  private logo2: HTMLImageElement;

  private logo3: HTMLImageElement;

  private vragen: Vragen[];

  private correctOptions0: boolean;

  private correctOptions: boolean;

  private correctOptions1: boolean;

  private correctOptions2: boolean;

  private correctOptions3: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.enemie = new Enemie(maxX, maxY);
    this.player = new Speler(maxX, maxY);
    this.goToNextScene = false;
    this.correctOptions0 = true;
    this.correctOptions = false;
    this.correctOptions1 = false;
    this.correctOptions2 = false;
    this.correctOptions3 = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/blue-dungeon.png');
    this.logo1 = CanvasRenderer.loadNewImage('./assets/NepRoblox.jpeg');
    this.logo2 = CanvasRenderer.loadNewImage('./assets/RobloxWebsite.png');
    this.logo3 = CanvasRenderer.loadNewImage('./assets/Tikkie.jpg');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.vragen = [
      new Vragen('Na hoeveel tijd heb je een pauze nodig als je achter een scherm zit? (computer ,nintendo switch, playstation)', ['A 60 min', 'B 30 min', 'C 120 min', 'D 90 min'], 'C 120 min'),
      new Vragen('Wat is een sterk wachtwoord?', ['A WZAWZDB', 'B HetIsPatat', 'C Wachtwoord', 'D #1Patat12?'], 'D #1Patat12?'),
      new Vragen('Welke informatie zou je nooit met vreemden moeten delen?', ['A Persoonlijke informatie', 'B Het weer en nieuwsbericht', 'C Hobby', 'D Je mening'], 'A Persoonlijke informatie'),
      new Vragen('Welke website is betrouwbaar?', ['A', 'B'], 'B'),
      new Vragen('Is dit betrouwbaar?', ['A Ja', 'B Nee'], 'A Ja')
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
   * @param keylistener t
   */
  public override processInput2(keylistener: KeyListener): void {
    if (keylistener.keyPressed(KeyListener.KEY_A)) {
      if (this.vragen[0].options[0] === this.vragen[0].getCorrectOption()) {
        console.log('ok');
      }
      if (this.vragen[1].options[0] === this.vragen[1].getCorrectOption()) {
        console.log('ok');
      }
      if (this.correctOptions1) {
        if (this.vragen[2].options[0] === this.vragen[2].getCorrectOption()) {
          this.correctOptions2 = true;
        }
      }
      if (this.vragen[3].options[0] === this.vragen[3].getCorrectOption()) {
        console.log('ok');
      }
    }
    if (keylistener.keyPressed(KeyListener.KEY_B)) {
      if (this.vragen[0].options[1] === this.vragen[0].getCorrectOption()) {
        console.log('ok');
      }
      if (this.vragen[1].options[1] === this.vragen[1].getCorrectOption()) {
        console.log('ok');
      }
      if (this.vragen[2].options[1] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
      if (this.correctOptions2) {
        if (this.vragen[3].options[1] === this.vragen[3].getCorrectOption()) {
          this.correctOptions3 = true;
        }
      }
    }
    if (keylistener.keyPressed(KeyListener.KEY_C)) {
      if (this.correctOptions0) {
        if (this.vragen[0].options[2] === this.vragen[0].getCorrectOption()) {
          this.correctOptions = true;
        }
      }
      if (this.vragen[1].options[2] === this.vragen[1].getCorrectOption()) {
        console.log('ok');
      }
      if (this.vragen[2].options[2] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
      if (this.vragen[3].options[2] === this.vragen[3].getCorrectOption()) {
        console.log('ok');
      }
    }
    if (keylistener.keyPressed(KeyListener.KEY_D)) {
      if (this.vragen[0].options[3] === this.vragen[0].getCorrectOption()) {
        console.log('ok');
      }
      if (this.correctOptions) {
        if (this.vragen[1].options[3] === this.vragen[1].getCorrectOption()) {
          this.correctOptions1 = true;
        }
      }
      if (this.vragen[2].options[3] === this.vragen[2].getCorrectOption()) {
        console.log('ok');
      }
      if (this.vragen[3].options[3] === this.vragen[3].getCorrectOption()) {
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
      return new OpenWereld1(this.maxX, this.maxY);
    }
    return this;
  }


  /**
   *
   * @param canvas t
   */
  public override render(canvas: HTMLCanvasElement): void {
    this.player.render(canvas);
    CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
    CanvasRenderer.drawRectangle(canvas, 350, 100, 800, 160, 'white');
    CanvasRenderer.fillRectangle(canvas, 350, 100, 800, 160, 'black');
    CanvasRenderer.fillRectangle(canvas, 360, 110, 780, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 360, 160, 380, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 360, 210, 380, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 760, 160, 380, 40, 'white');
    CanvasRenderer.fillRectangle(canvas, 760, 210, 380, 40, 'white');

    if (this.correctOptions0) {
      CanvasRenderer.writeText(canvas, `${this.vragen[0].question}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[2]}`, 765, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[0].options[3]}`, 765, 240, 'left', 'sans-serif', 20, 'black');
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
      CanvasRenderer.writeText(canvas, `${this.vragen[1].question}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[2]}`, 765, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[1].options[3]}`, 765, 240, 'left', 'sans-serif', 20, 'black');
    }
    if (this.correctOptions1) {
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

    if (this.correctOptions2) {
      CanvasRenderer.clearCanvas(canvas);
      CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
      CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
      CanvasRenderer.drawRectangle(canvas, 290, 100, 1000, 450, 'white');
      CanvasRenderer.fillRectangle(canvas, 290, 100, 1000, 450, 'black');
      CanvasRenderer.fillRectangle(canvas, 300, 110, 980, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 300, 160, 480, 300, 'white');
      CanvasRenderer.fillRectangle(canvas, 800, 160, 480, 300, 'white');
      CanvasRenderer.fillRectangle(canvas, 500, 470, 60, 60, 'white');
      CanvasRenderer.fillRectangle(canvas, 1000, 470, 60, 60, 'white');
      CanvasRenderer.drawImage1(canvas, this.logo1, 300, 160, 480, 300);
      CanvasRenderer.drawImage1(canvas, this.logo2, 800, 160, 480, 300);
      CanvasRenderer.writeText(canvas, `${this.vragen[3].question}`, 305, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[3].options[0]}`, 523, 505, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[3].options[1]}`, 1023, 505, 'left', 'sans-serif', 20, 'black');
    }

    if (this.correctOptions3) {
      CanvasRenderer.clearCanvas(canvas);
      CanvasRenderer.fillCanvas(canvas, 'rgb(70, 106, 44)');
      CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
      CanvasRenderer.drawRectangle(canvas, 450, 100, 500, 450, 'white');
      CanvasRenderer.fillRectangle(canvas, 450, 100, 500, 450, 'black');
      CanvasRenderer.fillRectangle(canvas, 460, 110, 480, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 460, 160, 480, 300, 'white');
      CanvasRenderer.fillRectangle(canvas, 500, 470, 80, 60, 'white');
      CanvasRenderer.fillRectangle(canvas, 810, 470, 80, 60, 'white');
      CanvasRenderer.drawImage1(canvas, this.logo3, 545, 160, 300, 300);
      CanvasRenderer.writeText(canvas, `${this.vragen[4].question}`, 465, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[4].options[0]}`, 523, 505, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.vragen[4].options[1]}`, 823, 505, 'left', 'sans-serif', 20, 'black');
    }
    this.enemie.render(canvas);
  }

  // /**
  //  *
  //  */
  // public nextLevel(): Level {
  //   // Hoeft niks te doen
  // }
}
