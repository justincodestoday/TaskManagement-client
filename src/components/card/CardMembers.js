import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

import { addCardMember } from "../../api/boards";
// import useStyles from "../../utils/modalStyles";

const CardMembers = ({ card }) => {
  // const classes = useStyles();
  // need to fix this
  const classes = "hi";
  const boardMembers = useSelector((state) => state.board.board.members);
  const members = card.members.map((member) => member.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h3 className={classes.membersTitle}>Members</h3>
      <FormControl component="fieldset">
        <FormGroup>
          {boardMembers.map((member) => (
            <FormControlLabel
              key={member.user}
              control={
                <Checkbox
                  checked={members.indexOf(member.user) !== -1}
                  onChange={async (e) =>
                    dispatch(
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: e.target.name,
                      })
                    )
                  }
                  name={member.user}
                />
              }
              label={member.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;
