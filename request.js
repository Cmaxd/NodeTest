var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
	content: '最后一次测试',
	mid: 8837
})

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'zh-CN,zh;q=0.9',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=f4281265-c146-44e1-9299-1c0f07884f49; imooc_isnew_ct=1507722435; imooc_isnew=2; PHPSESSID=ktqm35r224f3a19rtmsl8cpbu0; loginstate=1; apsid=Q3ZjRjMDAwNzQxNWM0MTk2NmU5OTA1ZGFjYmJlZjkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTg2MjU0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtY2hhbzg1QGZveG1haWwuY29tAAAAAAAAAAAAAAAAAGI0NzQ4MzViODNiNmRiMGFjMDc1ZWNiZGI2OGE2ZmFlCGmXWghpl1o%3DY2; last_login_username=mchao85%40foxmail.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1519867649,1520053995; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1520054034; cvde=5a9756f26ec34-175',
		'Host': 'www.imooc.com',
		'Origin': 'https://www.imooc.com',
		'Pragma': 'no-cache',
		'Referer': 'https://www.imooc.com/video/8837',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('Status: ' + res.statusCode)
	console.log('headers: ' + JSON.stringify(res.headers))

	res.on('data', function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
		console.log(chunk)
	})
	res.on('end', function(){
		console.log('评论完毕！')
	})
})
req.on('error', function(e){
	console.log('Error: '+e.message)
})
req.write(postData)
req.end()