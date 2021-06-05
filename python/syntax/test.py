import time

ips = ['106.35.186.124:47783', '']
arr = [ip for ip in ips if len(ip) > 0]
print(arr)

class Foo():
  def test(self):
    # if 未定义的字段会报错
    if(self.is_test):
      print("test1")
    else:
      print("test2")

foo = Foo()
# foo.test()

if(""):
  print("into if1")

if("1"):
  print("into if2")

if (0):
  print("into if3")

if (1):
  print("into if4")

print("xiaoqu-" + str(1))


print([int(n) for n in "123,4124".split(",")])

print("其他" not in "其他")


# # 测试报错
# p = {}
# p.a = "123"


num = 3/2
print(num % 1)
print(isinstance(num,int))

num = 4/2
print(num % 1)
print(isinstance(num,int))
print(isinstance(num,float))

print(0 == 0.0)
