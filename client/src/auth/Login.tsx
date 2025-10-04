import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema"

import { useUserStore } from "@/store/useUserStore"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { login, loading } = useUserStore();
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const navigate = useNavigate();


  const submitHandler = async (data: any) => {

    const result = userLoginSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      // const fieldErrors = JSON.parse(JSON.stringify(result.error.flatten().fieldErrors));

      console.log(fieldErrors);

      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="flex flex-col justify-start items-center relative min-h-screen bg-[url('loginbg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-lg flex flex-col justify-center items-center rounded-b-full text-white pb-[10%] px-20 pt-[12%]">
        <div className="mb-4">
          <h1 className="font-bold text-white text-2xl">Foodies</h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
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

          <Button
            disabled={loading}
            type="submit" className={`w-full bg-yellow-500/70 hover:bg-yellow-500/60 cursor-pointer ${loading && "cursor-not-allowed"}`}>

            {
              loading ? <Loader2 className="animate-spin" /> : "Login"
            }
          </Button>
          <span className="flex justify-center w-full text-center mt-3 text-white/50">
            Dosent have an account?{" "}
            <Link to="/signup" className="text-blue-600/50">
              Signup
            </Link>
          </span>
          {
            errors && Object.keys(errors).length > 0 && (
              <div className="mt-4 text-red-500">

                {
                  Object.entries(errors).map(([key, value]) => (
                    <p >{`${key}:${value}`}</p>
                  ))
                }

              </div>
            )
          }

        </form >
      </div>
    </div>
  )
}

export default Login