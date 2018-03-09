var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter')
	var courseData = []
	chapters.each(function(){
		var item = $(this)
		var chapterTitle = item.find('strong').text().replace(/(^\s*)|(\s*$)/g, "")
		var videos = item.find('.video').children('li')
		var chapter = {
			chapterTitle: chapterTitle,
			videos: []
		}
		videos.each(function(){
			var video = $(this)
			video = video.find('.J-media-item')
			var videoTitle = video.text().replace(/(^\s*)|(\s*$)/g, "");
			var videoId = video.attr('href').split('video/')[1]
			chapter.videos.push({
				videoId: videoId,
				videoTitle: videoTitle
			})
		})
		courseData.push(chapter)
	})

	return courseData
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle
		console.log(chapterTitle + '\n')
		item.videos.forEach(function(video){
			console.log('	【' + video.videoId + '】' + video.videoTitle + '\n')
		})
	})
}

http.get(url, function(res){
	var html = ''
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		var courseData = filterChapters(html)
		printCourseInfo(courseData)
	})
}).on('error',function(){
	console.log('获取课程内容出错！')
})