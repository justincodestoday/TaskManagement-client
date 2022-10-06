import React, { Fragment } from "react";

import { FormGroup, FormControl } from "@mui/material";

import CreateChecklistItem from "./CreateChecklistItem";
import ChecklistItem from "./ChecklistItem";

const Checklist = ({ card }) => {
  return (
    <Fragment>
      <h3 className="classes.header">Checklist</h3>
      <FormControl component="fieldset">
        <FormGroup>
          {card.checklist.map((item) => (
            <ChecklistItem key={item._id} item={item} card={card} />
          ))}
        </FormGroup>
      </FormControl>
      <CreateChecklistItem cardId={card._id} />
    </Fragment>
  );
};

export default Checklist;
