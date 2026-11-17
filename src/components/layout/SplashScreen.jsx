import { useEffect, useState } from "react";
import logo from "../../assets/logo3.png";

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let exitTimer;

    const timer = setTimeout(() => {
      setVisible(false);

      exitTimer = setTimeout(() => {
        onComplete?.();
      }, 700);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#F7F2E8] transition-opacity duration-700 ${
        visible
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Brand */}
      <div className="flex flex-col items-center animate-[fadeIn_1s_ease-out]">

        {/* App Logo */}
        <div className="mb-5 flex h-[76px] w-[76px] items-center justify-center">
          <img
            src={logo}
            alt="Hope & Heaven logo"
            className="h-full w-full object-contain"
          />
        </div>

        {/* App Name */}
        <h1 className="font-serif text-[37px] font-medium tracking-[-1px] text-[#174735]">
          Hope <span className="italic">&</span> Heaven
        </h1>

        {/* Brand Label */}
        <div className="mt-2 flex items-center gap-2">
          <span className="h-px w-5 bg-[#D8AD55]" />

          <span className="text-[9px] font-semibold uppercase tracking-[3px] text-[#A7864C]">
            By Asher
          </span>

          <span className="h-px w-5 bg-[#D8AD55]" />
        </div>
      </div>

      {/* Tagline */}
      <p className="mt-7 font-serif text-[15px] italic tracking-wide text-[#77766E]">
        You are never alone.
      </p>

      {/* Loading Indicator */}
      <div className="mt-[42px] h-[3px] w-[48px] overflow-hidden rounded-full bg-[#E5DDCE]">
        <div className="h-full w-[40%] animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-[#174735]" />
      </div>
    </div>
  );
}