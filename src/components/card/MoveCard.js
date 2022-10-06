import React, { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";

import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import { moveCard } from "../../api/boards";

const MoveCard = ({ cardId, setOpen, thisList, board }) => {
  const [listObject, setListObject] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const lists = board.lists;
  const queryClient = useQueryClient();

  listObject
    .sort(
      (a, b) =>
        lists.findIndex((id) => id === a._id) -
        lists.findIndex((id) => id === b._id)
    )
    .filter((list) => !list.archived);

  const cardObjects = board.cards;

  useEffect(() => {
    setListObject(thisList);
    setListTitle(thisList.title);
  }, [thisList, cardId]);

  useEffect(() => {
    if (listObject) {
      const unarchivedListCards = listObject.cards
        .map((id, index) => {
          const card = cardObjects.find((object) => object._id === id);
          const position = index;
          return { card, position };
        })
        .filter((card) => !card.card.archived);
      let cardPositions = unarchivedListCards.map((card) => card.position);
      if (listObject !== thisList) {
        cardPositions = cardPositions.concat(listObject.cards.length);
      }
      if (listObject.cards.length > 0) {
        setPositions(cardPositions);
        setPosition(thisList.cards.findIndex((id) => id === cardId));
      } else {
        setPositions([0]);
        setPosition(0);
      }
    }
  }, [thisList, cardId, listObject, cardObjects]);

  const mutation = useMutation(
    ({ cardId, formData }) => moveCard(cardId, formData),
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

  const onSubmit = async () => {
    mutation.mutate({
      cardId,
      formData: {
        fromId: thisList._id,
        toId: listObject._id,
        toIndex: position,
      },
    });
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <h3 className="mt-5">Move this card</h3>
      <div>
        <FormControl sx={{ marginTop: 10, marginRight: 20, width: 200 }}>
          <InputLabel shrink>List</InputLabel>
          <Select
            value={listTitle}
            required
            onChange={(e) => {
              setListTitle(e.target.value);
              setListObject(
                listObjects.find((list) => list.title === e.target.value)
              );
            }}
            displayEmpty
          >
            {listObjects.map((list) => (
              <MenuItem key={list._id} value={list.title}>
                {list.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ marginTop: 10, marginRight: 20, width: 200 }}>
          <InputLabel shrink>Position</InputLabel>
          <Select
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
            displayEmpty
          >
            {positions.map((position, index) => (
              <MenuItem key={position} value={position}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button
        sx={{ width: 180, marginTop: 10 }}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Move Card
      </Button>
    </div>
  );
};

export default MoveCard;
