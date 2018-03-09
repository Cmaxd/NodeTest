var fs = require('fs')

var readStream = fs.createReadStream('冲浪.mp4')
var n = 0
readStream
	.on('data', function(chunk){
		n++
		console.log('有数据了')
		console.log('是Buffer类型吗啊？' + Buffer.isBuffer(chunk))
		//console.log(chunk.toString())
		readStream.pause()
		console.log('读数据暂停！')
		setTimeout(function(){
			console.log('读数据继续！')
			readStream.resume()
		},30)
	})
	.on('readable', function(){
		console.log('看吧，该文件可读！')
	})
	.on('end',() => console.log('读完了，啊哈哈！   ' + n))
	.on('close',() => console.log('读文件流关闭了哦~'))
	.on('error',(e) => console.log('啊呀！读文件出错了' + e))
