import type {User} from "../App.tsx";
import sortUsers from "../utils/sortUsers.ts"
import getTextColor from "../utils/textColor.ts";
import {useState} from "react";

interface tableProps {
    users: User[],
    addUser: (user: { name: string; phone: string; email: string; note: string; style: string }) => void,
}

function Table( {users , addUser}: tableProps  ){

    const {sortedUsers,firstLetters} = sortUsers(users)

    const [isModalOpen ,setIsModalOpen] = useState(false);

    const [color,setColor] = useState("#87CEEB");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [style, setStyle] = useState("#87CEEB");


    function handleSave() {
        addUser({
            name,
            phone,
            email,
            note,
            style,
        });

        setName("");
        setPhone("");
        setEmail("");
        setNote("");
        setStyle("#87CEEB");

        setIsModalOpen(false);
    }


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
                    onClick={()=>setIsModalOpen(!isModalOpen)}
                    >
                        + Add contact
                    </button>
                </div>
            </div>
            <div className={"flex flex-col mt-4"}>
                <label  htmlFor="search">Search contacts</label>
                <input className="bg-white h-10 rounded-2xl pl-2 "  id="search" type="search" placeholder="Search name, phone, or email"/>
            </div>
            </header>
                <div className="overflow-y-auto mt-4 p-4">
                {firstLetters.map(letter => (

                    <div key={letter}>

                        <h2 className={"font-medium text-gray-600"}>{letter}</h2>

                        <ul className="pl-4">
                            {sortedUsers
                                .filter(user => user.name[0].toUpperCase() === letter)
                                .map(user => (

                                    <li
                                        key={user.id}
                                        className="flex
                                        items-center
                                        gap-3
                                         p-2
                                         mr-2
                                         rounded-2xl
                                         transition-all
                                        duration-400
                                        hover:bg-[rgb(184_189_189/0.2)]
                                          hover:pl-3">
                                        <div className="flex items-center justify-center w-11 h-11 rounded-full font-medium color"
                                             style={{backgroundColor : user.style,
                                                    color:getTextColor(user.style)
                                                }}
                                        >
                                            {user.name[0]}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.name}</span>
                                            <span className={"text-gray-500"}>{user.phone}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                    </div>
                ))}
                 </div>
            </section>
            {isModalOpen && (
                <div
                    className="
            fixed inset-0
            bg-black/50
            flex items-center justify-center
        "
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="
                bg-white
                rounded-2xl
                p-6
                w-[500px]
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Add contact
                        </h2>

                        <input
                            className="border w-full p-2 rounded mb-3"
                            placeholder="Name"

                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="border w-full p-2 rounded mb-3"
                            placeholder="Phone"

                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            className="border w-full p-2 rounded mb-4"
                            placeholder="Email"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="border w-full p-2 rounded mb-4"
                            placeholder="Note"

                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Avatar color
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-12 h-12 cursor-pointer rounded"
                                />

                                <input
                                    type="text"
                                    value={color}
                                    readOnly
                                    className="border flex-1 p-2 rounded"
                                />
                            </div>
                        </div>


                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white"
                                onClick={() => handleSave()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Table