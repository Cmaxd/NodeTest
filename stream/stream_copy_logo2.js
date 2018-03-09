var fs = require('fs')

var readStream = fs.createReadStream('冲浪.mp4')
var writeStream = fs.createWriteStream('冲浪-stream.mp4')

readStream.on('data',function(chunk){
	if(writeStream.write(chunk) === false){
		console.log('数据还在缓存区')
		readStream.pause()
	}
	
})

readStream.on('end',function(){
	writeStream.end()
})

writeStream.on('drain',function(){
	console.log('数据写完了')
	readStream.resume()
})