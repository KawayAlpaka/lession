import math

class Vector:

  @classmethod
  def zero(cls,dim):
    return cls([0] * dim)

  def __init__(self, lst):
    self._values = list(lst)

  def __repr__(self):
    return "Vector({})".format(self._values)

  def __str__(self):
    return "({})".format(self._values)

  def __iter__(self):
    return self._values.__iter__()

  def __getitem__(self,index):
    return self._values[index]

  def __len__(self):
    return len(self._values)

  def __add__(self,another):
    return Vector([a+b for a,b in zip(self,another)])

  def __sub__(self,another):
    assert len(self) == len(another), \
      "Error in subtracting. Length of vectors must be same."
    return Vector([a-b for a,b in zip(self,another)])

  def __mul__(self,k):
    """返回数量乘法的结果向量：self * k"""
    return Vector([k * e for e in self])
  
  def __rmul__(self,k):
    """返回数量乘法的结果向量：k * self"""
    return self * k

  def __truediv__(self,k):
    return Vector([e / k for e in self])

  def dot(self,another):
    return sum([a*b for a,b in zip(self,another)])

  def __pos__(self):
    return self * 1

  def __neg__(self):
    return self * -1

  def norm(self):
    """向量的长度"""
    return math.sqrt(sum([e**2 for e in self]))

  def normalize(self):
    """单位向量"""
    return Vector(self._values) / self.norm()