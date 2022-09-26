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

import { addMember } from "../../api/boards";
import getInitials from "../../utils/getInitials";

const Members = ({ board }) => {
  const [boardData, setBoardData] = useState(board);
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

  useEffect(() => {
    setBoardData(board);
  }, [board]);

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
        <Button
          className="invite"
          variant="contained"
          onClick={() => setInviting(true)}
        >
          Invite
        </Button>
      ) : (
        <div className="invite">
          <Autocomplete
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
                sx={{ backgroundColor: "#fff" }}
              />
            )}
          />
          <div className="add-member">
            <Button
              disabled={!user}
              variant="contained"
              color="primary"
              onClick={() => onSubmitHandler()}
            >
              Add Member
            </Button>
            <Button onClick={() => setInviting(false)}>
              <CloseIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
