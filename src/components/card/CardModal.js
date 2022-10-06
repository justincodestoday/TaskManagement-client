import React, { useState, useEffect } from "react";
import { GithubPicker } from "react-color";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Modal, TextField, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { editCard, archiveCard } from "../../api/boards";
import DeleteCard from "./DeleteCard";
// import MoveCard from "./MoveCard";
// import CardMembers from "./CardMembers";
// import Checklist from "../checklist/Checklist";

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

const CardModal = ({ cardId, open, setOpen, card, list, board }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const mutation = useMutation(
    ({ id, archive, boardId }) => archiveCard(id, archive, boardId),
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
        queryClient.invalidateQueries(["cards", "lists"]);
      },
    }
  );

  const editCardMutation = useMutation(
    ({ id, formData }) => editCard(id, formData),
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
        queryClient.invalidateQueries(["cards", "lists"]);

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

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    editCardMutation.mutate({
      id: cardId,
      formData: { title, description },
    });
  };

  const onArchiveCard = async () => {
    mutation.mutate({ id: cardId, archive: true, boardId: board._id });
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "top",
        }}
      >
        <Box
          sx={{
            width: { md: 500 },
            padding: 4,
            backgroundColor: "#fff",
            boxShadow: 5,
          }}
        >
          <div
          //   className="paper card-modal bg-white"
          >
            <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
              <div className="flex">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  label="Card title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && onTitleDescriptionSubmit(e)
                  }
                  sx={{ width: "100%" }}
                />
                <Button onClick={() => setOpen(false)}>
                  <CloseIcon />
                </Button>
              </div>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                label="Card description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  title === card.title &&
                  (description === card.description ||
                    (description === "" && !card.description))
                }
                sx={{ width: 180 }}
              >
                Save All Changes
              </Button>
            </form>
            <div className="flex justify-between flex-wrap h-auto">
              {/* <CardMembers card={card} board={board} /> */}
              <div>
                <h3 className="label-title">Label</h3>
                <GithubPicker
                  className="color-picker"
                  onChange={async (color) =>
                    editCardMutation.mutate({
                      id: cardId,
                      formData: { label: color.hex },
                    })
                  }
                />
                <Button
                  sx={{ width: 100 }}
                  variant="outlined"
                  onClick={async () =>
                    editCardMutation.mutate({
                      id: cardId,
                      formData: { label: "none" },
                    })
                  }
                >
                  No Label
                </Button>
              </div>
            </div>
            {/* <Checklist card={card} /> */}
            <div className="flex justify-between flex-wrap h-auto">
              {/* <MoveCard cardId={cardId} setOpen={setOpen} thisList={list} board={board} /> */}
              <div className="mt-5">
                <Button
                  variant="contained"
                  sx={{ marginBottom: 1 }}
                  onClick={onArchiveCard}
                >
                  Archive Card
                </Button>
                <DeleteCard
                  cardId={cardId}
                  setOpen={setOpen}
                  list={list}
                  board={board}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default CardModal;
