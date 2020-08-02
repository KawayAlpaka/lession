from pymongo import MongoClient
import time
client = MongoClient()

client = MongoClient('localhost', 27017)

print(client.list_database_names())


db = client.test_data

collect1 = db.collect1

# 增
# id = collect1.insert_one({"haha":"haha","createAt": time.time()})

# 改
# collect1.update_one({"haha":"hehe"}, {"$set":{"key1":"vvv"}})
# collect1.update_many({"haha":"hehe"}, {"$set":{"key1":"vvv1"}})
# collect1.update_one({"aaa":"aaa"}, {"$set":{"key1":"vvv"}})
# 查
# for data in collect1.find({"haha":"hehe"}):
#   print(data)

# 删
# collect1.delete_one({"haha":"hehe"})


print("**********************************************************************")
for data in collect1.find({}).sort("createAt", -1):
  print(data)




