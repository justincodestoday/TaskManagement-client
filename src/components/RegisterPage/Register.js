import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { register } from "../../api/users";

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();

    const mutation = useMutation((user) => register(user), {
        onError: (error) => {
            toast.error(
                `Something went wrong: ${JSON.parse(error.message).map(
                    (err) => err.msg
                )}`,
                {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                }
            );
        },

        onSuccess: (data) => {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
            });

            navigate("/login");
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

    return (
        <>
            <div className="h-screen">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
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
                            onSubmit={onSubmitHandler}
                        >
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <div className="grid grid-cols-2">
                                        <label
                                            htmlFor="firstname"
                                            className="sr-only"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            required
                                            className="relative block w-full appearance-none rounded-none rounded-tl-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-200 focus:outline-none focus:ring-yellow-200 sm:text-sm"
                                            placeholder="First name"
                                            onChange={onChangeHandler}
                                        />

                                        <label
                                            htmlFor="lastname"
                                            className="sr-only"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            required
                                            className="relative block w-full appearance-none rounded-none rounded-tr-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-200 focus:outline-none focus:ring-yellow-200 sm:text-sm"
                                            placeholder="Last name"
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <label
                                        htmlFor="username"
                                        className="sr-only"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="email"
                                        autoComplete="username"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-200 focus:outline-none focus:ring-yellow-200 sm:text-sm"
                                        placeholder="Email address"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            passwordShown ? "text" : "password"
                                        }
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-200 focus:outline-none focus:ring-yellow-200 sm:text-sm"
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
                                    className="h-4 w-4 rounded border-gray-300 text-yellow-300 focus:ring-yellow-200"
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
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-300 py-2 px-4 font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
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
                                    className="text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 transition duration-200 ease-in-out"
                                >
                                    <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md border border-yellow-300 py-2 px-4 font-medium hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
                                    >
                                        SIGN INTO WEEKEE
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
