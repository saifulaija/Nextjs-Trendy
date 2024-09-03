import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
interface MyDialogProps {
  children: ReactNode;
  triggerButton: ReactNode;
}

const MyDialog: React.FC<MyDialogProps> = ({ children, triggerButton }) => {
  return (
    <Dialog>
      <DialogTrigger className={cn("w-full max-w-md bg-primary")}>
        {triggerButton}
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;
