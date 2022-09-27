import React, { useRef, useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { Card, CardContent, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { addCard } from "../../api/boards";

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

const CreateCardForm = ({ listId, setAdding, board }) => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ title, listId, boardId }) => addCard(title, listId, boardId),
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({ title, listId: listId, boardId: board._id });
    setTitle("");
    setAdding(false);
  };

  return (
    <form
      ref={formRef}
      className="create-card-form"
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <ThemeProvider theme={theme}>
        <Card>
          <CardContent className="card-edit-content">
            <TextField
              margin="normal"
              fullWidth
              multiline
              required
              label="Enter a title for this card"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSubmitHandler(e)}
            />
          </CardContent>
        </Card>
      </ThemeProvider>
      <div className="card-actions flex justify-start">
        <ThemeProvider theme={theme}>
          <Button type="submit" variant="contained">
            Add Card
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
  );
};

export default CreateCardForm;
