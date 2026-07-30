import type {User} from "../App.tsx";
import sortUsers from "../utils/sortUsers.ts"
import getTextColor from "../utils/textColor.ts";
import {useState} from "react";

interface TableProps {
    users: User[];
    selectedUser: User | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
    onAddClick: () => void;
}

function Table({ users,selectedUser,setSelectedUser,onAddClick, }: TableProps){

    const {sortedUsers} = sortUsers(users)

    const [search, setSearch] = useState("");

    const filteredUsers = sortedUsers.filter((user) => {
        const value = search.toLowerCase().trim();

        return (
            user.name.toLowerCase().includes(value) ||
            user.phone.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        );
    });

    const filteredLetters = [...new Set(filteredUsers.map(user => user.name[0].toUpperCase()))];

    return (<>
    <section className="flex flex-col w-full h-full">
            <header className="block p-4">
            <div className="flex">
                <div>
                    <h2 className={"font-medium"}>Contacts</h2>
                    <span>{users.length} Saved</span>
                </div>
                <div className="flex ml-auto items-center">
                    <button
                        className="
                            w-40 h-10
                            bg-[rgb(46_99_214)]
                            text-white
                            rounded-2xl
                            font-medium
                            transition-colors
                            duration-500
                            hover:bg-[rgb(17_75_202)]

                        "
                        onClick={onAddClick}
                    >
                        + Add contact
                    </button>
                </div>
            </div>
            <div className={"flex flex-col mt-4"}>
                <label  htmlFor="search">Search contacts</label>
                <input
                    id="search"
                    type="search"
                    placeholder="Search name, phone, or email"
                    className="bg-white h-10 rounded-2xl pl-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                /></div>
            </header>
                <div className="overflow-y-auto mt-4 p-4">
                {filteredLetters.map(letter => (

                    <div key={letter}>

                        <h2 className={"font-medium text-gray-600"}>{letter}</h2>

                        <ul className="pl-4">
                            {filteredUsers
                                .filter(user => user.name[0].toUpperCase() === letter)
                                .map(user => (
                                    <li
                                        key={user.id}
                                        onClick={() => setSelectedUser(user)}
                                        className={`
                                            flex
                                            cursor-pointer
                                            items-center
                                            gap-3
                                            p-2
                                            mr-2
                                            rounded-2xl
                                            transition-all
                                            duration-300
                                            hover:pl-3
                                            ${
                                            selectedUser?.id === user.id
                                                ? "bg-blue-100 pl-3"
                                                : "hover:bg-[rgb(184_189_189/0.2)]"
                                                 }
                                            `}
                                             >
                                        <div
                                            className="flex items-center justify-center w-11 h-11 rounded-full font-medium"
                                            style={{
                                                backgroundColor: user.style,
                                                color: getTextColor(user.style),
                                            }}
                                        >
                                            {user.name[0]}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.name}</span>
                                            <span className="text-gray-500">{user.phone}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                    </div>
                ))}
                 </div>
            </section>
        </>
    )
}

export default Table