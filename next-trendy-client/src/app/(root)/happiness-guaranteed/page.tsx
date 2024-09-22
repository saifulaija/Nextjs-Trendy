import assets from "@/app/assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const HappinessGuarantee = () => {
  return (
    <div className="w-full">
      {/* Main Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src={assets.images.banner_happiness}
          alt="Happiness Guarantee"
          fill
          objectFit="cover"
          className="rounded-md"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            100% Happiness Guarantee
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Our Commitment to Your Satisfaction
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10">
          At Trendy, your happiness is our top priority. We stand by every
          product we sell, and if for any reason you’re not satisfied with your
          purchase, we’ll do whatever it takes to make it right. That’s our
          promise to you.
        </p>

        {/* Key Points Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Easy Returns
            </h3>
            <p className="text-gray-600">
              No questions asked. Return any product within 30 days for a full
              refund.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Our customer support team is always available to help you with any
              issues.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Free Shipping
            </h3>
            <p className="text-gray-600">
              Enjoy free shipping on all orders, no matter how big or small.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Banner */}
      <div className="relative w-full h-[30vh] md:h-[40vh] mt-12">
        <Image
          src={assets.images.banner_happiness_02}
          alt="Guarantee Banner"
          fill
          objectFit="cover"
          className="rounded-md"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
          <h2 className="text-white text-2xl md:text-4xl font-semibold mb-4">
            Shop with Confidence
          </h2>
          <Link href="/products">
            <Button
              className={cn(
                "bg-white text-black font-semibold hover:bg-primary hover:text-white transition"
              )}
            >
              Browse Our Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HappinessGuarantee;
