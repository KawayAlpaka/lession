import math
from vector.Vector import Vector

class Matrix:
  @classmethod
  def zero(cls,r,c):
    return cls([[0]*c for _ in range(r)])
  # @classmethod
  @staticmethod
  def identity(n):
    m = Matrix.zero(n,n)
    for i in range(n):
      m._values[i][i] = 1
    return m
  def __init__(self, list2d):
    self._values = [row[:] for row in list2d]
    self._m = len(self._values)
    self._n = len(self._values[0])
  def __str__(self):
    return "[" + "\n".join([ " " + str(self._values[i]) if(i>=1) else str(self._values[i]) for i in range(len(self._values))]) + "]"
  def shape(self):
    return self._m , self._n
  def size(self):
    return self._m * self._n
  def __len__(self):
    return self._m
  def __getitem__(self,pos):
    return self._values[pos[0]][pos[1]]
  def row_num(self):
    return self._m
  def col_num(self):
    return self._n
  def row_vector(self,r):
    return Vector(self._values[r])
  def col_vector(self,c):
    return Vector([row[c] for row in self._values])
  
  def __add__(self,another):
    assert self.shape() == another.shape(), "Error in adding. Shape of matrix must be same."
    return Matrix([[a+b for a,b in zip(self.row_vector(i),another.row_vector(i))] for i in range(self.row_num())])
  def __sub__(self,another):
    assert self.shape() == another.shape(), "Error in subtracting. Shape of matrix must be same."
    return Matrix([[a-b for a,b in zip(self.row_vector(i),another.row_vector(i))] for i in range(self.row_num())])
  def __eq__(self,another):
    # 重载相等运算符
    if(self.shape() != another.shape()):
      return False
    else:
      for i in range(self._m):
        for j in range(self._n):
          if(self[i,j] != another[i,j]):
            return False
    return True
  def __mul__(self,k):
    return Matrix([[a * k for a in self.row_vector(i)] for i in range(self.row_num())])
  def __rmul__(self,k):
    return Matrix([[a * k for a in self.row_vector(i)] for i in range(self.row_num())])
  def dot(self,another):
    if (isinstance(another,Vector)):
      assert self.col_num() == len(another),\
        "Error in Matrix-Vector Multiplication. matrix's col_num should eq vector's len"
      return Vector([self.row_vector(i).dot(another) for i in range(self.row_num())])
    if (isinstance(another,Matrix)):
      assert self.col_num() == another.row_num(),\
        "Error in Matrix-Matrix Multiplication. A col_num should eq B row_num"
      return Matrix([[self.row_vector(i).dot(another.col_vector(j))] for j in range(another.col_num())] for i in range(self.row_num()))
  def T(self):
    return Matrix([[ self[r,c] for r in range(self.row_num())] for c in range(self.col_num())])