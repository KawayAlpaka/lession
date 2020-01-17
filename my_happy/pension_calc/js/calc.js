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
  var investmentFactorsEle = document.querySelector("#investment-factors");

  var setting = {};
  setting.key = "pension-calc-factors";
  setting.save = function(factors){
    if(!factors){
      factors = getFactors();
    }
    localStorage.setItem(setting.key,JSON.stringify(factors));
  };
  setting.set = function(){
    var factors = JSON.parse(localStorage.getItem(setting.key));
    if(factors){
      Object.keys(factors.socialFactors).forEach((key)=>{
        let input = socialFactorsEle.querySelector(`input[name=${key}]`);
        if(input){
          input.value = factors.socialFactors[key];
        }
      });
      Object.keys(factors.personalFactors).forEach((key)=>{
        let input = personalFactorsEle.querySelector(`input[name=${key}]`);
        if(input){
          input.value = factors.personalFactors[key];
        }
      });
      Object.keys(factors.investmentFactors).forEach((key)=>{
        let input = investmentFactorsEle.querySelector(`input[name=${key}]`);
        if(input){
          input.value = factors.investmentFactors[key];
        }
      });
    }
  };

  var getFactors = function(){
    // 社会因素
    var socialFactors = {};
    var inputs = socialFactorsEle.querySelectorAll("input[name]");
    inputs.forEach((input)=>{
      socialFactors[input.name] = parseFloat(input.value);
    });
    // 个人因素
    var personalFactors = {};
    inputs = personalFactorsEle.querySelectorAll("input[name]");
    inputs.forEach((input)=>{
      personalFactors[input.name] = parseFloat(input.value);
    });
    // 投资环境因素
    var investmentFactors = {};
    inputs = investmentFactorsEle.querySelectorAll("input[name]");
    inputs.forEach((input)=>{
      investmentFactors[input.name] = parseFloat(input.value);
    });
    return {
      socialFactors,
      personalFactors,
      investmentFactors
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

    setting.save(factors);

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

    var investmentProfitPersonal = 0;
    var investmentProfitCompany = 0;
    var investmentProfitRate = factors.investmentFactors.investmentProfitRate / 100;


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

        // 计算投资收入
        investmentProfitPersonal += investmentProfitPersonal * investmentProfitRate + payBase * personalPaymentProportion * 12;
        investmentProfitCompany += investmentProfitCompany * investmentProfitRate + payBase * companyPaymentProportion * 12;

      }else{
        // 如果停缴了，不继续注资，但还是要利滚利
        investmentProfitPersonal += investmentProfitPersonal * investmentProfitRate;
        investmentProfitCompany += investmentProfitCompany * investmentProfitRate;
      }
      averageSalary = averageSalary * ( 1 + averageSalaryIncreaseRatio);
      payBase = payBase * ( 1 + payBaseIncreaseRatio);
    }

    // 如果不是新开一年的情况
    averageSalary = averageSalary / ( 1 + averageSalaryIncreaseRatio );

    var result = {
      nianshu,
      averageSalary,
      personalAccountAmount,
      companyAccountAmount,
      investmentProfitPersonal,
      investmentProfitCompany
    };
    result.zhishu = sum(...perZhishu) / nianshu;
    result.pensionBase = result.averageSalary * ( 1 + result.zhishu) / 2 * nianshu * 0.01;
    result.pensionPersonal = personalAccountAmount / factors.socialFactors.monthlyCount;
    result.pensionTotal = result.pensionBase + result.pensionPersonal;
    result.pensionTotalYear = result.pensionTotal * 12;

    console.log(result);
    showResult(result);
  };

  setting.set();

  calc();
  document.getElementById("form").onsubmit = function(){
    calc();
    return false;
  };
})();