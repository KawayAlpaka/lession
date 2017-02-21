#!/usr/bin/env python
# encoding: utf-8
from selenium import webdriver




driver = webdriver.Chrome()

import unittest

class mytest(unittest.TestCase):
    ##初始化工作
    def setUp(self):
        pass

        # 退出清理工作

    def tearDown(self):
        driver.close()
        pass

        # 具体的测试用例，一定要以test开头

    def testsum(self):
        driver.get("http://www.baidu.com")
        btn = driver.find_element_by_css_selector("#su")
        btn_text = btn.get_attribute("value")
        self.assertEqual(btn_text, u'百度一下', 'test sum fail')

if __name__ == '__main__':
    unittest.main()

