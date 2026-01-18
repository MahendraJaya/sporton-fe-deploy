import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="hero-section" className="container mx-auto h-screen flex">
      <div className="relative self-center">
        <Image
          src="/images/basketball_sport_icon_in_minimalist_3d_render_2.svg"
          alt="shape"
          width={432}
          height={423}
          className="absolute grayscale -top-20 left-0"
        />
        <div className="relative ml-40 w-full">
          <div className="text-primary italic ">Friday Sale, up to 50%</div>
          <h1 className="text-[95px] font-extrabold italic bg-gradient-to-b from-black to-[#CBCBCB] bg-clip-text text-transparent leading-tight">
            WEAR YOUR <br /> TOP-QUALITY <br /> SPORTWEAR
          </h1>
          <p className="w-1/2 mt-10">
            Engineered for endurance and designed for speed. Experience gear
            that moves as fast as you do. Premium fabrics. Unmatched comfort.
            Limitless motion.
          </p>
          <div className="flex gap-5 mt-8.25">
            <Button>
              Explore More <FiFastForward />
            </Button>
            <Button variant="ghost">
              Watch Video{" "}
              <Image
                src="/images/icon-play-video.svg"
                alt="play"
                width={29}
                height={29}
              />
            </Button>
          </div>
        </div>
        <Image
          src="/images/img-hero.svg"
          alt="hero"
          width={700}
          height={950}
          className="absolute -right-5 top-1/2 -translate-y-1/2"
        />
      </div>
      <Image
        src="/images/Ellipse.svg"
        alt="eclipse"
        width={420}
        height={420}
        className="absolute -right-[200px] top-1/2 -translate-y-1/2 -z-1"
      />
    </section>
  );
};

export default HeroSection;
