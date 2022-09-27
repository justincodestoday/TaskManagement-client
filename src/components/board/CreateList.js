import React, { useRef, useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { addList } from "../../api/boards";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const CreateList = ({ board }) => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ title, boardId }) => addList(title, boardId),
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
        queryClient.invalidateQueries(["lists"]);

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

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ title, boardId: board._id });
    setTitle("");
    setAdding(false);
  };

  return !adding ? (
    <div className="mt-2.5">
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          sx={{ width: 280 }}
          onClick={() => setAdding(true)}
        >
          <AddCircleOutlineIcon sx={{ marginRight: 0.5 }} /> Add a list
        </Button>
      </ThemeProvider>
    </div>
  ) : (
    <div ref={formRef} className="create-list-form">
      <form onSubmit={(e) => onSubmit(e)}>
        <ThemeProvider theme={theme}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            required
            label="Enter list title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ThemeProvider>
        <div className="flex justify-start">
          <ThemeProvider theme={theme}>
            <Button type="submit" variant="contained" color="primary">
              Add List
            </Button>
            <Button
              onClick={() => {
                setAdding(false);
                setTitle("");
              }}
            >
              <CloseIcon />
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
