import './App.css'

import Table from './components/Table'
import UserProfile from './components/UserProfile'
import UserInfo from "./components/UserInfo.tsx";
import DeleteButton from './components/DeleteButton'
import EditButton from './components/EditButton'


import {useUsers} from "./hooks/useUsers.ts";
import {useState} from "react";


export interface User{
  id:number
  name:string
  phone:string
  email:string
  note:string
  style:string
}

function App() {

    const { users, addUser, editUser, deleteUser } = useUsers();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [style, setStyle] = useState("#87CEEB");

    function openAddModal() {
        setIsEditMode(false);

        setName("");
        setPhone("");
        setEmail("");
        setNote("");
        setStyle("#87CEEB");

        setIsModalOpen(true);
    }

    function openEditModal() {
        if (!selectedUser) return;

        setIsEditMode(true);

        setName(selectedUser.name);
        setPhone(selectedUser.phone);
        setEmail(selectedUser.email);
        setNote(selectedUser.note);
        setStyle(selectedUser.style);

        setIsModalOpen(true);
    }

    function handleSave() {
        if (isEditMode && selectedUser) {
            editUser({
                id: selectedUser.id,
                name,
                phone,
                email,
                note,
                style,
            });

            setSelectedUser({
                id: selectedUser.id,
                name,
                phone,
                email,
                note,
                style,
            });
        } else {
            addUser({
                name,
                phone,
                email,
                note,
                style,
            });
        }

        setName("");
        setPhone("");
        setEmail("");
        setNote("");
        setStyle("#87CEEB");

        setIsEditMode(false);
        setIsModalOpen(false);
    }

    return (
        <>
            <main className="flex flex-col lg:flex-row min-h-screen p-5 gap-5">
                <aside
                    className="
                    w-full
                    lg:w-[35%]
                    bg-[rgb(232_238_252/53%)]
                    rounded-2xl
                    lg:rounded-l-2xl
                    border
                    border-gray-300
                "
                >
                    <Table
                        users={users}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        onAddClick={openAddModal}
                    />
                </aside>

                <div
                    className="
                    grid
                    grid-cols-1
                    grid-rows-[auto_auto_auto]
                    lg:grid-cols-[65%_35%]
                    lg:grid-rows-[10%_25%_65%]
                    w-full
                    lg:w-[65%]
                    bg-white
                    rounded-2xl
                    lg:rounded-r-2xl
                    border
                    lg:border-l-0
                    border-gray-300
                "
                >

                    <div className="row-start-1 lg:col-start-1 lg:row-start-2">
                        <UserProfile user={selectedUser} />
                    </div>

                    <div className="row-start-2 lg:col-start-1 lg:col-end-3 lg:row-start-3">
                        <UserInfo user={selectedUser} />
                    </div>

                    <div className="
                    row-start-3
                    flex
                    justify-center
                    gap-2
                    p-4
                    lg:col-start-2
                    lg:row-start-2
                    lg:justify-end
                    lg:mt-2
                    lg:w-[85%]
                    "
                        >
                        <EditButton
                            disabled={!selectedUser}
                            onClick={openEditModal}
                        />

                        <DeleteButton
                            disabled={!selectedUser}
                            onClick={() => setIsDeleteModalOpen(true)}
                        />
                    </div>
                </div>
            </main>

            {isDeleteModalOpen && selectedUser && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/50"
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    <div
                        className="w-96 rounded-2xl bg-white p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="mb-3 text-xl font-semibold">
                            Delete contact
                        </h2>

                        <p className="mb-6">
                            Are you sure you want to delete{" "}
                            <strong>{selectedUser.name}</strong>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="border rounded-[10px] bg-white px-4 py-2 hover:bg-gray-100 "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    deleteUser(selectedUser.id);
                                    setSelectedUser(null);
                                    setIsDeleteModalOpen(false);
                                }}
                                className="border bg-white px-4 py-2 text-red-500 rounded-[10px] hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )} {isModalOpen && (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/50"
                onClick={() => setIsModalOpen(false)}
            >
                <div
                    className="w-[500px] rounded-2xl bg-white p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="mb-4 text-xl font-semibold">
                        {isEditMode ? "Edit contact" : "Add contact"}
                    </h2>

                    <input
                        className="mb-3 w-full rounded border p-2"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="mb-3 w-full rounded border p-2"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        className="mb-3 w-full rounded border p-2"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="mb-3 w-full rounded border p-2"
                        placeholder="Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <div className="mb-5">
                        <label className="mb-2 block font-medium">
                            Avatar color
                        </label>

                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="h-12 w-12 cursor-pointer"
                            />

                            <input
                                type="text"
                                value={style}
                                readOnly
                                className="flex-1 rounded border p-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            className="rounded-lg bg-gray-200 px-4 py-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                            onClick={handleSave}
                        >
                            {isEditMode ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        )}

        </>
    );
}

export default App
