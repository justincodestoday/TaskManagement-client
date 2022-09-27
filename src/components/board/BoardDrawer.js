import React, { useState } from "react";
import Moment from "react-moment";
import { useQuery, useQueryClient, useMutation } from "react-query";

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from "@mui/icons-material/Archive";

import ArchivedLists from "./ArchivedLists";
import ArchivedCards from "./ArchivedCards";

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

const BoardDrawer = ({ board, lists, cards }) => {
    const [open, setOpen] = useState(false);
    const [viewingArchivedLists, setViewingArchivedLists] = useState(false);
    const [viewingArchivedCards, setViewingArchivedCards] = useState(false);
    const [activityChunks, setActivityChunks] = useState(1);
    const activity = board.activity;
    const queryClient = useQueryClient();

    // const cards = [];
    // for (let list in lists) {
    //     // console.log(lists[list].cards);
    //     cards.push(lists[list]);
    // }

    const handleClose = () => {
        setOpen(false);
        setActivityChunks(1);
        queryClient.invalidateQueries(["board"]);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    //   className={open ? "hidden" : "flex justify-between w-40"}
                >
                    <MoreHorizIcon fontSize="small" /> Show Menu
                </Button>
            </ThemeProvider>
            <Drawer
                // className={open ? "w-80 shrink-0" : "hidden"}
                variant="persistent"
                anchor="right"
                open={open}
                // classes="w-80"
            >
                {!viewingArchivedLists && !viewingArchivedCards ? (
                    <div>
                        <div className="flex items-center py-2.5 px-5 justify-between">
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                Menu
                            </Typography>
                            <ThemeProvider theme={theme}>
                                <Button onClick={handleClose}>
                                    <CloseIcon />
                                </Button>
                            </ThemeProvider>
                        </div>
                        <Divider />
                        <List>
                            <ListItem
                                button
                                onClick={() => setViewingArchivedLists(true)}
                            >
                                <ListItemIcon>
                                    <ArchiveIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Archived Lists"} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => setViewingArchivedCards(true)}
                            >
                                <ListItemIcon>
                                    <ArchiveIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Archived Cards"} />
                            </ListItem>
                        </List>
                        <Divider />
                        <div className="pt-5 px-5">
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                Activity
                            </Typography>
                        </div>
                        <List>
                            {activity
                                .slice(0, activityChunks * 10)
                                .map((activity) => (
                                    <ListItem key={activity._id}>
                                        <ListItemText
                                            primary={activity.text}
                                            secondary={
                                                <Moment fromNow>
                                                    {activity.date}
                                                </Moment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                        </List>
                        <div className="mb-5 mx-auto">
                            <ThemeProvider theme={theme}>
                                <Button
                                    disabled={
                                        activityChunks * 10 > activity.length
                                    }
                                    onClick={() =>
                                        setActivityChunks(activityChunks + 1)
                                    }
                                >
                                    View More Activity
                                </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                ) : viewingArchivedLists ? (
                    <div>
                        <div className="flex items-center py-2.5 px-5 justify-between">
                            <Button
                                onClick={() => setViewingArchivedLists(false)}
                            >
                                <ChevronLeftIcon />
                            </Button>
                            <h3>Archived Lists</h3>
                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </div>
                        <Divider />
                        <ArchivedLists board={board} lists={lists} />
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center py-2.5 px-5 justify-between">
                            <Button
                                onClick={() => setViewingArchivedCards(false)}
                            >
                                <ChevronLeftIcon />
                            </Button>
                            <h3>Archived Cards</h3>
                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </div>
                        <Divider />
                        <ArchivedCards
                            board={board}
                            lists={lists}
                            cards={cards}
                        />
                    </div>
                )}
                <Divider />
            </Drawer>
        </div>
    );
};

export default BoardDrawer;
