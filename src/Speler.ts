import CanvasRenderer from './CanvasRenderer.js';

export default class Speler {
  private posX: number;

  private posY: number;

  private image: HTMLImageElement;

  private maxX: number;

  private speed: number = 0.4;

  private movingLeft: boolean = false;

  private movingUp: boolean = false;

  private movingDown: boolean = false;

  private movingRight: boolean = false;

  public constructor(canvasWidth: number, canvasHeight: number) {
    this.image = CanvasRenderer.loadNewImage('assets/player.png');
    this.posX = 140;
    this.posY = canvasHeight / 2;
    this.maxX = canvasWidth;
  }

  /**
   * Sets a flag that the player is going to move left
   */
  public moveLeft(): void {
    this.movingLeft = true;
  }

  /**
   * Sets a flag that the player is going to move right
   */
  public moveRight(): void {
    this.movingRight = true;
  }

  /**
   * Laat de speler omhoog lopen
   */
  public moveUp(): void {
    this.movingUp = true;
  }

  /**
   * Laat de speler omlaag lopen
   */
  public moveDown(): void {
    this.movingDown = true;
  }

  /**
   * Update the position of the player. If the the movingLEft or movingRight
   * flag has been set, the player will move accordingly.
   * @param elapsed the number of ms that has passed since the last update
   */
  public update(elapsed: number): void {
    if (this.movingUp) {
      this.posY -= this.speed * elapsed;
      if (this.posY < 0) {
        this.posY = 0;
      }
      this.movingUp = false;
    }
    if (this.movingDown) {
      this.posY += this.speed * elapsed;
      if (this.posY+ (this.image.width) > this.maxX) {
        this.posY = this.maxX - (this.image.width);
      }
      this.movingDown = false;
    }
    if (this.movingLeft) {
      this.posX -= this.speed * elapsed;
      if (this.posX < 0) {
        this.posX = 0;
      }
      this.movingLeft = false;
    }

    if (this.movingRight) {
      this.posX += this.speed * elapsed;
      if (this.posX < 0) {
        this.posX = 0;
      }
      this.movingRight = false;
    }
  }

  /**
   * Render the GameItem to the canvas
   *
   * @param canvas canvas to render the GameItem to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}

