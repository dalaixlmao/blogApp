import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import RightSection from "../components/RightSection";
import { SigninReq } from "@dalaixlmao/common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import URL from "../config";

export default function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    //   let send = false;
  
    async function onClick() {
      console.log(email, password);
  
      const req: SigninReq = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          URL+"/api/v1/user/signin",
          req
        );
        if (response.data.message == "Signed in successfully") {
            localStorage.setItem("token", "Brearer "+response.data.token);
            navigate('/blogs');
          }
      } catch (e) {
        console.log(e);
      }
    }
  
    return (
      <div className="w-full h-full flex flex-row">
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center">
          <Heading
            text={"Log in"}
            subText={"Don't have an account?"}
            to={"./signup"}
          />
          <InputBox type={"email"} placeholder={"email"} setFunction={setEmail} />
          <InputBox
            type={"password"}
            placeholder={"password"}
            setFunction={setPassword}
          />
          <Button width={"full"} text={"Sign in"} onClick={onClick} />
        </div>
  
        <div className="w-1/2 md:flex hidden flex-col justify-center items-center bg-gray-100">
          <RightSection
            quote={
              "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
            }
            author={"Jules Winnfield"}
            designation={"CEO, Acme Inc"}
          />
        </div>
      </div>
    );
  }
  