# -*- coding: utf-8 -*-
import sys
sys.path.append("/usr/lib64/python2.7/lib-dynload")
import scrapy

#scrapy crawl simpleexample
# or class SimpleExampleSpider(BaseSpider):
class SimpleExampleSpider(scrapy.Spider):
    name = "simpleexample"
    allowed_domains = ["163.com"]
    start_urls = (
		"http://www.163.com/",
    )

    def parse(self, response):
		filename = response.url.split("/")[-2]
		open(filename, 'wb').write(response.body)
		self.logger.info('Parse function called on %s', response.url)

