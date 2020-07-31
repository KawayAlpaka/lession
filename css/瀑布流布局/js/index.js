var itemTemplate = document.querySelector(".fall-item").cloneNode(true);
var warp = document.querySelector(".fall-warp");

for(let i=0;i<30;i++){
  let item = itemTemplate.cloneNode(true);
  item.style.height = (Math.random() * 70 + 30) + "px";
  item.innerHTML = i;
  warp.append(item);
}
