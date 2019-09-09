# 点估计和区间估计
from playStats.descriptive_stats import mean,variance,std
from playStats.interval_est import mean_ci_est,var_ci_est,mean_diff_ci_t_est,mean_diff_ci_z_est,var_ratio_ci_est

if __name__ == "__main__":
  
  salary_18 = [1484, 785, 1598, 1366, 1716, 1020, 1716, 785, 3113, 1601]
  salary_35 = [902, 4508, 3809, 3923, 4276, 2065, 1601, 553, 3345, 2182]

  # # 均值估计
  # print(mean(salary_18),mean_ci_est(salary_18,0.05))
  # print(mean(salary_35),mean_ci_est(salary_35,0.05))

  # # 方差估计
  # print(std(salary_18), variance(salary_18),var_ci_est(salary_18,0.05))
  # print(std(salary_35), variance(salary_35),var_ci_est(salary_35,0.05))

  # # 均值差估计（总体方差未知）
  # print( mean_diff_ci_t_est(salary_18,salary_35,0.05,True) )
  # print( mean_diff_ci_t_est(salary_18,salary_35,0.05,False) )

  # 均值差估计（总体方差已知）
  print(mean_diff_ci_z_est(salary_18,salary_35,0.05,1035,1240))

  # 方差比估计
  print(var_ratio_ci_est(salary_18,salary_35,0.05))
  

