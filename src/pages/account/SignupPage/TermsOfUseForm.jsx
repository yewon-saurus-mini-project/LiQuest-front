import { useState } from "react";
import TermsDetails from "./Terms";
import termsOfUseData from "./termsOfUseData.json";
import { Button } from "../../../components";

const TermsOfUseForm = ({ setShowSignupForm }) => {
  const [agreedToTerms1, setAgreedToTerms1] = useState(false);
  const [agreedToTerms2, setAgreedToTerms2] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [confirmation1, setConfirmation1] = useState(false);
  const [confirmation2, setConfirmation2] = useState(false);
  const termsOfUse = termsOfUseData;

  const handleAgreeToTerms = (setAgreed, setShowModal, setConfirmation) => {
    setAgreed((prevAgreed) => !prevAgreed);
    setShowModal(false);
    setConfirmation((prevConfirmation) => !prevConfirmation);
  };

  const handleModalClick1 = (e) => {
    if (e.target.id === "modal") {
      handleHideModal1();
    }
  };

  const handleShowModal1 = () => {
    setShowModal1(true);
  };
  const handleHideModal1 = () => {
    setShowModal1(false);
  };
  const handleAgreeToTerms1 = () => {
    handleAgreeToTerms(setAgreedToTerms1, setShowModal1, setConfirmation1);
  };

  const handleModalClick2 = (e) => {
    if (e.target.id === "modal") {
      handleHideModal2();
    }
  };
  const handleShowModal2 = () => {
    setShowModal2(true);
  };
  const handleHideModal2 = () => {
    setShowModal2(false);
  };
  const handleAgreeToTerms2 = () => {
    handleAgreeToTerms(setAgreedToTerms2, setShowModal2, setConfirmation2);
  };

  const handleAgreeAll = () => {
    if (!allAgreed) {
      setAgreedToTerms1(true);
      setAgreedToTerms2(true);
      setAllAgreed(true);
    } else {
      setAgreedToTerms1(false);
      setAgreedToTerms2(false);
      setAllAgreed(false);
    }
  };

  const handleNextButtonClick = () => {
    if (agreedToTerms1 && agreedToTerms2) {
      setShowSignupForm(true);
    }
  };

  const CheckBox = ({ checked, handleCheck }) => {
    return (
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          className="appearance-none outline-none w-[30px] h-[30px] border-2 border-[var(--color-primary-500)] rounded-[5px] cursor-pointer mr-[10px] relative checked:bg-[var(--color-primary-500)] checked:border-[var(--color-primary-500)]"
        />
        <span className="absolute w-[30px] h-[30px] flex items-center justify-center text-white pointer-events-none peer-checked:flex">
          ✓
        </span>
      </label>
    );
  };

  const Modal = ({
    children,
    handleModalClick,
    checked,
    handleCheck,
    confirmation,
  }) => {
    return (
      <div
        id="modal"
        onClick={handleModalClick}
        className="fixed top-0 left-0 px-10 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
      >
        <div className="relative bg-white p-[20px] rounded-[10px] max-h-[70%] lg:w-[80%] w-full overflow-y-auto">
          {children}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label className="mt-4">
              <CheckBox checked={checked} handleCheck={handleCheck} />
              {!confirmation ? "동의 하시겠습니까?" : "동의 하셨습니다."}
            </label>
          </div>
        </div>
      </div>
    );
  };

  const Table = ({ termsOfUse }) => {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-center border border-[#ddd] p-[8px]">목적</th>
            <th className="text-center border border-[#ddd] p-[8px]">항목</th>
            <th className="text-center border border-[#ddd] p-[8px]">
              보유기간
            </th>
          </tr>
        </thead>
        <tbody>
          {termsOfUse.map((item, index) => (
            <tr key={index}>
              <td className="text-justify border border-[#ddd] p-[8px]">
                {item.목적}
              </td>
              <td className="text-justify border border-[#ddd] p-[8px]">
                {item.항목}
              </td>
              <td className="text-justify border border-[#ddd] p-[8px]">
                {item.보유기간}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="items-center justify-center flex flex-col w-full m-auto p-2">
      <div className="lg:w-[400px] w-full grid grid-rows-5 grid-flow-col lg:gap-4 gap-2 items-center">
        <h1 className="text-center">LiQuest 서비스 약관에 동의해 주세요.</h1>
        <div className="flex flex-wrap ">
          <Button onClick={handleAgreeAll} isLong={true}>
            {allAgreed ? "전체 동의 해제" : "모두 동의"}
          </Button>
        </div>
        <div className="items-center grid grid-cols-[12%_88%]">
          <CheckBox
            checked={agreedToTerms1}
            handleCheck={handleAgreeToTerms1}
          />
          <Button
            onClick={handleShowModal1}
            isLong={true}
            customStyle={`${agreedToTerms1 ? "bg-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white" : "bg-gray-400 hover:bg-[var(--color-primary-500)]"}`}
          >
            LiQuest 이용약관 (필수)
          </Button>
        </div>
        {showModal1 && (
          <Modal
            handleModalClick={handleModalClick1}
            checked={agreedToTerms1}
            handleCheck={handleAgreeToTerms1}
            confirmation={confirmation1}
          >
            <TermsDetails />
          </Modal>
        )}
        <div className="items-center grid grid-cols-[12%_88%]">
          <CheckBox
            checked={agreedToTerms2}
            handleCheck={handleAgreeToTerms2}
          />
          <Button
            onClick={handleShowModal2}
            isLong={true}
            customStyle={`${agreedToTerms2 ? "bg-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white" : "bg-gray-400 hover:bg-[var(--color-primary-500)]"}`}
          >
            개인정보 수집 및 이용 동의 (필수)
          </Button>
        </div>
        {showModal2 && (
          <Modal
            handleModalClick={handleModalClick2}
            checked={agreedToTerms2}
            handleCheck={handleAgreeToTerms2}
            confirmation={confirmation2}
          >
            <Table termsOfUse={termsOfUse} />
          </Modal>
        )}
        <div className="flex flex-wrap">
          <Button
            onClick={handleNextButtonClick}
            isLong={true}
            customStyle={`${
              agreedToTerms1 && agreedToTerms2
                ? "bg-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white transition ease-in-out duration-300"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!agreedToTerms1 || !agreedToTerms2}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseForm;
