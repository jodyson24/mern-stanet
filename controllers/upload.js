const router = require('express').Router()
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs')

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

router.route('/upload')
  .post(function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.file;
    let uploadDir = path.join(__dirname, '../public/uploads', file.name);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadDir, function (err) {
      if (err)
        return res.status(500).send(err);
      res.json({ img: `http://localhost:5092/ftp/uploads/${file.name}`});
    });
  })

router.route('/img')
  .get(function(req, res) {
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    fs.exists(mime, function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream('video.mp4');
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
  })


module.exports = router
