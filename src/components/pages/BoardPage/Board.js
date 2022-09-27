import React, { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { RotatingLines } from "react-loader-spinner";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Box } from "@mui/material";

import "./Board.css";
import { checkAuth, logout } from "../../../api/users";
import {
    getBoard,
    getLists,
    getCardsInBoard,
    moveCard,
    moveList,
} from "../../../api/boards";
import BoardTitle from "../../board/BoardTitle";
import BoardDrawer from "../../board/BoardDrawer";
import List from "../../list/List";
import CreateList from "../../board/CreateList";
import Members from "../../board/Members";

// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };
const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    // { name: "Team", href: "/dashboard", current: false },
    // { name: "Projects", href: "/dashboard", current: false },
    // { name: "Calendar", href: "/dashboard", current: false },
    // { name: "Reports", href: "/dashboard", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "/dashboard" },
    { name: "Settings", href: "/dashboard" },
    // {
    //   name: "Sign out",
    //   href: "#",
    // },
];

const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

export const Board = () => {
    const { id } = useParams();
    const {
        data: board,
        error: boardError,
        isLoading: boardIsLoading,
        isError: boardIsError,
    } = useQuery("board", () => getBoard(id));

    const {
        data: lists,
        error: listsError,
        isLoading: listsIsLoading,
        isError: listsIsError,
    } = useQuery("lists", () => getLists(id));

    const {
        data: cards,
        error: cardsError,
        isLoading: cardsIsLoading,
        isError: cardsIsError,
    } = useQuery("cards", () => getCardsInBoard(id));

    const { user } = checkAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const moveCardMutation = useMutation(
        ({ cardId, formData, boardId }) => moveCard(cardId, formData, boardId),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["lists", "cards"]);
            },
        }
    );

    const moveListMutation = useMutation(
        ({ listId, formData, boardId }) => moveList(listId, formData, boardId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["lists"]);
            },
        }
    );

    useEffect(() => {
        if (board?.title) document.title = "Weekee | " + board.title;
    }, [board?.title]);

    if (boardIsLoading || listsIsLoading) {
        return (
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        );
    }

    if (boardIsError || listsIsError) {
        return (
            <>
                <h2>Error: {boardError.message || listsError.message}</h2>
                <h2>
                    Please{" "}
                    <Link
                        to="/login"
                        className="underline decoration-blue-500 hover:decoration-blue-600 text-blue-500 hover:text-blue-600"
                    >
                        <button
                            onClick={() => {
                                logout();
                            }}
                        >
                            click here
                        </button>
                    </Link>{" "}
                    to sign out.
                </h2>
            </>
        );
    }

    const onDragEnd = (result) => {
        const { source, destination, draggableId, type } = result;
        if (!destination) {
            return;
        }

        const fromId = source.droppableId;
        const toId = destination.droppableId;
        const toIndex = destination.index;

        if (type === "card") {
            moveCardMutation.mutate({
                cardId: draggableId,
                formData: { fromId, toId, toIndex },
                boardId: board._id,
            });
        } else {
            moveListMutation.mutate({
                listId: draggableId,
                formData: { toIndex },
                boardId: board._id,
            });
        }
    };

    return (
        //   !board ? (
        //     <Fragment>
        //       <Box className="board-loading">
        //         <RotatingLines
        //           strokeColor="grey"
        //           strokeWidth="5"
        //           animationDuration="0.75"
        //           width="96"
        //           visible={true}
        //         />
        //       </Box>
        //     </Fragment>
        //   ) :
        <div
            className="bg-cover min-h-screen"
            style={{
                backgroundImage:
                    "url(" +
                    (board.backgroundURL
                        ? board.backgroundURL
                        : "https://wallpaperaccess.com/full/2827309.jpg") +
                    ")",
            }}
        >
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-16 w-auto"
                                                src={`${process.env.PUBLIC_URL}/images/Logos/logo-gray-background.jpeg`}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? "bg-gray-900 text-white"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "px-3 py-2 rounded-md text-sm font-medium"
                                                        )}
                                                        aria-current={
                                                            item.current
                                                                ? "page"
                                                                : undefined
                                                        }
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={
                                                                user.data.avatar
                                                            }
                                                            alt=""
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map(
                                                            (item) => (
                                                                <Menu.Item
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <a
                                                                            href={
                                                                                item.href
                                                                            }
                                                                            className={classNames(
                                                                                active
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                            )}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                            )
                                                        )}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/login"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-gray-700"
                                                                    )}
                                                                    onClick={() => {
                                                                        logout();
                                                                        // navigate("/login");
                                                                    }}
                                                                >
                                                                    Logout
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "block px-3 py-2 rounded-md text-base font-medium"
                                            )}
                                            aria-current={
                                                item.current
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pt-4 pb-3">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user.data.avatar}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {user.data.name}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {user.data.email}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                        <Disclosure.Button
                                            as="a"
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            onClick={() => {
                                                logout();
                                                navigate("/login");
                                            }}
                                        >
                                            Logout
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                {/* Replace with your content */}
                <div>
                    <section className="board max-w-full">
                        <div className="board-top">
                            <div className="board-top-left">
                                <BoardTitle board={board} />
                                <Members board={board} />
                            </div>
                            <BoardDrawer
                                board={board}
                                lists={lists}
                                cards={cards}
                            />
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="all-lists"
                                direction="horizontal"
                                type="list"
                            >
                                {(provided) => (
                                    <div
                                        className="lists"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {lists?.map((list, index) => (
                                            <List
                                                key={list._id}
                                                listId={list._id}
                                                index={index}
                                                list={list}
                                                board={board}
                                            />
                                        ))}
                                        {provided.placeholder}
                                        <CreateList board={board} />
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </section>
                </div>
                {/* /End replace */}
            </div>
        </div>
    );
};
