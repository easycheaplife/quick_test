def read(file_name):
	file = open(file_name,"r")
	str = file.read(100)
	print str
	file.close()
def readlines(file_name):
	file = open(file_name,"r")
	alllines = file.readlines()
	file.close()

	for v in alllines:
		print v

read('sample.txt')
readlines('sample.txt')
