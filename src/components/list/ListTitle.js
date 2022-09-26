import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";

import { renameList } from "../../api/boards";

const ListTitle = ({ list, board }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(list.title);
    const queryClient = useQueryClient();

    useEffect(() => {
        setTitle(list.title);
    }, [list.title]);

    const mutation = useMutation(
        ({ boardId, listId, title }) => renameList(boardId, listId, title),
        {
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
                queryClient.invalidateQueries(["boards"]);

                toast.success(`Success: ${data.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    draggable: false,
                });
            },
        }
    );

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        mutation.mutate({ boardId: board._id, listId: list._id, title });
        setEditing(false);
    };

    return !editing ? (
        <h3 className="list-title" onClick={() => setEditing(true)}>
            {list.title}
        </h3>
    ) : (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <TextField
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </form>
    );
};

// ListTitle.propTypes = {
//   list: PropTypes.object.isRequired,
// };

export default ListTitle;
