var fs = require('fs')

// 一次全部读到内存中
fs.readFile('logo.png',function(err,origin_buffer){
	console.log('是Buffer类型吗？'+ Buffer.isBuffer(origin_buffer))

	fs.writeFile('logo_buffer.png',origin_buffer,function(error){
		if(error){
			console.log(error)
		}
	})

	var base64Image = origin_buffer.toString('base64')

	console.log(base64Image)

	var decodedImage = new Buffer(base64Image,'base64')

	console.log('一样吗？'+ Buffer.compare(origin_buffer,decodedImage))

	fs.writeFile('logo_decoded.png',decodedImage,function(error){
		if(error){
			console.log()
		}
	})

})