
type Props = {
    content: string;
    onDelete: () => void;
}

const DeleteAlert = ({ content, onDelete }: Props) => {
    return (
        <div>
            <p className='text-sm'>{content}</p>

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn add-btn-fill' onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;