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
		"The time we were supposed to study and ended up scrolling memes for 3 hours instead.",
		"When we laughed so hard we couldn’t breathe and everyone around us got annoyed.",
		"The unplanned walk that turned into a deep life talk at 11:47 p.m.",
		"When we chose food over responsibilities and had zero regrets.",
		"The way you always somehow turn a bad day into a funny story later.",
		"That one inside joke we can’t explain to anyone without sounding weird."
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

// STAR BURST ON LOAD
(function setupStarBurst() {
	const container = document.getElementById('starBurst');
	if (!container) return;

	const icons = ['⭐', '✨', '🌟'];

	for (let i = 0; i < 18; i++) {
		const s = document.createElement('div');
		s.className = 'star';
		s.textContent = icons[Math.floor(Math.random() * icons.length)];
		s.style.left = `${Math.random() * 100}vw`;
		s.style.animationDelay = `${Math.random() * 0.6}s`;
		container.appendChild(s);

		setTimeout(() => {
			if (s.parentNode === container) {
				container.removeChild(s);
			}
		}, 1600);
	}
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
