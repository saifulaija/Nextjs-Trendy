import assets from "@/app/assets";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Footer = () => {
  const resources = [
    { title: "Master Plan", link: "/blog" },
    { title: "Jobs", link: "/help-center" },
    { title: "Invest", link: "/release-notes" },
    { title: "Pressroom", link: "/status" },
    { title: "Blog", link: "/status" },
    { title: "Contact", link: "/status" },
  ];

  const community = [
    { title: "Unlock my Robot Power", link: "https://twitter.com" },
    { title: "Starlight", link: "https://linkedin.com" },
    { title: "Robot Platform", link: "https://facebook.com" },
    { title: "EEVE Roadmap", link: "https://dribbble.com" },
  ];

  const company = [
    { title: "Williow X Community", link: "/about-us" },
    { title: "Developer & Maker Access", link: "/careers" },
    { title: "Special Cases", link: "/legal" },
  ];

  return (
    <footer className="bg-black text-sm text-gray-400  py-4 mt-10">
      <div className="container mx-auto px-4 md:px-8 mt-10">
        <div className="flex flex-wrap justify-between">
          {/* Abstract Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <Image
              src={assets.images.logo}
              width={100}
              height={100}
              alt="logo"
            />
            <p>
              Trendy is premium leather shoes and fashion accessories kingdom.
              We provide the best quality shoes and accessories for ladies and
              gents.
            </p>
          </div>

          {/* Resources Section */}
          <div className="w-full sm:w-1/5 mb-4">
            <h5 className="text-xl font-bold mb-4">About Us</h5>
            <ul>
              {resources.map((resource) => (
                <li key={resource.title}>
                  <a
                    href="/"
                    className="hover:underline"
                    aria-label={resource.title}
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">Explore EEVE</h5>
            <ul>
              {community.map((item) => (
                <li key={item.title}>
                  <a
                    href="/"
                    className="hover:underline"
                    aria-label={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">Community & Support</h5>
            <ul>
              {company.map((item) => (
                <li key={item.title}>
                  <a
                    href="/"
                    className="hover:underline"
                    aria-label={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row justify-between items-center my-5">
          <div>
            <Image
              src={assets.images.socialIcon}
              alt="social icon"
              className="w-16 md:w-20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-4 md:mt-0">
            <p>March22 Recap</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>General Terms</p>
          </div>
          <div>
            <Image
              src={assets.images.country}
              alt="country icon"
              className="w-24 md:w-36"
            />
          </div>
        </div>
        <p className="text-sm md:text-md font-semibold text-muted-foreground text-center">
          Trendy &copy; {new Date().getFullYear()}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
