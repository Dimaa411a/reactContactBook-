import {useEffect, useState} from "react";
import type {User} from "../App.tsx";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("http://localhost:3000/users");

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const usersData = await response.json();
                setUsers(usersData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUsers();
    }, []);


    async function addUser(user: Omit<User, "id">) {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const newUser = await response.json();

        setUsers((prev) => [...prev, newUser]);
    }

    async function deleteUser(id: number) {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        });

        setUsers((prev) => prev.filter((user) => user.id !== id));
    }

    async function editUser(updatedUser: User) {
        const response = await fetch(
            `http://localhost:3000/users/${updatedUser.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            }
        );

        const user = await response.json();

        setUsers((prev) =>
            prev.map((u) => (u.id === user.id ? user : u))
        );
    }

    return {
        users,
        addUser,
        deleteUser,
        editUser,
    };
}