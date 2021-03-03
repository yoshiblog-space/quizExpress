const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const userController = require('./controllers/UserController')

//テンプレートエンジンの指定
app.set("view engine", "ejs");
app.use(express.static('public'))
app.get('/fetch', userController.doGetQuiz);
app.post('/checkAns', userController.doGetCheckAns);


app.listen(3000);