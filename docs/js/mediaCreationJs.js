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

const renderJson = (json) => {
    const studios = json.records;
    studios.pop();

    const studio = studios[pageNumber];

    const studioTopDiv = document.createElement('div');
    const studioPhotoDiv = document.createElement('div');
    const studioPhotosDiv = document.createElement('div');
    const studioPhotoThumbnail = document.createElement('div');
    const studioPhotoThumbnails = document.createElement('div');

    const studioTitle = document.createElement("h1");
    studioTitle.className = 'studio-title';
    studioTitle.textContent = studio['name-ja'];
    document.getElementById('studioTopDiv').appendChild(studioTitle);

    const studioPhotos = [];
    const studioPhotosThum = [];
    for (var i = 0; i < 5; i++){
      studioPhotos[i] = document.createElement("img");
      studioPhotos[i].className = 'studio-photo';
      studioPhotos[i].src = studio['photo' + [i+1]];
      studioPhotosThum[i] = document.createElement("img");
      studioPhotosThum[i].className = 'studio-photo';
      studioPhotosThum[i].src = studio['photo' + [i+1]];
      
      if(studioPhotos[i].src === 'http://127.0.0.1:5500/mediaCreationHtmls/editorialDesignStudio.html'){
        //console.log('s');
        break;
      }
      studioPhotoDiv.appendChild(studioPhotos[i]);
      studioPhotoThumbnail.appendChild(studioPhotosThum[i]);
    }
    document.getElementById('studioPhotosDiv').appendChild(studioPhotoDiv);
    document.getElementById('studioPhotoThumbnails').appendChild(studioPhotoThumbnail);

    studioPhotos.pop();

    let windowWidth = window.innerWidth;

    var photoNumber = studioPhotos.length;
    for( var i = 0; i < photoNumber; i++){
      studioPhotos[i].style.width = '70%';
      studioPhotosThum[i].style.width = '20%';
    }

    for (var i = 0; i < photoNumber - 1; i++){
      studioPhotos[i].style.opacity = 0;

      // studioPhotos[i].style.left = '10' * i + '%';
    }

let image = studioPhotos[photoNumber - 1];
image.onclick = changeImage;
let counter = photoNumber - 1;

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
  
}
setTimer();
function setTimer(){
  setTimeout(setTimer,8000);
  setTimeout(changeImage,8000);
}

let imageThum = [];
for(var i = 0; i < photoNumber; i++){
  imageThum[i] = studioPhotosThum[i];
}

imageThum[0].onclick = clickThumbnail0;
imageThum[1].onclick = clickThumbnail1;
imageThum[2].onclick = clickThumbnail2;
imageThum[3].onclick = clickThumbnail3;
imageThum[4].onclick = clickThumbnail4;

console.log(studioPhotosThum.getAttribute('onclick'));

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

