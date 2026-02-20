import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/index.js";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Signup data: ", data);
  };

  return (
    <div className="w-full max-w-sm p-6">
      {/* <h1 className="text-2xl font-semibold mb-6">Signup</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="text"
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
        <Input
          type="email"
          label="Email address"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
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
          Signup
        </Button>
      </form>
    </div>
  );
}

export default Signup;
