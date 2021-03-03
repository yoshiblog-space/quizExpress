const request = require('request');

class Quiz {
  constructor(apiData) {
    const _quizAll = JSON.parse(apiData).results;
    let _displayQuiz = [];
    let _ans = [];
    const shuffleSelect = (arry) => {
      if (arry.type == 'boolean') {
        return ['True', 'False'];
      } else {
        const _selector = [arry.correct_answer, ...arry.incorrect_answers];
        for (let i = _selector.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [_selector[i], _selector[j]] = [_selector[j], _selector[i]];
        }
        return _selector;
      }
    }
    _quizAll.forEach((_quiz, index) => {
      _displayQuiz.push({
        number: index,
        category: _quiz.category,
        difficulty: _quiz.difficulty,
        question: _quiz.question,
        choices: shuffleSelect(_quiz)
      })
      //答え合わせ用データ
      _ans[index] = _quiz.correct_answer;
    })
    this.quizAll = _displayQuiz;
    this.answer = _ans
  }
}
const checkAns = function (userAnswers, correctAnswers) {
  let correctCount = 0;
  userAnswers.forEach((answer, index) => {
    if (correctAnswers[index] === answer) {
      correctCount++;
    }
  })
  return correctCount;
}

const getQuizFunc = (value) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: 'https://opentdb.com/api.php?amount=10',
      method: 'GET'
    }
    request(options, (err, response, body) => {
      if (err) {
        return reject({ errmess: 'geterr' });
      }
      const responseData = new Quiz(body);
      return resolve(responseData);
    })
  })
}

module.exports = {
  getQuizFunc,
  checkAns
}