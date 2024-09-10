import RegisterForm from "@/form/RegistrationForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="p-6 flex justify-center items-center mx-auto  max-w-3xl w-full ">
      <div>
        <h2 className="text-2xl text-center mb-4 uppercase italic">Registration</h2>
        <p className="mb-6 italic">
          Do you like exclusive deals? You will love Trendy Membership! Register
          now and enjoy discount coupons, exclusive previews, and many other
          advantages—only for members.
        </p>
        <RegisterForm />
        <p className="text-xs mt-4">*Required fields</p>
      </div>
    </div>
  );
};

export default RegisterPage;
