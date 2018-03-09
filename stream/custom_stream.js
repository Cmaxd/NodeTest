// 定制三种流
var stream = require('stream')
var util = require('util')

function ReadStream(){
	stream.Readable.call(this)
}
util.inherits(ReadStream,stream.Readable)

ReadStream.prototype._read = function(){
	this.push('这是来自可读流的数据')
	this.push('!\n')
	this.push(null) // 表明没有数据了
}

function WritStream(){
	stream.Writable.call(this)
	this._cached = new Buffer('')
}
util.inherits(WritStream,stream.Writable)

WritStream.prototype._write = function(chunk,encode,callback){
	console.log(chunk.toString())
	callback()
}

// 转换流不保存数据
function TransformStream(){
	stream.Transform.call(this)
}
util.inherits(TransformStream,stream.Transform)

TransformStream.prototype._transform = function(chunk,encode,callback){
	this.push(chunk)
	callback()
}

TransformStream.prototype._flush = function(callback){
	this.push('转换流加的！')
	callback()
}

var rs = new ReadStream()
var ws = new WritStream()
var ts = new TransformStream()

rs.pipe(ts).pipe(ws)