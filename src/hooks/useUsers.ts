import {useEffect, useState} from "react";
import type {User} from "../App.tsx";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {

        async function fetchUsers() {
            const response = await fetch("./users.json")
            const usersData = await response.json();

            setUsers(usersData);

        }
        fetchUsers();
    },[])


    function addUser(user: Omit<User, "id">) {
        setUsers((prev) => [
            ...prev,
            {
                id: Date.now(),
                ...user,
            },
        ]);
    }

    function deleteUser(id: number) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    }

    function editUser(updatedUser: User) {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    }

    return {
        users,
        addUser,
        deleteUser,
        editUser,
    };
}