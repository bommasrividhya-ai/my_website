/**
 * Interactive Animations & Functionality for Sri Vidhya's Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 1. Quantum Background Particle & Canvas Animation
  initQuantumCanvas();

  // 2. Animated Scroll Reveal (Observer)
  initScrollReveal();

  // 3. Dynamic Animated Counters
  initAnimatedCounters();

  // 4. Interactive Project Filter
  initProjectFilters();

  // 5. Interactive Contact Form Animation & Toast
  initContactForm();

  // 6. Quantum Gates Interactive Visualizer Animation
  initQuantumGateVisualizer();
});

/* ==========================================================================
   1. Quantum Particle Canvas
   ========================================================================== */
function initQuantumCanvas() {
  const canvas = document.getElementById("quantum-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? "0, 242, 254" : "112, 0, 255";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Initialize Particles
  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 60);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop with Quantum Entanglement Lines
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      // Connect near particles with glowing entanglement threads
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-8");

        // Trigger Skill Bar Animations inside element if present
        const skillBars = entry.target.querySelectorAll(".skill-progress-bar");
        skillBars.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width");
          if (targetWidth) {
            bar.style.width = targetWidth;
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply reveal class to sections & elements
  const revealElements = document.querySelectorAll(
    "section, .project-card, #skills > div, #about > div"
  );

  revealElements.forEach((el) => {
    el.classList.add("transition-all", "duration-700", "ease-out", "opacity-0", "translate-y-8");
    observer.observe(el);
  });
}

/* ==========================================================================
   3. Animated Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll("[data-counter]");

  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-counter"), 10);
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / (target || 1)));

        const timer = setInterval(() => {
          start += 1;
          el.textContent = start;
          if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. Interactive Project Filters & Smooth Scaling Animations
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll("#project-filters button");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle Active Style
      filterBtns.forEach((b) => {
        b.classList.remove("bg-cyan-500", "text-slate-950");
        b.classList.add("bg-gray-800", "text-gray-400");
      });
      btn.classList.remove("bg-gray-800", "text-gray-400");
      btn.classList.add("bg-cyan-500", "text-slate-950");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Contact Form with Ripple & Feedback Animation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    // Loading State
    submitBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0