import Link from "next/link";
import { Dumbbell } from "./icons";

const Brand = () => {
  return (
    <Link href="/" className="group flex items-center gap-2 md:gap-2.5">
      <span className="grid place-items-center w-7.5 h-7.5 md:w-8 md:h-8 rounded-xl md:rounded-lg bg-[#ccff00] text-black md:ml-5">
        <Dumbbell
          strokeWidth={2.5}
          className="w-4.5 h-4.5 md:w-5 md:h-5 inline-block transform rotate-270 transition-transform duration-500 group-hover:rotate-0"
        />
      </span>

      <span className="font-secondary text-base font-semibold md:text-lg/[1.56] md:font-bold tracking-[0.9] hover:text-[#f4f6f2]/90">
        FITLOG
      </span>
    </Link>
  );
};

export default Brand;
