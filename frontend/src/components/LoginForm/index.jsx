import { useFormik } from "formik";
import loginFormValidator from "@/helper/validator/loginFormValidator";
import useUserStore from "@/store/userStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Spinner from "@/components/utils/Spinner";
import { useCookies } from "react-cookie";
import useInviteStore from "@/store/inviteStore";

const LoginForm = () => {
  const [loginState, setLoginState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const invitedGroup = useInviteStore((state) => state?.invite);
  const removeInvite = useInviteStore((state) => state?.removeInvite);

  const navigate = useNavigate();
  const handleLogin = (values) => {
    setLoginState("processing");
    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/login`,
      data: values,
    })
      .then((res) => {
        console.log("success");
        setLoginState("success");
        console.log(res.data);
        setCookie("accessToken", res.data.accessToken, {
          path: "/",
          maxAge: 2592000,
        });
        setUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          profileImg: res.data.profileImg,
        });
        if (invitedGroup) {
          navigate(`/invite/${invitedGroup}`);
          removeInvite();
        } else {
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
        setLoginState("failed");
        if (e.response.data.message) {
          setErrorMessage(e.response.data.message);
          console.log("failed");
          console.log(e.response.data)
        }else {
        setErrorMessage("Something went wrong");
      }});
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginFormValidator,
    onSubmit: handleLogin,
  });
  return (
    <div className="p-3 grid place-items-center w-full">
      <form
        className="bg-white max-w-[25rem] grid p-3"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-semibold font-ubuntu justify-self-center text-indigo-500">
          Login
        </h2>
        {loginState === "failed" ? (
          <div className="mt-3 mx-2 p-2 border border-red-300 bg-red-100 text-red-400">
            {errorMessage}
          </div>
        ) : null}

        <div className="m-3">
          <label className="formInputLebel" htmlFor="email">
            Email Address
          </label>
          <input
            className={`formInput ${
              formik.errors.email ? "formInputError" : ""
            }`}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter email"
          />
          {formik.errors.email ? (
            <div className="formInputErrorText">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="m-3">
          <label className="formInputLebel" htmlFor="password">
            Password
          </label>
          <input
            className={`formInput ${
              formik.errors.password ? "formInputError" : ""
            }`}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
          />
          {formik.errors.password ? (
            <div className="formInputErrorText">{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          disabled={loginState === "processing"}
          className="px-3 py-2 font-poppins bg-indigo-500 text-white text-lg w-40 rounded justify-self-center my-2"
          type="submit"
        >
          {loginState === "processing" ? (
            <p>
              Loging in...
              <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
            </p>
          ) : (
            "Login"
          )}
        </button>
        <p className="px-3 pt-5 text-slate-800 font-poppins">
          Don&apos;t have an account?{"  "}
          <Link className="text-indigo-500" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
