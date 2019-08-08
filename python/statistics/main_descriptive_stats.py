from collections import Counter
from playStats.descriptive_stats import frequency,mode,median,mean

if __name__ == "__main__":
  # # 测试频数
  # data = [2,2,2,2,1,1,1,3,3]
  # counter = Counter(data)
  # print(counter.most_common())
  
  # # 测试频率
  # freq = frequency(data)
  # print(freq)

  # # 测试众数
  # print(mode(data))
  # print(mode([1,2,3,4,5,6,7,8]))
  # print(mode([2,2,2,1,1,1,3,3]))
  # print(mode([2,2,2,1,1,1,3,3,3]))

  # # 测试中位数
  # print(median([1,4,2,3]))
  # print(median([1,4,2,3,5]))
  # print(median([1,4,2,3,5,99]))

  # 测试均值
  print(mean([1,4,2,3]))
  print(mean([1,4,2,3,5]))
  print(mean([1,4,2,3,5,99]))