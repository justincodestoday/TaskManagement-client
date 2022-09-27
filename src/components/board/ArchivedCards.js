import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { Card, List, ListItem, CardContent, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { archiveCard, deleteCard } from "../../api/boards";

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

const ArchivedCards = ({ board, lists, cards }) => {
    const queryClient = useQueryClient();
    // const cards = "";
    // {
    //     cards.map((card) =>
    //     console.log(card));
    // }

    // const mutation = useMutation(({ id }) => getCard(id), {
    //     onSuccess: (data) => {
    //         queryClient.invalidateQueries(["lists"]);
    //         setCard(data);
    //     },
    // });

    // useEffect(() => {
    //     mutation.mutate({ id: cardId });
    // }, [cardId]);

    const deleteMutation = useMutation(
        ({ listId, cardId, boardId }) => deleteCard(listId, cardId, boardId),
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

    const mutation = useMutation(
        ({ id, archive, boardId }) => archiveCard(id, archive, boardId),
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

    const onDelete = async (listId, cardId) => {
        deleteMutation.mutate({
            listId: listId,
            cardId: cardId,
            boardId: board._id,
        });
    };

    const onSendBack = async (cardId) => {
        mutation.mutate({ id: cardId, archive: false, boardId: board._id });
    };

    return (
        <div>
            <List>
                {cards
                    .filter((card) => card.archived)
                    .map((card, index) => (
                        <ListItem key={index} className="archived-card">
                            <Card>
                                <CardContent>{card.title}</CardContent>
                            </Card>
                            <div>
                                <Button
                                    color="secondary"
                                    onClick={() =>
                                        onDelete(
                                            lists.find((list) =>
                                                list.cards.includes(card._id)
                                            )._id,
                                            card._id
                                        )
                                    }
                                >
                                    Delete Card
                                </Button>
                                <Button onClick={() => onSendBack(card._id)}>
                                    Send to List
                                </Button>
                            </div>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};

export default ArchivedCards;
