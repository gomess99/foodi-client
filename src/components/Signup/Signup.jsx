import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = useContext(AuthContext);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [isLoading, setIsLoading] = useState(false);

  // Ref for the modal
  const modalRef = useRef(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    
    try {
      const result = await createUser(email, password);
      alert("Account creation successfully done!");
      if (modalRef.current) {
        modalRef.current.close(); // Close the modal using the ref
      }
      navigate(from, { replace: true });
    } catch (error) {
      alert(`Failed to create account: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="font-bold text-lg">Create An Account</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green text-white" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Signup"}
            </button>
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => modalRef.current.showModal()} // Open modal using the ref
            >
              Login
            </button>{" "}
          </p>
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
        </form>

        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>

      {/* Attach ref to Modal */}
      <Modal ref={modalRef}/>
    </div>
  );
};

export default Signup;
