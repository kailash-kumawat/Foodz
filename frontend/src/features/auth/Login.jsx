import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/index.js";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Login Data: ", data);
  };

  return (
    <div className="w-full h-full flex flex-col items-center lg:w-1/3 lg:mx-auto">
      {/* <h1 className="text-2xl font-semibold mb-6">Login</h1> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-fit mx-auto "
      >
        <Input
          type="tel"
          label="Phone no"
          {...register("contact", { required: "Contact is required" })}
          error={errors.contact?.message}
        />
        <Input
          type="password"
          label="Password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />
        <Link to={"/auth"} className="font-semibold text-[#FA4A0C]">
          Forgot password?
        </Link>
      </form>
      <div className="w-fit mt-10">
        <Button type="submit" loading={isSubmitting} disabled={!isValid}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
