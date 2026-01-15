import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const counterItems = [
  {
    value: 3,
    suffix: "rd",
    label: "Year B.Tech Student",
  },
  {
    value: 2,
    suffix: "+",
    label: "Completed Projects",
  },
  {
    value: 1,
    suffix: "",
    label: "Internship Completed",
  },
  {
    value: 6,
    suffix: "+",
    label: "Core Technologies Learned",
  },
];

const AnimatedCounter = () => {
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      if (!counter) return;

      const numberEl = counter.querySelector(".counter-number");
      const { value, suffix } = counterItems[index];

      gsap.fromTo(
        numberEl,
        { innerText: 0 },
        {
          innerText: value,
          duration: 1.8,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            numberEl.textContent = `${Math.floor(
              numberEl.innerText
            )}${suffix}`;
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="counter"
      className="padding-x-lg mt-8"
    >
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (countersRef.current[index] = el)}
            className="bg-zinc-900 rounded-xl p-10 flex flex-col justify-center hover:scale-[1.02] transition-transform"
          >
            <div className="counter-number text-white text-5xl font-bold mb-3">
              0{item.suffix}
            </div>
            <div className="text-white-50 text-lg">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedCounter;
