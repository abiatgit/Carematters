import { toast } from "sonner";
import { Check, XCircle } from "lucide-react";

export const showSuccessToast = (message: string = "Success") =>
  toast(
    <div className="flex items-center gap-2 ">
      <Check className="h-5 w-5 text-green-700" />
      {message}
    </div>
  );

export const showErrorToast = (message: string = "Something went wrong") =>
  toast(
    <div className="flex items-center gap-2 ">
      <XCircle className="h-5 w-5 text-red-700" />
      {message}
    </div>
  );
