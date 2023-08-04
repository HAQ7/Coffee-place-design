const starImg = document.getElementById("star");
const cafe = document.getElementById("cafe-section");
const textAppear = document.getElementById("textAppear");
const textAppear2 = document.getElementById("textAppear2");
let scrollAmount = 600;
let prevKnownScrollPosition = 0;
let lastKnownScrollPosition = 0;
let ticking = false;

function backgroundMove() {
    scrollAmount =
        lastKnownScrollPosition > prevKnownScrollPosition
            ? scrollAmount - 2
            : scrollAmount + 2;
    scrollAmount = scrollAmount > 600 ? 600 : scrollAmount;
    scrollAmount = scrollAmount < 0 ? 0 : scrollAmount;
    starImg.style = `transform: translateY(-${scrollAmount}px);`;
}

const scrollEvent = () => {
    prevKnownScrollPosition = lastKnownScrollPosition;
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            console.log(lastKnownScrollPosition);
            backgroundMove();
            ticking = false;
        });

        ticking = true;
    }
};
const textAnimation = element => {
    element.classList.add("opacity");
    observer.unobserve(element);
};

const observer = new IntersectionObserver(entries => {
    console.log(entries);
    entries.forEach(entry => {
        if (entry.target.matches("#cafe-section")) {
            if (entry.isIntersecting) {
                document.addEventListener("scroll", scrollEvent);
                return;
            }
            document.removeEventListener("scroll", scrollEvent);
            return;
        }
        if (entry.target.matches("#textAppear")) {
            if (entry.isIntersecting) {
                textAnimation(textAppear);
                return;
            }
        }
        if (entry.target.matches("#textAppear2")) {
            if (entry.isIntersecting) {
                textAnimation(textAppear2);
            }
        }
    });
});
observer.observe(textAppear2)
observer.observe(textAppear);
observer.observe(cafe);
