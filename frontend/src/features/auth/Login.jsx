import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/index.js";

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
    <div className="w-full max-w-sm p-6 fixed">
      {/* <h1 className="text-2xl font-semibold mb-6">Login</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Button type="submit" loading={isSubmitting} disabled={!isValid}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
