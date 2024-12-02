let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >=offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ' ]').classList.add('active');
            })
        }
    })
}


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalPdf = document.getElementById('modal-pdf');
const closeModal = document.querySelector('.close');
let currentSlide = 0;

// Function to go to a specific slide
function goToSlide(slideIndex) {
    const slideContainer = document.querySelector('.slides');
    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    updateDots();
}

// Function to update active dot
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Click event for dots
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        goToSlide(slideIndex);
    });
});

// Click event for slides to open modal
slides.forEach(slide => {
    slide.addEventListener('click', function() {
        const contentType = this.getAttribute('data-type');
        const contentSrc = this.getAttribute('data-content');

        // Hide both image and PDF initially
        modalImg.style.display = "none";
        modalPdf.style.display = "none";

        if (contentType === 'image') {
            modalImg.src = contentSrc;
            modalImg.style.display = "block";
        } else if (contentType === 'pdf') {
            modalPdf.src = contentSrc;
            modalPdf.style.display = "block";
        }

        modal.style.display = "block";
    });
});

// Close modal
closeModal.addEventListener('click', function() {
    modal.style.display = "none";
});

// Close modal if clicked outside of content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initialize first slide as active
goToSlide(0);
