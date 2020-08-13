export default [
  {
    id: 100,
    question: 'Inside which HTML element do we put the JavaScript?',
    time: 25,
    answers: [
      {
        text: '<scripting>',
        correct: false,
      },
      {
        text: '<script>',
        correct: true,
      },
      {
        text: '<javascript>',
        correct: false,
      },
      {
        text: '<js>',
        correct: false,
      },
    ],
  },
  {
    id: 101,
    question: 'Where is the correct place to insert a JavaScript?',
    time: 30,
    answers: [
      {
        text: 'Both the <head> section and the <body> section are correct',
        correct: true,
      },
      {
        text: 'The <head> section',
        correct: false,
      },
      {
        text: 'The <body> section',
        correct: false,
      },
      {
        text: 'None of the above',
        correct: false,
      },
    ],
  },
  {
    id: 102,
    question: 'Which operator returns true if the two compared values are not equal?',
    time: 20,
    answers: [
      {
        text: '<>',
        correct: false,
      },
      {
        text: '~',
        correct: false,
      },
      {
        text: '==!',
        correct: false,
      },
      {
        text: '!==',
        correct: true,
      },
    ],
  },
  {
    id: 103,
    question: 'Review the code below. Which statement calls the addTax function and passes 50 as an argument?',
    code: 'function addTax(total){\n  return total * 1.05;\n}',
    time: 60,
    answers: [
      {
        text: 'addTax = 50;',
        correct: false,
      },
      {
        text: 'return addTax 50;',
        correct: false,
      },
      {
        text: 'addTax(50);',
        correct: true,
      },
      {
        text: 'addTax 50;',
        correct: false,
      },
    ],
  },
  {
    id: 104,
    question: 'Which statement is the correct way to create a variable called rate and assign it the value 100?',
    time: 60,
    answers: [
      {
        text: 'let rate = 100;',
        correct: true,
      },
      {
        text: 'let 100 = rate;',
        correct: false,
      },
      {
        text: '100 = let rate;',
        correct: false,
      },
      {
        text: 'rate == 100;',
        correct: false,
      },
    ],
  },
  {
    id: 105,
    question: 'How would you reference the text <b>avenue</b> in the code shown?',
    code: 'let roadTypes = [\'street\', \'road\', \'avenue\', \'circle\'];',
    time: 30,
    answers: [
      {
        text: 'roadTypes.2',
        correct: false,
      },
      {
        text: 'roadTypes[3]',
        correct: false,
      },
      {
        text: 'roadTypes.3',
        correct: false,
      },
      {
        text: 'roadTypes[2]',
        correct: true,
      },
    ],
  },
  {
    id: 106,
    question: 'What is the value of dessert.type after executing this code?',
    code: 'const dessert = { type: \'pie\' };\ndessert.type = \'pudding\';',
    time: 50,
    answers: [
      {
        text: 'pie',
        correct: false,
      },
      {
        text: 'The code will throw an error.',
        correct: false,
      },
      {
        text: 'undefined',
        correct: false,
      },
      {
        text: 'pudding',
        correct: true,
      },
    ],
  },
  {
    id: 107,
    question: 'What would be the result in the console of running this code?',
    code: 'for (var i=0; i<5; i++){\n console.log(i);\n}',
    time: 35,
    answers: [
      {
        text: '12345',
        correct: false,
      },
      {
        text: '1234',
        correct: false,
      },
      {
        text: '01234',
        correct: true,
      },
      {
        text: '012345',
        correct: false,
      },
    ],
  },
];
