import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { redirect } from "react-router-dom";

const ResendEmail = () => {
  const { resendEmailVerification, loading, user } = useUserStore();
  console.log(user?.email);

 
  const resend = async () => {
    if (user && user.email) {
      await resendEmailVerification(user.email);
    } else {
      redirect("/login");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-2 bg-gray-400 p-4 rounded-2xl">
        <h2 className="text-lg font-medium">Token is invalid or expired</h2>
        <p>Please resend the verification email.</p>
        <Button onClick={resend} disabled={loading} className="cursor-pointer">
          Resend Email
        </Button>
      </div>
    </div>
  );
};

export default ResendEmail;
