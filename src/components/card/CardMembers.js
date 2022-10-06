import React from "react";
import { useQueryClient, useMutation } from "react-query";

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

import { addCardMember } from "../../api/boards";

const CardMembers = ({ card, board }) => {
  const boardMembers = board.members;
  const members = card.members.map((member) => member.user);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ add, cardId, userId }) => addCardMember(add, cardId, userId),
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
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

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
                    mutation.mutate({
                      add: e.target.checked,
                      cardId: card._id,
                      userId: e.target.name,
                    })
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

export default CardMembers;
