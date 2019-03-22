from .Matrix import Matrix
from vector.Vector import Vector
from globals import is_zero

class LinearSystem:
  def __init__(self,A,b):
    assert A.row_num() == len(b), "row number of A must be equal to the length of b"
    self._m = A.row_num()
    self._n = A.col_num()
    self.Ab = [Vector(A.row_vector(i).underlying_list() + [b[i]]) for i in range(self._m)]
  def gauss_jordan_elimination(self):
    self._forward()
    self._backward()
  def _forward(self):
    i,j = 0,0
    while(i<self._m and j < self._n):
      # 交换行
      # print("i={},j={}".format(i,j))
      maxValue , maxRowNum = self.Ab[i][j],i
      for k in range(i+1,self._m):
        if(self.Ab[k][j] > maxValue):
          maxValue , maxRowNum = self.Ab[k][j],k
      self.Ab[i] , self.Ab[maxRowNum] = self.Ab[maxRowNum],self.Ab[i]
      if (is_zero(self.Ab[i][j])):
        j += 1
      else:
        # 主元化为1
        self.Ab[i] = self.Ab[i] / self.Ab[i][j]
        for k in range(i+1,self._m):
          self.Ab[k] = self.Ab[k] - self.Ab[i] * self.Ab[k][j]
        i += 1
  def _backward(self):
    for i in range(self._m - 1,-1,-1):
      for j in range(self._n):
        if (self.Ab[i][j] == 1):
          for k in range(i-1,-1,-1):
            self.Ab[k] = self.Ab[k] - self.Ab[i] * self.Ab[k][j]
          break
  def fancy_print(self):
    print(self)
  def __str__(self):
    return "[" + "\n".join([ " " + str(self.Ab[i]) if(i>=1) else str(self.Ab[i]) for i in range(len(self.Ab))]) + "]"
    

