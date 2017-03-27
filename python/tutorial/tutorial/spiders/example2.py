# -*- coding: utf-8 -*-
import sys
sys.path.append("/usr/lib64/python2.7/lib-dynload")
import scrapy
from scrapy.spiders import BaseSpider,CrawlSpider,Rule
from scrapy.selector import HtmlXPathSelector
#no use
from scrapy.linkextractors.sgml import SgmlLinkExtractor
#replace by
from scrapy.linkextractors import LinkExtractor
from tutorial.items import TutorialItem
from tutorial.items import TorrentItem

#scrapy crawl example -o items.json -t json
class ExampleSpider(scrapy.Spider):
    name = "example"
    allowed_domains = ["domz.com"]
    start_urls = (
		"http://www.dmoz.org/Computers/Programming/Languages/Python/Books/",
		"http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/"
    )

    def parse(self, response):
		hxs = HtmlXPathSelector(response)
		sites = hxs.select('//ul/li')
		items = [] 
		for site in sites:
			item = TutorialItem()
			item['title'] = site.select('a/text()').extract()
			item['link'] = site.select('a/@href').extract()
			item['desc'] = site.select('text()').extract()
			items.append(item)
		return items

#scrapy crawl autospider -o items.json -t json
class AutoSpider(CrawlSpider):
	name = "autospider"
	allowed_domains = ["mininova.org"]
	start_urls = ['http://www.mininova.org/today']
	rules = [Rule(LinkExtractor(allow=['/tor/\d+'])),
			Rule(LinkExtractor(allow=['/abc/\d+']), 'parse_torrent')]
	def parse_torrent(self, response):
		x = HtmlXPathSelector(response)
		torrent = TorrentItem()
		torrent['url'] = response.url
		torrent['name'] = x.select("//h1/text()").extract()
		torrent['description'] = x.select("//div[@id='description']").extract()
		torrent['size'] = x.select("//div[@id='info-left']/p[2]/text()[2]").extract()
		return torrent


