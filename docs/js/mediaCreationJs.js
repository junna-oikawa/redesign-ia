const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;
var getPageTitle = document.title;
var pageNumber = -1;
//const pageTitle = ["エディティングスタジオ","インタラクティブアートスタジオ", "映像デザインスタジオ", "ネットワークデザインスタジオ", "ソフトウェアデザインスタジオ", "ヴィジュアルコミュニケーションデザインスタジオ"];
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


// if(getPageTitle === "エディティングスタジオ")
// {
//     pageNumber = 0;
// }else if(getPageTitle === "インタラクティブアートスタジオ")
// {
//     pageNumber = 3;
// }else if(getPageTitle === "映像デザインスタジオ")
// {
//     pageNumber = 6;
// }else if(getPageTitle === "ネットワークデザインスタジオ")
// {
//     pageNumber = 7;
// }else if(getPageTitle === "ソフトウェアデザインスタジオ")
// {
//     pageNumber = 8;
// }else if(getPageTitle === "ヴィジュアルコミュニケーションデザインスタジオ")
// {
//     pageNumber = 11;
// }

console.log(getPageTitle);

const renderJson = (json) => {
    const studios = json.records;
  //const lastStudio = studio.pop();
    studios.pop();
    // studios.forEach(studio => {
    //     const studioDiv = document.createElement('div');
    //     const studioTitle = document.createElement("span");
    //     studioTitle.className = 'studio-title';
    //     studioTitle.textContent = studio['name-ja'];
    //     const studioTitleEn = document.createElement("span");
    //     studioTitleEn.className = 'studio-title-en';
    //     studioTitleEn.textContent = studio['name-en'];
    //     studioDiv.appendChild(studioTitle);
    //     studioDiv.appendChild(studioTitleEn);
    //     document.getElementById('studios').appendChild(studioDiv);
    //     console.log(studioDiv);
    // });

    // for (let i = 0; i < studios.length; i++) {
    //     const studio = studios[i];
    //     const studioDiv = document.createElement('div');
    //     const studioTitle = document.createElement("span");
    //     studioTitle.className = 'studio-title';
    //     studioTitle.textContent = studio['name-ja'];
    //     const studioTitleEn = document.createElement("span");
    //     studioTitleEn.className = 'studio-title-en';
    //     studioTitleEn.textContent = studio['name-en'];
    //     studioDiv.appendChild(studioTitle);
    //     studioDiv.appendChild(studioTitleEn);
    //     document.getElementById('studios').appendChild(studioDiv);
    //     console.log(studio);
    // }

    const studio = studios[pageNumber];
    const studioDiv = document.createElement('div');
    const studioTitle = document.createElement("span");
    studioTitle.className = 'studio-title';
    studioTitle.textContent = studio['name-ja'];
    const studioTitleEn = document.createElement("span");
    studioTitleEn.className = 'studio-title-en';
    studioTitleEn.textContent = studio['name-en'];
    studioDiv.appendChild(studioTitle);
    studioDiv.appendChild(studioTitleEn);
    document.getElementById('studios').appendChild(studioDiv);
    console.log(studio);
     
    
   
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
