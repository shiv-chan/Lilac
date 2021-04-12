// モーダル要素の取得
const modal = document.querySelector('.modal');

// 開くボタン取得
const clickMeBtn = document.querySelector('.button');

// 閉じるボタン取得
const modalCloseBtn = document.querySelector('.modalClose');


// クリックで開くイベントリスナー
clickMeBtn.addEventListener('click', modalOpen);

// クリックで閉じるイベントリスナー
modalCloseBtn.addEventListener('click', modalClose);

// モーダル以外の場所クリックのイベントリスナー
document.addEventListener('click', modalOutside);


// モーダルオープンの関数
function modalOpen() {
  modal.querySelector('.modal-content').style.animationName = 'modalopen';
  modal.style.display = 'block';
}

// モーダルを閉じる関数
function modalClose() {
  closeAnime();
  setTimeout(() => {
    modal.style.display = 'none';
  }, 1000);
}

// モーダル以外がクリックされた時に閉じる関数
function modalOutside(e) {
  if(e.target.className === 'modal'){
    modal.style.display = 'none';
  }
}

// モーダルが閉じる際のアニメーション追加
function closeAnime() {
  modal.querySelector('.modal-content').style.animationName = 'modalclose';
}