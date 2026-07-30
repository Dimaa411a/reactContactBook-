import type { User } from "../App";
import getTextColor from "../utils/textColor";

interface UserProfileProps {
    user: User | null;
}

function UserProfile({ user }: UserProfileProps) {
    if (!user) {
        return (
            <section className="ml-11">
                <h2 className="text-gray-500 text-xl">
                    Select a contact
                </h2>
            </section>
        );
    }

    return (
        <section className="ml-11">
            <header>
                <div className="flex">
                    <div
                        className="flex w-32 h-32 rounded-full items-center justify-center text-5xl font-medium"
                        style={{
                            backgroundColor: user.style,
                            color: getTextColor(user.style),
                        }}
                    >
                        {user.name[0]}
                    </div>

                    <div className="self-center ml-4">
                        <h1 className="mb-4 text-3xl font-bold">
                            {user.name}
                        </h1>

                        <span className="text-gray-500">
                            Contact details
                        </span>
                    </div>
                </div>
            </header>
        </section>
    );
}

export default UserProfile;