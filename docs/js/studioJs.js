const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;
const sheet2 = 'Faculty';
const endpoint2 = `${uri}?id=${id}&sheet=${sheet2}`;
let getPageTitle = document.title;
let pageNumber = -1;

//取り込む内容の識別
switch (getPageTitle) {
  case "エディティングスタジオ":
    pageNumber = 0;
    break;
  case "製品・サービススタジオ":
    pageNumber = 1;
    break;
  case "エルゴノミックデザインスタジオ":
    pageNumber = 2;
    break;
  case "インタラクティブアートスタジオ":
    pageNumber = 3;
    break;
  case "インターフェースデザインスタジオ":
    pageNumber = 4;
    break;
  case "インテリアデザインスタジオ":
    pageNumber = 5;
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
  case "空間デザインスタジオ":
    pageNumber = 9;
    break;
  case "トランスポーテーションデザインスタジオ":
    pageNumber = 10;
    break;
  case "ヴィジュアルコミュニケーションデザインスタジオ":
    pageNumber = 11;
    break;
}

//取り込み
const renderJson = (json) => {
  
  const studios = json.records;
  studios.pop();
  const studio = studios[pageNumber];

  const studioPhotoDiv = document.createElement('div');
  const studioPhotoThumbnail = document.createElement('div');

  const studioTitle = document.createElement("h1");
  studioTitle.className = 'studio-title';
  studioTitle.textContent = studio['name-ja'];
  document.getElementById('studioTopDiv').appendChild(studioTitle);

  
  //スタジオの写真をstudioPhotosDivに入れる
  const studioPhotos = [];
  const studioPhotosThum = [];
  for (var i = 0; i < 5; i++) {
    studioPhotos[i] = document.createElement("img");
    studioPhotos[i].className = 'studio-photo';
    studioPhotos[i].src = studio['photo' + [i + 1]];
    studioPhotosThum[i] = document.createElement("img");
    studioPhotosThum[i].className = 'studio-photo-thumbnail';
    studioPhotosThum[i].src = studio['photo' + [i + 1]];

    if (studio['photo' + [i + 1]] === "") {
      break;
    }
    studioPhotoDiv.appendChild(studioPhotos[i]);
    studioPhotoThumbnail.appendChild(studioPhotosThum[i]);
  }
  document.getElementById('studioGalleryDiv').appendChild(studioPhotoDiv);
  document.getElementById('studioPhotoThumbnails').appendChild(studioPhotoThumbnail);

  if(pageNumber === 2){
  }
  else{
    studioPhotos.pop();
  }

  const studioDescription = document.createElement("p");
  studioDescription.textContent = studio['description-ja'];
  document.getElementById('studio-description').appendChild(studioDescription);

  const studioFaculty = document.createElement("p");
  studioFaculty.textContent = studio['faculty-ja'];
  document.getElementById('studio-faculty').appendChild(studioFaculty);


  //背景
  const backgroundTop = document.getElementById('studioTopPhoto');
  backgroundTop.style.backgroundImage='url('+studio['photo' + [1]]+')';


  //写真の表示位置

  var photoNumber = studioPhotos.length - 1; //写真の配列番号0-
  //console.log(photoNumber);
  for (var i = 0; i <= photoNumber; i++) {
    studioPhotos[i].style.width = '50vw';
    studioPhotosThum[i].style.width = '9vw';
    studioPhotos[i].style.opacity = 0;
  }
  studioPhotos[photoNumber].style.opacity = 1;

  let image = studioPhotos[photoNumber];
  let counter = photoNumber;

  count = 0; //カウントの初期値
  function countUp(){
	  count++;
    if(count >= 6)
    {
      changeImage();
    }
  }
  setInterval(countUp,1000); //1秒毎にcountup()を呼び出し

  function changeImage() {
    count = 0;

    if (image.style.opacity == '') {
      image.style.opacity = 1;
    }

    let opacityInt = image.style.opacity * 100;
    //フェードアウトの処理（opacityを100ミリ秒ごとに0.1づつ減らす）
    let intervalId = setInterval(() => {
      opacityInt = opacityInt - 10;
      image.style.opacity = opacityInt / 100;

      if (image.style.opacity <= 0) {
        clearInterval(intervalId);
        counter++;
        if (counter < 0) {
          counter = photoNumber;
        }
        if(counter > photoNumber)
        {
          counter = 0;
        }
        image = studioPhotos[counter];

        opacityInt = image.style.opacity * 100;
        //フェードインの処理（opacityを100ミリ秒ごとに0.1づつ増やす）
        intervalId = setInterval(() => {
          opacityInt = opacityInt + 10;
          image.style.opacity = opacityInt / 100;
          if (image.style.opacity >= 1) {
            clearInterval(intervalId);
          }
        }, 40);
      }
    }, 40);

  }
  

  //サムネイルに対する処理
  let imageThum = [];
  for (var i = 0; i <= photoNumber; i++) {
    imageThum[i] = studioPhotosThum[i];
  }

  imageThum[0].onclick = clickThumbnail0;
  imageThum[1].onclick = clickThumbnail1;
  imageThum[2].onclick = clickThumbnail2;
  imageThum[3].onclick = clickThumbnail3;
  imageThum[4].onclick = clickThumbnail4;
  imageThum[5].onclick = clickThumbnail5;

  //サムネイルをクリックした時の処理
  function clickThumbnail0() {
    counter = 0 - 1;
    changeImage();
    count = 0;
  }
  function clickThumbnail1() {
    counter = 1 - 1;
    changeImage();
    count = 0;
  }
  function clickThumbnail2() {
    counter = 2 - 1;
    changeImage();
    count = 0;
  }
  function clickThumbnail3() {
    counter = 3 - 1;
    changeImage();
    count = 0;
  }
  function clickThumbnail4() {
    counter = 4 - 1;
    changeImage();
    count = 0;
  }
  function clickThumbnail5() {
    counter = 5 - 1;
    changeImage();
    count = 0;
  }

  document.getElementById('result').textContent = JSON.stringify(json, null, 2);
}



