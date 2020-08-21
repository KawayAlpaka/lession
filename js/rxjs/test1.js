var Observable = require('rxjs').Observable;
// require('rxjs/add/observable/of');
// Rx.Observable.of(1,2,3); // 等等


// const Rx = require("rxjs/Rx");


const source$ = new Observable(observer => {
  let number = 1
  setInterval(() => {
    observer.next(number++)
  }, 1000)
})

source$.debounceTime

const observer = {
  next : item => console.log(item)
}

console.log('start')
source$.debounceTime(1000).subscribe(observer)
console.log('end')