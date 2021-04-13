import _ from 'lodash';

const propertyData = {
  id: 1,
  propertyName: '1BR Japanese-style Private Room near Kyoto Station',
  propertyType: 'private',
  cancelPolicy: 'strict',
  roomNum: 1,
  bathroomNum: 1,
  priceInDollars: 50,
  host: {
    id: 1,
    firstName: 'Tom'
  }
}

function handleClick(e) {
  e.preventDefault();
  const mainEl = document.getElementById('main');
  /* 
    getDataを呼び出して、mainEl.innerHTMLを利用して、結果を出力します。
  */
  const table = document.createElement('table');
  const p = document.createElement('p');

  getData()
    .then(data => {
      mainEl.innerHTML = '';
      const tableContents = [];
      for(const key in data){
        if(typeof data[key] !== 'object'){
          tableContents.push(`<tr><td>${key}</td><td>${data[key]}</td></tr>`);
        }
      }

      table.innerHTML = tableContents.join('');
      mainEl.appendChild(table);
    })
    .catch(err => {
      mainEl.innerHTML = '';
      p.textContent = err.message; //getData should return 'result.message'?
      mainEl.appendChild(p);
    })
  
}

function getData() {
  /* 
    fetchDataを呼び出して、戻ってきたデータのsuccessの値を元にresolveで物件データまたは、rejectでエラーメッセージを返す。
  */
  return fetchData() //return?
    .then(result => {
      if(result.success){
        return Promise.resolve(result.propertyData);
      } else {
        return Promise.reject(result.message);
      }
    })
}

function fetchData() {
  /* 
    lodashのrandom()を使って、80%の確率で正しいデータを返し、20%の確率でエラーを返すようにしましょう。
    またsetTimeoutを利用して、1秒待ってから結果を得るようにします。
  */
  return new Promise((resolve, reject) => {
    let rand = _.random(1, 10);
    // console.log(rand);
    setTimeout(() => {
      if(rand >= 3 && rand <= 10){
        resolve({ success: true, propertyData: propertyData });
      } else {
        reject({ success: false, message: 'データの取得に失敗しました。' });
      }
    }, 1000)
  })
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", handleClick);
}