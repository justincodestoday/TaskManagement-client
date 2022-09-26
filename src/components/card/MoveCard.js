import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";

import { moveCard } from "../../api/boards";

const MoveCard = ({ cardId, setOpen, thisList }) => {
    const [listObject, setListObject] = useState(null);
    const [listTitle, setListTitle] = useState("");
    const [position, setPosition] = useState(0);
    const [positions, setPositions] = useState([0]);
    // const lists = useSelector((state) => state.board.board.lists);
    // const listObjects = useSelector((state) =>
    //     state.board.board.listObjects
    //         .sort(
    //             (a, b) =>
    //                 lists.findIndex((id) => id === a._id) -
    //                 lists.findIndex((id) => id === b._id)
    //         )
    //         .filter((list) => !list.archived)
    // );
    // const cardObjects = useSelector((state) => state.board.board.cardObjects);

    // useEffect(() => {
    //     setListObject(thisList);
    //     setListTitle(thisList.title);
    // }, [thisList, cardId]);

    // useEffect(() => {
    //     if (listObject) {
    //         const unarchivedListCards = listObject.cards
    //             .map((id, index) => {
    //                 const card = cardObjects.find(
    //                     (object) => object._id === id
    //                 );
    //                 const position = index;
    //                 return { card, position };
    //             })
    //             .filter((card) => !card.card.archived);
    //         let cardPositions = unarchivedListCards.map(
    //             (card) => card.position
    //         );
    //         if (listObject !== thisList) {
    //             cardPositions = cardPositions.concat(listObject.cards.length);
    //         }
    //         if (listObject.cards.length > 0) {
    //             setPositions(cardPositions);
    //             setPosition(thisList.cards.findIndex((id) => id === cardId));
    //         } else {
    //             setPositions([0]);
    //             setPosition(0);
    //         }
    //     }
    // }, [thisList, cardId, listObject, cardObjects]);

    const onSubmit = async () => {
        // dispatch(
        //     moveCard(cardId, {
        //         fromId: thisList._id,
        //         toId: listObject._id,
        //         toIndex: position,
        //     })
        // );
        setOpen(false);
    };

    return (
        <div className="flex flex-col">
            <h3 className="mt-5">Move this card</h3>
            <div>
                <FormControl
                    sx={{ marginTop: 10, marginRight: 20, width: 200 }}
                >
                    <InputLabel shrink>List</InputLabel>
                    <Select
                        value={listTitle}
                        required
                        onChange={(e) => {
                            setListTitle(e.target.value);
                            // setListObject(
                            //     listObjects.find(
                            //         (list) => list.title === e.target.value
                            //     )
                            // );
                        }}
                        displayEmpty
                    >
                        {/* {listObjects.map((list) => (
                            <MenuItem key={list._id} value={list.title}>
                                {list.title}
                            </MenuItem>
                        ))} */}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{ marginTop: 10, marginRight: 20, width: 200 }}
                >
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

// MoveCard.propTypes = {
//     cardId: PropTypes.string.isRequired,
//     setOpen: PropTypes.func.isRequired,
//     thisList: PropTypes.object.isRequired,
// };

export default MoveCard;