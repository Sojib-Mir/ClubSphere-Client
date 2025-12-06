import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbEye, TbEyeOff, TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import UseTitle from "../../hooks/useTitle";

const SignUp = () => {
  UseTitle("SignUp");
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Signup
  const handleSignUp = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      //2. User Registration
      await createUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageURL });

      //3. Save username & profile photo
      await updateUserProfile(name, imageURL);

      reset();
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (e) {
      // reset();
      if (e.code === "auth/email-already-in-use") {
        toast.error("Account already exists! Please login.");
      } else {
        toast.error(e.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Email Already Exist!", e?.message);
    }
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <div className="flex flex-col max-w-md rounded-md border border-amber-400/20 px-10 py-2 w-full">
        <div className="mb-3 text-center">
          <h1 className="my-1 text-4xl font-bold">Sign Up</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-3">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 bg-gray-100 border rounded-md border-gray-300  focus:outline-sky-300 
      focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                data-temp-mail-org="0"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is Required!</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="block mb-1 text-sm">
                Profile Image
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-1 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-sky-50 file:text-blue-500
      hover:file:bg-lime-100
       border border-dashed border-gray-300 rounded-md cursor-pointer
       focus:outline-sky-300 bg-gray-100
      focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300
      py-2"
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
              {errors.image?.type === "required" && (
                <p className="text-red-500">Image is Required!</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 bg-gray-100 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is Required!</p>
              )}
            </div>

            {/* Pasword */}
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-1">
                  Password
                </label>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
                autoComplete="new-password"
                placeholder="Enter Your Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900 bg-gray-100"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required!</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer!
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be one uppercase, one lowercase, one number and
                  one special character!
                </p>
              )}

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-lg right-4 top-9 cursor-pointer z-50"
              >
                {showPassword ? <TbEyeOff /> : <TbEye />}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-secondary text-lg w-full rounded-md py-3 text-white cursor-pointer"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center mx-auto pt-4 space-x-1">
          <div className="border-t border-gray-400 w-20"></div>
          <p className="px-3 text-sm text-gray-600">or</p>
          <div className=" border-t border-gray-400 w-20"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-3 border m-3 p-1 border-gray-300 border-rounded cursor-pointer rounded"
        >
          <FcGoogle size={28} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-pink-500 underline font-semibold"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
