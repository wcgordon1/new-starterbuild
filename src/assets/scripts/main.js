import { gsap } from "gsap";
import * as THREE from "three";
import { CustomEase } from "gsap/CustomEase";

import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip, CustomEase);


document.addEventListener("DOMContentLoaded", () => {
  const isMobile = 
  typeof window !== "undefined" && 
  (window.innerWidth <= 600 || window.matchMedia("(orientation: portrait)").matches);

  CustomEase.create(
    "hop",
    "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1 "
  );

  const hasLoadedOnce =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("hasLoadedOnceWLP")
      : null;

  if (!hasLoadedOnce) {
    sessionStorage.setItem("hasLoadedOnceWLP", "true");

    function splitTextIntoSpans(selector) {
      let elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
          .split("")
          .map(function (char) {
            return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
          })
          .join("");
        element.innerHTML = splitText;
      });
    }

    splitTextIntoSpans(".hero__secondary__header h1");

    function animateCounter(endValue = 100) {
      const counterElement = document.querySelector(".counter p");
      let currentValue = 0;
      const updateInterval = 300;

      // Generate a random maxDuration between 1000 and 2000 milliseconds
      const maxDuration = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < maxDuration) {
          // Controlled increment for smoothness
          const incrementValue = Math.ceil(
            endValue / (maxDuration / updateInterval)
          );
          currentValue = Math.min(currentValue + incrementValue, endValue);
          counterElement.textContent = currentValue;

          setTimeout(updateCounter, updateInterval);
        } else {
          // Finalize the counter value
          counterElement.textContent = endValue;

          // Animate out before revealing the landing page
          setTimeout(() => {
            gsap.to(counterElement, {
              y: -20,
              duration: 1,
              ease: "power3.inOut",
              onStart: () => {
                revealLandingPage();
              },
            });
          }, -500);
        }
      };

      updateCounter();
    }

    gsap.to(".counter p", {
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1,
      onComplete: () => {
        animateCounter();
      },
    });

    const revealLandingPage = () => {
      gsap.to(".hero", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 2,
        ease: "hop",
        onStart: () => {
          gsap.to(".hero", {
            transform: "translate(-50%, -50%) scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 0.25,
          });

          gsap.to(".overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 2,
            delay: 0.5,
            ease: "hop",
          });

          gsap.to(".hero__secondary__header h1 span", {
            y: 0,
            stagger: 0.1,
            duration: 2,
            ease: "power4.inOut",
            delay: 0.75,
          });

          setTimeout(() => {
            // Fade out the hero section
            gsap.to(".hero__secondary__header", {
              opacity: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                if (!isMobile) {
                  // After fading out the hero, fade in the text container
                  gsap.to("#textContainer", {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.in",
                  });
                } else {
                  gsap.to(".hero__main__header__mobile", {
                    opacity: 1,
                    duration: 0.02,
                    ease: "power2.in",
                  });
                  
                  splitTextIntoSpans(".hero__main__header__mobile h1");

                  gsap.to(".hero__main__header__mobile h1 span", {
                    y: 0,
                    stagger: 0.1,
                    duration: 1.5,
                    ease: "power4.inOut",
                  });
                }
                gsap.to(".hero__secondary__header", {
                  display: "none",
                });

                gsap.to(".home__logo, .live__clock", {
                  zIndex: 5,
                });

                reloadTexture();

                if (!isMobile) {
                  gsap.to("#roleDescription", {
                    y: 0,
                    opacity: 1,
                    duration: 1.25,
                    ease: "power3.out",
                    delay: 1,
                  });
                } else {
                  gsap.to("#roleDescription", {
                    y: 0,
                    opacity: 1,
                    duration: 1.25,
                    ease: "power3.out",
                    delay: 2,
                  });
                }
              },
            });
          }, 3500);
        },
      });
    };
  } else {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".hero__secondary__header").style.display = "none";
    setTimeout(() => {
      gsap.to(".hero", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        transform: "translate(-50%, -50%) scale(1)",
        duration: 2.5,
        ease: "hop",
      });
      if (!isMobile) {
        gsap.to("#textContainer", {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
        });

        reloadTexture();
      } else {
        gsap.to(".hero__main__header__mobile", {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
        });
      }

      gsap.to(".home__logo, .live__clock", {
        zIndex: 5,
        duration: 1,
        ease: "power2.in",
      });
      gsap.to("#roleDescription", {
        y: 0,
        opacity: 1,
        duration: 1.25,
        ease: "power3.out",
        delay: 1.5,
      });
    }, 500);
  }
});

