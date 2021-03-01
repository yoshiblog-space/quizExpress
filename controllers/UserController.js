const adjustQuiz = require('./AdjustQuiz.js');
const request = require('request');
let responseData = [];

module.exports = {
  doGetQuiz(req, res) {
    const options = {
      url: 'https://opentdb.com/api.php?amount=10',
      method: 'GET'
    }
    request(options, (err, response, body) => {
      if (err) {
        return res.status(502).json(err);
      }
      responseData = new adjustQuiz(body);
      res.json(responseData.quizAll);
    })
  },
  doGetCheckAns(req, res) {
    const ansCount = responseData.checkAns(req.body.answer);
    res.json({ answerCount: ansCount });
  }
}