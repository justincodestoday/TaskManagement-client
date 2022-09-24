import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { register } from "../../../api/users";

export const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation((user) => register(user), {
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
    document.title = "Weekee | Sign Up";
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
                Sign up to start using Weekee
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={(e) => onSubmitHandler(e)}
            >
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <label htmlFor="firstname" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-tl-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                      placeholder="First name"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastname" className="sr-only">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-tr-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                      placeholder="Last name"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                </div>
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
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) => onChangeHandler(e)}
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
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => onChangeHandler(e)}
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
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  onChange={() => togglePassword()}
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
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  SIGN UP
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold mt-2 pt-1 mb-2">
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 focus:text-green-700 transition duration-200 ease-in-out"
                >
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-green-600 py-2 px-4 font-medium hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    SIGN IN NOW
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
