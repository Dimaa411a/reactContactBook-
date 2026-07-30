import type { User } from "../App";

interface UserInfoProps {
    user: User | null;
}

function UserInfo({ user }: UserInfoProps) {
    if (!user) {
        return null;
    }

    return (
        <section
            className="
                w-[90%]
                justify-self-center
                rounded-2xl
                border
                border-gray-300
                p-6
            "
        >
            <div className="flex flex-col w-full">

                <div className="flex w-full items-center min-h-12 border-b border-gray-200">
                    <span className="w-24 shrink-0 font-medium text-gray-500">
                        PHONE:
                    </span>

                    <span>{user.phone}</span>
                </div>

                <div className="flex w-full items-center min-h-12 border-b border-gray-200">
                    <span className="w-24 shrink-0 font-medium text-gray-500">
                        EMAIL:
                    </span>

                    <span>{user.email}</span>
                </div>

                <div className="flex w-full items-start min-h-12 py-3">
                    <span className="w-24 shrink-0 font-medium text-gray-500">
                        NOTE:
                    </span>

                    <span>{user.note}</span>
                </div>

            </div>
        </section>
    );
}

export default UserInfo;