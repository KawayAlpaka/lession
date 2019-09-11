from playStats.hypothesis_testing import z_test,t_test,t_test_paired
from playStats.interval_est import mean_ci_est,mean_diff_ci_z_est

if __name__ == "__main__":

  # 夏天抽样数据
  data1 = [41, 36, 12, 18, 23, 19, 8, 16, 11, 14, 18, 14, 34, 6, 30, 11, 1, 11, 4, 32]
  # 冬天抽样数据
  data2 = [23, 45, 115, 37, 29, 71, 39, 23, 21, 37, 20, 12, 13, 135, 49, 32, 64, 40, 77, 97]

  ## 正态检验 适用于总体方差已知的情况
  # # 单个总体正态检验
  # print(z_test(data1,tail="both",mu=35,sigma1=5))
  # print(mean_ci_est(data1,0.05,5))

  # # 两个总体正态检验
  # print(z_test(data1,data2,tail="both",mu=0,sigma1=5,sigma2=15))
  # print(mean_diff_ci_z_est(data1,data2,0.05,5,15))


  ## t检验 适用于总体方差未知的情况
  # 单个样本 t检验
  print(t_test(data1,tail="both",mu=35))
  # 两个样本 t检验
  print(t_test(data1,data2,tail="both",mu=0,equal=True))
  print(t_test(data1,data2,tail="both",mu=0,equal=False))
  # 配对 t检验
  print(t_test_paired(data1,data2,tail="both",mu=0))

  