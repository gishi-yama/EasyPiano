// キーコードと周波数の対応表
var freqs = {
  90: 440.00,
  83: 466.16,
  88: 493.88,
  67: 523.25,
  70: 554.37,
  86: 587.33,
  71: 622.25,
  66: 659.26,
  78: 698.46,
  74: 739.99,
  77: 783.99,
  75: 830.61,
  188: 880.00,
  76: 932.33,
  190: 987.77,
  191: 1046.5,
  186: 1108.73,
  189: 1174.66,
  221: 1244.51
};

// キーコードと音階表示の対応表
var scales = {
  90: 'ラ(A4)',
  83: 'ラ#(A#4)',
  88: 'シ(B4)',
  67: 'ド(C5)',
  70: 'ド#(C#5)',
  86: 'レ(D5)',
  71: 'レ#(D#5)',
  66: 'ミ(E5)',
  78: 'ファ(F5)',
  74: 'ファ#(F#5)',
  77: 'ソ(G5)',
  75: 'ソ#(G#5)',
  188: 'ラ(A5)',
  76: 'ラ#(A#5)',
  190: 'シ(B5)',
  191: 'ド(C6)',
  186: 'ド#(C#6)',
  189: 'レ(D6)',
  221: 'レ#(D#6)'
};

// WebAudioAPIのAudioContextオブジェクトの変数
var ctx = new AudioContext();
// 波形の種類を指定する変数
var type = 'sine';
// 再生中のOscillatorオブジェクトの推測配列
var playingOSCs = [];
// 音量を操作するGainオブジェクトの変数
var volume = ctx.createGain();
// 音量の初期値(0.1〜1.0）
volume.gain.value = 0.1;

// キーを押したときに実行される関数
document.onkeydown = function (e) {
  var inputKey = e.keyCode;
  if (!playingOSCs[inputKey] && freqs.hasOwnProperty(inputKey)) {
    var osc = ctx.createOscillator();
    osc.type = type;
    osc.connect(volume);
    volume.connect(ctx.destination);
    osc.frequency.value = freqs[inputKey];
    osc.start();
    playingOSCs[inputKey] = osc;
    scaleView();
  }
};

// キーを離した時に実行される関数
document.onkeyup = function (e) {
  var inputKey = e.keyCode;
  if (playingOSCs[inputKey] && freqs.hasOwnProperty(inputKey)) {
    playingOSCs[inputKey].stop();
    delete playingOSCs[inputKey];
    scaleView();
  }
};

// 押されているキーの一覧表示を切り替える関数
function scaleView() {
  var scaleValue = '';
  var key = null;
  for (key in playingOSCs) {
    scaleValue = scaleValue + scales[key] + ' ';
  }
  document.getElementById('scale').innerHTML = scaleValue;
}

// 音量を調整する関数
function changeVolume() {
  var volumeValue = document.volumeForm.range.value;
  document.getElementById('volumeView').innerHTML = '音量：' + volumeValue * 100 + '%';
  volume.gain.value = volumeValue;
}

// 波形の種類を変更する関数
function changeType() {
  type = document.typeForm.wave.value;
}
