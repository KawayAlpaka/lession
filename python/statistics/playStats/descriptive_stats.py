from collections import Counter
from math import sqrt

def frequency(data):
  counter = Counter(data)
  data_len = len(data)

  ret = []
  for point in counter.most_common():
    ret.append((point[0],point[1] / data_len))

  # # 更装逼的写法
  # ret2 = [(a,b/data_len) for (a,b) in counter.most_common()]
  # print(ret2)

  return ret

def mode(data):
  """众数"""
  ret = []
  counter = Counter(data)
  most_common = counter.most_common()
  max_count = most_common[0][1]
  if max_count == 1:
    return ret,None
  for point in most_common:
    if point[1] == max_count:
      ret.append(point[0])
    else:
      break
  return ret,max_count

def median(data):
  """中位数"""
  sorted_data = sorted(data)
  n = len(sorted_data)
  if n % 2 == 1:
    return sorted_data[n // 2]
  else:
    return (sorted_data[(n // 2) -1] + sorted_data[n // 2]) / 2

def mean(data):
  """均值"""
  return sum(data)/ len(data)

def rng(data):
  """极差"""
  return max(data) - min(data) 

def quartile(data):
  """四分位数"""
  n = len(data)
  sorted_data = sorted(data)
  q1,q2,q3 = None,None,None
  if n >= 4:
    q2 = median(sorted_data)
    if n % 2 == 1:
      q1 = median(sorted_data[:n//2])
      q3 = median(sorted_data[(n//2)+1:])
    else:
      q1 = median(sorted_data[:n//2])
      q3 = median(sorted_data[(n//2):])
  return q1,q2,q3

def variance(data):
  """方差"""
  n = len(data)
  mean_value = mean(data)
  # 最后除以n或是n-1，有讲究
  return sum((e - mean_value) ** 2 for e in data) / (n - 1)

def std(data):
  """标准差"""
  return sqrt(variance(data))
