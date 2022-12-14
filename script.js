'use strict';

const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const trieSpan = document.querySelector('.tries');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');

// keeping letters using javascript
// so untill we put html content into letter-div,
// we cant capture letters
let letters;

let tries;

const words = new Map([
	['akita', 'Japanese breed. They are large, muscular and courageous working dogs. This breed does not trust easily and tend to have a harder time getting along with other dogs or animals. An experienced owner and a home without young children or other dogs is recommended. However, when they are with their trusted humans, they let their affectionate side show and they are very loyal.'],
	['boxer', 'Friendly, playful and full of energy. They enjoy the company of people and are protective, affectionate and loyal to their humans. They even tend to do great with children, especially if they are socialized at an early age. They are also relatively easy to train.'],
	['beagle', 'Happy, energetic, easy going dogs. They are also quite companionable and often times make lovely family dogs. They are also great hunters, with the ability to track down prey thanks to their excellent sense of smell. These dogs were bred to hunt in packs, so they usually get along great with other dogs. Many get along with cats as well.'],
	['afghan hound', 'Their long, silky coat gives them a beautiful and elegant appearance. In order to maintain their lovely coat, they require lots of brushing to prevent any knots or mats. They are very confident and independent. They are also quite self-willed and require a firm yet gentle approach during training as they do not respond well to harsh commands.']
]);

// making a list of only keys from words
const word_list = [...words.keys()];

// get random word from word_list function
const getRandomWord = function (list) {
	return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected upon every reset and init
let select_word;

const init = function (state) {
	wordDiv.innerHTML = '';
	if (state === 'start') {
	// putting all letters into html
	for (const i of 'abcdefghijklmnopqrstuvwxyz') {
		const html = `<button class="alpha">${i.toUpperCase()}</button>`;
		letterDiv.insertAdjacentHTML('beforeend', html);
	}
	} else if (state === 'reset') {
	letters.forEach(btn => {
		btn.classList.remove('disabled');
		hintDiv.classList.add('hidden');
		notif.classList.add('hidden');
	});
	}
	select_word = getRandomWord(word_list);
	tries = 5;

	// capturing letters div
	letters = document.querySelectorAll('.alpha');
	trieSpan.textContent = tries;

	// putting selected word
	for (let i = 0; i < select_word.length; i++) {
	if (select_word.charAt(i) == ' ') {
	const html = `<p class="word"> </p>`;	
	wordDiv.insertAdjacentHTML('beforeend', html);
	} else {
	const html = `<p class="word">_</p>`;
	wordDiv.insertAdjacentHTML('beforeend', html);
	}
	}
};
// initializing the page
init('start');

// show notification
const showNotif = function (msg) {
	notif.classList.remove('hidden');
	notifSpan.textContent = select_word;
	notifContent.textContent = `You ${msg}`;
};

// decrease life
const decreaseLife = function () {
	tries--;
	trieSpan.textContent = tries;
	if (tries === 0) {
		showNotif('lost');
	}
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
	let indexes = [];
	[...select_word].forEach((val, i) => {
	if (val === letter) {
		const index = i;
		indexes.push(index);
	}
	});
	//   console.log(indexes);
	return indexes;
};

// check if we get complete word
const checkWord = function () {
	let val = true;
	for (let i = 0; i < wordDiv.children.length; i++) {
	if (wordDiv.children[i].textContent === '_') {
		val = false;
	}
	}
	return val;
};

// letters event listener function
const letterPress = function () {
	const letter = this.textContent.toLowerCase();

	if (select_word.includes(letter)) {
	const indexes_list = getindexes(letter);
	indexes_list.forEach((val, i) => {
		wordDiv.children[val].textContent = this.textContent;
	});
	if (checkWord()) showNotif('won');
	} else {
	decreaseLife();
	}
	this.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
	btn.addEventListener('click', letterPress);
});

// Listening to hint btn
hintButton.addEventListener('click', function () {
	hintDiv.classList.remove('hidden');
	hintText.textContent = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
	init('reset');
});

// listening to play again button
playAgain.addEventListener('click', function () {
	init('reset');
});

//-------------------
let animals = new Map([
	// Key is the url of the image and value is the name of the animal
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/afghan-hound.jpg', "afghan hound"],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/akita.jpg', "akita"],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/bulldog.jpg', "american bulldog"],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/australian-shepherd.jpg', "australian shepherd"],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/cocker-spaniel.jpg', 'american cocker spaniel'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/beagle.jpg', 'beagle'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/bichon-frise.jpg', 'bichon frise'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/bloodhound.jpg', 'bloodhound'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/border-collie.jpg', 'border collie'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/boston-terrier.jpg', 'boston terrier'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/11/boxer.jpg', 'boxer'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/king-charles-spaniel.jpg', 'cavalier king charles spaniel'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/chihuahua.jpg', 'chihuahua'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/dachshund.jpg', 'dachshund'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/dalmatian.jpg', 'dalmatian'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/doberman.jpg', 'doberman pinscher'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/french-bulldog.jpg', 'french bulldog'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/german-shepherd.jpg', 'german shepherd'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/german-shorthaired-pointer.jpg', 'german shorthaired pointer'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/golden-retriever.jpg', 'golden retriever'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/great-dane.jpg', 'great dane'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/greyhound.jpg', 'greyhound'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/irish-setter.jpg', 'irish setter'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/jack-russel-terrier.jpg', 'jack russel terrier'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/labrador-retriever.jpg', 'labrador retriever'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/maltese.jpg', 'maltese'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/mastiff.jpg', 'mastiff'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/papillon.jpg', 'papillon'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/pembroke-welsh-corgi.jpg', 'pembroke welsh corgi'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/pomeranian.jpg', 'pomeranian'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/poodle.jpg', 'poodle'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/pug.jpg', 'pug'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/rottweiler.jpg', 'rottweiler'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/saint-bernard.jpg', 'saint bernard'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/saluki.jpg', 'saluki'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/samoyed.jpg', 'samoyed'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/scottish-terrier.jpg', 'scottish terrier'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/shar-pei.jpg', 'shar pei'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/shiba-inu.jpg', 'shiba inu'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/shih-tzu.jpg', 'shih tzu'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/husky.jpg', 'siberian husky'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/vizsla.jpg', 'vizsla'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/weimaraner.jpg', 'weimaraner'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/whippet.jpg', 'whippet'],
	['https://www.gazdiravar.com/wp-content/uploads/2022/10/yorkie.jpg', 'yorkie']
	]);

	
//-------------------


let animalImage = document.getElementById('animalImage');

setAnimalImage();
function setAnimalImage() {
	for (let animal in animals) {
		if (select_word == animals[animal][1]){
			animalImage.src = urls[0];
			console.log(animalImage.src);
		} else {
			animalImage.src = "https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg"
		}
	}
}