import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";



const DashboardHeader = ({title}:{title:string}) => {
  return (
    <div className="flex flex-col p-4">
      <p className="text-gray-600 font-medium uppercase  mb-2">
       {title}
      </p>

      <Separator className={cn("w-16 bg-primary h-1 rounded-full")} />
    </div>
  );;
};

export default DashboardHeader;

