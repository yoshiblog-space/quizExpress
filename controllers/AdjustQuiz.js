module.exports = class quize {

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

  checkAns(answers) {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (this.answer[index] === answer) {
        correctCount++;
      }
    })
    return correctCount;
  }
}