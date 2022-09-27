import React, { useRef, useState, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ListTitle from "./ListTitle";
import ListMenu from "./ListMenu";
import Card from "../card/Card";
import CreateCardForm from "./CreateCardForm";

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

const List = ({ listId, index, list, board }) => {
    const [addingCard, setAddingCard] = useState(false);

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
                        <ListTitle list={list} board={board} />
                        <ListMenu list={list} listId={listId} board={board} />
                    </div>
                    <Droppable droppableId={listId} type="card">
                        {(provided) => (
                            <div
                                className={`list ${
                                    addingCard
                                        ? "adding-card"
                                        : "not-adding-card"
                                }`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div className="cards">
                                    {list?.cards?.map((cardId, index) => (
                                        <Card
                                            key={cardId}
                                            cardId={cardId}
                                            index={index}
                                            list={list}
                                            board={board}
                                        />
                                    ))}
                                </div>
                                {provided.placeholder}
                                {addingCard && (
                                    <div ref={createCardFormRef}>
                                        <CreateCardForm
                                            listId={listId}
                                            board={board}
                                            setAdding={setAddingCard}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </Droppable>
                    {!addingCard && (
                        <div className="create-card-button flex justify-start">
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    onClick={() => setAddingCard(true)}
                                >
                                    <AddCircleOutlineIcon
                                        sx={{ marginRight: 0.5 }}
                                    />{" "}
                                    Add a card
                                </Button>
                            </ThemeProvider>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default List;
