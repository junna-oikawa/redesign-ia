// ローディング画面のdivを取得
var showloading = document.getElementById('showloading');
// 画面本体のdivを取得
var contents = document.getElementById('contents');
// 読み込みが完了したら発動
window.addEventListener('load', function () {
// loadingのdivを非表示に
showloading.style.display = 'none';
contents.classList.remove('hidden');
});

