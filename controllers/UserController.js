const quizApps = require('../models/QuizApps.js');
let quizAnswer =[];
module.exports = {
  doGetQuiz(req, res) {
    quizApps.getQuizFunc()
    .then(getQuiz =>{
      quizAnswer = getQuiz.answer;
      res.json(getQuiz.quizAll)
    })
    .catch(function () {
      res.status(500).send('Get Error');
    })
  },
  doGetCheckAns(req, res) {
    const ansCount = quizApps.checkAns(req.body.answer, quizAnswer);
    res.json({ answerCount: ansCount });
  }
}