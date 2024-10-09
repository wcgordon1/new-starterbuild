import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, CustomEase);

import { projects } from "@data/projects";

interface Project {
  name: string;
  description: string;
  url: string;
}

const typedProjects: Project[] = projects;

document.addEventListener("DOMContentLoaded", function () {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  if (!isMobile) {
    const projectsContainer =
      document.querySelector<HTMLDivElement>(".projects");
    const descriptionBox = document.createElement("div");
    const descriptionContent = document.createElement("p");
    descriptionBox.className = "description-box";
    descriptionBox.appendChild(descriptionContent);
    document.querySelector("main")?.appendChild(descriptionBox);

    const numberOfProjects = 40;
    const radius = 1100;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / numberOfProjects;

    let timeout: NodeJS.Timeout;

    for (let i = 0; i < numberOfProjects; i++) {
      const item = document.createElement("div");
      item.className = "item";
      const p = document.createElement("p");
      const a = document.createElement("a");
      const count = document.createElement("span");
      count.className = "count";

      a.href = typedProjects[i]?.url || "#";
      a.textContent = typedProjects[i]?.name || "";

      p.appendChild(a);
      count.textContent = `(${Math.floor(Math.random() * numberOfProjects) + 1})`;
      a.appendChild(count);

      item.appendChild(p);

      if (projectsContainer) {
        projectsContainer.appendChild(item);
      }

      const angle = i * angleIncrement;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;

      gsap.set(item, {
        x: x + "px",
        y: y + "px",
        rotation: rotation,
      });

      item.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        descriptionBox.style.display = "block";
        descriptionBox.classList.add("show");
        descriptionContent.textContent = typedProjects[i]?.description || "";
      });

      item.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
          if (!descriptionBox.matches(":hover")) {
            descriptionBox.classList.remove("show");
            descriptionBox.style.display = "none";
          }
        }, 300);
      });
    }

    // to prevent flickering on descriptionBox
    descriptionBox.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        descriptionBox.classList.remove("show");
        descriptionBox.style.display = "none";
      }, 300);
    });

    function updatePosition() {
      const scrollAmount = window.scrollY * 0.0001;
      document
        .querySelectorAll<HTMLDivElement>(".item")
        .forEach((item, index) => {
          const angle = index * angleIncrement + scrollAmount;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const rotation = (angle * 180) / Math.PI;

          gsap.to(item, {
            duration: 0.05,
            x: x + "px",
            y: y + "px",
            rotation: rotation,
            ease: "elastic.out(1, 0.3)",
          });
        });
    }

    updatePosition();
    document.addEventListener("scroll", updatePosition);

    const projectsCopyRef = document.querySelectorAll<HTMLDivElement>(".item");

    document.fonts.ready.then(() => {
      const applySplitType = (element: HTMLElement) => {
        const splitTexts = element.querySelectorAll<HTMLElement>("p");
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

      projectsCopyRef.forEach((projectItem) => {
        applySplitType(projectItem);
      });

      gsap.to(".item", {
        opacity: 1,
        delay: 0.5,
        duration: 0.1,
        ease: "power4.out",
      });

      gsap.to(".item .line-wrapper span", {
        y: 0,
        stagger: 0.05,
        delay: 0.5,
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(".item p", {
        y: 0,
        delay: 0.5,
        duration: 1,
        ease: "power4.out",
      });
    });

    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".item", "skewY", "deg"),
      clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2000);

        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    gsap.set(".item", { transformOrigin: "left center", force3D: true });
  }
});
