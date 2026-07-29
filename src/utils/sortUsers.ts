import type {User} from "../App.tsx";

function sortUsers (users : User[]) {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

    const firstLetters = [...new Set(sortedUsers.map((u) => u.name[0].toUpperCase()))];

    return {sortedUsers ,firstLetters}
}

export default sortUsers