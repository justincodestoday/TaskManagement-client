import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
// import { LockClosedIcon } from "@heroicons/react/20/solid";

import { login } from "../../../api/users";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation((user) => login(user), {
    // onError: (error) => {
    //     toast.error(
    //         `Something went wrong: ${JSON.parse(error.message).map(
    //             (err) => err.msg
    //         )}`,
    //         {
    //             position: "top-center",
    //             autoClose: 3500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //         }
    //     );
    // },

    onError: (error) => {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
      });
    },

    onSuccess: (data) => {
      toast.success(`Success: ${data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
      });

      navigate("/dashboard");
    },
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  useEffect(() => {
    document.title = "Weekee | Sign In";
  }, []);

  return (
    <>
      <section className="h-screen">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-40 w-auto"
                src={`${process.env.PUBLIC_URL}/images/Logos/logo-white-background.jpeg`}
                alt="Weekee"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={onSubmitHandler}
            >
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="Password"
                    onChange={onChangeHandler}
                    // onMouseDown={togglePassword}
                    // onMouseUp={() =>
                    //     setPasswordShown(false)
                    // }
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="showPassword"
                  name="showPassword"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  onChange={togglePassword}
                />
                <label
                  htmlFor="showPassword"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Show password
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  SIGN IN
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold mt-2 pt-1 mb-2">
                  Don't have an account?
                </p>
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 focus:text-purple-700 transition duration-200 ease-in-out"
                >
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-purple-600 py-2 px-4 font-medium hover:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    CREATE AN ACCOUNT
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
