import numpy as np
import random,math
import matplotlib.pyplot as plt

# 返回数据(频段数组,频数数组,频率数组)
def get_rate(data,rwidth=1):
  len_data = len(data)
  min_data = math.floor(min(data))
  max_data = math.ceil(max(data)) 

  x = []  #频段
  y = []  #频数
  z = []  #频率

  i = min_data
  while i <= max_data + rwidth:
    x.append((i,i+rwidth,i+rwidth/2))
    y.append(0)
    z.append(0)
    i += rwidth
  i = 0

  for num in data:
    for index,r in enumerate(x):
      if num >= r[0] and num < r[1]:
        y[index] += 1
  for index,num in enumerate(y):
    z[index] = y[index] / len_data
  return x,y,z

#从数据中随机采样n个点
def sample(data,n):
  return [data[random.randint(0,len(data)-1)] for _ in range(n)]

# 绘制数据的卡方分布图
def chi_square(data):
  mo = [(1,"red"),(3,"green"),(6,"brown"),(12,"gold"),(24,"darksalmon")]
  for n,color in mo:
    g1 = []
    for _ in range(1,10000):
      s = sample(data,n)
      x = sum([ num**2 for num in s ])
      g1.append(x)
    f = get_rate(g1,0.5)
    xx = [f0[2] for f0 in f[0]]
    yy = [f2 for f2 in f[2]]
    plt.plot(xx,yy,color)
    # plt.hist(g1,rwidth=0.5, density=True,color=color)
  plt.show()

def t_distribution(data):
  # mo = [(1,"red"),(3,"green"),(6,"brown"),(10,"darksalmon"),(20,"gold")]
  # for n,color in mo:
  #   g1 = []
  #   for _ in range(1,10000):
  #     s = sample(data,n)
  #     x = sum([ num**2 for num in s ])
  #     y = (sum([ num for num in s ]) /n) / math.sqrt(x/n)
  #     g1.append(y)
  #   f = get_rate(g1)
  #   xx = [f0[2] for f0 in f[0]]
  #   yy = [f2 for f2 in f[2]]
  #   plt.plot(xx,yy,color)
  # plt.show()
  pass

if __name__ == "__main__":
  mu ,sigma = 0, 1
  sampleNo = 100000
  np.random.seed(0)
  s = np.random.normal(mu, sigma, sampleNo)
  chi_square(s)
  # t_distribution(s)