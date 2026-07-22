import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  BackButton,
  FavouriteButton,
} from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

function Address() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/address/", data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between text-center p-6">
        <BackButton />
        <p className="text-2xl font-semibold mr-auto ml-auto">Address</p>
      </div>
      <div className="w-full flex flex-col items-center lg:w-1/3 lg:h-full lg:mx-auto mt-12">
        {/* <h1 className="text-2xl font-semibold mb-6">Signup</h1> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-fit mx-auto"
        >
          <Input
            type="text"
            label="Address Line"
            {...register("address_line", { required: "Address is required" })}
            error={errors.name?.message}
          />
          <Input
            type="text"
            label="State"
            {...register("state", { required: "State is required" })}
            error={errors.email?.message}
          />
          <Input
            type="text"
            label="City"
            {...register("city", { required: "City is required" })}
            error={errors.contact?.message}
          />
          <Input
            type="text"
            label="Pincode"
            {...register("pincode", { required: "Pincode is required" })}
            error={errors.password?.message}
          />

          <div className="w-fit mt-10">
            <Button type="submit" loading={isSubmitting} disabled={!isValid}>
              Add Address
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Address;
