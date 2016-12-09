#coding=utf-8
from appium import webdriver
import time

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = '4.4'
desired_caps['deviceName'] = 'Android Emulator'
# desired_caps['appPackage'] = 'com.tencent.mobileqq'
# desired_caps['appActivity'] = '.activity.SplashActivity'
# desired_caps['appActivity'] = '.activity.RegisterGuideActivity'
# desired_caps['appActivity'] = '.activity.LoginActivity'
desired_caps['app'] = "F:/QQ_432.apk"


try:
    driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    # driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    time.sleep(60)

except Exception,e:
    print Exception
    print e
finally:
    driver.quit()

print "finish"