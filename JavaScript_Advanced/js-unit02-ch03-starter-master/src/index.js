const endpoint = "http://localhost:3000"

function handleClick(e) {
  e.preventDefault();
  const mainEl = document.getElementById('main');
  return getData()
    .then((data) => {
      const propertyData = data.propertyData;
      mainEl.innerHTML = `
        <div className="property-info-wrapper">
          <p><b>タイトル: </b>${propertyData.propertyName}</p>
          <p><b>タイプ: </b>${propertyData.propertyType}</p>
          <p><b>キャンセルポリシー: </b>${propertyData.cancelPolicy}</p>
          <p><b>部屋数: </b>${propertyData.roomNum}</p>
          <p><b>バスルーム数: </b>${propertyData.bathroomNum}</p>
          <p><b>一泊あたり: </b>${propertyData.priceInDollars}ドル</p>
          <p><b>ホスト: </b>${propertyData.host.firstName}</p>
        </div>
      `
    })
    .catch((e) => {
      mainEl.innerHTML = `
        <div className="property-info-wrapper">
          <p>${e.message}</p>
        </div>
      `
    })
}

function getData() {
  /* 
    fetchDataを呼び出し、responseのステータスを元にデータ取得成功か失敗かを判断しましょう。 
    成功ならpropertyDataをPromise.resolveで返します。
    失敗ならエラーメッセージをPromise.rejectで返します。
  */
  return fetchData()
    .then(result => {
      const data = result.json();
      if(result.status === 200){
        // const propertyData = result.propertyData;
        // console.log(result.json().propertyData);
        return Promise.resolve(data);
      } 
        // console.log(result.json());
        return Promise.reject(new Error('error'));
    })
}


function fetchData() {
  const url = `${endpoint}/properties/1`
  /* 
    fetchを使ってデータを取得します。
  */
  return fetch(url)
    .then(res => res)
    .catch(err => console.log(err));
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", handleClick);
}

getData();