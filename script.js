// NAV - добавляем класс .scrolled при скролле
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// REVEAL - анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// PROMO
const PROMOS = {
  'MOUTHX2009!': 10,
  'GLADIUS': 15
};

const PRICES = {
  'საბაზისო — ₾150': 150,
  'სტანდარტი — ₾200': 200,
  'პრემიუმი — ₾230': 230
};

const packageSelect = document.querySelector('select[name="package"]');
const promoInput = document.getElementById('promoInput');
const promoBtn = document.getElementById('promoBtn');
const promoOriginal = document.getElementById('promoOriginal');
const promoFinal = document.getElementById('promoFinal');
const promoMsg = document.getElementById('promoMsg');
const promoHidden = document.getElementById('promoHidden');
const promoFinalHidden = document.getElementById('promoFinalHidden');

function updatePrice() {
  const basePrice = PRICES[packageSelect.value];
  const code = promoInput.value.trim().toUpperCase();
  const discount = PROMOS[code];

  if (discount) {
    const discounted = Math.round(basePrice * (1 - discount / 100));
    promoOriginal.textContent = '₾' + basePrice;
    promoFinal.textContent = '₾' + discounted;
    promoMsg.textContent = 'კოდი გამოყენებულია -' + discount + '%';
    promoHidden.value = code;
    promoFinalHidden.value = discounted;
  } else {
    promoOriginal.textContent = '';
    promoFinal.textContent = basePrice ? '₾' + basePrice : '';
    promoMsg.textContent = code ? 'კოდი არასწორია' : '';
    promoHidden.value = '';
    promoFinalHidden.value = basePrice;
  }
}

promoBtn.addEventListener('click', updatePrice);
packageSelect.addEventListener('change', updatePrice);

// показываем цену сразу при загрузке
updatePrice();