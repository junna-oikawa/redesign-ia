const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;
let getPageTitle = document.title;
let pageNumber = -1;
switch(getPageTitle){
    case "エディティングスタジオ":
        pageNumber = 0;
        break;
    case "インタラクティブアートスタジオ":
        pageNumber = 3;
        break;
    case "映像デザインスタジオ":
        pageNumber = 6;
        break;

    case "ネットワークデザインスタジオ":
        pageNumber = 7;
        break;
    case "ソフトウェアデザインスタジオ":
        pageNumber = 8;
        break;
    case "ヴィジュアルコミュニケーションデザインスタジオ":
        pageNumber = 11;
        break;
}

console.log(getPageTitle);

const renderJson = (json) => {
    const studios = json.records;
    studios.pop();

    const studio = studios[pageNumber];

    const studioTopDiv = document.createElement('div');
    const studioPhotoDiv = document.createElement('div');
    const studioPhotosDiv = document.createElement('div');

    const studioTitle = document.createElement("h1");
    studioTitle.className = 'studio-title';
    studioTitle.textContent = studio['name-ja'];
    document.getElementById('studioTopDiv').appendChild(studioTitle);

    const studioPhotos = [];
    for (var i = 0; i < 5; i++){
      studioPhotos[i] = document.createElement("img");
      studioPhotos[i].className = 'studio-photo';
      studioPhotos[i].src = studio['photo' + [i+1]];
      if(studioPhotos[i].src === 'http://127.0.0.1:5500/mediaCreationHtmls/editorialDesignStudio.html'){
        console.log('s');
        break;
      }
      studioPhotoDiv.appendChild(studioPhotos[i]);
    }
    document.getElementById('studioPhotosDiv').appendChild(studioPhotoDiv);
    
    // console.log(studioPhotos[0].src);
    // console.log(studioPhotos[1].src);
    // console.log(studioPhotos[2].src);
    // console.log(studioPhotos[3].src);

    studioPhotos.pop();

    studioPhotos[0].style.width = '200px';
    studioPhotos[1].style.width = '200px';

    // studioPhotos[0].style.left = '20%';
    var photoNumber = studioPhotos.length;
    console.log(photoNumber);

    for (var i = 0; i < photoNumber - 1; i++){
      studioPhotos[i].style.opacity = 0;
      // studioPhotos[i].style.left = '10' * i + '%';
    }

    //コピペ
//     let intervalId;
// let image = document.getElementById('targetImage');
let image = studioPhotos[photoNumber - 1];
image.onclick = changeImage;
let counter = photoNumber - 1;
changeImage()

function changeImage(){

  if(image.style.opacity == ''){
    image.style.opacity = 1;
  }

  let opacityInt = image.style.opacity * 100;
  //フェードアウトの処理（opacityを100ミリ秒ごとに0.1づつ減らす）
  let intervalId = setInterval( () => {
    opacityInt = opacityInt - 10;
    image.style.opacity = opacityInt / 100;

    if(image.style.opacity <= 0){
      clearInterval(intervalId);
      counter--;
      if(counter<0){
        counter = photoNumber - 1;
      }
      image = studioPhotos[counter];

      opacityInt = image.style.opacity * 100;
      //フェードインの処理（opacityを100ミリ秒ごとに0.1づつ増やす）
      intervalId = setInterval( () => {
        opacityInt = opacityInt + 10;
        image.style.opacity = opacityInt / 100;
        if(image.style.opacity >= 1){
          clearInterval(intervalId);
        }
      }, 50);
    }
  }, 50);
  setTimeout(changeImage,4000);
}


    const studioDescription = document.createElement("p");
    studioDescription.textContent = studio['description-ja'];
    document.getElementById('studio-description').appendChild(studioDescription);
    

    const studioFaculty = document.createElement("h3");
    studioFaculty.textContent = studio['faculty-ja'];
    document.getElementById('studio-faculty').appendChild(studioFaculty);

    // studioDiv.appendChild(studioTitle);
    // studioDiv.appendChild(studioDescription);
    // studioDiv.appendChild(studioFaculty);
    // document.getElementById('studios').appendChild(studioDiv);
   
    document.getElementById('result').textContent = JSON.stringify(json, null, 2);
}



