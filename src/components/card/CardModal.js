import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { GithubPicker } from "react-color";

import { Modal, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { editCard, archiveCard } from "../../api/boards";
import MoveCard from "./MoveCard";
import DeleteCard from "./DeleteCard";
import CardMembers from "./CardMembers";
// import Checklist from "../checklist/Checklist";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);

    useEffect(() => {
        setTitle(card.title);
        setDescription(card.description);
    }, [card]);

    const onTitleDescriptionSubmit = async (e) => {
        e.preventDefault();
        // dispatch(editCard(cardId, { title, description }));
    };

    // const onArchiveCard = async () => {
    //     dispatch(archiveCard(cardId, true));
    //     setOpen(false);
    // };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="paper card-modal">
                <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
                    <div className="flex">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            label="Card title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" && onTitleDescriptionSubmit(e)
                            }
                            sx={{ width: "100%" }}
                        />
                        <Button onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        label="Card description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                            title === card.title &&
                            (description === card.description ||
                                (description === "" && !card.description))
                        }
                        sx={{ width: 180, marginTop: 10 }}
                    >
                        Save All Changes
                    </Button>
                </form>
                <div className="flex justify-between flex-wrap h-auto">
                    <CardMembers card={card} />
                    <div>
                        <h3 className="label-title">Label</h3>
                        {/* <GithubPicker
                            className="color-picker"
                            onChange={async (color) =>
                                dispatch(editCard(cardId, { label: color.hex }))
                            }
                        /> */}
                        <Button
                            sx={{ width: 100 }}
                            variant="outlined"
                            // onClick={async () =>
                            //     dispatch(editCard(cardId, { label: "none" }))
                            // }
                        >
                            No Label
                        </Button>
                    </div>
                </div>
                {/* <Checklist card={card} /> */}
                <div className="flex justify-between flex-wrap h-auto">
                    <MoveCard
                        cardId={cardId}
                        setOpen={setOpen}
                        thisList={list}
                    />
                    <div className="flex flex-end flex-wrap mt-5">
                        <Button
                            variant="contained"
                            sx={{ marginBottom: 5 }}
                            // onClick={onArchiveCard}
                        >
                            Archive Card
                        </Button>
                        <DeleteCard
                            cardId={cardId}
                            setOpen={setOpen}
                            list={list}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

// CardModal.propTypes = {
//     cardId: PropTypes.string.isRequired,
//     open: PropTypes.bool.isRequired,
//     setOpen: PropTypes.func.isRequired,
//     card: PropTypes.object.isRequired,
//     list: PropTypes.object.isRequired,
// };

export default CardModal;
