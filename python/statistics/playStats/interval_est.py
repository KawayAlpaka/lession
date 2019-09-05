from playStats.descriptive_stats import mean,variance,std
import math
from scipy.stats import norm,t,chi2

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
