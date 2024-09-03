
import assets from "@/app/assets";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full relative">
      <Image
        src={assets.images.banner}
        width={0}
        height={0}
        sizes="100vw"
        alt="banner"
        placeholder="blur"
        // className="transition-opacity opacity-0 duration-[2s]"
        // onLoadingComplete={(image)=>image.classList.remove('opacity-0')}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Hero;
