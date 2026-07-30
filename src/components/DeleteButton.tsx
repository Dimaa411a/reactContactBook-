interface DeleteButtonProps {
    onClick: () => void;
    disabled: boolean;
}

function DeleteButton({ onClick }: DeleteButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                flex
                items-center
                justify-center
                w-24
                h-10
                rounded-[10px]
                bg-white
                text-red-500
                border
                border-red-500
                font-medium
                transition-colors
                duration-300
                hover:bg-gray-100
                active:bg-gray-100
            "
        >
            Delete
        </button>
    );
}

export default DeleteButton;