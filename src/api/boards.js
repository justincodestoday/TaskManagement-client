// Get boards
export const getBoards = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/boards`, {
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

// Get board by id
export const getBoard = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/boards/${id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
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

// Add board
export const addBoard = async (title) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title }),
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

// Rename board title
export const renameBoard = async (id, formData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/boards/rename/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          boardId: id,
        },
        body: JSON.stringify({ formData }),
      }
    );
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

// Get list by id
export const getList = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/lists/${id}`, {
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
