import Brand from "./shared/Brand";

const Footer = () => {
  return (
    <footer className="border-t border-[#1a1d24] mt-4 md:mt-8 bg-[#090a0d]">
      <div className="container-page flex flex-col items-center gap-3 py-10 sm:flex-row sm:justify-between">
        <Brand />

        <p className="text-center sm:text-right text-xs/[1.33] text-[#6b7280]">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log
          honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
