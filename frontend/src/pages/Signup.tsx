import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import RightSection from "../components/RightSection";
import { useState, useEffect } from "react";
import { SignupReq } from "@dalaixlmao/common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import URL from "../config";
import Error from "../components/Error";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validPass, setPass] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  async function onClick() {
    setLoading(true);
    console.log(name, email, password);
    const req: SignupReq = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(URL + "/api/v1/user/signup", req);
      if (response.data.message == "Signed up successfully") {
        localStorage.setItem("token", "Brearer " + response.data.token);
        navigate("/blogs");
      }
      setLoading(false);
    } catch (e) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(password.length>=8)
      setPass(true);
    else
    setPass(false);
  }, [password, setPass])



  return (
    <div className="w-full h-full flex flex-row">
      {error && (
        <div className="w-full absolute top-12 flex flex-col items-center">
          <Error message={"Wrong input or account already exists, try Again"} />
        </div>
      )}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center">
        <Heading
          text={"Create an acoount"}
          subText={"Already have an account?"}
          to={"./signin"}
        />
        <InputBox type={"text"} placeholder={"name"} setFunction={setName} />
        <InputBox type={"email"} placeholder={"email"} setFunction={setEmail} />
        <InputBox
          type={"password"}
          placeholder={"password"}
          setFunction={setPassword}
        />
        {!validPass && <div className="text-red-500 text-[12px]">Password should be of at least 8 characters</div>}
        <Button
          width={"full"}
          text={"Sign up"}
          onClick={onClick}
          loading={loading}
        />
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
