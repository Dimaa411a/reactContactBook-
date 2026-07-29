import type {User} from "../App.tsx";
import sortUsers from "../utils/sortUsers.ts"

interface tableProps {
    users: User[]
}

function Table( {users}: tableProps){

    const {sortedUsers,firstLetters} = sortUsers(users)

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

                        ">
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
                    <div className={"column"} key={letter}>

                        <h2>{letter}</h2>

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
                                        hover:bg-[rgb(184_189_189/0.2)]
                                         transition duration-300"
                                    >
                                        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-200">
                                            {user.name[0]}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.name}</span>
                                            <span>{user.phone}</span>
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