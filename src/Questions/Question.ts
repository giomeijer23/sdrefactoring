export default class Question {
  public static question: Question[] = [
    {
      question: 'Na hoeveel tijd heb je een pauze nodig als je achter een scherm zit? (computer ,nintendo switch, playstation)',
      answers: [
        'A 60 min',
        'B 30 min',
        'C 120 min',
        'D 90 min',
      ],
      correctAnswer: 'C 120 min',
      explanation: 'Test',
    },
    {
      question: 'Wat is een sterk wachtwoord?',
      answers: [
        'A WZAWZDB',
        'B HetIsPatat',
        'C Wachtwoord',
        'D #1Patat12?'
      ],
      correctAnswer: 'D #1Patat12?',
      explanation: 'Test1',
    },
    {
      question: 'Welke informatie zou je nooit met vreemden moeten delen?',
      answers: [
        'A Persoonlijke informatie',
        'B Het weer en nieuwsbericht',
        'C Hobby',
        'D Je mening'
      ],
      correctAnswer: 'A Persoonlijke informatie',
      explanation: 'Test2',
    },
    {
      question: 'Which is a characteristc of an identity thief?',
      answers: [
        'A They steal your clothes',
        'B They steal personal information',
        'C They steal your favorite sandwich',
        'D Test'
      ],
      correctAnswer: 'B They steal personal information',
      explanation: 'Identity thieves steal personal information',
    },
    {
      question: 'Which link does NOT look reliable?',
      answers: [
        'A https://www.learn_for_free.com',
        'B http://www.learn_and_practice.com',
        'C https://www.learn_or_win.com',
        'D https://hz.nl'
      ],
      correctAnswer: 'B http://www.learn_and_practice.com',
      explanation: 'HTTP is not a certified website, so avoid loging into them and sharing personal information',
    },
    {
      question: 'One of your friends sends you a weird link on instagram. What do you do?',
      answers: [
        'A You open it since your friend sent it to you',
        'B You ask your friend first what the link is about',
        'C You open it in your computer instead of your phone',
        'D Test'
      ],
      correctAnswer: 'B You ask your friend first what the link is about',
      explanation: 'First ask your friend to verify if he sent you the link since his account could have been stolen',
    },
    {
      question: 'You get an unknown message that you have won the newest iPhone and they need your address. What do you do?',
      answers: [
        'A You ask them to send it to your school',
        'B You ignore it and delete the message.',
        'C You send the address to get the iPhone quickly.',
        'D Test'
      ],
      correctAnswer: 'B You ignore it and delete the message.',
      explanation: 'Nothing is for free. This is a way identity thieves use to steal personal information.',
    },
    {
      question: 'Which person could probably steal your identity online?',
      answers: [
        'A Your parents',
        'B Your teachers',
        'C A friend you met online',
        'D Test'
      ],
      correctAnswer: 'C A friend you met online',
      explanation: 'Do not trust or share personal information with people you met online',
    },
    {
      question: 'What does identity theft mean?',
      answers: [
        'A It means stealing the purse of a woman when she does not see in the train',
        'B It means to dress and act like someone else',
        'C It means using the personal information of another person without their permission to obtain benefits',
        'D Test '
      ],
      correctAnswer: 'C It means using the personal information of another person without their permission to obtain benefits',
      explanation: 'Identity theft is using the personal information of someone else wihtout them knowing for personal gain',
    },
    {
      question: 'How often is it recommended to change passwords?',
      answers: [
        'A Every 3 months',
        'B Every year',
        'C Every decade',
        'D Never, it should be same every time'
      ],
      correctAnswer: 'A Every 3 months',
      explanation: 'Cybersecurity experts recommend changing your password every 3 months not to get your account stolen',
    },
    {
      question: 'Does security software solve a problem with identity theft?',
      answers: [
        'A Yes, every security software',
        'B No',
        'C Test',
        'D Yes, but only paid security software'
      ],
      correctAnswer: 'B No',
      explanation: 'To prevent from identity theft, you need basically not to give personal data to inappropiate websites',
    },
    {
      question: 'Can browser additions follow your key typing or see what data you give?',
      answers: [
        'A Yes',
        'B No',
        'C Test',
        'D It is unknown'
      ],
      correctAnswer: 'A Yes',
      explanation: 'Browser additions can follow your activity, so you need to be careful with them',
    },
  ];
  
  public static dumpQuestions: Question[] = [];
}
