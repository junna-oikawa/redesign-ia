// ローディング画面のdivを取得
var showloading = document.getElementById('showloading');
var contents = document.getElementById('contents');

var img = document.getElementById('loading-image');

window.addEventListener('load', function(){
    setTimeout('test()', 2000);
})

function test(){
    // img.style.width = '50vw';
    // img.style.left = '25vw';
    // img.style.top = '25vh';
    showloading.style.opacity='0';
    setTimeout('after()', 2000);
    contents.classList.remove('hidden');
}

function after(){
    showloading.style.display = 'none';
}
