import numpy as np
import random
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt
import math
# from scipy import stats


def demo1():
  mu ,sigma = 0, 1
  sampleNo = 1000
  np.random.seed(0)
  s = np.random.normal(mu, sigma, sampleNo)

  plt.hist(s, bins=100, normed=True)
  plt.show()

def fenbu(data,rwidth=None):
  len_data = len(data)
  min_data = math.floor(min(data))
  max_data = math.ceil(max(data)) 
  if rwidth == None :
    rwidth = (max_data - min_data) / 10
  if rwidth < 1:
    rwidth = 1
  rwidth = math.floor(rwidth)
  x = []
  y = []
  z = []
  for i in range(min_data ,max_data,rwidth):
    x.append((i,i+rwidth,i+rwidth/2))
    y.append(0)
    z.append(0)
  for num in data:
    for index,r in enumerate(x):
      if num >= r[0] and num < r[1]:
        y[index] += 1
  for index,num in enumerate(y):
    z[index] = y[index] / len_data
  return x,y,z
def sample(data,n):
  return [data[random.randint(0,len(data)-1)] for _ in range(n)]
  
def chi_square(data):
  mo = [(1,"red"),(2,"green"),(3,"brown"),(5,"brown"),(10,"darksalmon"),(20,"gold")]
  for n,color in mo:
    g1 = []
    for _ in range(1,10000):
      s = sample(data,n)
      x = sum([ num**2 for num in s ])
      g1.append(x)
    f = fenbu(g1)
    xx = [f0[2] for f0 in f[0]]
    yy = [f2 for f2 in f[2]]
    plt.plot(xx,yy,color)
    # plt.hist(g1,rwidth=0.5, density=True,color=color)
  plt.show()

def t_distribution(data):
  pass

if __name__ == "__main__":
  mu ,sigma = 0, 1
  sampleNo = 100000
  np.random.seed(0)
  s = np.random.normal(mu, sigma, sampleNo)
  chi_square(s)
  # t_distribution(s)