import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { Button, List, ListItem, ListItemText } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { archiveList } from "../../api/boards";

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

const ArchivedLists = ({ board, lists }) => {
  const queryClient = useQueryClient();
  const listObjects = lists;

  const mutation = useMutation(
    ({ id, archive, boardId }) => archiveList(id, archive, boardId),
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
      },
    }
  );

  const onSubmit = async (listId) => {
    mutation.mutate({ id: listId, archive: false, boardId: board._id });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <List>
          {listObjects
            .filter((list) => list.archived)
            .map((list, index) => (
              <ListItem key={index}>
                <ListItemText primary={list.title} />
                <Button onClick={() => onSubmit(list._id)}>
                  Send to Board
                </Button>
              </ListItem>
            ))}
        </List>
      </ThemeProvider>
    </div>
  );
};

export default ArchivedLists;
