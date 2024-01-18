/*  eslint-disable max-len */
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Speler from './Speler.js';
import Enemie from './Enemie.js';
import Question from './Question.js';
import OpenWereld from './Openwerelden/OpenWereld.js';

export default class Level1 extends Scene {
  private goToNextScene: boolean;

  private player: Speler;

  private enemie: Enemie;

  private logo: HTMLImageElement;

  private isDisplayingQuestion: boolean;

  private isDisplayingAnswerAndExplanation: boolean;

  private isPlayerAnswering: boolean;

  private isAnswerCorrect: boolean;

  private questions: Question[] = [];

  private dumpQuestions: Question[] = [];

  private currentQuestion: string;

  private answers: string[] = [];

  private correctAnswer: boolean;

  private explanation: string;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.enemie = new Enemie(maxX, maxY);
    this.player = new Speler(maxX, maxY);
    this.questions = Question.question;
    this.dumpQuestions = Question.dumpQuestions;
    this.isDisplayingAnswerAndExplanation = false;
    this.isPlayerAnswering = false;
    this.isDisplayingQuestion = true;
    this.goToNextScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/Grass-dungeon.png');
  }

  /**
   *
   * @param mouseListener t
   * @param keyListener t
   */
  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
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
      this.dumpQuestions.forEach((dumpQuestion: Question) => {
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
        this.dumpQuestions.forEach((dumpQuestion: Question) => {
          this.questions.push(...Object.values(dumpQuestion));
        });
        this.dumpQuestions = [];
      }
    }
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
    CanvasRenderer.fillCanvas(canvas, 'black');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);

    if (this.isDisplayingQuestion) {
      CanvasRenderer.drawRectangle(canvas, 350, 100, 800, 160, 'white');
      CanvasRenderer.fillRectangle(canvas, 350, 100, 800, 160, 'black');
      CanvasRenderer.fillRectangle(canvas, 360, 110, 780, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 160, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 360, 210, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 760, 160, 380, 40, 'white');
      CanvasRenderer.fillRectangle(canvas, 760, 210, 380, 40, 'white');
      CanvasRenderer.writeText(canvas, `${this.currentQuestion}`, 365, 135, 'left', 'sans-serif', 16, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[0]}`, 365, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[1]}`, 365, 240, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[2]}`, 765, 190, 'left', 'sans-serif', 20, 'black');
      CanvasRenderer.writeText(canvas, `${this.answers[3]}`, 765, 240, 'left', 'sans-serif', 20, 'black');

      if (this.isDisplayingAnswerAndExplanation) {
        if (this.isAnswerCorrect) {
          CanvasRenderer.fillRectangle(canvas, 350, 261, 800, 100, 'black');
          CanvasRenderer.writeText(canvas, 'Correct Answer', 365, 280, 'left', 'sans-serif', 20, 'green');
        } else {
          CanvasRenderer.fillRectangle(canvas, 350, 261, 800, 100, 'black');
          CanvasRenderer.writeText(canvas, 'Wrong Answer', 365, 280, 'left', 'sans-serif', 20, 'red');
        }
        CanvasRenderer.writeText(canvas, `${this.explanation}`, 365, 300, 'left', 'sans-serif', 20, 'white');
        CanvasRenderer.writeText(canvas, 'Press Enter to continue', 365, 320, 'left', 'sans-serif', 20, 'yellow');
      }
    }
  }
}
