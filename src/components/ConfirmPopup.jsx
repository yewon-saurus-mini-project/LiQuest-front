import Button from "./Button";

function ConfirmPopup({
    onOpenAlert,
    onConfirm,
    title,
    message
}) {
    const onClickConfirm = () => {
        onOpenAlert();
        onConfirm();
    }

    return (
        <div className={`popup z-50 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center`}>
            <div className="bg-white rounded w-10/12 md:w-1/3">
                <div className="border-b p-4 flex justify-between items-center">
                    <h3 className="font-extrabold text-2xl">{title}</h3>
                </div>
                <div className="text-gray-800 text-lg px-4 py-8 text-justify">
                    {message}
                </div>
                <div className="flex justify-between items-center w-100 border-t p-4 text-gray-500">
                    <Button mode="cancle" onClick={onOpenAlert}>취소</Button>
                    <Button mode="primary"onClick={onClickConfirm}>확인</Button>
                </div>
            </div>
        </div >
    );
}

export default ConfirmPopup;