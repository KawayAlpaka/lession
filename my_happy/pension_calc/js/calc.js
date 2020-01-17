(function(){
  var sum = function(...args){
    var sum = 0;
    args.forEach((arg)=>{
      sum += arg;
    });
    return sum;
  }

  var socialFactorsEle = document.querySelector("#social-factors");
  var personalFactorsEle = document.querySelector("#pasonal-factors");
  var getFactors = function(){
    var socialFactors = {};
    var inputs = socialFactorsEle.querySelectorAll("input[name]");
    inputs.forEach((input)=>{
      socialFactors[input.name] = parseFloat(input.value);
    });
    var personalFactors = {};
    inputs = personalFactorsEle.querySelectorAll("input[name]");
    inputs.forEach((input)=>{
      personalFactors[input.name] = parseFloat(input.value);
    });
    return {
      socialFactors,
      personalFactors
    };
  };

  var showResult = function(result){
    var resultEle = document.getElementById("result-panel");
    Object.keys(result).forEach((key)=>{
      let input = resultEle.querySelector(`input[name=${key}]`);
      if(input){
        input.value = result[key].toFixed(2);
      }
    });
  };

  var calc = function(){
    var factors = getFactors();
    var perZhishu = [];
    var nianshu = 0;
    var personalPaymentProportion = factors.socialFactors.personalPaymentProportion / 100;
    var companyPaymentProportion = factors.socialFactors.companyPaymentProportion / 100;
    var averageSalary = factors.socialFactors.averageSalary;
    var averageSalaryIncreaseRatio = factors.socialFactors.averageSalaryIncreaseRatio / 100;
    var payBase = factors.personalFactors.payBase;
    var payBaseIncreaseRatio = factors.personalFactors.payBaseIncreaseRatio / 100;
    var personalAccountAmount = 0;
    var companyAccountAmount = 0;

    // 验证
    if(factors.socialFactors.retirementAge < factors.personalFactors.endPayAge){
      alert("法定退休年龄不得小于终止缴费年龄");
    }

    for(let age = factors.personalFactors.startPayAge;age<factors.socialFactors.retirementAge;age++){
      if(age < factors.personalFactors.endPayAge){
        perZhishu.push(payBase / averageSalary);
        nianshu++;
        personalAccountAmount += payBase * personalPaymentProportion * 12;
        companyAccountAmount += payBase * companyPaymentProportion * 12;
      }
      averageSalary = averageSalary * ( 1 + averageSalaryIncreaseRatio);
      payBase = payBase * ( 1 + payBaseIncreaseRatio);
    }

    // 如果不是新开一年的情况
    averageSalary = averageSalary / ( 1 + averageSalaryIncreaseRatio );

    var result = {};
    result.nianshu = nianshu;
    result.zhishu = sum(...perZhishu) / nianshu;
    result.averageSalary = averageSalary;
    result.pensionBase = result.averageSalary * ( 1 + result.zhishu) / 2 * nianshu * 0.01;
    result.personalAccountAmount = personalAccountAmount;
    result.companyAccountAmount = companyAccountAmount;
    result.pensionPersonal = personalAccountAmount / factors.socialFactors.monthlyCount;
    result.pensionTotal = result.pensionBase + result.pensionPersonal;
    console.log(result);
    showResult(result);
  };
  calc();
  document.getElementById("form").onsubmit = function(){
    calc();
    return false;
  };
})();