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

const scholarships = [
  {
    title: "KAUST Scholarship 2025",
    description:
      "Beasiswa King Abdullah University of Science and Technology untuk jenjang S2 tipe Fully Funded di Arab Saudi.",
    university: "King Abdullah University of Science and Technology (KAUST)",
    major: "Natural Science, Life Science and Technology, Engineering",
    registration: "10 Jan - 15 March 2025",
    level: "S2",
    status: "Dibuka",
    requirement: {
      age: "No age requirement",
      gpa: "Minimum 3.7 out of 4.00",
      englishTest: "IELTS (6.5), TOEFL iBT (79)",
      documents: [
        "GRE",
        "Language Proficiency Certificate",
        "Curriculum Vitae",
        "Recommendation Letters",
        "Academic Transcript",
        "Personal Statement",
      ],
    },
    benefit:
      "KAUST Fellowship, Full tuition support, Monthly living allowance, Housing, Medical and dental coverage, Relocation support",
    reference: "https://kaust.edu.sa",
  },
  {
    title: "LPDP Scholarship 2025",
    description:
      "Beasiswa nasional untuk jenjang S2 dan S3 dengan dukungan biaya penuh.",
    university: "Various Indonesian and International Universities",
    major: "All majors supported by LPDP",
    registration: "01 March - 30 April 2025",
    level: "S2/S3",
    status: "Dibuka",
    requirement: {
      age: "Max 35 years old (Master), 40 years old (Doctoral)",
      gpa: "Minimum 3.00 out of 4.00",
      englishTest: "IELTS (6.5), TOEFL iBT (80)",
      documents: [
        "Statement Letter",
        "Academic Transcript",
        "Personal Statement",
        "Research Proposal",
      ],
    },
    benefit:
      "Tuition fee, Living allowance, Research funding, Travel allowance",
    reference: "https://lpdp.kemenkeu.go.id",
  },
  {
    title: "LPDP Scholarship 2025",
    description:
      "Beasiswa nasional untuk jenjang S2 dan S3 dengan dukungan biaya penuh.",
    university: "Various Indonesian and International Universities",
    major: "All majors supported by LPDP",
    registration: "01 March - 30 April 2025",
    level: "S2/S3",
    status: "Dibuka",
    requirement: {
      age: "Max 35 years old (Master), 40 years old (Doctoral)",
      gpa: "Minimum 3.00 out of 4.00",
      englishTest: "IELTS (6.5), TOEFL iBT (80)",
      documents: [
        "Statement Letter",
        "Academic Transcript",
        "Personal Statement",
        "Research Proposal",
      ],
    },
    benefit:
      "Tuition fee, Living allowance, Research funding, Travel allowance",
    reference: "https://lpdp.kemenkeu.go.id",
  },
];

const itemsPerPage = 6;
let currentPage = 1;

function renderCards(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = scholarships.slice(start, end);
  const container = document.getElementById("scholarship-list");

  container.innerHTML = "";

  paginatedItems.forEach((item, index) => {
    const card = `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card h-100 shadow-sm clickable-card" data-index="${
          start + index
        }" data-bs-toggle="modal" data-bs-target="#scholarshipModal">
          <div class="card-header bg-light d-flex justify-content-between align-items-center">
            <span class="badge bg-${
              item.status === "Dibuka" ? "success" : "secondary"
            }">${item.status}</span>
          </div>
          <div class="card-body">
            <p class="text-muted">${item.description}</p>
            <h5 class="fw-bold">${item.title}</h5>
            <p class="mb-1"><strong>Pendaftaran:</strong> ${
              item.registration
            }</p>
            <p class="mb-1"><strong>Jenjang:</strong> <span class="badge bg-primary">${
              item.level
            }</span></p>
          </div>
        </div>
      </div>`;
    container.insertAdjacentHTML("beforeend", card);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(scholarships.length / itemsPerPage);
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderCards(page);
  renderPagination();
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".clickable-card")) {
    const index = e.target.closest(".clickable-card").dataset.index;
    const data = scholarships[index];

    document.getElementById("scholarshipModalLabel").innerText = data.title;
    document.getElementById("modal-description").innerText = data.description;
    document.getElementById("modal-university").innerText = data.university;
    document.getElementById("modal-major").innerText = data.major;
    document.getElementById("modal-age").innerText = data.requirement.age;
    document.getElementById("modal-gpa").innerText = data.requirement.gpa;
    document.getElementById("modal-english-test").innerText =
      data.requirement.englishTest;

    const documentsList = document.getElementById("modal-documents");
    documentsList.innerHTML = "";
    data.requirement.documents.forEach((doc) => {
      documentsList.innerHTML += `<li>${doc}</li>`;
    });

    document.getElementById("modal-funding").innerText = data.benefit;
    document.getElementById("modal-reference").href = data.reference;
  }
});

// Initial render
renderCards(currentPage);
renderPagination();
