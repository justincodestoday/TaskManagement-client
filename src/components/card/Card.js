import React, { Fragment, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import CardMUI from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SubjectIcon from "@mui/icons-material/Subject";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { TextField, CardContent, Button, Avatar, Tooltip } from "@mui/material";

import CardModal from "./CardModal";
import { getCard, editCard } from "../../api/boards";
import getInitials from "../../utils/getInitials";

const Card = ({ cardId, list, index }) => {
    const [editing, setEditing] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [title, setTitle] = useState("");
    const [height, setHeight] = useState(0);
    const [completeItems, setCompleteItems] = useState(0);
    const [card, setCard] = useState({});
    const cardRef = useRef(null);
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
            queryClient.invalidateQueries(["cards"]);
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
                queryClient.invalidateQueries(["cards"]);

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
            {/* <CardModal
        cardId={cardId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        list={list}
      /> */}
            {!editing ? (
                <Draggable draggableId={cardId} index={index}>
                    {(provided) => (
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
                                        style={{ backgroundColor: card.label }}
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
                                                        card.checklist.length
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
                    )}
                </Draggable>
            ) : (
                <form
                    className="create-card-form"
                    onSubmit={(e) => onSubmitEdit(e)}
                >
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
                    <div className="card-actions">
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
                                // setTitle("");
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                </form>
            )}
        </Fragment>
    );
};

// Card.propTypes = {
//   cardId: PropTypes.string.isRequired,
//   list: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
// };

export default Card;