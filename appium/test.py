#coding=utf-8
from appium import webdriver
import time

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = '4.4'
desired_caps['deviceName'] = 'Android Emulator'
# desired_caps['appPackage'] = 'com.android.calculator2'
# desired_caps['appActivity'] = '.Calculator'
# desired_caps['app'] = "F:/workspace/lession/appium/android-debug.apk"
# desired_caps['app'] = "F:/MachCity.apk"
desired_caps['app'] = "F:/app-release.apk"

try:
    driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    eles = driver.find_elements_by_id("com.mechcity.activity:id/ll_menu_mine")
    eles[0].click()

    eles = driver.find_elements_by_id("com.mechcity.activity:id/et_user_name")
    eles[0].send_keys("15889732550")

    eles = driver.find_elements_by_id("com.mechcity.activity:id/et_user_password")
    eles[0].send_keys("123123")

    eles = driver.find_elements_by_id("com.mechcity.activity:id/btn_login")
    eles[0].click()











    # ele1 = driver.find_element_by_id("com.mechcity.activity:id/iv_home_shop_pic")
    # eles = driver.find_elements_by_id("com.mechcity.activity:id/iv_home_shop_pic")
    #
    # eles[1].click()
    #
    # eles = driver.find_elements_by_id("com.mechcity.activity:id/et_user_name")
    # eles[0].click()
    #
    # print(len(eles))

    # print driver.page_source

    time.sleep(5)

    # driver.find_element_by_name("1").click()
    #
    # driver.find_element_by_name("5").click()
    #
    # driver.find_element_by_name("9").click()
    #
    # # driver.find_element_by_name("删除").click()
    # driver.find_element_by_id("com.android.calculator2:id/del").click()
    #
    # driver.find_element_by_name("9").click()
    #
    # driver.find_element_by_name("5").click()
    #
    # driver.find_element_by_name("+").click()
    #
    # driver.find_element_by_name("6").click()
    #
    # driver.find_element_by_name("=").click()



except Exception,e:
    print Exception
    print e
finally:
    driver.quit()

print "finish"