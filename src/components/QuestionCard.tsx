import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
type QuestionCardProps = {
  subject: string;
  difficulty: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
};
type Option = {
  value: string | number;
  isCorrect: boolean;
};
type QuestionType = {
  question: string;
  displayContent: React.ReactNode;
  options: Option[];
};

const ANIMAL_QUIZ_ITEMS = [
  { word: 'Cat', emoji: '🐱' }, // taste-skill-ignore
  { word: 'Dog', emoji: '🐶' }, // taste-skill-ignore
  { word: 'Bird', emoji: '🐦' }, // taste-skill-ignore
  { word: 'Fish', emoji: '🐠' }, // taste-skill-ignore
  { word: 'Duck', emoji: '🦆' }, // taste-skill-ignore
  { word: 'Snake', emoji: '🐍' }, // taste-skill-ignore
  { word: 'Cow', emoji: '🐄' }, // taste-skill-ignore
  { word: 'Sheep', emoji: '🐑' }, // taste-skill-ignore
  { word: 'Chicken', emoji: '🐔' }, // taste-skill-ignore
  { word: 'Chick', emoji: '🐥' }, // taste-skill-ignore
  { word: 'Mouse', emoji: '🐭' }, // taste-skill-ignore
  { word: 'Pig', emoji: '🐷' }, // taste-skill-ignore
  { word: 'Koala', emoji: '🐨' }, // taste-skill-ignore
  { word: 'Bear', emoji: '🐻' }, // taste-skill-ignore
  { word: 'Wolf', emoji: '🐺' }, // taste-skill-ignore
  { word: 'Fox', emoji: '🦊' }, // taste-skill-ignore
  { word: 'Penguin', emoji: '🐧' }, // taste-skill-ignore
  { word: 'Frog', emoji: '🐸' }, // taste-skill-ignore
  { word: 'Lion', emoji: '🦁' }, // taste-skill-ignore
  { word: 'Tiger', emoji: '🐯' } // taste-skill-ignore
];

