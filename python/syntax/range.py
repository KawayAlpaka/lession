print(range(2,5))
print(range(5,0))
for i in range(2,0,-1):
  print(i)
print(5/2)
print(5//2)

print("1"+"2")
print(int("1")+int("2"))
print(type("1"))
print(isinstance("",str))
print(type(isinstance("",str)))

print("+" == "+" or "-" == "-")


lst = [1,2,"*",3,4]
index = 2
lst = lst[:index-1] + [lst[index-1] * lst[index+1]] + lst[index + 2:]
print(lst)
print(lst[-1])
lst = lst[:-1]
print(lst)
lst = lst[1:]
print(lst)

print([1,2,3])
# print([3,2,1]- 3*[1,2,3])

class A:
  @staticmethod
  def funcname(parameter_list):
    pass
    
arr = [11,22,33]
print(id(arr)) 
arr.append(44)
print(id(arr)) 
id = id(arr)
print(id)

def multipliers1():
  return [lambda x: i * x for i in range(4)]
print([m(2) for m in multipliers1()])
def multipliers2():
  return [(lambda x: i * x)(2) for i in range(4)]
print(multipliers2())
print([ i for i in range(4)])
