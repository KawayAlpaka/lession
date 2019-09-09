# 有偏估计和无偏估计
from playStats.descriptive_stats import mean,variance
import random
import matplotlib.pyplot as plt

def variance_bias(data):
  """方差"""
  n = len(data)
  mean_value = mean(data)
  # 最后除以n或是n-1，有讲究
  return sum((e - mean_value) ** 2 for e in data) / n

def sample(num_of_samples,sample_sz,var):
  data = []
  # data = [random.uniform(0.0,1.0) for _ in range(sample_sz)]
  for _ in range(num_of_samples):
    data.append(var([random.uniform(0.0,1.0) for _ in range(sample_sz)]))
  return data

if __name__ == "__main__":
  data1 = sample(1000,40,variance_bias)
  plt.hist(data1,rwidth=0.8)
  E = mean(data1)
  plt.axvline(x=E,c="black")
  plt.axvline(x=1/12,c="red")  # 均匀分布的方差 = (max - min)**2 / 12
  print("bias :",E, 1/12) 
  plt.show()

  data2 = sample(1000,40,variance)
  plt.hist(data2,rwidth=0.8)
  E = mean(data2)
  plt.axvline(x=E,c="black")
  plt.axvline(x=1/12,c="red")  # 均匀分布的方差 = (max - min)**2 / 12
  print("unbias :",E, 1/12) 
  plt.show()