// ===========================
// SCRIPT.JS - PT CITRA AQILA PROTEKSI (FIX MOBILE DROPDOWN)
// ===========================

// === 1. Navbar Sticky & Scroll Effect ===
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (!navbar) return;
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// === Language Switcher Function ===
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class dari semua button
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.remove('active');
    });
    
    // Add active class ke button yang diklik
    this.classList.add('active');
    
    const lang = this.dataset.lang;
    
    if (lang === 'en') {
      alert('English version coming soon!');
      // window.location.href = 'index-en.html';
    } else {
      // Tetap di halaman Indonesia
    }
  });
});

// === 1B. Mobile Menu Toggle ===
const menuToggle = document.createElement("div");
menuToggle.className = "menu-toggle";
menuToggle.innerHTML = "☰";
document.querySelector(".navbar").appendChild(menuToggle);

const navbarContent = document.querySelector(".navbar-content");

menuToggle.addEventListener("click", () => {
  navbarContent.classList.toggle("active");
  // Ganti icon dari ☰ ke ✕ saat menu terbuka
  if (navbarContent.classList.contains("active")) {
    menuToggle.innerHTML = "✕";
  } else {
    menuToggle.innerHTML = "☰";
  }
});

// Tutup menu otomatis saat klik link
document.querySelectorAll(".navbar-center a, .btn-hubungi").forEach(link => {
  link.addEventListener("click", function(e) {
    // Jika ini dropdown toggle, jangan tutup menu
    if (this.parentElement.classList.contains('dropdown') && window.innerWidth <= 992) {
      return;
    }
    
    navbarContent.classList.remove("active");
    menuToggle.innerHTML = "☰";
    
    // Tutup semua dropdown
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
});

// === 1C. Mobile Dropdown Fix ===
document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
  dropdownToggle.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdownContent = this.nextElementSibling;
      
      // Tutup dropdown lain
      document.querySelectorAll('.dropdown-content').forEach(otherDropdown => {
        if (otherDropdown !== dropdownContent) {
          otherDropdown.style.display = 'none';
        }
      });
      
      // Toggle dropdown yang diklik
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
      } else {
        dropdownContent.style.display = 'block';
      }
    }
  });
});

// Tutup dropdown kalau klik di luar
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  }
});

// === 2. Counter Animation (angka berjalan) ===
const counters = document.querySelectorAll(".counter");
const speed = 150;
if (counters.length > 0) {
  const startCounting = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText.replace(/,/g, '');
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString();
            setTimeout(updateCount, 25);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  };
  const observer = new IntersectionObserver(startCounting, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}

// === 3. Reveal Animation (Fade Up on Scroll) ===
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (revealTop < windowHeight - 100) el.classList.add("active");
  });
});

// === 4. Swiper untuk Berita Terkini ===
document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".mySwiper");
  if (swiperContainer) {
    new Swiper(".mySwiper", {
      direction: "horizontal",
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      speed: 800,
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});

// === 5. Form Kontak (validasi sederhana) ===
const form = document.querySelector("#contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !phone || !subject || !message) {
      alert("Harap isi semua kolom sebelum mengirim pesan.");
      return;
    }

    alert("Pesan Anda telah dikirim! Terima kasih sudah menghubungi PT CITRA AQILA PROTEKSI 🔥");
    form.reset();
  });
}

// === 6. Back to Top Button ===
const backToTop = document.querySelector("#backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// === 7. Newsletter Subscription ===
const newsletterForm = document.querySelector("#newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector("input[name='email']");
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      alert("Masukkan alamat e-mail Anda terlebih dahulu!");
      return;
    }

    alert(`Terima kasih! ${emailValue} telah terdaftar untuk menerima update dari PT CITRA AQILA PROTEKSI ✅`);
    emailInput.value = "";
  });
}

// === 8. Hover Animation di Footer ===
document.querySelectorAll("footer a").forEach(link => {
  link.addEventListener("mouseover", () => {
    link.style.color = "#ff4040";
    link.style.transition = "color 0.3s ease";
  });
  link.addEventListener("mouseout", () => {
    link.style.color = "";
  });
});

// === 9. Year Auto-Update ===
const yearSpan = document.querySelector("#year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// === 10. Tombol New Mail & WBS ===
const mailButton = document.querySelector("#newMail");
const whistleButton = document.querySelector("#whistleBtn");

if (mailButton) {
  mailButton.addEventListener("click", () => {
    alert("Fitur New Mail akan segera tersedia melalui portal resmi PT CITRA AQILA PROTEKSI 📧");
  });
}

if (whistleButton) {
  whistleButton.addEventListener("click", () => {
    alert("Anda akan diarahkan ke sistem pelaporan internal (Whistle Blowing System).");
  });
}

// === 11. Scroll to Top Floating Button ===
const toTop = document.createElement("div");
toTop.id = "toTop";
toTop.innerHTML = "↑";
toTop.style.cssText = "position:fixed;bottom:20px;right:20px;display:none;cursor:pointer;padding:10px 15px;background:#e63946;color:#fff;border-radius:5px;z-index:9999;";
document.body.appendChild(toTop);

window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 400 ? "block" : "none";
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === 12. Hero Slider ===
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

function showSlides(n) {
  if (!slides || slides.length === 0) return;

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => (slide.style.display = "none"));
  slides[slideIndex].style.display = "block";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

showSlides(slideIndex);
setInterval(() => { plusSlides(1); }, 5000);

// === 13. Console Info ===
console.log("🔥 PT CITRA AQILA PROTEKSI Landing Page Active - Mobile Dropdown Fixed");

// === Clean Mobile Dropdown ===
function initMobileDropdown() {
  const dropdownToggles = document.querySelectorAll('.dropdown > a');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = this.parentElement;
        const dropdownContent = this.nextElementSibling;
        const isActive = dropdown.classList.contains('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
            otherDropdown.querySelector('.dropdown-content').style.display = 'none';
          }
        });
        
        // Toggle current dropdown
        if (isActive) {
          dropdown.classList.remove('active');
          dropdownContent.style.display = 'none';
        } else {
          dropdown.classList.add('active');
          dropdownContent.style.display = 'block';
        }
      }
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.querySelector('.dropdown-content').style.display = 'none';
      });
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', initMobileDropdown);
window.addEventListener('resize', initMobileDropdown);

