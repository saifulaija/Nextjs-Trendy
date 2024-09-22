import Tag from "@/components/tag/Tag";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product-Tag | Trendy",
  description: "A Trendy site built with Next.js, Shadcn UI",
};

type TParams = {
  params: { tag: string[] };
  searchParams?: {
    searchTerm?: string;
  };
};

const TagCatchAllRoutePage: React.FC<TParams> = ({ params, searchParams }) => {
  // Safely access the tag value, checking if the second element exists
  const tag = decodeURIComponent(
    params.tag.length > 1 ? params.tag[1] : params.tag[0]
  );
  console.log("Decoded tag:", tag);

  const searchTerm = searchParams?.searchTerm || "";

  return (
    <div className="mt-5">
      <Tag tag={tag} searchTerm={searchTerm} />
    </div>
  );
};

export default TagCatchAllRoutePage;