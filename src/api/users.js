import jwt_decode from "jwt-decode";

export const register = async (user) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

export const login = async (user) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const checkAuth = () => {
    let isAuth = localStorage.getItem("token") ? true : false;
    let user = localStorage.getItem("token")
        ? jwt_decode(localStorage.getItem("token"))
        : null;

    return { isAuth, user };
};

export const getUser = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/`, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};
