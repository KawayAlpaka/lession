# import webbrowser as web
# web.open("http://www.baidu.com",new=0,autoraise=True)

import webbrowser
chromePath = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chromePath))
chrome = webbrowser.get('chrome')
chrome.open('https://www.baidu.com',new=1,autoraise=True)