export function QuestionCard({
  subject,
  difficulty,
  onCorrectAnswer,
  onWrongAnswer
}: QuestionCardProps) {
  const {
    questionCount
  } = useGameContext();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
  const shuffleOptions = (options: Option[]) => {
    return [...options].sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    let newQuestion: QuestionType;
    if (subject === 'math') {
      if (difficulty === 'easy') {
        // Elementary Level Math (Ages 6-10)
        const questionType = Math.floor(Math.random() * 5);
        if (questionType === 0) {
          // Basic Arithmetic - Addition and subtraction (1-100)
          const operation = Math.random() > 0.5 ? '+' : '-';
          const num1 = Math.floor(Math.random() * 50) + 1;
          const num2 = operation === '+' ? Math.floor(Math.random() * 50) + 1 : Math.floor(Math.random() * num1) + 1; // Ensure positive result for subtraction
          const answer = operation === '+' ? num1 + num2 : num1 - num2;
          newQuestion = {
            question: `${num1} ${operation} ${num2} = ?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                {num1} {operation} {num2} = ?
              </span>
            </div>,
            options: [{
              value: answer,
              isCorrect: true
            }, {
              value: answer + Math.floor(Math.random() * 5) + 1,
              isCorrect: false
            }, {
              value: answer - Math.floor(Math.random() * 5) + 1,
              isCorrect: false
            }]
          };
        } else if (questionType === 1) {
          // Basic Arithmetic - Multiplication (1-10 tables)
          const num1 = Math.floor(Math.random() * 10) + 1;
          const num2 = Math.floor(Math.random() * 10) + 1;
          const answer = num1 * num2;
          newQuestion = {
            question: `${num1} × ${num2} = ?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                {num1} × {num2} = ?
              </span>
            </div>,
            options: [{
              value: answer,
              isCorrect: true
            }, {
              value: answer + Math.floor(Math.random() * 5) + 1,
              isCorrect: false
            }, {
              value: answer - Math.floor(Math.random() * 5) + 1,
              isCorrect: false
            }]
          };
        } else if (questionType === 2) {
          // Number Sense - Odd and even numbers
          const num = Math.floor(Math.random() * 100) + 1;
          const isEven = num % 2 === 0;
          newQuestion = {
            question: `Is the number ${num} odd or even?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">{num}</span>
            </div>,
            options: [{
              value: isEven ? 'Even' : 'Odd',
              isCorrect: true
            }, {
              value: isEven ? 'Odd' : 'Even',
              isCorrect: false
            }, {
              value: 'Neither',
              isCorrect: false
            }]
          };
        } else if (questionType === 3) {
          // Geometry Basics - Recognizing 2D shapes
          const shapes = [{
            name: 'Circle',
            image: '⭕'
          }, {
            name: 'Square',
            image: '⬛' // taste-skill-ignore
          }, {
            name: 'Triangle',
            image: '▲'
          }, {
            name: 'Rectangle',
            image: '▬'
          }];
          const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];
          newQuestion = {
            question: `What shape is this?`,
            displayContent: <div className="text-7xl my-6 text-center">
              {selectedShape.image}
            </div>,
            options: shuffleOptions([{
              value: selectedShape.name,
              isCorrect: true
            }, {
              value: shapes.filter(s => s.name !== selectedShape.name)[0].name,
              isCorrect: false
            }, {
              value: shapes.filter(s => s.name !== selectedShape.name)[1].name,
              isCorrect: false
            }])
          };
        } else {
          // Simple counting with stars
          const num = Math.floor(Math.random() * 5) + 1;
          const stars = Array(num).fill('★').join(' '); // taste-skill-ignore
          newQuestion = {
            question: 'How many stars do you see?',
            displayContent: <div className="text-5xl my-6 tracking-wider text-[#d0106f]">
              {stars}
            </div>,
            options: [{
              value: num,
              isCorrect: true
            }, {
              value: num + 1,
              isCorrect: false
            }, {
              value: num > 1 ? num - 1 : num + 2,
              isCorrect: false
            }]
          };
        }
      } else if (difficulty === 'medium') {
        // Middle School Level Math (Ages 11-14)
        const questionType = Math.floor(Math.random() * 5);
        if (questionType === 0) {
          // Advanced Arithmetic - Factors and multiples
          const num = Math.floor(Math.random() * 20) + 10; // Numbers between 10-30
          const factors = [];
          for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
              factors.push(i);
            }
          }
          const randomFactor = factors[Math.floor(Math.random() * factors.length)];
          newQuestion = {
            question: `Which of these is a factor of ${num}?`,
            displayContent: null,
            options: [{
              value: randomFactor,
              isCorrect: true
            }, {
              value: randomFactor + 1,
              isCorrect: false
            }, {
              value: randomFactor + 2,
              isCorrect: false
            }]
          };
        } else if (questionType === 1) {
          // Fractions & Decimals
          const fraction1 = {
            numerator: Math.floor(Math.random() * 5) + 1,
            denominator: Math.floor(Math.random() * 5) + 5
          };
          const fraction2 = {
            numerator: Math.floor(Math.random() * 5) + 1,
            denominator: fraction1.denominator // Same denominator for simplicity
          };
          const sum = (fraction1.numerator + fraction2.numerator) / fraction1.denominator;
          newQuestion = {
            question: `What is ${fraction1.numerator}/${fraction1.denominator} + ${fraction2.numerator}/${fraction2.denominator}?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                {fraction1.numerator}/{fraction1.denominator} +{' '}
                {fraction2.numerator}/{fraction2.denominator}
              </span>
            </div>,
            options: [{
              value: `${fraction1.numerator + fraction2.numerator}/${fraction1.denominator}`,
              isCorrect: true
            }, {
              value: `${fraction1.numerator + fraction2.numerator + 1}/${fraction1.denominator}`,
              isCorrect: false
            }, {
              value: `${fraction1.numerator + fraction2.numerator - 1}/${fraction1.denominator}`,
              isCorrect: false
            }]
          };
        } else if (questionType === 2) {
          // Pre-Algebra - Simple equations
          const x = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          const result = x + b;
          newQuestion = {
            question: `If x + ${b} = ${result}, what is the value of x?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                x + {b} = {result}
              </span>
            </div>,
            options: [{
              value: x,
              isCorrect: true
            }, {
              value: x + 1,
              isCorrect: false
            }, {
              value: x - 1,
              isCorrect: false
            }]
          };
        } else if (questionType === 3) {
          // Geometry - Perimeter and area
          const length = Math.floor(Math.random() * 10) + 5;
          const width = Math.floor(Math.random() * 5) + 3;
          const area = length * width;
          const perimeter = 2 * (length + width);
          const isAreaQuestion = Math.random() > 0.5;
          newQuestion = {
            question: isAreaQuestion ? `What is the area of a rectangle with length ${length} and width ${width}?` : `What is the perimeter of a rectangle with length ${length} and width ${width}?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <div className="text-xl font-bold text-blue-700 mb-2">
                Rectangle
              </div>
              <div>Length: {length} units</div>
              <div>Width: {width} units</div>
            </div>,
            options: [{
              value: isAreaQuestion ? area : perimeter,
              isCorrect: true
            }, {
              value: isAreaQuestion ? area + 5 : perimeter + 2,
              isCorrect: false
            }, {
              value: isAreaQuestion ? area - 3 : perimeter - 2,
              isCorrect: false
            }]
          };
        } else {
          // Original medium difficulty implementation
          const num1 = Math.floor(Math.random() * 5) + 1;
          const num2 = Math.floor(Math.random() * 3) + 1;
          const operation = Math.random() > 0.5 ? '+' : num1 > num2 ? '-' : '+';
          const answer = operation === '+' ? num1 + num2 : num1 - num2;
          newQuestion = {
            question: `${num1} ${operation} ${num2} = ?`,
            displayContent: null,
            options: [{
              value: answer,
              isCorrect: true
            }, {
              value: answer + 1,
              isCorrect: false
            }, {
              value: answer > 1 ? answer - 1 : answer + 2,
              isCorrect: false
            }]
          };
        }
      } else {
        // High School Level Math (Ages 15-18)
        const questionType = Math.floor(Math.random() * 5);
        if (questionType === 0) {
          // Algebra - Solving quadratic equations
          const a = 1;
          const b = Math.floor(Math.random() * 10) - 5; // Between -5 and 5
          const c = Math.floor(Math.random() * 10) - 5; // Between -5 and 5
          // Calculate discriminant
          const discriminant = b * b - 4 * a * c;
          let solution;
          if (discriminant >= 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            solution = x1 === x2 ? `x = ${x1.toFixed(1)}` : `x = ${x1.toFixed(1)} or x = ${x2.toFixed(1)}`;
          } else {
            solution = 'No real solutions';
          }
          newQuestion = {
            question: `Solve the quadratic equation: x² + ${b}x + ${c} = 0`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                x² + {b}x + {c} = 0
              </span>
            </div>,
            options: [{
              value: solution,
              isCorrect: true
            }, {
              value: discriminant >= 0 ? `x = ${((-b + Math.sqrt(discriminant)) / (2 * a) + 1).toFixed(1)}` : 'x = 1 or x = 2',
              isCorrect: false
            }, {
              value: discriminant >= 0 ? `x = ${((-b + Math.sqrt(discriminant)) / (2 * a) - 1).toFixed(1)}` : 'Complex solutions',
              isCorrect: false
            }]
          };
        } else if (questionType === 1) {
          // Geometry & Trigonometry - Pythagorean theorem
          const a = Math.floor(Math.random() * 5) + 3;
          const b = Math.floor(Math.random() * 5) + 4;
          const c = Math.sqrt(a * a + b * b);
          newQuestion = {
            question: `In a right triangle, if one leg is ${a} units and the other is ${b} units, what is the length of the hypotenuse?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <div className="text-xl font-bold text-blue-700 mb-2">
                Right Triangle
              </div>
              <div>Leg a: {a} units</div>
              <div>Leg b: {b} units</div>
              <div>Hypotenuse: ?</div>
            </div>,
            options: [{
              value: c.toFixed(2),
              isCorrect: true
            }, {
              value: (c + 1).toFixed(2),
              isCorrect: false
            }, {
              value: (c - 0.5).toFixed(2),
              isCorrect: false
            }]
          };
        } else if (questionType === 2) {
          // Statistics & Probability
          const numbers = Array.from({
            length: 5
          }, () => Math.floor(Math.random() * 20) + 1);
          const sum = numbers.reduce((a, b) => a + b, 0);
          const mean = sum / numbers.length;
          numbers.sort((a, b) => a - b);
          const median = numbers.length % 2 === 0 ? (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2 : numbers[Math.floor(numbers.length / 2)];
          newQuestion = {
            question: `Find the mean (average) of the following numbers: ${numbers.join(', ')}`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <div className="text-xl font-bold text-blue-700 mb-2">
                Numbers:
              </div>
              <div className="text-2xl">{numbers.join(', ')}</div>
            </div>,
            options: [{
              value: mean.toFixed(1),
              isCorrect: true
            }, {
              value: median.toFixed(1),
              isCorrect: false
            }, {
              value: (mean + 1).toFixed(1),
              isCorrect: false
            }]
          };
        } else if (questionType === 3) {
          // Functions - Linear functions
          const m = Math.floor(Math.random() * 5) + 1; // Slope
          const b = Math.floor(Math.random() * 10) - 5; // Y-intercept
          const x = Math.floor(Math.random() * 5);
          const y = m * x + b;
          newQuestion = {
            question: `If f(x) = ${m}x + ${b}, what is f(${x})?`,
            displayContent: <div className="bg-blue-50 p-4 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                f(x) = {m}x + {b}
              </span>
            </div>,
            options: [{
              value: y,
              isCorrect: true
            }, {
              value: y + 1,
              isCorrect: false
            }, {
              value: y - 1,
              isCorrect: false
            }]
          };
        } else {
          // Original hard difficulty implementation
          const num1 = Math.floor(Math.random() * 10) + 1;
          const num2 = Math.floor(Math.random() * 5) + 1;
          const operation = Math.random() > 0.5 ? '+' : num1 > num2 ? '-' : '+';
          const answer = operation === '+' ? num1 + num2 : num1 - num2;
          newQuestion = {
            question: `${num1} ${operation} ${num2} = ?`,
            displayContent: null,
            options: [{
              value: answer,
              isCorrect: true
            }, {
              value: answer + 1,
              isCorrect: false
            }, {
              value: answer > 1 ? answer - 1 : answer + 2,
              isCorrect: false
            }]
          };
        }
      }
    } else {
      // English questions (keeping the original implementation)
      if (difficulty === 'easy') {
        const letters = [{
          letter: 'A',
          icon: 'A',
          word: 'Apple'
        }, {
          letter: 'B',
          icon: 'B',
          word: 'Banana'
        }, {
          letter: 'C',
          icon: 'C',
          word: 'Cat'
        }, {
          letter: 'D',
          icon: 'D',
          word: 'Dog'
        }, {
          letter: 'E',
          icon: 'E',
          word: 'Elephant'
        }];
        const selected = letters[Math.floor(Math.random() * letters.length)];
        newQuestion = {
          question: `What letter does "${selected.word}" start with?`,
          displayContent: <div className="text-6xl font-bold my-6 text-[#d0106f]">{selected.word}</div>,
          options: [{
            value: selected.letter,
            isCorrect: true
          }, {
            value: letters[(letters.findIndex(l => l.letter === selected.letter) + 1) % letters.length].letter,
            isCorrect: false
          }, {
            value: letters[(letters.findIndex(l => l.letter === selected.letter) + 2) % letters.length].letter,
            isCorrect: false
          }]
        };
      } else if (difficulty === 'medium') {
        const animals = ANIMAL_QUIZ_ITEMS;
        const selectedIndex = Math.floor(Math.random() * animals.length);
        const selected = animals[selectedIndex];
        const wrongOptions: string[] = [];
        while (wrongOptions.length < 2) {
          const randomIndex = Math.floor(Math.random() * animals.length);
          const randomAnimal = animals[randomIndex].word;
          if (randomAnimal !== selected.word && !wrongOptions.includes(randomAnimal)) {
            wrongOptions.push(randomAnimal);
          }
        }
        newQuestion = {
          question: 'What animal is this?',
          displayContent: <div className="text-7xl my-6">{selected.emoji}</div>,
          options: [{
            value: selected.word,
            isCorrect: true
          }, {
            value: wrongOptions[0],
            isCorrect: false
          }, {
            value: wrongOptions[1],
            isCorrect: false
          }]
        };
      } else {
        const questionType = Math.random() > 0.5 ? 'animal' : 'vocabulary';
        if (questionType === 'animal') {
          const animals = ANIMAL_QUIZ_ITEMS;
          const selectedIndex = Math.floor(Math.random() * animals.length);
          const selected = animals[selectedIndex];
          const wrongOptions: string[] = [];
          while (wrongOptions.length < 2) {
            const randomIndex = Math.floor(Math.random() * animals.length);
            const randomAnimal = animals[randomIndex].word;
            if (randomAnimal !== selected.word && !wrongOptions.includes(randomAnimal)) {
              wrongOptions.push(randomAnimal);
            }
          }
          newQuestion = {
            question: 'What animal is this?',
            displayContent: <div className="text-7xl my-6">{selected.emoji}</div>,
            options: [{
              value: selected.word,
              isCorrect: true
            }, {
              value: wrongOptions[0],
              isCorrect: false
            }, {
              value: wrongOptions[1],
              isCorrect: false
            }]
          };
        } else {
          const nouns = ['book', 'table', 'house', 'car', 'dog', 'cat', 'tree', 'ball', 'school', 'family', 'friend', 'teacher', 'student', 'computer', 'phone', 'garden', 'park', 'flower', 'bird', 'city'];
          const verbs = ['run', 'jump', 'eat', 'sleep', 'play', 'write', 'read', 'sing', 'dance', 'swim', 'talk', 'walk', 'work', 'study', 'draw', 'paint', 'cook', 'drive', 'build', 'grow'];
          const adjectives = ['happy', 'sad', 'big', 'small', 'fast', 'slow', 'hot', 'cold', 'tall', 'short', 'good', 'bad', 'new', 'old', 'young', 'pretty', 'ugly', 'strong', 'weak', 'smart'];
          const partOfSpeechType = Math.floor(Math.random() * 3);
          let correctWord: string;
          let correctType: string;
          let incorrectTypes: string[];
          if (partOfSpeechType === 0) {
            correctWord = nouns[Math.floor(Math.random() * nouns.length)];
            correctType = 'Noun';
            incorrectTypes = ['Verb', 'Adjective'];
          } else if (partOfSpeechType === 1) {
            correctWord = verbs[Math.floor(Math.random() * verbs.length)];
            correctType = 'Verb';
            incorrectTypes = ['Noun', 'Adjective'];
          } else {
            correctWord = adjectives[Math.floor(Math.random() * adjectives.length)];
            correctType = 'Adjective';
            incorrectTypes = ['Noun', 'Verb'];
          }
          newQuestion = {
            question: `What part of speech is the word "${correctWord}"?`,
            displayContent: <div className="bg-blue-50 p-3 rounded-lg text-center my-4">
              <span className="text-3xl font-bold text-blue-700">
                {correctWord}
              </span>
            </div>,
            options: [{
              value: correctType,
              isCorrect: true
            }, {
              value: incorrectTypes[0],
              isCorrect: false
            }, {
              value: incorrectTypes[1],
              isCorrect: false
            }]
          };
        }
      }
    }
    setQuestion(newQuestion);
    setShuffledOptions(shuffleOptions(newQuestion.options));
  }, [subject, difficulty, questionCount]);
  if (!question || shuffledOptions.length === 0) {
    return <div className="bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8] w-full max-w-md flex justify-center items-center">
      <div className="text-[#000000] text-lg font-medium">Loading question...</div>
    </div>;
  }
  return <div className="bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8] w-full max-w-md">
    <h2 className="text-xl font-bold mb-4 text-[#000000]">
      Question {questionCount + 1}
    </h2>
    <div className="mb-6">
      <p className="text-lg text-[#000000] mb-4 font-medium">{question.question}</p>
      {question.displayContent}
    </div>
    <div className="grid grid-cols-1 gap-3">
      {shuffledOptions.map((option, index) => <button key={index} className="bg-[#f7f7f5] hover:bg-[#ebebe8] text-[#000000] font-bold py-3.5 px-5 rounded-xl text-lg transition-transform duration-100 hover:scale-[1.01] active:scale-[0.99] border border-transparent hover:border-black text-center" onClick={() => {
        if (option.isCorrect) {
          onCorrectAnswer();
        } else {
          onWrongAnswer();
        }
      }}>
        {option.value}
      </button>)}
    </div>
  </div>;
}