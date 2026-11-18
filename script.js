let smoother = null;

if (typeof gsap !== "undefined") {
  const plugins = [
    typeof ScrollTrigger !== "undefined" ? ScrollTrigger : null,
    typeof ScrollSmoother !== "undefined" ? ScrollSmoother : null,
    typeof SplitText !== "undefined" ? SplitText : null,
  ].filter(Boolean);
  gsap.registerPlugin(...plugins);

  smoother = typeof ScrollSmoother !== "undefined"
    ? ScrollSmoother.create({ smooth: 1.5, effects: true })
    : null;

  function animarPagina() {
    gsap.from(".hero", { opacity: 0, duration: 1 });
    gsap.from("picture:nth-child(2)", { y: 60, duration: 1 });
    gsap.from("picture:nth-child(1)", { y: -60, duration: 1 });

    if (typeof ScrollTrigger !== "undefined") {
      gsap.from(".card", {
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".cards",
          start: "0% 80%",
          end: "100% 70%",
          scrub: true,
        },
      });

      gsap.from(".secaoObrigado ul li", {
        opacity: 0,
        x: 40,
        filter: "blur(10px)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".secaoObrigado ul",
          start: "0% 80%",
          end: "100% 50%",
          scrub: true,
        },
      });

      gsap.from("footer", {
        y: "-30%",
        immediateRender: false,
        scrollTrigger: {
          trigger: "footer",
          scrub: true,
          invalidateOnRefresh: true,
          end: "100% 100%",
        },
      });
    }

    if (typeof SplitText !== "undefined") {
      document.querySelectorAll(".textoSplit").forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines, words, chars",
          mask: "lines",
        });

        gsap.from(split.chars, {
          y: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
          scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? { trigger: element }
            : undefined,
        });
      });
    }
  }

  const preloader = document.querySelector("#preloader");

  if (preloader) {
    const timeline = gsap.timeline({
      onComplete() {
        animarPagina();
        gsap.to(preloader, { opacity: 0, display: "none" });
      },
    });

    timeline.to("#preloader path", {
      duration: 1,
      strokeDashoffset: 0,
    });
    timeline.to("#preloader path", {
      fill: "rgb(168, 19, 19)",
      duration: 0.5,
      strokeDashoffset: 0,
    });
  } else {
    animarPagina();
  }
}

document.querySelector("#botaoCidades")?.addEventListener("click", () => {
  const cidades = document.querySelector(".secaoCidade");

  if (smoother) {
    smoother.scrollTo(cidades, true, "top top");
  } else {
    cidades?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
