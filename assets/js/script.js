document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector('.shop-carousel-track');
    const prevBtn = document.querySelector('.shop-carousel-btn.prev');
    const nextBtn = document.querySelector('.shop-carousel-btn.next');

    let items = Array.from(document.querySelectorAll('.shop-carousel-item'));
    let index = 1;
    let itemWidth;
    let autoScroll;

    // Clone first & last for infinite loop
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // Update items list AFTER cloning
    items = Array.from(document.querySelectorAll('.shop-carousel-item'));

    function updateWidth() {
        itemWidth = items[0].getBoundingClientRect().width + 25;
        track.style.transform = `translateX(${-index * itemWidth}px)`;
    }

    // Initial position
    updateWidth();

    function moveCarousel() {
        track.style.transition = 'transform 0.6s ease-in-out';
        track.style.transform = `translateX(${-index * itemWidth}px)`;
    }

    // Next
    nextBtn.addEventListener('click', () => {
        if (index >= items.length - 1) return;
        index++;
        moveCarousel();
    });

    // Prev
    prevBtn.addEventListener('click', () => {
        if (index <= 0) return;
        index--;
        moveCarousel();
    });

    // Infinite loop fix
    track.addEventListener('transitionend', () => {
        if (items[index].classList.contains('clone')) {
            track.style.transition = 'none';
            index = index === 0 ? items.length - 2 : 1;
            track.style.transform = `translateX(${-index * itemWidth}px)`;
        }
    });

    // Auto-scroll
    function startAutoScroll() {
        autoScroll = setInterval(() => {
            index++;
            moveCarousel();
        }, 4000);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    startAutoScroll();

    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Responsive resize
    window.addEventListener('resize', () => {
        updateWidth();
    });

});
