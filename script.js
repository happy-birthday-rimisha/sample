// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
	menuToggle.addEventListener('click', () => {
		nav.classList.toggle('open');
	});
}

// Gallery lightbox
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
	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			lightbox.style.display = 'none';
		}
	});
}
