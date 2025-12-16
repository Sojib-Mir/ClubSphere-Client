import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbEye, TbEyeOff, TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { saveOrUpdateUser } from "../../utils";
import UseTitle from "../../hooks/useTitle";

const Login = () => {
  UseTitle("Login");
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // Handler Submit Form
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      //User Login
      const { user } = await signIn(email, password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      reset();
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      reset();
      console.log(err?.message);
      setLoading(false);
      toast.error("Invalid Email & Password!");
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col max-w-md px-6 py-2 rounded-md sm:px-10 sm:py-5 border border-amber-400/20 w-full">
        <div className="mb-5 text-center">
          <h1 className=" text-4xl font-bold">Welcome Back!</h1>
          <p className="text-sm text-gray-400 mt-2">Please login here.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
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
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300   bg-gray-100 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is Required!</p>
              )}
            </div>

            {/* Password */}
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
                className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
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
                className="absolute text-lg right-4 top-9 cursor-pointer text-black z-99999"
              >
                {showPassword ? <TbEyeOff /> : <TbEye />}
              </span>

              {/* Forget Password */}
              <Link className="text-xs hover:text-pink-500 underline font-semibold text-gray-600 cursor-pointer">
                Forgot password?
              </Link>
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
          Don't have an account?{" "}
          <Link
            state={from}
            to="/signup"
            className="text-blue-500 hover:text-pink-500 underline font-semibold"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
