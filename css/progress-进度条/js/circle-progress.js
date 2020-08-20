var progressEle = document.querySelector(".circle-progess");

var setProgress = function (progress) {
  let leftCircle = progressEle.querySelector(".warp-left .half-circle");
  let rightCircle = progressEle.querySelector(".warp-right .half-circle");
  let leftInitDeg = -45;
  let rightInitDeg = 135;
  let leftDeg;
  let rightDeg;
  if (progress <= 50) {
    rightDeg = rightInitDeg + (progress * 180) / 50;
    leftDeg = leftInitDeg;
  } else {
    rightDeg = rightInitDeg + 180;
    leftDeg = leftInitDeg + ((progress - 50) * 180) / 50;
  }
  rightCircle.style.transform = `rotate(${rightDeg}deg)`;
  leftCircle.style.transform = `rotate(${leftDeg}deg)`;
}

var progress = 0;
setInterval(() => {
  progress = progress + 5;
  setProgress(progress);
  if (progress == 100) {
    progress = 0;
  }
}, 1000);
