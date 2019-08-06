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
    