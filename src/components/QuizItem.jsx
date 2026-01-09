import { IoChatboxOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const QuizItem = ({ data }) => {
    const {
        quiz_id,
        solved_date,
        word
    } = data;

    return (
        <a className="flex gap-2 text-left mx-3 px-4 py-2 hover:bg-[var(--color-primary-100)] rounded-full"
            href={import.meta.env.VITE_PUBLIC_URL + "/quiz/" + quiz_id}>
            {
                solved_date === null ? (
                    <IoChatboxOutline style={{width: '20px', height: 'auto',}} color="var(--color-primary-500)" />
                ) : (
                    <IoCheckmarkCircleOutline style={{width: '20px', height: 'auto',}} color="var(--color-success-500)" />
                )
            }
            <span className="text-sm truncate w-full">{quiz_id + "회차: " + word}</span>
        </a>
    );
}

export default QuizItem;