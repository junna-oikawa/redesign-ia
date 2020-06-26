


const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;
let getPageTitle = document.title;
let pageNumber = -1;

//取り込む内容の識別
switch (getPageTitle) {
  case "Editorial Design Studio":
    pageNumber = 0;
    break;
  case "Interactive Art Studio":
    pageNumber = 3;
    break;
  case "Kinematograph Design Studio":
    pageNumber = 6;
    break;

  case "Network Design Studio":
    pageNumber = 7;
    break;
  case "Software Design Studio":
    pageNumber = 8;
    break;
  case "Visual Communication Design Studio":
    pageNumber = 11;
    break;
}

//取り込み
const renderJson = (json) => {
  const studios = json.records;
  studios.pop();

  const studio = studios[pageNumber];

  const studioPhotoDiv = document.createElement('div');
  const studioPhotosDiv = document.createElement('div');
  const studioPhotoThumbnail = document.createElement('div');
  const studioPhotoThumbnails = document.createElement('div');

  const studioTitle = document.createElement("h1");
  const studioTitleEn = document.createElement("h1");
  studioTitle.className = 'studio-title';
  studioTitle.textContent = studio['name-en'];
  //document.getElementById('studioNameDiv').appendChild(studioTitle);
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
      console.log('s');
      break;
    }
    studioPhotoDiv.appendChild(studioPhotos[i]);
    studioPhotoThumbnail.appendChild(studioPhotosThum[i]);
  }
  document.getElementById('studioTopDiv').appendChild(studioPhotoDiv);
  document.getElementById('studioPhotoThumbnails').appendChild(studioPhotoThumbnail);

  studioPhotos.pop();

  const studioDescription = document.createElement("p");
  studioDescription.textContent = studio['description-en'];
  document.getElementById('studio-description').appendChild(studioDescription);
  
  const studioFaculty = document.createElement("p");
  studioFaculty.textContent = studio['faculty-en'];
  document.getElementById('studio-faculty').appendChild(studioFaculty);

  //写真の表示位置
  let windowWidth = window.innerWidth;

  var photoNumber = studioPhotos.length - 1; //写真の配列番号0-
  //console.log(photoNumber);
  for (var i = 0; i <= photoNumber; i++) {
    studioPhotos[i].style.width = '80%';
    studioPhotosThum[i].style.width = '20%';
    studioPhotos[i].style.opacity = 0;
  }
  studioPhotos[photoNumber].style.opacity = 1;

  let image = studioPhotos[photoNumber];
  image.onclick = changeImage;
  let counter = photoNumber;

  function changeImage() {

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
        counter--;
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
        }, 50);
      }
    }, 50);

  }
  setTimer();
  function setTimer() {
    setTimeout(setTimer, 8000);
    setTimeout(changeImage, 8000);
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

  //サムネイルをクリックした時の処理 ----------------
  function clickThumbnail0() {
    counter = 1;
    changeImage();
  }
  function clickThumbnail1() {
    counter = 2;
    changeImage();
  }
  function clickThumbnail2() {
    counter = 3;
    changeImage();
  }
  function clickThumbnail3() {
    counter = 4;
    changeImage();
  }
  function clickThumbnail4() {
    counter = 0;
    changeImage();
  }

  
  document.addEventListener('load', function() {
    console.log('all ');
  });


  // studioDiv.appendChild(studioTitle);
  // studioDiv.appendChild(studioDescription);
  // studioDiv.appendChild(studioFaculty);
  // document.getElementById('studios').appendChild(studioDiv);

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
