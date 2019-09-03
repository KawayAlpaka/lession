import random
from playStats.descriptive_stats import mean,variance
import matplotlib.pyplot as plt

if __name__ == "__main__":
  sample_means = []
  sample_vars = []
  indeces = []

  for sz in range(20,10001,50):
    indeces.append(sz)
    sample = [random.gauss(0.0,1.0) for _ in range(sz)]
    sample_means.append(mean(sample))
    sample_vars.append(variance(sample))

  plt.plot(indeces,sample_means)
  plt.plot(indeces,sample_vars)
  plt.show()
  
