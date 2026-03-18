import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import { Input } from "@nextui-org/react";
import { Button, ConfirmPopup } from "../../components";

function UpdateNotice() {
  const token = sessionStorage.getItem("aivle19_token");
  const { noticeId } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState(
    location.state !== null ? location.state.title : "",
  );
  const [content, setContent] = useState(
    location.state !== null ? location.state.content : "",
  );
  const [isCancelOpen, setIsCancleOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const nav = useNavigate();

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onContentHandler = (value) => {
    setContent(value);
  };

  const onDropHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/board/image-upload/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const imageUrl = response.data.image_url;

      const newContent = `${content}![Alt text](${import.meta.env.VITE_API_URL + imageUrl})`;
      setContent(newContent);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let req = {
      title: title,
      content: content,
    };

    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `/notice/${noticeId}/`,
        req,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("update notice successful");
      nav(`/notice/${noticeId}`);
    } catch (error) {
      console.error("udpate notice error:", error);
    }
  };

  const onCancelHandler = () => {
    nav(`/notice/${noticeId}`);
  };

  return (
    <div data-color-mode="light" className="p-5">
      <div
        className="w-1/2 flex flex-col gap-4"
        style={{ paddingBottom: "50px" }}
      >
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            value={title}
            onChange={onTitleHandler}
            style={{ fontSize: "35px" }}
            type="text"
            variant="underlined"
            placeholder="제목을 입력하세요"
          />
        </div>
      </div>

      <div
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const files = e.dataTransfer.files;
          if (files && files.length > 0) {
            onDropHandler(files);
          }
        }}
      >
        <MDEditor
          height="60vh"
          value={content}
          onChange={onContentHandler}
          style={{ whiteSpace: "pre-wrap" }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          onDrop={(files) => onDropHandler(files)}
        />
      </div>

      <div className="flex flex-wrap gap-4 pt-5 justify-end">
        <>
          <Button onClick={() => setIsCancleOpen(true)} mode="cancle">
            취소
          </Button>
          {isCancelOpen && (
            <ConfirmPopup
              onCancle={() => setIsCancleOpen(false)}
              onConfirm={onCancelHandler}
              title="공지 수정 취소"
              message="공지 수정을 취소하시겠습니까?"
            />
          )}
        </>
        <>
          <Button onClick={() => setIsSaveOpen(true)}>저장</Button>
          {isSaveOpen && (
            <ConfirmPopup
              onCancle={() => setIsSaveOpen(false)}
              onConfirm={onSubmitHandler}
              title="공지 수정"
              message="변경된 내용을 저장하시겠습니까?"
            />
          )}
        </>
      </div>
    </div>
  );
}

export default UpdateNotice;
