import requests,json,time

# print(requests)
#
# response = requests.get("http://dev.qydailiip.com/api/?apikey=cc36315761645a65b7877754050e29321938a450&num=5&type=json&line=win&proxy_type=putong&sort=rand&model=all&protocol=https&address=&kill_address=&port=&kill_port=&today=false&abroad=1&isp=&anonymity=2")
#
#
# print(response.text)
#
# data = json.loads(response.text)
#
# print(data)
# # print(data[2])
#
# proxies={
# 'http':"http://" + data[2]
# }
# print(proxies)
#
# res = requests.get("https://dg.anjuke.com/community/huangjianga/",
#                    # proxies=proxies
#                    )
# print(res.text)


# proxies={
#  "http":"socks5h://127.0.0.1:1080",
#  "https":"socks5h://127.0.0.1:1080"
# }
proxies={
 # "http":"http://127.0.0.1:1082",
 # "https":"http://127.0.0.1:1082"
}

# proxies={
#  "http":"socks5://127.0.0.1:1080",
#  "https":"socks5://127.0.0.1:1080"
# }

# proxies={
#  "http":"127.0.0.1:1080",
#  "https":"127.0.0.1:1080"
# }
#
proxies={
 "http":"192.168.0.108:1080",
 "https":"192.168.0.108:1080"
}

headers = {
  "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
}

url = "https://2021.ip138.com/"
# url = "https://shanghai.anjuke.com/community/view/818145"


start_at = time.time()
response = requests.get(url,
                        headers=headers,
                        proxies=proxies
                        )
end_at = time.time()
print(response.text)
print(end_at - start_at)
