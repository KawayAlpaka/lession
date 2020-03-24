(function () {
  document.getElementById("form").onsubmit = function () {
    let a1 = document.querySelector(`input[name=a1]`).value;
    let q = document.querySelector(`input[name=q]`).value;
    let n = document.querySelector(`input[name=n]`).value;
    

    let list1 = [];
    let list2 = [];
    for(let i=0;i<n;i++){
      list1.push((a1 * Math.pow(q, i)).toFixed(1));
      list2.push(sum(a1,q,i+1));
    }
    alert(`sum=${sum(a1,q,n)}\n ${list1.join()}\n ${list2.join()}`);
    return false;
  };
  const sum = function(a1,q,n){
    let sum = 0;
    if (q == 1) {
      sum = n * a1;
    } else {
      sum = a1 * (1 - Math.pow(q, n)) / (1 - q);
    }
    return sum;
  };
})();

