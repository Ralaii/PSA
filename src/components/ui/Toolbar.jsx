import { useEffect, useRef, useState } from "react";

export const toolBtn =
  "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-lg text-zinc-600 transition hover:bg-zinc-300 disabled:cursor-default disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800";

export function ToolButton({ icon, label, ...props }) {
  return (
    <button className={toolBtn} aria-label={label} title={label} {...props}>
      {icon}
    </button>
  );
}

function getScroller(el) {
  let p = el.parentElement;
  while (p) {
    if (/(auto|scroll|overlay)/.test(getComputedStyle(p).overflowY)) return p;
    p = p.parentElement;
  }
  return window;
}

export function Toolbar({ left, right }) {
  const barRef = useRef(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const scroller = getScroller(bar);

    const update = () => {
      const scrolled = scroller === window ? window.scrollY : scroller.scrollTop;
      const offset = -parseFloat(getComputedStyle(bar).top) || 0; // 12 or 24
      setStuck(scrolled >= offset);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className={`sticky -top-3 z-10 -mx-3 -mt-6 flex h-14 items-center justify-between gap-2 pr-2 pl-5 transition-colors sm:-top-6 sm:-mx-6 sm:-mt-6 ${
        stuck
          ? "border-b border-zinc-200/60 bg-zinc-100/70 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/70"
          : "bg-zinc-100 dark:bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-4">{left}</div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}