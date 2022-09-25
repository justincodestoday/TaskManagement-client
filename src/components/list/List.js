import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { Button } from "@mui/material";

import { getList } from "../../api/boards";
import ListTitle from "./ListTitle";
import ListMenu from "./ListMenu";
import Card from "../card/Card";
import CreateCardForm from "./CreateCardForm";

const List = ({ listId, index }) => {
  const [addingCard, setAddingCard] = useState(false);
  // const list = useSelector((state) =>
  //   state.board.board.listObjects.find((object) => object._id === listId)
  // );
  const list = "";
  // const dispatch = useDispatch();
  const dispatch = "";

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !list || (list && list.archived) ? (
    ""
  ) : (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className="list-wrapper"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-top">
            <ListTitle list={list} />
            <ListMenu listId={listId} />
          </div>
          <Droppable droppableId={listId} type="card">
            {(provided) => (
              <div
                className={`list ${
                  addingCard ? "adding-card" : "not-adding-card"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="cards">
                  {list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      list={list}
                      index={index}
                    />
                  ))}
                </div>
                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm listId={listId} setAdding={setAddingCard} />
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingCard && (
            <div className="create-card-button">
              <Button variant="contained" onClick={() => setAddingCard(true)}>
                + Add a card
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