const getData = async () => {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      renderJson(jsonResponse);
    }
  }
  catch (error) {
    console.log(error);
  }
}

getData();




const renderJson2 = (json) => {
  const faculties = json.records[pageNumber];
  const facultyPhoto = document.createElement("img");
  facultyPhoto.src = faculties['faculty-photo'];
  

  function log(){
    console.log(facultyPhoto);
  }
  log();

  document.getElementById('faculty-photo').appendChild(facultyPhoto);



  const back = document.getElementById('main-contents');
  const about = document.getElementById('studio-about');
  function ff(){
    back.style.backgroundImage='url("../image/'+pageNumber+'.png")';
  }
  ff();

  //ON
  facultyPhoto.addEventListener('mouseenter', () => {
    back.style.backgroundRepeat='repeat';
    back.style.backgroundSize='20vw auto';
    back.style.backgroundImage='url('+facultyPhoto.src+')';
    about.style.color="white";
  }, false);
    
  //OUT
  facultyPhoto.addEventListener('mouseleave', () => {
    back.style.backgroundImage='url("../image/'+pageNumber+'.png")';
    back.style.backgroundRepeat='no-repeat';
    back.style.backgroundSize='100vw auto';
    about.style.color='rgb(99, 99, 99)';
  }, false);


  document.getElementById('result').textContent = JSON.stringify(json, null, 2);

}


const getData2 = async () => {
  try{
    const response2 =  await fetch(endpoint2);
    if(response2.ok){
      let jsonResponse2 = await response2.json();
        jsonResponse2.records.pop();
        renderJson2(jsonResponse2);
    }
  }
  catch(error){
    console.log(error);
  }
}
getData2();

