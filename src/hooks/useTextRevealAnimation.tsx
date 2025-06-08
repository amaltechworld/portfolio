
import { useAnimate, stagger } from "framer-motion";
// import { transform } from "next/dist/build/swc/generated-native";
import SplitType from "split-type";

const useTextRevealAnimation = (shouldSplit = true) => {
  const [scope, animate] = useAnimate();

  const entranceAnimation = async () => {
    if (!scope.current) return;

    // Wait a short moment to ensure DOM is rendered
    // await new Promise((resolve) => setTimeout(resolve, 20));
    // await new Promise((resolve) => requestAnimationFrame(resolve));

    // Perform SplitType if needed
    if (shouldSplit) {
      new SplitType(scope.current, {
        types: "lines,words",
        tagName: "span",
      });
    }

    // Wait for DOM mutation to apply
    await new Promise((resolve) => requestAnimationFrame(resolve));

    //  Now safe to remove invisible
    scope.current.classList.remove("invisible");

    // Grab split words
    const words = scope.current.querySelectorAll(".word");
    // Check if any words exist
    if (!words.length) {
      console.warn("❗No words to animate in", scope.current);
      return;
    }

    // Animate words into view
    await animate(
      scope.current.querySelectorAll(".word"),
      { y: 0, opacity: 1 },
      { duration: 0.4, delay: stagger(0.02) }
    );
  };
  const exitAnimation = () => {
    return animate(
        scope.current.querySelectorAll(".word"),
        {
            transform: "translateY(100%)",
        },
        {
            duration: 0.25,
            delay: stagger(-0.015, {
                startDelay: scope.current.querySelectorAll(".word").length * 0.15,
            })
        }
    )
  }

  return { scope, entranceAnimation, exitAnimation };
};

export default useTextRevealAnimation;
