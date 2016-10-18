#coding=utf-8
from appium import webdriver

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = '4.4'
desired_caps['deviceName'] = 'Android Emulator'
desired_caps['appPackage'] = 'com.android.calculator2'
desired_caps['appActivity'] = '.Calculator'
# desired_caps['app'] = "F:/workspace/lession/appium/android-debug.apk"

try:
    driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    driver.find_element_by_name("1").click()

    driver.find_element_by_name("5").click()

    driver.find_element_by_name("9").click()

    driver.find_element_by_name("删除").click()

    driver.find_element_by_name("9").click()

    driver.find_element_by_name("5").click()

    driver.find_element_by_name("+").click()

    driver.find_element_by_name("6").click()

    driver.find_element_by_name("=").click()
except Exception,e:
    print Exception
    print e
finally:
    driver.quit()

print "finish"