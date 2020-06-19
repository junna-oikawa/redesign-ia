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

    const studioDiv = document.createElement('div');

    const studioTitle = document.createElement("h1");
    studioTitle.className = 'studio-title';
    studioTitle.textContent = studio['name-ja'];
    document.getElementById('studio-name').appendChild(studioTitle);

    const studioDescription = document.createElement("p");
    studioDescription.className = 'studio-description';
    studioDescription.textContent = studio['description-ja'];
    document.getElementById('studio-description').appendChild(studioDescription);
    

    const studioFaculty = document.createElement("h3");
    studioFaculty.className = 'studio-faculty';
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