const textContainer = document.getElementById("textContainer");
let easeFactor = 0.02;
let scene, camera, renderer, planeMesh;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;

  void main() {
    vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

    vec2 mouseDirection = u_mouse - u_prevMouse;

    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * -mouseDirection * 0.4;
    vec2 uv = vUv - uvOffset;

    vec4 color = texture2D(u_texture, uv);
    gl_FragColor = color;
  }
`;

function createTextTexture(text, font, size, color) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const canvasWidth = window.innerWidth * 2;
  const canvasHeight = window.innerHeight * 4;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.fillStyle = color || "#EEEEEE";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fontSize = size || Math.floor(canvasWidth * 2);
  const textColor = "#76ABAE";

  ctx.fillStyle = textColor;
  ctx.font = `${fontSize}vw "${font || "MontserratBlack"}"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;

  const scaleFactor = Math.min(1, (canvasWidth * 1) / textWidth);
  const aspectCorrection = canvasWidth / canvasHeight;

  ctx.setTransform(
    scaleFactor,
    0,
    0,
    scaleFactor / aspectCorrection,
    canvasWidth / 2,
    canvasHeight / 2
  );

  ctx.strokeStyle = textColor;
  ctx.lineWidth = fontSize * 0.005;
  for (let i = 0; i < 3; i++) {
    ctx.strokeText(text, 0, 0);
  }
  ctx.fillText(text, 0, 0);

  return new THREE.CanvasTexture(canvas);
}

function initializeScene(texture) {
  scene = new THREE.Scene();

  const aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(
    -1,
    1,
    1 / aspectRatio,
    -1 / aspectRatio,
    0.1,
    1000
  );
  camera.position.z = 1;

  let shaderUniforms = {
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_prevMouse: { type: "v2", value: new THREE.Vector2() },
    u_texture: { type: "t", value: texture },
  };

  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader,
    })
  );

  scene.add(planeMesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  textContainer.appendChild(renderer.domElement);
}

function reloadTexture() {
  const newTexture = createTextTexture(
    " will g. ",
    "MontserratBlack",
    null,
    "#EEEEEE"
  );
  planeMesh.material.uniforms.u_texture.value = newTexture;
}

initializeScene(
  createTextTexture(" will g. ", "MontserratBlack", null, "#EEEEEE")
);

function animateScene() {
  requestAnimationFrame(animateScene);

  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMesh.material.uniforms.u_mouse.value.set(
    mousePosition.x,
    1.0 - mousePosition.y
  );

  planeMesh.material.uniforms.u_prevMouse.value.set(
    prevPosition.x,
    1.0 - prevPosition.y
  );

  renderer.render(scene, camera);
}

animateScene();

textContainer.addEventListener("mousemove", handleMouseMove);
textContainer.addEventListener("mouseenter", handleMouseEnter);
textContainer.addEventListener("mouseleave", handleMouseLeave);

function handleMouseMove(event) {
  easeFactor = 0.035;
  let rect = textContainer.getBoundingClientRect();
  prevPosition = { ...targetMousePosition };

  targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  targetMousePosition.y = (event.clientY - rect.top) / rect.height;
}

function handleMouseEnter(event) {
  easeFactor = 0.01;
  let rect = textContainer.getBoundingClientRect();

  mousePosition.x = targetMousePosition.x =
    (event.clientX - rect.left) / rect.width;
  mousePosition.y = targetMousePosition.y =
    (event.clientY - rect.top) / rect.height;
}

function handleMouseLeave() {
  easeFactor = 0.01;
  targetMousePosition = { ...prevPosition };
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  camera.left = -1;
  camera.right = 1;
  camera.top = 1 / aspectRatio;
  camera.bottom = -1 / aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  reloadTexture();
}
