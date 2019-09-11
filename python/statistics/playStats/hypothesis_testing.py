from playStats.descriptive_stats import mean,std,variance
from scipy.stats import norm,t
import math

def z_test(data1,data2=None,tail="both",mu=0,sigma1=1,sigma2=None):
  assert tail in ["both","left","right"], \
    "tail should be one of 'both' ,'left' ,'right'"
  n1 = len(data1)
  mean1_val = mean(data1)
  se1 = sigma1 / math.sqrt(n1)
  if data2 is None:
    z_val = (mean1_val - mu) / se1
    pass
  else:
    assert sigma2 is not None
    n2 = len(data2)
    mean2_val = mean(data2)
    # se2 = sigma2 / math.sqrt(n2)
    mean_diff = mean1_val - mean2_val
    z_val = (mean_diff - mu) / math.sqrt( sigma1**2 / n1 + sigma2**2 / n2 ) 
    pass
  if tail == "both":
    p = 2 * (1 - norm.cdf(abs(z_val)))
  elif tail == "left":
    p = norm.cdf(z_val)
  else:
    p = 1 - norm.cdf(z_val)

  return z_val,p

def t_test(data1,data2=None,tail="both",mu=0,equal=True):
  assert tail in ["both","left","right"], \
    "tail should be one of 'both' ,'left' ,'right'"
  n1 = len(data1)
  mean1_val = mean(data1)
  se1 = std(data1) / math.sqrt(n1)
  if data2 is None:
    t_val = (mean1_val - mu) / se1
    df = n1 - 1
  else:
    n2 = len(data2)
    mean2_val = mean(data2)
    mean_diff = mean1_val - mean2_val
    sample1_var = variance(data1)
    sample2_var = variance(data2)
    if equal:
      sw = math.sqrt(((n1 - 1)*sample1_var + (n2-1)* sample2_var ) / (n1 + n2 - 2) )
      t_val = (mean_diff - mu) / (sw * math.sqrt(1/n1 + 1/n2) )
      df = n1 + n2 - 2
    else:
      se = math.sqrt(sample1_var / n1 + sample2_var / n2)
      t_val = (mean_diff - mu) / se
      df_numerator = ( sample1_var / n1 + sample2_var / n2  ) ** 2
      df_denominator = (sample1_var /n1)**2/(n1-1) + (sample2_var /n2)**2/(n2-1)
      df = df_numerator / df_denominator

  if tail == "both":
    p = 2 * (1 - t.cdf(abs(t_val),df))
  elif tail == "left":
    p = norm.cdf(t_val,df)
  else:
    p = 1 - norm.cdf(t_val,df)

  return t_val,df,p

def t_test_paired(data1,data2,tail="both",mu=0):
  data = [e1 - e2 for (e1,e2) in zip(data1,data2)]
  return t_test(data,tail=tail,mu=mu)