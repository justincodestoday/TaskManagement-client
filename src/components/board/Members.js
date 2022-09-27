import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import {
  TextField,
  Button,
  Avatar,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { addMember } from "../../api/boards";
import getInitials from "../../utils/getInitials";

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

const Members = ({ board }) => {
  const [inviting, setInviting] = useState(false);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const queryClient = useQueryClient();

  const boardMembers = board.members;
  const searchOptions = users.filter((user) =>
    boardMembers?.find((boardMember) => boardMember.user === user._id)
      ? false
      : true
  );

  const mutation = useMutation(
    ({ boardId, userId }) => addMember(boardId, userId),
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
        queryClient.invalidateQueries(["board"]);

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

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue && newInputValue !== "") {
      const search = await fetch(
        `${process.env.REACT_APP_API_SERVER}/users/${newInputValue}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const searchData = (await search.json()).slice(0, 5);
      setUsers(searchData && searchData.length > 0 ? searchData : []);
    }
  };

  const onSubmitHandler = async () => {
    mutation.mutate({ boardId: board._id, userId: user._id });
    setUser(null);
    setInputValue("");
    setInviting(false);
  };

  return (
    <div className="board-members-wrapper">
      <div className="board-members">
        {boardMembers?.map((boardMemberId) => {
          return (
            <Tooltip title={boardMemberId.name} key={boardMemberId.user}>
              <Avatar className="avatar">
                {getInitials(boardMemberId.name)}
              </Avatar>
            </Tooltip>
          );
        })}
      </div>
      {!inviting ? (
        <ThemeProvider theme={theme}>
          <Button
            className="invite"
            variant="contained"
            onClick={() => setInviting(true)}
          >
            Invite
          </Button>
        </ThemeProvider>
      ) : (
        <div className="invite">
          <ThemeProvider theme={theme}>
            <Autocomplete
              size="small"
              value={user}
              onChange={(e, newMember) => setUser(newMember)}
              inputValue={inputValue}
              onInputChange={(e, newInputValue) =>
                handleInputValue(newInputValue)
              }
              options={searchOptions}
              getOptionLabel={(member) => member.email}
              className="search-member"
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText="Search for user by email"
                  autoFocus
                  variant="standard"
                  sx={{ backgroundColor: "#fff", paddingX: 1, borderRadius: 2 }}
                />
              )}
            />
          </ThemeProvider>
          <div className="add-member">
            <ThemeProvider theme={theme}>
              <Button
                disabled={!user}
                variant="contained"
                color="primary"
                onClick={() => onSubmitHandler()}
              >
                Add Member
              </Button>
              <Button onClick={() => setInviting(false)}>
                <CloseIcon
                  fontSize="large"
                  sx={{
                    backgroundColor: "#3f50b5",
                    color: "#fff",
                    borderRadius: 5,
                  }}
                />
              </Button>
            </ThemeProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
