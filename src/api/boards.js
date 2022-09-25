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
export const renameBoard = async (id, title) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/boards/rename/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          // "board-id": id,
        },
        body: JSON.stringify({ title }),
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

// Add list
export const addList = async (boardId, title) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        "board-id": boardId,
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

// Rename list title
export const renameList = async (id, boardId, title) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/lists/rename/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
        },
        body: JSON.stringify({ title }),
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

// Archive/Unarchive list
export const archiveList = async (listId, archive, boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/lists/archive/${archive}/${listId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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

// Get card by id
export const getCard = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cards/${id}`, {
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

// Add card
export const addCard = async (boardId, title, listId) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        "board-id": boardId,
      },
      body: JSON.stringify({ title, listId }),
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

// Edit card
export const editCard = async (id, boardId, formData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/cards/rename/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
        },
        body: JSON.stringify(formData),
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

// Move card
export const moveCard = async (cardId, boardId, formData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/cards/move/${cardId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
        },
        body: JSON.stringify(formData),
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

// Archive/Unarchive card
export const archiveCard = async (cardId, archive, boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/cards/archive/${archive}/${cardId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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

// Delete card
export const deleteCard = async (listId, cardId, boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/cards/${listId}/${cardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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

// Get activity
export const getActivity = async (boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/boards/activity/${boardId}`,
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

// Add member
export const addMember = async (userId, boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/boards/add-member/${userId}`,
      {
        method: "PUT",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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

// Move list
export const moveList = async (listId, boardId, formData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/lists/move/${listId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
        },
        body: JSON.stringify(formData),
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

// Add card member
export const addCardMember = async (add, cardId, userId, boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/cards/add-member/${add}/${cardId}/${userId}`,
      {
        method: "PUT",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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

// Add checklist item
export const addChecklistItem = async (cardId, boardId, text) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/checklists/${cardId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
        },
        body: JSON.stringify({ text }),
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

// Edit checklist item
export const editChecklistItem = async (cardId, itemId, boardId, text) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/checklists/${cardId}/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
        },
        body: JSON.stringify({ text }),
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

// Complete/Uncomplete checklist item
export const completeChecklistItem = async (
  cardId,
  complete,
  itemId,
  boardId
) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/checklists/${cardId}/${complete}/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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

// Delete checklist item
export const deleteChecklistItem = async (cardId, itemId, boardId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/checklists/${cardId}/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "board-id": boardId,
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
