import React, { useState } from "react";

import {
  TextField,
  Button,
  Avatar,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { addMember } from "../../api/boards";

const Members = () => {
  const [inviting, setInviting] = useState(false);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  // const boardMembers = useSelector((state) => state.board.board.members);
  // const searchOptions = users.filter((user) =>
  //   boardMembers.find((boardMember) => boardMember.user === user._id)
  //     ? false
  //     : true
  // );
  // const dispatch = useDispatch();

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    // if (newInputValue && newInputValue !== "") {
    //   const search = (
    //     await axios.get(`/api/users/${newInputValue}`)
    //   ).data.slice(0, 5);
    //   setUsers(search && search.length > 0 ? search : []);
    // }
  };

  const onSubmit = async () => {
    // dispatch(addMember(user._id));
    setUser(null);
    setInputValue("");
    setInviting(false);
  };

  return (
    <div className="board-members-wrapper">
      <div className="board-members">
        {/* {boardMembers.map((member) => {
          return (
            <Tooltip title={member.name} key={member.user}>
              <Avatar className="avatar">{getInitials(member.name)}</Avatar>
            </Tooltip>
          );
        })} */}
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
            // options={searchOptions}
            getOptionLabel={(member) => member.email}
            className="search-member"
            renderInput={(params) => (
              <TextField
                {...params}
                helperText="Search for user by email"
                autoFocus
              />
            )}
          />
          <div className="add-member">
            <Button
              disabled={!user}
              variant="contained"
              color="primary"
              onClick={onSubmit}
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
