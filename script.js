
const characterImages = Array.from({ length: 20 }, (_, i) => `characters/character${i + 1}.png`);
const banners = ["New Update!", "Limited Time!", "Special Event!", "Daily Reward!", "Welcome Back!"];

function getRandomCharacter() {
  return characterImages[Math.floor(Math.random() * characterImages.length)];
}

function generateBanners() {
  const bannerContainer = document.getElementById('banners');
  bannerContainer.innerHTML = '';
  banners.forEach(bannerText => {
    const banner = document.createElement('div');
    banner.className = 'banner';
    banner.textContent = bannerText;
    bannerContainer.appendChild(banner);
  });
}

function generateCharacterCards() {
  const gallery = document.getElementById('character-gallery');
  gallery.innerHTML = '';
  characterImages.forEach(img => {
    const card = document.createElement('div');
    card.className = 'character-card';
    const imgElement = document.createElement('img');
    imgElement.src = img;
    card.appendChild(imgElement);
    gallery.appendChild(card);
  });
}

function pullOnce() {
  const result = getRandomCharacter();
  alert("You pulled: " + result);
  generateCharacterCards();
  generateBanners();
}

function pullX10() {
  for (let i = 0; i < 10; i++) {
    const result = getRandomCharacter();
    alert("You pulled: " + result);
  }
  generateCharacterCards();
  generateBanners();
}