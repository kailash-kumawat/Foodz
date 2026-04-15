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
    <div className="w-full flex flex-col items-center lg:w-1/3 lg:h-full lg:mx-auto">
      {/* <h1 className="text-2xl font-semibold mb-6">Signup</h1> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-fit mx-auto"
      >
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
      </form>
      <div className="w-fit mt-10">
        <Button type="submit" loading={isSubmitting} disabled={!isValid}>
          Signup
        </Button>
      </div>
    </div>
  );
}

export default Signup;