const getData = async () => {
  try{
    const response =  await fetch(endpoint);
    if(response.ok){
      let jsonResponse = await response.json();
            renderJson(jsonResponse);
    }
  }
  catch(error){
    console.log(error);
  }
}

getData();



// //以下追加

// // 変数を用意する -------------------------------
// // ウィンドウの横幅
// var windowWidth = document.body.clientWidth;
// console.log(windowWidth);

// function getWindowSize() {


//   console.log(`ウィンドウサイズの横幅`);
//   console.log(window.innerWidth);

//   console.log(`ウィンドウサイズの高さ`);
//   console.log(window.innerHeight);
// }

// getWindowSize();


// // 写真を囲む箱
// var photoBox = document.getElementById("#studioTopDiv");

// // 全ての写真
// var photos = document.getElementById(".studio-photo");
// console.log(photos);

// // 写真の枚数
// var photoNumber = 3;

// // 写真のインデックス（番号）
// var photoIndex = 0;

// // 写真の横幅
// var photoWidth = 500;

// // 全てのサムネイル
// //var thumbnails = $('div.thumbnailBox img');

// // 背景画像用の箱
// //var backgroundBox = $('div.backgroundBox');

// // それぞれの背景画像
// // var background1 = $('div.background1');
// // var background2 = $('div.background2');
// // var background3 = $('div.background3');
// // var background4 = $('div.background4');

// photos.style.width = '100px';

// // 写真と背景を並べる ----------------------------
// // 写真の枚数分、写真を並べる
// // for (i = 0; i < photoNumber; i++) {
// //   photos.eq(i).css({
// //     left: '150' * i + '%'
// //   });
// // }

// // for (i = 0; i < photoNumber; i++) {
// //   photos.eq(i).css({
// //     left: '150' * i + '%'
// //   });
// // }

// // 背景の箱の横幅を写真の枚数分にする
// //backgroundBox.width(windowWidth * photoNumber);


// // 写真スライドの処理 -----------------------------
// // function slidePhotos() {
// //   // 写真を動かす
// //   photoBox.animate({
// //     left: '-150' * photoIndex + '%'
// //   }, 1000);

//   // 背景を動かす
//   // background1.animate({
//   //   left: -photoWidth * photoIndex / 16
//   // }, 1000);
//   // background2.animate({
//   //   left: -photoWidth * photoIndex / 8
//   // }, 1000);
//   // background3.animate({
//   //   left: -photoWidth * photoIndex / 4
//   // }, 1000);
//   // background4.animate({
//   //   left: -photoWidth * photoIndex / 2
//   // }, 1000);
// //}


// // サムネイルを選択した時の処理 -------------------
// // function selectThumbnail() {
// //   // 全てのサムネイルからselectedクラスを外す
// //   thumbnails.removeClass('selected');
// //   // 選んだサムネイルにselectedクラスを追加する
// //   thumbnails.eq(photoIndex).addClass('selected');
// // }


// // サムネイルをクリックした時の処理 ----------------
// // function clickThumbnail(thumbnail) {
// //   // サムネイルのindexをphotoIndexに入れる
// //   photoIndex = $(thumbnail).index();
// //   // selectThumbnail関数を呼び出す
// //   selectThumbnail();
// //   // slidePhotos関数を呼び出す
// //   slidePhotos();
// // }


// // ボタンをクリックした時の処理 --------------------
// // 次へボタン
// // function clickNextButton() {
// //   // 次のindexを計算する
// //   photoIndex += 1;
// //   // photoNumberを超えたら0に戻す
// //   if (photoIndex > photoNumber - 1) {
// //     photoIndex = 0;
// //   }
// //   // selectThumbnail関数を呼び出す
// //   selectThumbnail();
// //   // slidePhotos関数を呼び出す
// //   slidePhotos();
// // }

// // 戻るボタン
// // function clickBackButton() {
// //   // 次のindexを計算する
// //   photoIndex -= 1;
// //   // photoIndexが0を下回ったらphotoNumber-1に戻す
// //   if (photoIndex < 0) {
// //     photoIndex = photoNumber - 1;
// //   }
// //   // selectThumbnail関数を呼び出す
// //   selectThumbnail();
// //   // slidePhotos関数を呼び出す
// //   slidePhotos();
// // }