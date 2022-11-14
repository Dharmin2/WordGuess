score = 0;
lives = 3;
urls = [];
index = getRandom(); 
animals = new Map([
	// Key is the url of the image and value is the name of the animal
	[1, "a"],
	[2, "b"],
	[3, "c"]
]);

function compare(answer) {
	if (answer == animals.get(urls[index])) {
		urls.splice(index,index);
		score++;
		return true;
	}
	lives--;
}

function setNewImage() {
	index = getRandom();
	document.getElementById("animalImage").src = "";
}

function getRandom() {
	return Math.floor(Math.random() * urls.length);
}