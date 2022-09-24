import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
  CardActionArea,
  Modal,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

import { blue } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { addBoard } from "../../api/boards";

const CreateBoard = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation((title) => addBoard(title), {
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
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate(title);
    setOpen(false);
  };

  const body = (
    <>
      <Box
        sx={{
          width: { md: 500 },
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: 5,
        }}
      >
        <div className="flex justify-between">
          <Typography
            sx={{ fontWeight: "bold" }}
            id="modal-modal-title"
            variant="h4"
            component="h1"
          >
            Create new board
          </Typography>
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <form method="POST" onSubmit={(e) => onSubmitHandler(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Insert board title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Create Board
          </Button>
        </form>
      </Box>
    </>
  );

  return (
    <>
      <Card
        sx={{
          maxWidth: {
            md: 345,
          },
          color: blue[800],
          backgroundColor: blue[50],
          "&:hover": {
            backgroundColor: blue[100],
            color: "#fff",
          },
        }}
      >
        <CardActionArea component="button" onClick={() => setOpen(true)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <AddCircleOutlineIcon /> New Board
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "top",
        }}
      >
        {body}
      </Modal>
    </>
  );
};

export default CreateBoard;
