import { useUserStore } from "@/store/useUserStore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const { token } = useParams();
  const { verifyEmail, loading, user } = useUserStore();
  const navigate = useNavigate();

  // 1. Ek ref banayein taaki track kar saken ki API call ho chuki hai
  const hasCalled = useRef(false);
  const [render, setRender] = useState(false);
  console.log("render", render);

  // useEffect(() => {
  //   if (isAuthenticated) useUserStore.setState({ isAuthenticated: false });
  // }, []);

  useEffect(() => {
    setRender(false);
    // 2. Agar ref false hai, tabhi call karein
    if (token && !hasCalled.current) {
      const verify = async () => {
        const res = await verifyEmail(token);
        console.log("Verify Email Response:", res);
        console.log(user);
        setRender(true);
      };
      verify();

      // 3. Call hone ke baad ise true kar dein
      hasCalled.current = true;
    }
  }, [token, verifyEmail]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <p>Verifying your email...</p>}
      {render &&
        (user?.isEmailVerified ? (
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-400 p-4 rounded-2xl">
            <p className="text-lg font-medium">
              Your email has been verified successfully!
            </p>
            <Button onClick={() => navigate("/")} className="cursor-pointer">
              GO TO HOME
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-400 p-4 rounded-2xl">
            <h2 className="text-lg font-medium">Token is invalid or expired</h2>

            <Button
              onClick={() => navigate("/resend-email")}
              disabled={loading}
              className="cursor-pointer"
            >
              Go to resend email page.
            </Button>
          </div>
        ))}
    </div>
  );
};

export default VerifyEmail;
