export const fadeinstagger = `
import gsap from 'gsap';

// Basic Stagger: Targets all elements with the class simultaneously
gsap.from(".stagger-item", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.2
});

    // we can also go with a different approach

    // we target the child items of a parent element for example h1 is the child and div is the parent
    gsap.from(".parent child", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out", // change the easing as you please
      stagger: 0.2,   
    })

    // alternetavily we can also control the direction of the stagger 

    gsap.from(".stagger-item", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger : {
      from : "start", // you can use either start, center, end or random
      ease : "power3.out", // we apply the easing always inside the stagger
      each : 0.6 
            }
        
    })


      `
