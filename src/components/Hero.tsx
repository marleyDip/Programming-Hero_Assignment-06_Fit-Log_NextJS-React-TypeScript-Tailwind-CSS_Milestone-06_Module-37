import InteractiveBanner from "./InteractiveBanner";
import { MoveRight } from "./shared/icons";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border border-border-hero bg-panel-hero container-page my-8 sm:my-12 md:my-16 rounded-2xl">
      <div className="grid gap-16 md:gap-20 p-3.5 sm:p-7 md:p-8 lg:p-14 md:grid-cols-2 md:items-center">
        {/* Content */}
        <div className="pt-1.5 space-y-5">
          <p className="text-[11px]/[1.5] font-bold tracking-widest text-primary">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-0.5 uppercase font-secondary font-bold leading-none tracking-tight text-4xl sm:text-5xl md:text-6xl text-text">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="max-w-120 text-muted-soft text-sm sm:text-base leading-normal">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="group mt-1 md:mt-2 inline-flex items-center gap-2 rounded-md px-4 py-2.5 md:px-6 md:py-3 bg-primary text-black shadow-sm text-xs leading-4 tracking-wide font-bold uppercase"
          >
            Browse workouts
            <MoveRight
              className="h-4 w-4 transition-transform duration-400 group-hover:scale-110 group-hover:translate-x-1 md:group-hover:translate-x-1.5"
              strokeWidth={2.5}
            />
          </a>
        </div>

        {/* Image */}
        {/* <div className="relative mx-auto w-full max-w-md aspect-square flex items-center justify-center">
          <div className="relative z-10 w-full max-w-[384px] aspect-square">
            <Image
              src="/images/banner.png"
              alt="FitLog Workout Banner"
              width={384}
              height={384}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div> */}

        <InteractiveBanner />
      </div>
    </section>
  );
};

export default Hero;

/* To convert your tracking value of 1.1px into em specifically for this font size of 11px, 

we divide the tracking value by the font size: 
    
   1.1px / 11px = 0.1em

   So: tracking-[0.1em] => letter spacing

For 14px text (text-sm): 1.1 / 14 → tracking-[0.07857em]

For 16px text (text-base): 1.1 / 16 → tracking-[0.06875em]

For 24px text (text-2xl): 1.1 / 24 → tracking-[0.04583em]


Drop Shadow - 

className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"

Tailwind arbitrary shadows follow the native CSS box-shadow layout order: 
  
  [X-axis Y-axis Blur-radius Spread-radius Color]
  
  - 0: X-axis offset
  - 1px: Y-axis offset
  - 2px: Blur radius
  - 0: Spread radius
  - rgba(0,0,0,0.05): Black color (0,0,0) at 5% opacity (0.05)

=> This exact shadow configuration is identical to Tailwind's native "shadow-sm" utility!

*/

/* <div className="relative mx-auto w-full max-w-md aspect-square flex items-center justify-center">
    // 1. Ambient Background Glow (Fixed and Forced Visible)
    <div
    className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-primary/20 blur-3xl"
    aria-hidden="true"
    />

     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-primary/20 blur-[80px] sm:h-72 sm:w-72 -z-10" />

    // 2. Sharp Banner Image Container
    <div className="relative z-10 w-full max-w-[384px] aspect-square">
    <Image
        src="/images/banner.png"
        alt="FitLog Workout Banner"
        width={384}
        height={384}
        priority
        className="w-full h-auto object-contain"
    />
    </div>
</div>

*/
