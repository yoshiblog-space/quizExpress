const fetchForm = document.querySelector('.fetchForm input');
const btn = document.querySelector('.btn');
const url = 'http://localhost:3000/fetch';
const checkUrl = 'http://localhost:3000/checkAns';
const htmlBody = document.getElementById('body');
const quizTitle = document.getElementById('status');
const quizSentence = document.getElementById('sentence');
const startButton = document.getElementById('start');
const quizProperty = document.getElementById('property');
const ansButton = document.getElementById('answer');

let quizNumber = 0;
const checkAns = [];
let quizAll =[];


//回答表示設定
const ansSet = (ansData) => {
  for (let i = 0; i < ansData.length; i++) {
    const selectBtn = document.createElement('button');
    selectBtn.classList.add('btn');
    selectBtn.innerHTML = ansData[i];
    selectBtn.addEventListener('click', () => {
      selectAns = selectBtn.textContent;
      checkAns.push(selectAns);
      quizNumber++;
      quizDisplay(quizNumber, quizAll);
    });
    ansButton.appendChild(selectBtn);
  }
};

//終了画面の表示
const endDisplay = (answerScore) => {
  quizTitle.textContent = `あなたの正解数は${answerScore}です！`;
  quizSentence.textContent = '再度チャレンジしたい場合は以下をクリック！';
  const homeButton = document.createElement('button');
  homeButton.textContent = 'ホームに戻る';
  homeButton.addEventListener('click', () => {
    location.reload();
  });
  htmlBody.appendChild(homeButton);
}

//データ取得中の画面表示設定
const waitDisplay = () => {
  quizTitle.textContent = '取得中';
  quizSentence.textContent = '少々お待ちください';
  startButton.classList.add('nondisplay');
};

//問題表示設定
const quizDisplay = ((quizNumber, quizAll) => {
  while (quizProperty.firstChild) {
    quizProperty.removeChild(quizProperty.firstChild);
  }
  while (ansButton.firstChild) {
    ansButton.removeChild(ansButton.firstChild);
  }
  if (quizNumber === quizAll.length) {
    data = { answer: checkAns};
    fetch(checkUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(json => {
        endDisplay(json.answerCount);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  } else {
    quizTitle.textContent = `第${quizNumber + 1}問`
    const quizCategory = document.createElement('h3');
    const quizDifficulty = document.createElement('h3');
    quizCategory.textContent = `[ジャンル] ${quizAll[quizNumber].category}`;
    quizDifficulty.textContent = `[難易度]${quizAll[quizNumber].difficulty}`;
    quizProperty.appendChild(quizCategory);
    quizProperty.appendChild(quizDifficulty);
    quizSentence.innerHTML = quizAll[quizNumber].question;
    ansSet(quizAll[quizNumber].choices);
  }
});


//スタートボタン押下設定
startButton.addEventListener('click', () => {
  fetch(url)
    .then((response) => {
      if (!(response.status === 200)) {
        quizTitle.textContent = 'エラー';
        quizSentence.textContent = '再度開始ボタンを押してください';
        startButton.classList.remove('nondisplay');
        return console.err("err");
      }
      return response.json();
    }).then((json) => {
      quizAll = json;
      quizDisplay(quizNumber, quizAll);
    });
  waitDisplay();
});