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
                gsap.fromTo(current, { opacity: 1 }, { opacity: 0, duration: 3, onComplete: done });
            },
            enter(data) {
                const done = this.async();
                let next = data.next.container;
                gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 3, onComplete: done })
            }
        }
    ]
})