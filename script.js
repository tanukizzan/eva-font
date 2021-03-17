const textInput = document.getElementById('text-input');
const bgc = document.getElementById('background');
const fileSelect = document.getElementById('file-select');
const colorPicker = document.getElementById('color-picker');
const vRange = document.getElementById('vertical-range');
const currentValue = document.getElementById('current-value');
const heightPos = document.getElementById('height-position');
const widthPos = document.getElementById('width-position');
const submit = document.getElementById('submit');
const mainArea = document.getElementById('main-area');
const textPos = document.getElementById('text-area');
const resultArea = document.getElementById('result-area');
const fullScreen = document.getElementById('full-screen');

// 結果を毎回削除する関数
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// 送信ボタン
submit.onclick = () => {
  removeAllChildren(resultArea);
  resultArea.innerHTML = textInput.value;
}

// enterキーで送信
textInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    submit.onclick();
  }
})

// 背景色
bgc.addEventListener('change', () => {
  let checked = bgc.elements['back-color'].value;
  switch (checked) {
    case 'black':
      mainArea.style.background = '#000000'
      resultArea.style.color = '#ffffff'
      colorPicker.defaultValue = '#ffffff';
      fileSelect.style.display = 'none';
      break;
    case 'white':
      mainArea.style.background = '#ffffff'
      resultArea.style.color = '#000000';
      colorPicker.defaultValue = '#000000';
      fileSelect.style.display = 'none';
      break;
    case 'image':
      fileSelect.style.display = 'inline';
      break;
  }
})
// 画像選択
fileSelect.addEventListener('change', (e) => {
  let img = e.target.files;
  let reader = new FileReader();
  reader.readAsDataURL(img[0]);
  reader.onload = () => {
    let imgUrl = reader.result;
    mainArea.style.background = 'url("' + imgUrl + '")';
    mainArea.style.backgroundSize = 'cover';
    mainArea.style.backgroundPosition = 'center';
  }
},false)

// 縦位置
heightPos.addEventListener('change', () => {
  let checked = heightPos.elements['hp'].value;
  switch (checked) {
    case 'top':
      textPos.classList.remove('middle');
      textPos.classList.remove('bottom');
      textPos.classList.add('top');
      break;
    case 'middle':
      textPos.classList.remove('top');
      textPos.classList.remove('bottom');
      textPos.classList.add('middle');
      break;
    case 'bottom':
      textPos.classList.remove('top');
      textPos.classList.remove('middle');
      textPos.classList.add('bottom');
      break;
  }
})

// 横位置
widthPos.addEventListener('change', () => {
  let checked = widthPos.elements['wp'].value;
  switch (checked) {
    case 'left':
      textPos.classList.remove('center');
      textPos.classList.remove('right');
      textPos.classList.add('left');
      break;
    case 'center':
      textPos.classList.remove('left');
      textPos.classList.remove('right');
      textPos.classList.add('center');
      break;
    case 'right':
      textPos.classList.remove('left');
      textPos.classList.remove('center');
      textPos.classList.add('right');
      break;
  }
})

window.addEventListener('DOMContentLoaded', () => {
  // カラーピッカー
  colorPicker.addEventListener('change', () => {
    resultArea.style.color = colorPicker.value;
  })
  // 垂直比率
  resultArea.style.transform = 'scaleY(' + vRange.value + ')';
  vRange.addEventListener('change', () => {
    resultArea.style.transform = 'scaleY(' + vRange.value + ')';
  })
})

// 比率表示
const setValue = (val) => {
  currentValue.innerText = val;
}
const rangeChange = (e) => {
  setValue(e.target.value);
}
window.onload = () => {
  vRange.addEventListener('input', rangeChange);
  setValue(vRange.value);
  // ファイル選択ボックスを非表示
  fileSelect.style.display = 'none';
}

// フルスクリーン
fullScreen.addEventListener('click', () => {
  if (mainArea.requestFullscreen) {
    mainArea.requestFullscreen();
  } else if (mainArea.webkitRequestFullscreen) {
    mainArea.webkitRequestFullscreen();
  } else if (mainArea.mozRequestFullscreen) {
    mainArea.mozRequestFullscreen();
  }
})