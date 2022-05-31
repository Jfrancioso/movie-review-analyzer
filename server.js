const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {

    if ('student' in params) {
      let num = Math.random()
      let gameResult = ''
      const botPick = num < .33 ? 'rock' : num < .66 ? 'paper' : 'scissors';
      //Win
      if (
          (params['student'] == 'rock' && botPick == 'scissors') ||
          (params['student'] == 'paper' && botPick == 'rock') ||
          (params['student'] == 'scissors' && botPick == 'paper')
         ) {
        gameResult = 'You Win'
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          botPick: botPick,
          gameResult:gameResult
        }} //Tie
        else if (
          (params['student']== botPick)
        ){
          gameResult = 'Tie'
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          botPick: botPick,
          gameResult:gameResult
        }
         res.end(JSON.stringify(objToJson))
        }//Losing
        else if( (params['student'] == 'scissors' && botPick == 'rock') ||
          (params['student'] == 'rock' && botPick == 'paper') ||
          (params['student'] == 'paper' && botPick == 'scissors')
 ) {
        gameResult = 'You Lose'
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          botPick: botPick,
          gameResult:gameResult          
        }
        res.end(JSON.stringify(objToJson))
      }
    }
   }
    else if (page == '/css/style.css') {
      fs.readFile('css/style.css', function (err, data) {
        res.write(data);
        res.end();
      });
    } else if (page == '/js/main.js') {
      fs.readFile('js/main.js', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        res.end();
      });
    } else {
      figlet('404!!', function (err, data) {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
        }
        res.write(data);
        res.end();
      });
    }
  });

server.listen(8000);

// Goal: Rock, Paper, Scissors Server side response
