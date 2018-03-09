var fs = require('fs')

fs.createReadStream('冲浪.mp4').pipe(fs.createWriteStream('冲浪-pipe.mp4'))