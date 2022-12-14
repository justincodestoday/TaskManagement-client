import React, { Fragment, useRef, useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import CardMUI from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SubjectIcon from "@mui/icons-material/Subject";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { TextField, CardContent, Button, Avatar, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CardModal from "./CardModal";
import { getCard, editCard } from "../../api/boards";
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

const Card = ({ cardId, index, list, board }) => {
    const [editing, setEditing] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [title, setTitle] = useState("");
    const [height, setHeight] = useState(0);
    const [completeItems, setCompleteItems] = useState(0);
    const cardRef = useRef(null);
    const [card, setCard] = useState({});
    const queryClient = useQueryClient();

    useEffect(() => {
        if (card) {
            setTitle(card.title);
            card.checklist &&
                setCompleteItems(
                    card.checklist.reduce(
                        (completed, item) =>
                            (completed += item.complete ? 1 : 0),
                        0
                    )
                );
        }
    }, [card]);

    const mutation = useMutation(({ id }) => getCard(id), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["lists"]);
            setCard(data);
        },
    });

    useEffect(() => {
        mutation.mutate({ id: cardId });
    }, [cardId]);

    const editCardMutation = useMutation(
        ({ id, formData }) => editCard(id, formData),
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
                queryClient.invalidateQueries(["list"]);

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

    useEffect(() => {
        cardRef && cardRef.current && setHeight(cardRef.current.clientHeight);
    }, [list, card, cardRef]);

    const onSubmitEdit = async (e) => {
        e.preventDefault();
        editCardMutation.mutate({ id: cardId, formData: { title } });
        setEditing(false);
        setMouseOver(false);
    };

    return !card || (card && card.archived) ? (
        ""
    ) : (
        <Fragment>
            <CardModal
                cardId={cardId}
                open={openModal}
                setOpen={setOpenModal}
                card={card}
                list={list}
                board={board}
            />
            {!editing ? (
                <Draggable draggableId={cardId} index={index}>
                    {(provided) => (
                        <ThemeProvider theme={theme}>
                            <CardMUI
                                className={`card ${
                                    mouseOver && !editing ? "mouse-over" : ""
                                }`}
                                onMouseOver={() => setMouseOver(true)}
                                onMouseLeave={() => setMouseOver(false)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                {mouseOver && !editing && (
                                    <Button
                                        style={{
                                            position: "absolute",
                                            bottom: height - 40,
                                            left: "180px",
                                            zIndex: 1,
                                        }}
                                        onClick={() => setEditing(true)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </Button>
                                )}
                                <CardContent
                                    onClick={() => {
                                        setOpenModal(true);
                                        setMouseOver(false);
                                    }}
                                    ref={cardRef}
                                >
                                    {card.label && card.label !== "none" && (
                                        <div
                                            className="card-label"
                                            style={{
                                                backgroundColor: card.label,
                                            }}
                                        />
                                    )}
                                    <p>{card.title}</p>
                                    <div className="card-bottom">
                                        <div className="card-bottom-left">
                                            {card.description && (
                                                <SubjectIcon
                                                    className="description-indicator"
                                                    fontSize="small"
                                                />
                                            )}
                                            {card.checklist &&
                                                card.checklist.length > 0 && (
                                                    <div
                                                        className={`checklist-indicator ${
                                                            completeItems ===
                                                            card.checklist
                                                                .length
                                                                ? "completed-checklist-indicator"
                                                                : ""
                                                        }`}
                                                    >
                                                        <AssignmentTurnedInIcon
                                                            fontSize="small"
                                                            className="checklist-indicator-icon"
                                                        />
                                                        {completeItems}/
                                                        {card.checklist.length}
                                                    </div>
                                                )}
                                        </div>
                                        <div className="card-member-avatars">
                                            {card?.members?.map((member) => {
                                                return (
                                                    <Tooltip
                                                        title={member.name}
                                                        key={member.user}
                                                    >
                                                        <Avatar className="avatar">
                                                            {getInitials(
                                                                member.name
                                                            )}
                                                        </Avatar>
                                                    </Tooltip>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                            </CardMUI>
                        </ThemeProvider>
                    )}
                </Draggable>
            ) : (
                <form
                    className="create-card-form"
                    onSubmit={(e) => onSubmitEdit(e)}
                >
                    <ThemeProvider theme={theme}>
                        <CardMUI>
                            <CardContent className="card-edit-content">
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    required
                                    label="Edit this card's title"
                                    autoFocus
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && onSubmitEdit(e)
                                    }
                                />
                            </CardContent>
                        </CardMUI>
                    </ThemeProvider>
                    <div className="card-actions flex justify-start">
                        <ThemeProvider theme={theme}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditing(false);
                                    setMouseOver(false);
                                    setTitle(card.title);
                                }}
                            >
                                <CloseIcon />
                            </Button>
                        </ThemeProvider>
                    </div>
                </form>
            )}
        </Fragment>
    );
};

export default Card;
