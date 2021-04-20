import _ from 'lodash';
const storedNums = [];

function addRandomNum() {
  // 💡 unnecessary variable by starter. delete it 👍
  // const mainEl = document.getElementById('main');
  let p = document.createElement('p');
  let randNum = _.random(0, 10);
  p.innerHTML = "Random Number: " + randNum.toString();
  document.body.appendChild(p)
  storedNums.push(randNum);
  if(storedNums.length > 5){
    storedNums.shift();
  } 
  console.log(storedNums);
}

function recordNumber() {
  // 💡 unnecessary variable by starter. delete it 👍
  // const mainEl = document.getElementById('main');
  let p = document.createElement('p');
  // _.sum(storedNums) can be assigned to a variable. ->  readable code
  p.textContent = `Sum of the Last 5 Random Numbers: ${_.sum(storedNums)}`;
  document.body.appendChild(p);
}

{
  const button1 = document.getElementById('button1')
  button1.addEventListener("click", addRandomNum);
  const button2 = document.getElementById('button2');
  button2.addEventListener("click", recordNumber);
  console.log("ready");
}
