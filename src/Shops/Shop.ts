/* eslint-disable max-len */
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import OpenWereld1 from '../Openwerelden/OpenWereld1.js';
import Scene from '../Scene.js';

export default class Shop extends Scene {
  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  private textScene: boolean;

  private escPressed: boolean;

  private showImage: boolean;

  private image: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.textScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/NPC_grass_house 3.png');
    this.image = CanvasRenderer.loadNewImage('./assets/Controlsscreen 1.png');
    this.escPressed = false;
    this.showImage = false;
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
    const mouseX: number = mouseListener.getMousePosition().x;
    const mouseY: number = mouseListener.getMousePosition().y;

    const xRegions: { lb: number; rb: number; } = { lb: 67, rb: 386 };
    const yRegions: { lo: number; ro: number } = { ro: 122, lo: 0 };


    if (
      mouseX >= xRegions.lb && mouseX <= xRegions.rb &&
      mouseY >= yRegions.lo && mouseY <= yRegions.ro
    ) {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.textScene = true;
      }
    }
    if (keyListener.keyPressed(KeyListener.KEY_ENTER)) {
      this.goToNextScene = true;
    }
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.goToNextScene = true;
    }
    if (keyListener.keyPressed(KeyListener.KEY_F)) {
      this.textScene = false;
    }
  }

  /**
   *
   * @param elapsed t
   */
  public override update(elapsed: number): void {
  }

  public override getNextScene(): Scene | null {
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
    CanvasRenderer.fillCanvas(canvas, 'rgb(0, 0, 0)');
    CanvasRenderer.drawImage(canvas, this.logo, canvas.width / 2 - this.logo.width / 2, canvas.height / 2 - this.logo.height / 2);
    if (this.textScene) {
      const lines: string[] = ['Online privacy is essential for personal security in the digital realm,', ' ensuring confidence in protecting personal information from unauthorized access.', ' It includes identity protection against theft and securing sensitive data like financial and medical records.', ' Cookies and tracking technologies enhance online experiences but raise privacy concerns.', ' Users must manage cookie settings and be aware of tracking practices', ' for a balanced approach to personalization and privacy.', ' Firewalls are crucial in network security, acting as a barrier between trusted internal networks and the internet.', ' They monitor and control traffic, preventing unauthorized access and ensuring the confidentiality of sensitive data.', 'Press Key F']; // Voeg elke regel tekst toe aan dit array
      const x: number = canvas.width / 2;
      const y: number = canvas.height / 2;
      const textAlign: CanvasTextAlign = 'center';
      const font: string = 'arial';
      const fontSize: number = 30;
      const padding: number = 10; // Extra padding rond de tekst

      // Canvas context ophalen
      const context: CanvasRenderingContext2D = canvas.getContext('2d');

      // Bereken de totale hoogte van alle regels tekst
      const totalHeight: number = lines.length * fontSize;

      // Bereken de maximale breedte van alle regels tekst
      const maxWidth: number = lines.reduce((max: number, line: string) => {
        const lineWidth: number = context.measureText(line).width;
        return Math.max(max, lineWidth);
      }, 0);

      // Bereken de breedte en hoogte van het witte vak op basis van de tekst en padding
      const backgroundWidth: number = maxWidth + 2 * padding;
      const backgroundHeight: number = totalHeight + 2 * padding;

      // Witte rechthoek tekenen als achtergrond
      context.fillStyle = 'white';
      context.fillRect(x - backgroundWidth / 2, y - backgroundHeight / 2, backgroundWidth, backgroundHeight);

      // Tekst tekenen met de default zwarte kleur
      context.fillStyle = 'black';
      context.font = `${fontSize}px ${font}`;
      context.textAlign = textAlign;

      // Loop door elke regel tekst en teken deze onder elkaar
      for (let i: number = 0; i < lines.length; i++) {
        const lineHeight: number = fontSize; // Hoogte van elke regel
        const lineY: number = y - totalHeight / 2 + i * lineHeight + lineHeight / 2;
        context.textBaseline = 'middle';
        context.fillText(lines[i], x, lineY);
      }
    }
    if (this.showImage) {
      // eslint-disable-next-line max-len
      CanvasRenderer.drawImage(canvas, this.image, canvas.width / 2 - this.image.width / 2, canvas.height / 2 - this.image.height / 2);
    }
  }
}
