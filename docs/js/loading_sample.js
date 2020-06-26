var showloading = document.getElementById('showloading');
var contents = document.getElementById('contents');
var img = document.getElementById('loading-image');

window.addEventListener('load', function(){
    setTimeout('loading()', 2000);
})

function loading(){
    showloading.style.opacity='0';
    setTimeout('after()', 2000);
    contents.classList.remove('hidden');
}

function after(){
    showloading.style.display = 'none';
}

const back = document.getElementById('under-top');
function ff(){
  back.style.backgroundColor='red';
  back.style.backgroundImage='url("../image/editorialDesign.png")';
}
ff();

