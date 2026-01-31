import { useUserStore } from "@/store/useUserStore";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HereImage from "@/assets/image.png";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { user } = useUserStore();
  if (!user?.isEmailVerified) {
    return (
      <div className="text-center py-10">
        Please verify your email to access the app. Email has been sent to{" "}
        {user?.email}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center flex-col md:flex-row max-w-7xl mx-auto md:p-10  m-4 gap-20">
        <div className="flex flex-col gap-10 md:w-[40%]">
          <div className="flex flex-col gap-5">
            <h1 className="font-playfair-display font-bold md:font-extrabold md:text-5xl text-4xl">
              Order Food anytime & anywhere
            </h1>
            <p className="text-gray-500">
              Hey! Our Delicios food is waiting for you, we are always near to
              you.
            </p>
          </div>
          <div className="relative flex items-center gap-2">
            <Input
              type="text"
              value={searchText}
              placeholder="Search restaurant by name, city & country"
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 shadow-none"
            />
            <Search className="text-gray-500 absolute inset-y-2 left-2" />
            <Button
               
              onClick={() => navigate(`/search/${searchText}`)}
              className="bg-orange hover:bg-hoverOrange cursor-p" 
            >
              Search
            </Button>
          </div>
        </div>
        <div>
          <img
            src={HereImage}
            alt=""
            className="object-cover w-full max-h-[500px]"
          />
        </div>
      </div>
    );
  }
};

export default HeroSection;
