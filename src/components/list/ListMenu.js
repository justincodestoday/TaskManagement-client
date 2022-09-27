import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { archiveList } from "../../api/boards";
import MoveList from "./MoveList";

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

const ListMenu = ({ list, listId, board }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmitHandler = async () => {
    mutation.mutate({ id: listId, archive: true, boardId: board._id });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button onClick={handleClick}>
          <MoreHorizIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <MoreHorizIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              onSubmitHandler();
              handleClose();
            }}
          >
            Archive This List
          </MenuItem>
          <MenuItem>
            {/* <MoveList
            listData={list}
            listId={listId}
            board={board}
            closeMenu={handleClose}
          /> */}
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </div>
  );
};

export default ListMenu;
