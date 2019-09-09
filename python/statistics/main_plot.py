# 基本绘图
import matplotlib.pyplot as plt 
import random
from  collections import Counter
from playStats.descriptive_stats import frequency

if __name__ == "__main__":
  random.seed(666)
  # # scatter plot 散点图
  # x = [random.randint(0,100) for _ in range(100)]
  # y = [random.randint(0,100) for _ in range(100)]
  # plt.scatter(x,y)
  # plt.show()

  # # line plot 折线图
  # x = [random.randint(0,100) for _ in range(100)]
  # plt.plot([i for i in range(100)],x)
  # plt.show()

  # # bar plot 条形图
  # data1 = [3,3,4,1,5,4,2,1,5,4,4,4,5,3,2,1,4,5,5]
  # counter = Counter(data1)
  # most_common = counter.most_common()
  # x = [point[0] for point in most_common]
  # y = [point[1] for point in most_common]
  # plt.bar(x,y)
  # plt.show()
 
  # # histogram 直方图
  # data2 = [random.randint(1,100) for _ in range(1000)]
  # plt.hist(data2,rwidth=0.8,bins=5,density=True)
  # plt.show()

  # # box plot 箱线图
  # data3 = [random.randint(1,100) for _ in range(1000)]
  # data3.append(200)
  # data3.append(-200)
  # plt.boxplot(data3)
  # plt.show()

  # 并排镶嵌图
  data4 = [random.randint(66,166) for _ in range(200)]
  data5 = [random.randint(60,120) for _ in range(200)]
  plt.boxplot([data4,data5])
  plt.show()
