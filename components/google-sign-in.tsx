import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth"
import { Google } from "./ui/google";
const GoogleSignIn = () => {
  
  return (
    <form
      action={async () => {
        "use server";
          await signIn("google")
      }}
    >
      <Button className="w-full" variant="outline">
        <Google/>
        Continue with google
      </Button>
    </form>
  );
};

export {  GoogleSignIn };
