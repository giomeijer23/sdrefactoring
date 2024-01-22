/* eslint-disable max-len */
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Scene from '../Scene.js';
import Speler from '../Speler.js';
import Enemie from '../Enemie.js';
import Question4 from '../Questions/Question4.js';
import Credits from '../Credits.js';
import OpenWereld6 from '../Openwerelden/OpenWereld6.js';
import HeartsPlayer from '../HeartsPlayer.js';
import Hearts from '../Hearts.js';

export default class Level4 extends Scene {
  private goToNextScene: boolean;

  private player: Speler;

  private enemie: Enemie;

  private hearts: Hearts;

  private heartsPlayer: HeartsPlayer;

  private logo: HTMLImageElement;

  private isDisplayingQuestion: boolean;

  private isDisplayingAnswerAndExplanation: boolean;

  private isPlayerAnswering: boolean;

  private isAnswerCorrect: boolean;

  private questions: Question4[] = [];

  private dumpQuestions: Question4[] = [];

  private currentQuestion: string;

  private answers: string[] = [];

  private correctAnswer: boolean;

  private explanation: string;

  private escPressed: boolean;

  private showImage: boolean;

  private image: HTMLImageElement;

  private scorePlayer: number;

  private scoreEnemie: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.enemie = new Enemie(maxX, maxY);
    this.player = new Speler(maxX, maxY);
    this.questions = Question4.question;
    this.dumpQuestions = Question4.dumpQuestions;
    this.isDisplayingAnswerAndExplanation = false;
    this.isPlayerAnswering = false;
    this.isDisplayingQuestion = true;
    this.goToNextScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/Stone-dungeon.png');
    this.image = CanvasRenderer.loadNewImage('./assets/Controlsscreen 1.png');
    this.escPressed = false;
    this.showImage = false;
    this.scorePlayer = 3;
    this.scoreEnemie = 3;
    this.hearts = new Hearts(maxX);
    this.heartsPlayer = new HeartsPlayer();
  }

  public decreasePlayerLives(): void {
    this.hearts.decreaseLives();
  }

  /**
   *
   * @param mouseListener t
   * @param keyListener t
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    if (keyListener.isKeyDown(KeyListener.KEY_ESC)) {
      if (!this.escPressed) {
        // Toggle de zichtbaarheid van het plaatje
        this.showImage = !this.showImage;
        this.escPressed = true;
      }
    } else {
      this.escPressed = false;
    }
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.goToNextScene = true;
    }
    if (this.isDisplayingQuestion && this.isPlayerAnswering && !this.isDisplayingAnswerAndExplanation) {
      if (keyListener.keyPressed(KeyListener.KEY_A)) {
        this.checkAnswer(this.answers[0]);
      } else if (keyListener.keyPressed(KeyListener.KEY_B)) {
        this.checkAnswer(this.answers[1]);
      } else if (keyListener.keyPressed(KeyListener.KEY_C)) {
        this.checkAnswer(this.answers[2]);
      } else if (keyListener.keyPressed(KeyListener.KEY_D)) {
        this.checkAnswer(this.answers[3]);
      }
    }

    if (this.isDisplayingQuestion && this.isDisplayingAnswerAndExplanation) {
      if (keyListener.keyPressed(KeyListener.KEY_ENTER)) {
        this.isDisplayingAnswerAndExplanation = false;
        this.moveToNextQuestion();
      }
    }
  }

  private checkAnswer(selectedAnswer: string): void {
    this.isAnswerCorrect = selectedAnswer === this.correctAnswer.toString();
    if (!this.isAnswerCorrect) {
      // Onjuist antwoord
      this.scorePlayer -= 1; // Verlaag de score van de vijand alleen bij een onjuist antwoord
    } else {
      this.scoreEnemie -= 1;
    }
    console.log(this.scoreEnemie);
    console.log(this.scorePlayer);
    if (this.isAnswerCorrect) {
      this.decreasePlayerLives();
    }
    if (!this.isAnswerCorrect) {
      this.heartsPlayer.decreaseLives();
    }
    this.isDisplayingAnswerAndExplanation = true;
  }

  private moveToNextQuestion(): void {
    const randomNumber: number = Math.floor(Math.random() * this.questions.length);
    this.currentQuestion = Object.values(this.questions[randomNumber])[0];
    this.answers = Array(...Object.values(this.questions[randomNumber])[1]);
    this.correctAnswer = Object.values(this.questions[randomNumber])[2];
    this.explanation = Object.values(this.questions[randomNumber])[3];
    this.isPlayerAnswering = true;
    this.isDisplayingAnswerAndExplanation = false;

    if (this.questions.length > 1) {
      this.dumpQuestions.push(this.questions.splice(randomNumber, 1));
    } else {
      // If there's only one question left in the main list, move it to dumpQuestions
      this.dumpQuestions.push(this.questions.pop());
    }

    if (this.questions.length <= 0) {
      // If the main list is empty, refill it from dumpQuestions
      this.dumpQuestions.forEach((dumpQuestion: Question4) => {
        this.questions.push(...Object.values(dumpQuestion));
      });
      this.dumpQuestions = [];
    }
  }

  /**
   *
   * @param elapsed t
   */
  public override update(elapsed: number): void {
    if (this.isDisplayingQuestion && !this.isPlayerAnswering) {
      const randomNumber: number = Math.floor(Math.random() * (this.questions.length - 1));
      this.currentQuestion = Object.values(this.questions[randomNumber])[0];
      this.answers = Array(...Object.values(this.questions[randomNumber])[1]);
      this.correctAnswer = Object.values(this.questions[randomNumber])[2];
      this.explanation = Object.values(this.questions[randomNumber])[3];
      this.isPlayerAnswering = true;
      this.isDisplayingAnswerAndExplanation = false;
      this.dumpQuestions.push(this.questions.splice(randomNumber, 1));

      if (this.questions.length <= 0) {
        this.dumpQuestions.forEach((dumpQuestion: Question4) => {
          this.questions.push(...Object.values(dumpQuestion));
        });
        this.dumpQuestions = [];
      }
      this.hearts.update(elapsed);
      if (this.isDisplayingAnswerAndExplanation && this.isAnswerCorrect) {
        console.log('Correct antwoord');
        this.hearts.decreaseLives();
      } else if (this.isDisplayingAnswerAndExplanation && !this.isAnswerCorrect) {
        this.heartsPlayer.update(elapsed);
        console.log('Correct antwoord');
        this.heartsPlayer.decreaseLives();
      }
    }
  }

  public override getNextScene(): Scene {
    if (this.scoreEnemie <= 0) {
      return new Credits(this.maxX, this.maxY);
    } else if (this.scorePlayer <= 0) {
      return new OpenWereld6(this.maxX, this.maxY);
    }
    return this;
  }

  /**
   *
   * @param canvas t
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'black');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);

    if (this.isDisplayingQuestion) {
      CanvasRenderer.drawRectangle(canvas, 350, 100, 900, 260, 'white');
      CanvasRenderer.fillRectangle(canvas, 350, 100, 900, 260, 'black');
      CanvasRenderer.fillRectangle(canvas, 360, 110, 880, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 160, 880, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 210, 880, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 260, 880, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 310, 880, 40, 'white');
      CanvasRenderer.writeText(canvas, `${this.currentQuestion}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[2]}`, 365, 290, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[3]}`, 365, 340, 'left', 'sans-serif', 20, 'black');

      if (this.isDisplayingAnswerAndExplanation) {
        if (this.isAnswerCorrect) {
          CanvasRenderer.drawRectangle(canvas, 350, 363, 900, 100, 'Green');
          CanvasRenderer.fillRectangle(canvas, 350, 363, 900, 100, 'black');
          CanvasRenderer.writeText(canvas, 'Correct Answer', 365, 385, 'left', 'sans-serif', 20, 'green');
        } else {
          CanvasRenderer.drawRectangle(canvas, 350, 363, 900, 100, 'Red');
          CanvasRenderer.fillRectangle(canvas, 350, 363, 900, 100, 'black');
          CanvasRenderer.writeText(canvas, 'Wrong Answer', 365, 385, 'left', 'sans-serif', 20, 'red');
        }
        CanvasRenderer.writeText(canvas, `${this.explanation}`, 365, 415, 'left', 'sans-serif', 20, 'white');
        CanvasRenderer.writeText(canvas, 'Press Enter to continue', 365, 445, 'left', 'sans-serif', 20, 'yellow');
      }
    }
    if (this.showImage) {
      // eslint-disable-next-line max-len
      CanvasRenderer.drawImage(canvas, this.image, canvas.width / 2 - this.image.width / 2, canvas.height / 2 - this.image.height / 2);
    }
    this.hearts.render(canvas);
    this.heartsPlayer.render(canvas);
  }
}
