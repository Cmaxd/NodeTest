// 可读流，可写流的构造函数
var Readable = require('stream').Readable
var Writable = require('stream').Writable

var readStream = new Readable()
var writStream = new Writable()

readStream.push('这是来自可读流的数据')
readStream.push('!\n')
readStream.push(null) // 表明没有数据了

// 重写_write方法来改变可写流对数据的处理方式
writStream._write = function(chunk,encode,callback){
	console.log(chunk.toString())
	callback()
}

readStream.pipe(writStream)