import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userSignupSchema, type SignupInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm<SignupInputState>();
  const { signup, loading } = useUserStore();
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // reset any stale loading state (helps during HMR/dev)
      useUserStore.setState({ loading: false });
    }
  }, []);


  const submitHandler = async (data: SignupInputState) => {
    const result = userSignupSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      // const fieldErrors = JSON.parse(JSON.stringify(result.error.flatten().fieldErrors));

      console.log(fieldErrors);

      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    try {
      await signup(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start relative min-h-screen bg-[url('signupbg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-lg flex flex-col justify-center items-center rounded-r-full text-white pr-[10%] py-20 pl-[30%]">
        <div className="mb-4">
          <h1 className="font-bold text-white text-2xl">Foodies</h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <div className="relative">
              <Input
                className="pl-10 border-none shadow-white/20 shadow-[0px_0px_10px_rgba(0,0,0,0.3)] focus-visible:ring-0"
                type="text"
                id="username"
                placeholder="Enter your username"
                {...register("username", { required: true })}
              />
              <User className="absolute size-5 text-gray-500 inset-y-2 left-2 pointer-events-none" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                className="pl-10 border-none shadow-white/20 shadow-[0px_0px_10px_rgba(0,0,0,0.3)] focus-visible:ring-0"
                type="email"
                id="email"
                placeholder="example@gmail.com"
                {...register("email", { required: true })}
              />
              <Mail className="absolute size-5 text-gray-500 inset-y-2 left-2 pointer-events-none" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                className="pl-10 border-none shadow-white/20 shadow-[0px_0px_10px_rgba(0,0,0,0.3)] focus-visible:ring-0"
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <LockKeyhole className="absolute size-5 inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                className="pl-10 border-none shadow-white/20 shadow-[0px_0px_10px_rgba(0,0,0,0.3)] focus-visible:ring-0"
                type="tel"
                id="contact"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter your mobile number"
                {...register("contact", {
                  required: true,
                  maxLength: { value: 10, message: "Contact must be 10 digits long" },
                  minLength: { value: 10, message: "Contact must be 10 digits long" },
                  pattern: { value: /^[0-9]{10}$/, message: "Contact must contain only digits" },
                })}
              />
              <Phone className="absolute size-5 inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className={`w-full bg-red-500/80 hover:bg-red-500/60 cursor-pointer ${loading && "cursor-not-allowed"}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Signup"}
          </Button>

          <span className="flex justify-center w-full text-center mt-3 text-white/50 ">
            Already have an account?{"    "}
            <Link to="/login" className="text-blue-600/50">
              Login
            </Link>
          </span>
          {errors && Object.keys(errors).length > 0 && (
            <div className="mt-4 text-red-500">
              {Object.entries(errors).map(([key, value]) => (
                <p>{`${key}:${value}`}</p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
