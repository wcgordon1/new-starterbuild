import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, CustomEase);

document.addEventListener("DOMContentLoaded", () => {
  CustomEase.create(
    "hop",
    "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
  );

  const aboutCopyRef = document.querySelector<HTMLDivElement>(".about__copy");

  document.fonts.ready.then(() => {
    const applySplitType = (element: HTMLElement) => {
      const splitTexts = element.querySelectorAll<HTMLElement>("h1, p");
      splitTexts.forEach((text) => {
        const split = new SplitType(text, {
          types: "lines",
          tagName: "span",
        });

        if (split.lines) {
          split.lines.forEach((line: HTMLElement) => {
            const wrapper = document.createElement("div");
            wrapper.className = "line-wrapper";
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
        }
      });
    };

    if (aboutCopyRef) {
      applySplitType(aboutCopyRef);
      gsap.to(aboutCopyRef.querySelectorAll<HTMLElement>(".line-wrapper span"), {
        y: 0,
        stagger: 0.05,
        delay: 1.5,
        duration: 1.5,
        ease: "power4.out",
      });
    }
  });

  gsap.to(".about__portrait", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    delay: 0.8,
    duration: 1,
    ease: "hop",
  });

  gsap.to(".about__copy__wrapper .about__copy__title h1", {
    y: 0,
    delay: 1,
    duration: 1.5,
    ease: "power4.out",
  });

  gsap.to(".about__copy__wrapper p", {
    opacity: 1,
    delay: 0.8,
    ease: "power4.out",
  });
});
