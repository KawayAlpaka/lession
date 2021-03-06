from playStats.descriptive_stats import mean,variance,std
import math
from scipy.stats import norm,t,chi2,f

def mean_ci_est(data,alpha,sigma=None):
  n = len(data)
  sample_mean = mean(data)
  
  if sigma is None:
    se = std(data) / math.sqrt(n)
    t_value = abs(t.ppf(alpha / 2,n-1))
    return sample_mean - se * t_value,sample_mean + se * t_value
  else:
    se = sigma / math.sqrt(n)
    z_value = abs(norm.ppf(alpha / 2))
    return sample_mean - se * z_value,sample_mean + se * z_value

def var_ci_est(data,alpha):
  n = len(data)
  s2 = variance(data)
  chi2_lower_value = chi2.ppf( alpha/2, n-1 )
  chi2_upper_value = chi2.ppf( 1 - alpha/2 ,n-1)
  return (n-1)*s2 / chi2_upper_value , (n-1)*s2 / chi2_lower_value

# 求两个总体均值差的区间估计 公式在:pic/4(方差相等) pic/5(方差不等)
def mean_diff_ci_t_est(data1,data2,alpha,equal=True):
  n1 = len(data1)
  n2 = len(data2)
  mean_diff = mean(data1) - mean(data2)
  sample1_var = variance(data1)
  sample2_var = variance(data2)

  if equal:
    # 联合标准差
    sw = math.sqrt(((n1 - 1)*sample1_var + (n2-1)* sample2_var ) / (n1 + n2 - 2) )
    # t参数
    t_value = abs(t.ppf(alpha/2,n1 + n2 - 2))
    _v = sw * math.sqrt( 1/n1 + 1/n2) * t_value
    return  mean_diff - _v, \
            mean_diff + _v
  else:
    df_numerator = ( sample1_var / n1 + sample2_var / n2  ) ** 2
    df_denominator = (sample1_var /n1)**2/(n1-1) + (sample2_var /n2)**2/(n2-1)
    df = df_numerator / df_denominator
    t_value = abs(t.ppf(alpha/2,df))
    return  mean_diff - math.sqrt(sample1_var/n1 + sample2_var/n2) * t_value,\
            mean_diff + math.sqrt(sample1_var/n1 + sample2_var/n2) * t_value

# 求两个总体的均值差的置信区间（总体方差已知） 公式:pic/6
def mean_diff_ci_z_est(data1,data2,alpha,sigma1,sigma2):
  n1 = len(data1)
  n2 = len(data2)
  mean_diff = mean(data1) - mean(data2)
  z_value = abs(norm.ppf(alpha/2)) 
  _v = math.sqrt(sigma1**2/n1 + sigma2**2/n2) * z_value
  return  mean_diff - _v , mean_diff + _v

# 求两个总体的方差比的置信区间
def var_ratio_ci_est(data1,data2,alpha):
  n1 = len(data1)
  n2 = len(data2)
  f_lower_value = f.ppf(alpha/2,n1-1,n2-1)
  f_upper_value = f.ppf(1-alpha/2,n1-1,n2-1)
  sample1_var = variance(data1)
  sample2_var = variance(data2)
  var_ratio = sample1_var / sample2_var
  return var_ratio /f_upper_value , var_ratio / f_lower_value