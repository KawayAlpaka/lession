# import webbrowser as web
# web.open("http://www.baidu.com",new=0,autoraise=True)
from webbrowser import Chrome
import webbrowser


# # chromePath = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
# # chromePath = r'C:\Users\dell\AppData\Local\Google\Chrome\Application\chrome.exe --args --disable-web-security --user-data-dir=D:\chrome'
# chromePath = r'C:\Users\dell\AppData\Local\Google\Chrome\Application\chrome.exe'
# # chromePath = r'C:\Users\dell\Desktop\Google Chrome-不跨域.lnk'
# webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chromePath))
# chrome = webbrowser.get(chromePath)
# chrome.open('https://www.baidu.com',new=1,autoraise=True)




new_chrome = webbrowser.Chrome()
new_chrome.name = r'C:\Users\dell\AppData\Local\Google\Chrome\Application\chrome.exe'
new_chrome.remote_args = webbrowser.Chrome.remote_args + [
  "--disable-web-security",
  "--user-data-dir=D:\chrome"
]
new_chrome.open("https://www.baidu.com")
