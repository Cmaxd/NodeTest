var http = require('http')
var cheerio = require('cheerio')
//var Promise = require('promise')
var baseUrl = 'http://www.imooc.com/learn/'
var videoIds = [728, 637, 348, 259, 197, 134, 75]

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter')
	var courseData = {}
	courseData.title = $('.course-infos .w .hd h2').text()
	//courseData.number =  $('.course-infos .w .statics .static-item .js-learn-num').text()

	courseData.videos = []
	chapters.each(function(){
		var item = $(this)
		var chapterTitle = item.find('strong').text().trim()//replace(/(^\s*)|(\s*$)/g, "")
		var videos = item.find('.video').children('li')
		var chapter = {
			chapterTitle: chapterTitle,
			videos: []
		}
		videos.each(function(){
			var video = $(this)
			video = video.find('.J-media-item')
			var videoTitle = video.text().trim()//replace(/(^\s*)|(\s*$)/g, "");
			var videoId = video.attr('href').split('video/')[1]
			chapter.videos.push({
				videoId: videoId,
				videoTitle: videoTitle
			})
		})
		courseData.videos.push(chapter)
	})

	return courseData
}

function printCourseInfo(coursesData){
	coursesData.forEach(function(courseData){
		console.log(courseData.number + '人学过 ' + courseData.title + '\n')
	})


	coursesData.forEach(function(courseData){
		console.log('***********' + courseData.title + '\n')
		courseData.videos.forEach(function(item){
			var chapterTitle = item.chapterTitle
			console.log(chapterTitle + '\n')
			item.videos.forEach(function(video){
				console.log('	【' + video.videoId + '】' + video.videoTitle + '\n')
			})
		})		
	})

}

function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取 '+url)
		http.get(url, function(res){
			var html = ''
			res.on('data',function(data){
				html += data
			})
			res.on('end',function(){
				resolve(html)
				//var courseData = filterChapters(html)
				//printCourseInfo(courseData)
			})
		}).on('error',function(e){
			console.log('获取课程内容出错！')
			reject(e)
		})
	})
}

var fetchCourseArray = []

videoIds.forEach(function(videoId){
	var videoUrl = baseUrl + videoId
	fetchCourseArray.push(getPageAsync(videoUrl))
})

var fetchNumberArray = []

videoIds.forEach(function(videoId){
	var numberUrl = 'http://www.imooc.com/course/AjaxCourseMembers?ids=' + videoId
	fetchNumberArray.push(getPageAsync(numberUrl))
})

var learnNumberArray = []

Promise
	.all(fetchNumberArray)
	.then(function(jsons){
		jsons.forEach(function(json){
			json = JSON.parse(json)
			learnNumberArray.push(json.data[0].numbers)
		})
		Promise
			.all(fetchCourseArray)
			.then(function(pages){
				var coursesData = []
				pages.forEach(function(page){
					var courseData = filterChapters(page)
					courseData.number = parseInt(learnNumberArray.shift())
					coursesData.push(courseData)
				})
				coursesData.sort(function(a,b){
					return a.number < b.number
				})
				printCourseInfo(coursesData)
			})
	})


