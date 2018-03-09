var http = require('http')
var fs = require('fs')
var request = require('request')

http
	.createServer(function(req,res){
		// fs.readFile('../logo.png',function(err,data){
		// 	if(err){
		// 		res.end('文件不存在!')
		// 	}
		// 	else{
		// 		res.writeHeader(200,{'Context-Type': 'text/html'})
		// 		res.end(data)
		// 	}
		// })

		// pipe的用法，左边可读流，右边可写流
		// fs.createReadStream('../logo.png').pipe(res)

		// pipe会自动监听data和end事件，把数据发送给客户端
		// pipe还能自动控制后端压力，在客户端连接缓慢的时候，node可以将尽可能少的缓存放到内存中，通过对内存空间调度来控制流量，
		// 从而避免流量被快速读取的可读流所淹没，并且数据在pipe的时候，只有当右侧真正需要流量的时候，可读流才会被取出来。
		request('https://static.mukewang.com/static/img/common/logo.png?t=2.4').pipe(res)
	})
	.listen(8090)