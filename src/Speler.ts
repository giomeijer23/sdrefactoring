import CanvasRenderer from './CanvasRenderer.js';

export default class Speler {
  private posX: number;

  private posY: number;

  private level1Completed: boolean = false;

  private image: HTMLImageElement;

  private maxY: number;

  private maxX: number;

  private speed: number = 0.5;

  private movingLeft: boolean = false;

  private movingUp: boolean = false;

  private movingDown: boolean = false;

  private movingRight: boolean = false;

  private hasCollision: boolean = false;

  private showCollisionMessage: boolean = false;

  private firstCollisionOccurred: boolean = false;

  private keyEPressed: boolean = false;

  public constructor(canvasWidth: number, canvasHeight: number) {
    this.image = CanvasRenderer.loadNewImage('assets/player.png');
    this.posX = 840;
    this.posY = 160;
    this.maxX = canvasWidth;
    this.maxY = canvasHeight;
  }

  public setLevel1Completed(completed: boolean): void {
    this.level1Completed = completed;
  }

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

  private handleCollision(): void {
    if (!this.hasCollision && !this.level1Completed) {
      // Original collision logic for Level 1
      this.hasCollision = true;
      this.showCollisionMessage = true;
    } else if (!this.hasCollision && this.level1Completed) {
      // New collision logic for Level 2 (adjust as needed)
      // Example: Change position or do something specific for Level 2
      this.hasCollision = true;
      this.showCollisionMessage = true;
      this.level1Completed = false; // Reset level1Completed after Level 2 collision
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public isCollidingDungeon(): void {

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

    const tolerance: number = 15;

    if (!this.firstCollisionOccurred) {
      if (Math.abs(this.posY - 90) < tolerance && Math.abs(this.posX - 465) < tolerance) {
        this.handleCollision();
        this.firstCollisionOccurred = true;
      }
    }
  }

  /**
   *
   * @param canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);

    if (this.showCollisionMessage) {
      // Render your collision message at the top of the canvas
      const messageDiv: HTMLDivElement = document.createElement('div');
      messageDiv.innerHTML = 'Druk op toets E';
      messageDiv.style.position = 'absolute';
      messageDiv.style.top = '350px'; // Adjust the top position as needed
      messageDiv.style.left = '40%';
      // messageDiv.style.transform = 'translateX(-50%)';
      messageDiv.style.fontSize = '50px';
      messageDiv.style.color = 'gold';
      document.body.appendChild(messageDiv);

      // Remove the message after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        document.body.removeChild(messageDiv);
        this.showCollisionMessage = false;
        this.hasCollision = false; // Reset collision flag after the message is displayed
      }, 1000); // Adjust the delay as needed
    }
  }
}
