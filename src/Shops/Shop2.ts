/* eslint-disable max-len */
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import OpenWereld5 from '../Openwerelden/OpenWereld5.js';
import Scene from '../Scene.js';

export default class Shop2 extends Scene {
  /**
   *
   * @param elapsed -
   */
  public override update(elapsed: number): void {

  }

  private logo: HTMLImageElement;

  private goToNextScene: boolean;

  private textScene: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.goToNextScene = false;
    this.textScene = false;
    this.logo = CanvasRenderer.loadNewImage('./assets/NPC_snow_house 3.png');
  }


  /**
   *
   * @param mouseListener t
   * @param keylistener t
   */
  public override processInput(mouseListener: MouseListener, keylistener: KeyListener): void {
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
    if (keylistener.keyPressed(KeyListener.KEY_ENTER)) {
      this.goToNextScene = true;
    }
    if (keylistener.keyPressed(KeyListener.KEY_SPACE)) {
      this.goToNextScene = true;
    }
    if (keylistener.keyPressed(KeyListener.KEY_F)) {
      this.textScene = false;
    }
  }

  public override getNextScene(): Scene | null {
    if (this.goToNextScene) {
      return new OpenWereld5(this.maxX, this.maxY);
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
      const lines: string[] = ['Verify sender\'s email against official domain for legitimacy.', 'Trustworthy emails have quality content: watch for errors and urgent requests.', 'Be cautious of phishing emails, verify unexpected ones through official channels.', 'Hover over links to preview URLs, ensuring alignment with context.', '"https://" signifies a secure website; avoid personal info on "http://" sites.', ' Check link sources, especially in emails, to verify legitimacy.', ' Secure sites display padlock and "https"; verify before sharing sensitive data.', 'Verify clear contact details on trustworthy websites before engagement.', 'Check user reviews before trusting a website; caution with negative reviews.', 'Exercise caution with sites lacking online presence or positive recommendations.', 'Press Key F']; // Voeg elke regel tekst toe aan dit array
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
  }
}
