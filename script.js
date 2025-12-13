// MOBILE NAV
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
	menuToggle.addEventListener('click', () => {
		nav.classList.toggle('open');
	});
}

// GALLERY LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems && lightbox && lightboxImage) {
	galleryItems.forEach(img => {
		img.addEventListener('click', () => {
			lightboxImage.src = img.src;
			lightbox.style.display = 'flex';
		});
	});
}

if (lightboxClose && lightbox) {
	lightboxClose.addEventListener('click', () => {
		lightbox.style.display = 'none';
	});
}

if (lightbox) {
	lightbox.addEventListener('click', e => {
		if (e.target === lightbox) {
			lightbox.style.display = 'none';
		}
	});
}

// 1. COUNTDOWN (15 December)
(function setupCountdown() {
	const daysEl = document.getElementById('days');
	const hoursEl = document.getElementById('hours');
	const minutesEl = document.getElementById('minutes');
	const secondsEl = document.getElementById('seconds');

	if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

	const bdayMonth = 11; // December (0 = Jan)
	const bdayDay = 15;   // 15 Dec

	function getNextBirthday() {
		const now = new Date();
		let year = now.getFullYear();
		let next = new Date(year, bdayMonth, bdayDay);
		if (next < now) {
			next = new Date(year + 1, bdayMonth, bdayDay);
		}
		return next;
	}

	const target = getNextBirthday();

	function updateCountdown() {
		const now = new Date();
		const diff = target - now;
		if (diff <= 0) {
			daysEl.textContent = '00';
			hoursEl.textContent = '00';
			minutesEl.textContent = '00';
			secondsEl.textContent = '00';
			return;
		}
		const totalSeconds = Math.floor(diff / 1000);
		const days = Math.floor(totalSeconds / (3600 * 24));
		const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		daysEl.textContent = String(days).padStart(2, '0');
		hoursEl.textContent = String(hours).padStart(2, '0');
		minutesEl.textContent = String(minutes).padStart(2, '0');
		secondsEl.textContent = String(seconds).padStart(2, '0');
	}

	updateCountdown();
	setInterval(updateCountdown, 1000);
})();

// 2. RANDOM MEMORY
(function setupMemory() {
	const memoryButton = document.getElementById('memoryButton');
	const memoryText = document.getElementById('memoryText');

	if (!memoryButton || !memoryText) return;

	const memories = [
		"You're the best Subway ordering person, thanks for introducing subway to me.",
		"When we have visited the Dagduseth temple and enojying the Puneri Ganesh Chaturthi, your legs crying in pain so badly.",
		"The unplanned walk that turned into a ice cream at Merdian at 11:47 p.m.",
		"Supreme Corner pav bhaji was a gem we discovered",
		"The scooty rides and getting direction through a G-map was a complete adventure in pune streets",
		"Jain concerts are one of the Gem and best experience."
	];

	memoryButton.addEventListener('click', () => {
		const index = Math.floor(Math.random() * memories.length);
		memoryText.textContent = memories[index];
	});
})();

// 3. MUSIC TOGGLE
(function setupMusic() {
	const musicToggle = document.getElementById('musicToggle');
	const bgMusic = document.getElementById('bgMusic');

	if (!musicToggle || !bgMusic) return;

	let isPlaying = false;

	musicToggle.addEventListener('click', () => {
		if (!isPlaying) {
			bgMusic
				.play()
				.then(() => {
					isPlaying = true;
					musicToggle.classList.add('active');
					musicToggle.textContent = '🔊';
				})
				.catch(() => {});
		} else {
			bgMusic.pause();
			isPlaying = false;
			musicToggle.classList.remove('active');
			musicToggle.textContent = '🎵';
		}
	});
})();

// 4. FLOATING BALLOONS
(function setupBalloons() {
	const container = document.getElementById('balloonsContainer');
	if (!container) return;

	const emojis = ['🎈', '🎉', '🎊', '🎂'];

	function createBalloon() {
		const b = document.createElement('div');
		b.className = 'balloon';
		b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
		const startLeft = Math.random() * 100;
		const duration = 10 + Math.random() * 8;

		b.style.left = `${startLeft}vw`;
		b.style.animationDuration = `${duration}s`;
		container.appendChild(b);

		setTimeout(() => {
			container.removeChild(b);
		}, duration * 1000);
	}

	setInterval(createBalloon, 1500);
})();

// STAR RAIN
(function setupStarBurst() {
	const container = document.getElementById('starBurst');
	if (!container) return;

	const icons = ['⭐', '✨', '🌟'];

	function spawnStar() {
		const s = document.createElement('div');
		s.className = 'star';
		s.textContent = icons[Math.floor(Math.random() * icons.length)];
		s.style.left = `${Math.random() * 100}vw`;
		s.style.animationDelay = '0s';      // start immediately
		container.appendChild(s);

		// Remove star after animation ends
		setTimeout(() => {
			if (s.parentNode === container) {
				container.removeChild(s);
			}
		}, 1400);
	}

	// Initial small burst
	for (let i = 0; i < 14; i++) {
		setTimeout(spawnStar, i * 60);
	}

	// Then keep spawning stars every ~200–350ms
	setInterval(spawnStar, 200 + Math.random() * 150);
})();


// 5. CANDLES MINI GAME
(function setupCandlesGame() {
	const container = document.getElementById('candlesGame');
	const messageEl = document.getElementById('candlesMessage');
	if (!container || !messageEl) return;

	const candles = Array.from(container.querySelectorAll('.candle'));

	function updateMessage() {
		const anyLit = candles.some(c => c.dataset.lit === 'true');
		if (!anyLit) {
			messageEl.textContent = 'You blew out all the candles for her! 🎂✨';
		} else {
			const litCount = candles.filter(c => c.dataset.lit === 'true').length;
			messageEl.textContent = `${litCount} candle(s) still burning…`;
		}
	}

	candles.forEach(candle => {
		candle.addEventListener('click', () => {
			if (candle.dataset.lit === 'true') {
				candle.dataset.lit = 'false';
				candle.classList.add('extinguished');
				updateMessage();
			}
		});
	});

	updateMessage();
})();

// === ABOUT PAGE: random rotating hero cards ===
(function () {
	const cards = document.querySelectorAll(".about-hero-card");

	if (!cards.length) return; // only run on about page

	// Put all your available images + labels here
	const pool = [
		{ src: "images/about/about-image1.jpeg"},
		{ src: "images/about/about-image2.jpeg"},
		{ src: "images/about/about-image3.jpeg"},
		{ src: "images/about/about-image4.jpeg"},
		{ src: "images/about/about-image5.jpeg"},
		{ src: "images/about/about-image6.jpeg"},
		{ src: "images/about/about-image7.jpeg"},
		{ src: "images/about/about-image8.jpeg"},
		{ src: "images/about/about-image9.jpeg"},
		{ src: "images/about/about-image10.jpeg"}
	];

	function getRandomItems(arr, n) {
		const copy = [...arr];
		const result = [];
		for (let i = 0; i < n && copy.length; i++) {
			const idx = Math.floor(Math.random() * copy.length);
			result.push(copy.splice(idx, 1)[0]);
		}
		return result;
	}

	function refreshCards() {
		const picks = getRandomItems(pool, cards.length);
		cards.forEach((card, i) => {
			const img = card.querySelector(".about-hero-card-img");
			const label = card.querySelector(".about-hero-card-label");
			if (!img || !label || !picks[i]) return;

			img.src = picks[i].src;
			label.textContent = picks[i].label;
		});
	}

	// initial load
	refreshCards();
	// change every 6 seconds
	setInterval(refreshCards, 6000);
})();
