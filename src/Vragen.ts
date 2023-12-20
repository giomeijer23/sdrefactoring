/* eslint-disable max-len */
export default class Vragen {
  public question: string;

  public options: string[];

  public correctOption: string;

  public givenVragen: number;

  public mistakes: number;

  public correct: boolean;

  public askUniqueVragen: string;

  public indexOfQuestion: number = 0;

  public constructor(question: string, options: string[], correctOption: string) {
    this.question = question;
    this.options = options;
    this.correctOption = correctOption;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getOptions(): string[] {
    return this.options;
  }

  public getCorrectOption(): string {
    return this.correctOption;
  }
}

