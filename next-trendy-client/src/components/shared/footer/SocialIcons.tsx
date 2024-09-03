import { Facebook, Linkedin } from "lucide-react";

const SocialIcons = () => (
  <div className="flex justify-center items-center gap-4">
    <Facebook
      size={25}
      className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer"
    />
    <Linkedin
      size={25}
      className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer"
    />
    {/* <Whatsapp size={25} className="text-3xl text-green-500 hover:text-green-600 cursor-pointer" />
    <Twitter size={25} className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer" /> */}
  </div>
);

export default SocialIcons;
