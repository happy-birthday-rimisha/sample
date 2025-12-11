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

// 5. WISH FORM -> persistent vertical wish list with delete
(function setupWishForm() {
	const wishForm = document.getElementById('wishForm');
	const wishName = document.getElementById('wishName');
	const wishMessage = document.getElementById('wishMessage');
	const wishList = document.getElementById('wishList');

	if (!wishForm || !wishName || !wishMessage || !wishList) return;

	const STORAGE_KEY = 'rimisha_wishes';

	function loadWishes() {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	}

	function saveWishes(wishes) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
	}

	function renderWishes() {
		const wishes = loadWishes();

		wishList.innerHTML = '';

		if (wishes.length === 0) {
			const li = document.createElement('li');
			li.className = 'wish-list-item';
			li.textContent = 'Be the first one to leave a wish for Rimisha ✨';
			wishList.appendChild(li);
			return;
		}

		wishes.forEach((wish, index) => {
			const li = document.createElement('li');
			li.className = 'wish-list-item';

			const nameEl = document.createElement('div');
			nameEl.className = 'wish-list-name';
			nameEl.textContent = wish.name;

			const msgEl = document.createElement('div');
			msgEl.className = 'wish-list-message';
			msgEl.textContent = wish.message;

			// delete button
			const delBtn = document.createElement('button');
			delBtn.className = 'wish-list-delete';
			delBtn.textContent = '×';
			delBtn.title = 'Delete this wish';

			delBtn.addEventListener('click', () => {
				const all = loadWishes();
				all.splice(index, 1); // remove this wish
				saveWishes(all);
				renderWishes();
			});

			li.appendChild(nameEl);
			li.appendChild(msgEl);
			li.appendChild(delBtn);
			wishList.appendChild(li);
		});
	}

	// initial render on page load
	renderWishes();

	wishForm.addEventListener('submit', e => {
		e.preventDefault();

		const name = wishName.value.trim() || 'Someone';
		const message = wishMessage.value.trim();
		if (!message) return;

		const wishes = loadWishes();
		wishes.push({ name, message });
		saveWishes(wishes);
		renderWishes();

		wishMessage.value = '';
	});
})();
