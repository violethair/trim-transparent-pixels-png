const fs = require('fs');
const path = require('path');
const sharp = require("sharp")

const allFilesSync = (dir, fileList = []) => {
	fs.readdirSync(dir).forEach(file => {
		const filePath = path.join(dir, file)

		fileList.push(
			fs.statSync(filePath).isDirectory()
				? { [file]: allFilesSync(filePath) }
				: file
		)
	})
	return fileList
}

const images = allFilesSync('images/').filter((filename) => filename.match(/\.png$/));

async function run() {
	for (let i = 0; i < images.length; i++) {
		const filename = images[i]
		const fileNameIn = path.join(__dirname, `images/${filename}`)
		const fileNameOut = path.join(__dirname, `output/${filename}`)
		await sharp(fileNameIn)
			.png()
			.trim()
			.toFile(fileNameOut);
		console.log(`Success ${filename}`);
	}
}

run()