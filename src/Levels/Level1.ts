import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Scene from '../Scene.js';
import Speler from '../Speler.js';
import Enemie from '../Enemie.js';
import Question from '../Questions/Question1.js';
import OpenWereld2 from '../Openwerelden/OpenWereld2.js';
import Hearts from '../Hearts.js';
import HeartsPlayer from '../HeartsPlayer.js';
import OpenWereld from '../Openwerelden/OpenWereld.js';

export default class Level1 extends Scene {
  private goToNextScene: boolean;
  private player: Speler;
  private enemie: Enemie;
  private logo: HTMLImageElement;
  private hearts: Hearts;
  private heartsPlayer: HeartsPlayer;
  private isDisplayingQuestion: boolean;
  private isDisplayingAnswerAndExplanation: boolean;
  private isPlayerAnswering: boolean;
  private questions: Question[] = [];
  private dumpQuestions: Question[] = [];
  private currentQuestion: string;
  private dungeonSpeler: HTMLImageElement;
  private dungeonEnemy: HTMLImageElement;
  private answers: string[] = [];
  private correctAnswer: boolean;
  private explanation: string;
  private escPressed: boolean;
  private showImage: boolean;
  private image: HTMLImageElement;
  private scorePlayer: number = 3;
  private scoreEnemie: number = 3;

  // Voeg de ontbrekende eigenschap toe
  private isAnswerCorrect: boolean; // <-- Hier

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
    this.image = CanvasRenderer.loadNewImage('./assets/Controlsscreen 1.png');
    this.dungeonSpeler = CanvasRenderer.loadNewImage('./assets/dungeonspeler.png');
    this.dungeonEnemy = CanvasRenderer.loadNewImage('./assets/Grass_tanky.png');
    this.escPressed = false;
    this.showImage = false;
    this.scoreEnemie = 3;
    this.scorePlayer = 3;
    this.hearts = new Hearts(maxX);
    this.heartsPlayer = new HeartsPlayer();
  }

  public decreasePlayerLives(): void {
    this.hearts.decreaseLives();
  }

  public override processInput(mouseListener: MouseListener, keyListener: KeyListener): void {
    this.handleEscapeKey(keyListener);
    this.handleMouseClick(mouseListener);
    this.handleAnswerInput(keyListener);
    this.handleEnterKey(keyListener);
  }

  private handleEscapeKey(keyListener: KeyListener): void {
    if (keyListener.isKeyDown(KeyListener.KEY_ESC)) {
      if (!this.escPressed) {
        this.showImage = !this.showImage;
        this.escPressed = true;
      }
    } else {
      this.escPressed = false;
    }
  }

  private handleMouseClick(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.goToNextScene = true;
    }
  }

  private handleAnswerInput(keyListener: KeyListener): void {
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
  }

  private handleEnterKey(keyListener: KeyListener): void {
    if (this.isDisplayingQuestion && this.isDisplayingAnswerAndExplanation) {
      if (keyListener.keyPressed(KeyListener.KEY_ENTER)) {
        this.isDisplayingAnswerAndExplanation = false;
        this.moveToNextQuestion();
      }
    }
  }

  private checkAnswer(selectedAnswer: string): void {
    this.isAnswerCorrect = selectedAnswer === this.correctAnswer.toString(); // Dit was het probleem
    if (this.isAnswerCorrect) {
      this.scoreEnemie -= 1;
      this.decreasePlayerLives();
    } else {
      this.scorePlayer -= 1;
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
    this.recycleQuestions();
  }

  private recycleQuestions(): void {
    if (this.questions.length > 1) {
      this.dumpQuestions.push(this.questions.splice(Math.floor(Math.random() * this.questions.length), 1)[0]);
    } else {
      this.dumpQuestions.push(this.questions.pop() as Question);
    }

    if (this.questions.length <= 0) {
      this.questions = [...this.dumpQuestions];
      this.dumpQuestions = [];
    }
  }

  public override update(elapsed: number): void {
    if (this.isDisplayingQuestion && !this.isPlayerAnswering) {
      this.setRandomQuestion();
      this.hearts.update(elapsed);
      this.handleLifeUpdates(elapsed);
    }
  }

  private setRandomQuestion(): void {
    const randomNumber: number = Math.floor(Math.random() * this.questions.length);
    this.currentQuestion = Object.values(this.questions[randomNumber])[0];
    this.answers = Array(...Object.values(this.questions[randomNumber])[1]);
    this.correctAnswer = Object.values(this.questions[randomNumber])[2];
    this.explanation = Object.values(this.questions[randomNumber])[3];
    this.isPlayerAnswering = true;
    this.isDisplayingAnswerAndExplanation = false;
    this.dumpQuestions.push(this.questions.splice(randomNumber, 1)[0]);
    this.recycleQuestions();
  }

  private handleLifeUpdates(elapsed: number): void {
    if (this.isDisplayingAnswerAndExplanation && this.isAnswerCorrect) {
      this.hearts.decreaseLives();
    } else if (this.isDisplayingAnswerAndExplanation && !this.isAnswerCorrect) {
      this.heartsPlayer.update(elapsed);
      this.heartsPlayer.decreaseLives();
    }
  }

  public override getNextScene(): Scene {
    if (this.scoreEnemie <= 0) {
      return new OpenWereld2(this.maxX, this.maxY);
    } else if (this.scorePlayer <= 0) {
      return new OpenWereld(this.maxX, this.maxY);
    }
    return this;
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'black');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2.1 - this.logo.height / 2);
    CanvasRenderer.drawImage(canvas, this.dungeonSpeler, canvas.width / 4 - this.dungeonSpeler.width / 2, canvas.height / 1.53 - this.dungeonSpeler.height / 2);
    CanvasRenderer.drawImage(canvas, this.dungeonEnemy, canvas.width / 1.3 - this.dungeonEnemy.width / 2, canvas.height / 1.55 - this.dungeonEnemy.height / 2);

    this.renderQuestion(canvas);
    this.renderAnswerExplanation(canvas);
    this.hearts.render(canvas);
    this.heartsPlayer.render(canvas);
  }

  private renderQuestion(canvas: HTMLCanvasElement): void {
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
    }
  }

  private renderAnswerExplanation(canvas: HTMLCanvasElement): void {
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
      CanvasRenderer.writeText(canvas, 'Press Enter to continue', 365, 445, 'left', 'sans-serif', 16, 'white');
    }
  }
}

