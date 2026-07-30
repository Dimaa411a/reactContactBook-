interface EditButtonProps {
    onClick: () => void;
    disabled: boolean;
}

function EditButton({ onClick, disabled }: EditButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="
                flex
                h-10
                w-24
                items-center
                justify-center
                rounded-[10px]
                border
                border-[#16233B]
                bg-white
                font-bold
                text-[#16233B]
                transition-colors
                duration-300
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
        >
            Edit
        </button>
    );
}

export default EditButton;