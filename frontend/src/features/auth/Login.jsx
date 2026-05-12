import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        data,
        {
          withCredentials: true,
        },
      );

      toast.success(response?.data?.message);
      navigate("/home");
    } catch (error) {
      toast.error("User not found or Something went wrong");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center lg:w-1/3 lg:mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-fit mx-auto "
      >
        <Input
          type="tel"
          label="Phone no"
          {...register("contact", {
            required: "Contact is required",
            valueAsNumber: true,
          })}
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

        <div className="w-fit mt-10">
          <Button type="submit" loading={isSubmitting} disabled={!isValid}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
