document.addEventListener("DOMContentLoaded", () => {
  // Add smooth animation to dropdown menus
  const dropdowns = document.querySelectorAll(".nav-item.dropdown");

  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu");
    const toggle = dropdown.querySelector("[data-bs-toggle='dropdown']");

    // Add event listeners for mouseenter and mouseleave for smooth animation
    dropdown.addEventListener("mouseenter", () => {
      menu.classList.add("show");
      menu.style.opacity = "1";
      menu.style.transform = "translateY(0)";
    });

    dropdown.addEventListener("mouseleave", () => {
      menu.classList.remove("show");
      menu.style.opacity = "0";
      menu.style.transform = "translateY(-10px)";
    });

    // Prevent default Bootstrap behavior for smooth animation
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });

  // Optional: Auto-slide hero carousel (if desired)
  const carousel = document.querySelector("#heroCarousel");
  if (carousel) {
    const bootstrapCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000, // Change slide every 5 seconds
      ride: "carousel",
      wrap: true, // Enable continuous looping
    });

    // Smooth scroll animation
    carousel.addEventListener("slide.bs.carousel", () => {
      const activeItem = carousel.querySelector(".carousel-item.active");
      activeItem.style.transition =
        "transform 1s ease-in-out, opacity 1s ease-in-out";
    });
  }
});
