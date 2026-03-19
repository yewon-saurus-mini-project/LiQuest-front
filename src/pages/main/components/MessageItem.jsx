import { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  changeAiTalking,
  updateStep,
  updateMessages,
  updateWritingWords,
  addWritingWord,
} from "../../../redux/modules/quiz";
import httpRequest from "../../../network/request";

const MessageItem = ({ message, quizId }) => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.quiz.step);
  const studySentence = useSelector((state) => state.quiz.studySentence);
  const writingWords = useSelector((state) => state.quiz.writingWords);

  const [imgFile, setImageFile] = useState("");
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);

  const imgRef = useRef();

  useEffect(() => {
    if (writingWords.length >= 2) setDisabled(false);
    else setDisabled(true);
  }, [writingWords]);

  const handleSaveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
    // console.log(file);
    // TODO: 이미지 파일도 불러올 수 있도록, 서버에 이미지 파일 전송 및 저장되도록 처리하면 더 아름다울 것 같다.
  };

  const handleSubmitImgFile = async () => {
    // TODO: OCR 모듈 request, response에 따라 재시도 하도록 유도하거나 통과 처리 할 수 있도록 조치할 것
    dispatch(
      updateMessages({
        text: `제출 완료`,
        isUser: true,
        id: Date.now(),
        step: step,
      }),
    );
    dispatch(changeAiTalking(true));

    dispatch(
      updateMessages({
        text: `확인 중입니다.`,
        isUser: false,
        id: Date.now(),
        step: step,
      }),
    );
    const response = checkWithOCR();
    if ((await response).status === 200 || (await response).status === 201) {
      const textResults = (await response).data.text_results;
      dispatch(
        updateMessages({
          text: `인식 결과는 다음과 같습니다:\n\n${textResults.map((ele) => ele).join(" ")}`,
          isUser: false,
          id: Date.now(),
          step: step,
        }),
      );
      const gradingResult = (await response).data.answer;
      // 채점 결과 좋으면 301, 채점 결과 별로면 202
      if (gradingResult) dispatch(updateStep(301));
      else dispatch(updateStep(202));
    }
  };

  const handleSubmitAudioFile = async () => {
    dispatch(
      updateMessages({
        text: `제출 완료`,
        isUser: true,
        id: Date.now(),
        step: step,
      }),
    );
    dispatch(changeAiTalking(true));

    dispatch(
      updateMessages({
        text: `확인 중입니다.`,
        isUser: false,
        id: Date.now(),
        step: step,
      }),
    );
    checkWithSTT();
    const response = checkWithSTT();
    if ((await response).status === 200) {
      const textResult = (await response).data.text;
      dispatch(
        updateMessages({
          text: `인식 결과는 다음과 같습니다:\n\n${textResult}`,
          isUser: false,
          id: Date.now(),
          step: step,
        }),
      );
      const gradingResult = (await response).data.answer;
      // 채점 결과 좋으면 303, 채점 결과 별로면 302
      if (gradingResult) dispatch(updateStep(303));
      else dispatch(updateStep(302));
    }
  };

  const handleChangeWritingWords = (checked, item, word) => {
    if (checked) dispatch(addWritingWord({ id: item, word: word }));
    else
      dispatch(
        updateWritingWords(writingWords.filter((ele) => ele.id !== item)),
      );
  };

  const checkWithOCR = async () => {
    const formData = new FormData();
    formData.append("image", imgRef.current.files[0]);
    formData.append("text", studySentence);
    return await httpRequest("POST", `/study/quiz/${quizId}/ocr/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const checkWithSTT = async () => {
    // File 생성자를 사용해 파일로 변환
    const audio = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("text", studySentence);
    return await httpRequest("POST", `/study/quiz/${quizId}/stt/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onRecAudio = () => {
    setDisabled(true);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // 음원 정보를 담은 노드를 생성하거나 음원을 실행/디코딩
    const analyser = audioCtx.createScriptProcessor(0, 1, 1); // 자바스크립트를 통해 음원의 진행 상태에 직접 접근
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여줌
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect(); // 메서드가 호출 된 노드 연결 해제
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
      track.stop();
    });

    media.stop(); // 미디어 캡처 중지
    analyser.disconnect(); // 메서드가 호출 된 노드 연결 해제
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    setDisabled(false);

    return () => {
      // 리소스 해제
      URL.revokeObjectURL(audioUrl);
    };
  };

  const audioPLay = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  if (message.mode === "tts") {
    return (
      <div>
        {message.text}
        <div>
          <audio className="w-[100%]" src={message.audioUrl} controls />
        </div>
      </div>
    );
  } else if (message.mode === "handwriting") {
    return (
      <form>
        <label className="" htmlFor="handwriting">
          (모든 타입의 이미지 파일이 허용됩니다.)
        </label>
        {imgFile && <img src={imgFile} alt="제출된 필기 내용" />}
        <br></br>
        <input
          className=""
          type="file"
          accept="image/*"
          id="handwriting"
          onChange={handleSaveImgFile}
          ref={imgRef}
        />
        {imgFile && (step === 200 || step === 201 || step === 202) && (
          <button
            className="text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full"
            type="button"
            onClick={handleSubmitImgFile}
          >
            제출하기
          </button>
        )}
      </form>
    );
  } else if (message.mode === "reading") {
    return (
      <div>
        <div>
          '말하기' 버튼을 클릭 한 후, 마이크를 통해 음성을 녹음해 보세요. 녹음된
          음성은 '내 녹음 들어보기' 버튼을 클릭해 들어볼 수 있습니다.
        </div>
        <br></br>
        <div>
          이미 녹음된 내용이 있는 상태에서 다시 '말하기' 버튼을 클릭하시면, 기존
          녹음 내용은 삭제되고 새 녹음이 시작됩니다.
        </div>
        <br></br>
        <button
          className="text-sm w-[100%] p-2 border border-[var(--color-primary-500)] rounded-full"
          onClick={onRec ? onRecAudio : offRecAudio}
        >
          {onRec ? "🎤 말하기(녹음 시작)" : "녹음 중지"}
        </button>
        <button
          className={`text-sm mt-2 w-[100%] p-2 border border-[var(--color-primary-500)] rounded-full transition-colors ${disabled ? "bg-gray-200 text-white border-0" : ""}`}
          onClick={audioPLay}
          disabled={disabled}
        >
          내 녹음 들어보기
        </button>
        {audioUrl && (step === 300 || step === 301 || step === 302) && (
          <button
            className="text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full"
            type="button"
            onClick={handleSubmitAudioFile}
          >
            제출하기
          </button>
        )}
      </div>
    );
  } else if (message.mode === "areYouWantToWriting") {
    return (
      <div>
        <div>
          작문 연습은 작문 능력, 어휘, 문법 및 비판적 사고 능력을 향상시키는 데
          도움 되며,
        </div>
        <br></br>
        <div>
          효과적인 작문 연습을 하려면 규칙적인 루틴을 설정하고 수행하는 것이
          중요합니다.
        </div>
        {step === 401 && (
          <div>
            <button
              className="text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full"
              onClick={() => {
                dispatch(updateStep(402));
              }}
            >
              네, 작문하기를 시작합니다.
            </button>
            <button
              className="text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full"
              onClick={() => {
                dispatch(updateStep(501));
              }}
            >
              아니오, 오늘은 이만 마치겠습니다.
            </button>
          </div>
        )}
      </div>
    );
  } else if (message.mode === "writing") {
    const recentLearnedWords = message.recentLearnedWords;

    return (
      <form>
        {recentLearnedWords.map((ele) => (
          <div className="text-lg m-1 p-1 border-b border-[var(--color-primary-500)]">
            {step === 402 && (
              <input
                type="checkbox"
                name="writingWords"
                id={ele.id}
                value={ele.id}
                onChange={(e) => {
                  handleChangeWritingWords(
                    e.target.checked,
                    e.target.id,
                    ele.word,
                  );
                }}
              />
            )}
            <label htmlFor={ele.id}> {ele.word}</label>
          </div>
        ))}
        {step === 402 && (
          <button
            className={`text-sm mt-6 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full ${disabled ? "bg-gray-200 text-white border-0" : ""}`}
            type="button"
            onClick={() => {
              dispatch(updateStep(403));
            }}
            disabled={disabled}
          >
            선택 완료
          </button>
        )}
      </form>
    );
  } else {
    // mode === undefined
    return message.text;
  }
};

export default MessageItem;
