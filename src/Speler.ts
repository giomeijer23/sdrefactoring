import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Speler extends CanvasItem {
  private maxY: number;

  private maxX: number;

  private speed: number = 0.5;

  private movingLeft: boolean = false;

  private movingUp: boolean = false;

  private movingDown: boolean = false;

  private movingRight: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.posX = 194;
    this.posY = 261;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  // Movement methods
  /**
   *
   */
  public moveLeft(): void {
    this.movingLeft = true;
  }

  /**
   *
   */
  public moveRight(): void {
    this.movingRight = true;
  }

  /**
   *
   */
  public moveUp(): void {
    this.movingUp = true;
  }

  /**
   *
   */
  public moveDown(): void {
    this.movingDown = true;
  }

  // Update method
  /**
   *
   * @param elapsed -
   */
  // Inside Speler class
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
      if (this.posY + this.image.height > this.maxY) {
        this.posY = this.maxY - this.image.height;
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
      if (this.posX + this.image.width > this.maxX) {
        this.posX = this.maxX - this.image.width;
      }
      this.movingRight = false;
    }
  }


  // Render method
  /**
   *
   * @param canvas -
   */
  // Inside Speler class
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
