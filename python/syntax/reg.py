import re


print(re.match('www', 'www.runoob.com').span())  # 在起始位置匹配
print(re.match('www', 'www.runoob.com'))  # 不在起始位置匹配



print(re.search('www', 'www.runoob.com').span())  # 在起始位置匹配
print(re.search('com', 'www.runoob.com').span())         # 不在起始位置匹配
print(re.search('comdd', 'www.runoob.com'))


print(re.search('https://dg.anjuke.com/community/.*/', 'https://dg.anjuke.com/community/changan/'))
print(re.search('https://dg.anjuke.com/community/.*/', 'https://dg.anjuke.com/community/changan/'))
print(re.search('(^https:\/\/dg\.anjuke\.com\/community\/.*\/$)|(^https:\/\/dg\.anjuke\.com\/community\/.*\/p\d{1,3}\/$)', 'https://dg.anjuke.com/community/changan/p3/'))
print(re.search('(^https:\/\/dg\.anjuke\.com\/community\/.*\/$)|(^https:\/\/dg\.anjuke\.com\/community\/.*\/p\d{1,3}\/$)', 'https://dg.anjuke.com/community/p1/'))



print(re.findall(r"a(.+?)b","a123b"))
print(re.findall(r"anjuke.com\/community\/view\/(\d+)$","https://dg.anjuke.com/community/view/822928"))