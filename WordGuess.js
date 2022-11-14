score = 0;
lives = 3;
urls = ["https://pngimg.com/uploads/apple/apple_PNG12436.png"];
index = 0;
animals = new Map([
	// Key is the url of the image and value is the name of the animal
	['https://pngimg.com/uploads/apple/apple_PNG12436.png', "a"]
]);

function compare(answer) {
	if (answer == animals.get(urls[index])) {
		animals.delete(urls[index]);
		urls.splice(index,index);
		score++;
		return true;
	}
	lives--;
}

function setNewImage() {
	index = getRandom();
	document.getElementById("animalImage").src = urls[index];
}

function getRandom() {
	return Math.floor(Math.random() * urls.length);
}