import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { RotatingLines } from "react-loader-spinner";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Box } from "@mui/material";

import "./Board.css";
import { checkAuth, logout } from "../../../api/users";
import { getBoard, getLists, moveCard, moveList } from "../../../api/boards";
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
  const [board, setBoard] = useState({});
  const [error, setError] = useState({});

  const { isAuth, user } = checkAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation((id) => getBoard(id), {
    onError: (error) => {
      setError(error);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["cards"]);
      queryClient.invalidateQueries(["lists"]);
      setBoard(data);
    },
  });

  const moveCardMutation = useMutation(
    ({ cardId, formData }) => moveCard(cardId, formData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

  const moveListMutation = useMutation(
    ({ listId, formData }) => moveList(listId, formData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["lists"]);
      },
    }
  );

  useEffect(() => {
    mutation.mutate(id);
  }, [id]);

  useEffect(() => {
    if (board?.title) document.title = "Weekee | " + board.title;
  }, [board?.title]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }

    const fromId = source.droppableId;
    const toId = destination.droppableId;
    const toIndex = destination.index;

    if (type === "card") {
      moveCardMutation.mutate(draggableId, { fromId, toId, toIndex });
    } else {
      moveListMutation.mutate(draggableId, { toIndex });
    }
  };

  return !board ? (
    <Fragment>
      <Box className="board-loading">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        <h2>Error: {error}</h2>
      </Box>
    </Fragment>
  ) : (
    <div
      className="board-and-navbar"
      style={{
        backgroundImage:
          "url(" +
          (board.backgroundURL
            ? board.backgroundURL
            : "https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80") +
          ")",
      }}
    >
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                            aria-current={item.current ? "page" : undefined}
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
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.data.avatar}
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
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/login"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
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
                      <span className="sr-only">Open main menu</span>
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
                      aria-current={item.current ? "page" : undefined}
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
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
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
          <section className="board">
            <div className="board-top">
              <div className="board-top-left">
                <BoardTitle board={board} />
                <Members board={board} />
              </div>
              <BoardDrawer board={board} />
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
                    {board?.lists?.map((listId, index) => (
                      <List
                        key={listId}
                        listId={listId}
                        index={index}
                        board={board}
                      />
                    ))}
                    {provided.placeholder}
                    <CreateList />
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
