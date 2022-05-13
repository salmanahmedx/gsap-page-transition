// GSAP timelines
const tlLeave = gsap.timeline({
    defaults: {
        duration: 0.75, ease: "Power2.easeOut",
    }
});
const tlEnter = gsap.timeline({
    defaults: {
        duration: 0.75, ease: "Power2.easeOut"
    },
})

//Functions for page leave and enter animations
const leaveAnimation = (current, done) => {
    const product = current.querySelector('.image-container');
    let text = current.querySelector(".showcase-text");
    const circles = current.querySelectorAll(".circle");
    const arrow = current.querySelector(".showcase-arrow");

    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 });
    tlLeave.fromTo(product, { y: 0, opacity: 1 }, { y: 100, opacity: 0, onComplete: done }, "<");
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { opacity: 0, y: 100 }, "<")
    tlLeave.fromTo(circles, { y: 0, opacity: 1 }, { y: -200, opacity: 0, stagger: 0.15, ease: "back.out(1.7)", duration: 1 }, "<")
};

const enterAnimation = (current, done) => {
    const product = current.querySelector('.image-container');
    let text = current.querySelector(".showcase-text");
    const circles = current.querySelectorAll(".circle");
    const arrow = current.querySelector(".showcase-arrow");

    tlLeave.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
    tlLeave.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1, onComplete: done }, "<");
    tlLeave.fromTo(text, { y: 100, opacity: 0 }, { opacity: 1, y: 0 }, "<")
    tlLeave.fromTo(circles, { y: -200, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, ease: "back.out(1.7)", duration: 1 }, "<")
};



//animations
barba.init({
    // The animation works well but if we click the button rapidly the animation doesn't finish and it just shows the next page directly. To stop this and enable animation to finish we used preventRunning: true
    preventRunning: true,
    transitions: [
        //showcase transitions
        {
            name: "default",
            leave(data) {
                //barba doesn't consider the duration property of GSAP. That's why we've to use an async function to let it know not to start the enter functionality until leave functionality is completed first.
                const done = this.async();
                let current = data.current.container;
                leaveAnimation(current, done)
            },
            enter(data) {
                const done = this.async();
                let next = data.next.container;
                enterAnimation(next, done)
            }
        }
    ]
})