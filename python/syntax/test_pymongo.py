import pymongo,time,cmath,json,csv

host = "localhost"
port = 27017
dbname = "fang"
client = pymongo.MongoClient(host=host, port=port)
db = client[dbname]
anjuke_start_urls = db["anjuke_start_urls"]
xiaoqu = db["xiaoqu-1"]

def get_anjuke_start_urls():
  start_urls = anjuke_start_urls.find({"valid":True})
  return [d["start_url"] for d in start_urls]



def genReports(type,stage):

  if(type == "Country"):
    group_by = "Country"
  elif(type == "City"):
    group_by = "$city"
  elif(type == "Area1"):
    group_by = ["$city","$area1"]
  else:
    return []
  pipeline = [
    {'$match':
       {
         "price": {"$exists": True},
         "on_sale_count":{"$gt":0}
       }
    },
    # {'$match': {"city":"三亚","price": {"$exists": True}}},
    # {'$match':{"city":"三亚","task_id":{"$exists":True}}},
    # {'$match':{"task_id":10}},
    # {'$match':{"price":{"$exists":False}}},
    # {'$group': {'_id': "均价sum",
    #             'count': {'$sum': "$price"},
    #             'avg': {'$avg': "$price"},
    #             # "te":{
    #             #   "$add":["$price","$on_sale_count"]
    #             # }
    #           }
    #  },
    { "$project": {"xiaoqu": 1,"city":1,"area1":1,"area2":1,"price":1,"on_sale_count":1, "total": { "$multiply": ["$price", "$on_sale_count"]}}},
    # {"$sort": {"price": -1}},
    {
      '$group': {
        '_id': group_by,
        'sum': {'$sum': "$total"},
        'count':{"$sum":1},
        # 这里有点问题，如果没有价格，就不应该统计在售数量
        'on_sale_count':{"$sum":"$on_sale_count"},
        'price__on_sale_count':{
          "$addToSet":{
            'price':'$price',
            'on_sale_count':'$on_sale_count',
          }
        },
        # 'prices':{"$addToSet":"$price"},
        # 'on_sale_counts':{"$addToSet":"$on_sale_count"},
        # 'avg': {'$avg': "$price"},
        # "te":{
        #   "$add":["$price","$on_sale_count"]
        # }
      }
    },
    {"$project": {"area1": "$area1", "average":{ "$divide": [ "$sum", "$on_sale_count" ]},"on_sale_count":1,'count':1,
                  # 'prices':'$prices','on_sale_counts':'$on_sale_counts',
                  'price__on_sale_count':'$price__on_sale_count'
                  }
     },
    {"$sort": {"average": -1}}
  ]
  res = []
  for i in xiaoqu.aggregate(pipeline):
    # print(i)

    price__on_sale_counts = i.get("price__on_sale_count")
    del i['price__on_sale_count']

    total_on_sale_count = i.get("on_sale_count")
    mid = total_on_sale_count / 2
    array = sorted(price__on_sale_counts,key=lambda x:x["price"],reverse=True)
    sum = 0
    median = None
    average = i.get("average")
    fangcha_tatal = 0
    for x in array:
      on_sale_count = x.get("on_sale_count")
      price = x.get("price")
      sum += on_sale_count
      fangcha_tatal += ((price - average)**2)*on_sale_count
      if(sum >= mid and median == None):
        median = price
        # print("中位数:{}".format(x.get("price")))

    variance = fangcha_tatal / (total_on_sale_count)
    standard = cmath.sqrt(variance)
    # print("中位数:{}".format(median))
    # # print("方差:{}".format(variance))
    # print("标准差:{}".format(standard.real))
    # print(i)
    # print("中位数:{}；标准差:{}".format(median,standard.real))
    # print(i["sum"] / i["on_sale_count"])
    d = dict(i)
    d["piancha"] = standard.real / median
    d["median"] = median
    _id = d.get("_id")
    if (type == "Country"):
      pass
    elif (type == "City"):
      d["city"] = _id
    elif (type == "Area1"):
      d["city"] = _id[0]
      d["area1"] = _id[1]
    del d["_id"]
    d["type"] = type
    d["stage"] = stage
    res.append(d)
  # print(res)
  return res

def saveJsonFile(data,path="dist/data.json"):
  js = json.dumps(data)
  f = open(path, "w")
  f.write(js)
  f.close()

def saveCsvFile(data,headers,path="dist/data.csv"):
  with open(path, 'w',encoding="utf-8") as output_file:
    dict_writer = csv.DictWriter(output_file, headers)
    dict_writer.writeheader()
    dict_writer.writerows(data)

if __name__ == "__main__":
  # type = "Country"
  # type = "City"
  type = "Area1"
  reports = genReports(type,1)
  # saveJsonFile(reports,"dist/{}.json".format(type))

  # print(reports[0].keys())
  headers = {"stage":1,"type":1,"city":"","area1":"","count":1,"on_sale_count":1,"average":1,"median":1,"piancha":1}
  # print(headers.keys())
  saveCsvFile(reports,headers.keys(),"dist/{}.csv".format(type))

  # for report in reports:
  #   print(report)
  # print(get_anjuke_start_urls())
  # anjuke_start_urls.insert_one({"start_url":"https://guangzhou.anjuke.com/community"})
  # anjuke_start_urls.insert_one({"start_url":"https://dg.anjuke.com/community"})



  # startTime = time.time()
  #
  # for i in range(100):
  #   db = client["db-{}".format(str(i))]
  #   xiaoqu = db["xiaoqu-{}".format(str(i))]
  #
  # endTime = time.time()
  # print(endTime - startTime)
