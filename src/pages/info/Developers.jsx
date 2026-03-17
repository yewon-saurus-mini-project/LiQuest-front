import useScrollNextSection from "../../hooks/useScrollNextSection.js";
import InfoItem from "./InfoItem.jsx";
import styles from "./style.module.css";

import Developer1 from "./developersProfile/Kiruchoco.jpg";
import Developer2 from "./developersProfile/mingweon.png";
import Developer3 from "./developersProfile/yewon-saurus.png";
import Developer4 from "./developersProfile/koeyhnujeel.png";
import Developer5 from "./developersProfile/6eom9eun.png";
import Developer6 from "./developersProfile/hyunsu01.jpg";
import Developer7 from "./developersProfile/hdong08.jpg";

const developers = [
  {
    image: Developer1,
    name: "홍주성",
    role: "팀장 & AI 파트장",
    message:
      "생성형 AI 결과가 기대와 달라 어려움을 겪었지만, 많은 것을 배울 수 있었습니다.",
    github: "https://github.com/Kiruchoco",
    part: "AI",
  },
  {
    image: Developer2,
    name: "정민권",
    role: "AI 구현",
    message:
      "OCR, STT, TTS 적용과 오류 해결 과정을 통해 기술과 협업을 깊이 이해했습니다.",
    github: "https://github.com/mingweon",
    part: "AI",
  },
  {
    image: Developer3,
    name: "김예원",
    role: "FE 파트장",
    message:
      "문해력 향상이라는 의미 있는 주제로 챗봇 서비스를 개발하며 큰 동기와 흥미를 느꼈습니다.",
    github: "https://github.com/yewon-saurus",
    part: "FE",
  },
  {
    image: Developer4,
    name: "이준혁",
    role: "FE 구현",
    message:
      "React 경험이 웹 개발 역량 향상에 도움이 되었고, 첫 팀 프로젝트로 좋은 경험이었습니다.",
    github: "https://github.com/koeyhnujeel",
    part: "FE",
  },
  {
    image: Developer5,
    name: "곽범근",
    role: "BE 파트장",
    message: "AI 기반 API와 플랫폼을 직접 구축한 경험이 매우 인상적이었습니다.",
    github: "https://github.com/6eom9eun",
    part: "BE",
  },
  {
    image: Developer6,
    name: "강현수",
    role: "BE 구현",
    message:
      "전체 개발 프로세스를 이해하고 좋은 팀원들과 많은 것을 배웠습니다.",
    github: "https://github.com/hyunsu01",
    part: "BE",
  },
  {
    image: Developer7,
    name: "윤희정",
    role: "BE 구현",
    message:
      "각 파트의 원리를 이해하는 과정이 어려웠지만 많은 성장을 할 수 있었습니다.",
    github: "https://github.com/hdong08",
    part: "BE",
  },
];

const sectionStyle =
  "w-full min-h-screen flex justify-center items-center lg:gap-32";

const DeveloperItem = ({ github, image, name, role, message }) => (
  <div>
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className={styles["developer-box"]}
    >
      <InfoItem
        iconSrc={image}
        title={name}
        describe={
          <>
            <strong>{role}</strong>
            <div className="text-sm text-justify mt-1">{message}</div>
          </>
        }
      />
    </a>
    <p className={styles["speech-bubble"]}>Click and visit my GitHub!</p>
  </div>
);

const DeveloperSection = ({ title, subtitle, part, reverse }) => {
  const filtered = developers.filter((dev) => dev.part === part);

  return (
    <div
      className={`section ${
        part === "AI" || part === "BE"
          ? "bg-[var(--color-primary-400)]"
          : "bg-[var(--color-primary-500)]"
      } ${sectionStyle}`}
    >
      <div
        className={`min-w-[50vh] min-h-[50vh] flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } justify-center items-center lg:gap-20 gap-5`}
      >
        <div
          className={`text-white flex flex-row lg:flex-col ${
            reverse ? "items-start" : "items-end"
          } gap-2 font-['JalnanGothic']`}
        >
          <div className="lg:text-6xl text-4xl">{title}</div>
          <div className="lg:text-4xl text-xl lg:mt-4">{subtitle}</div>
        </div>

        {filtered.map((dev) => (
          <DeveloperItem key={dev.github} {...dev} />
        ))}
      </div>
    </div>
  );
};

const Developers = () => {
  useScrollNextSection();

  return (
    <>
      {/* Intro Section */}
      <div
        className={`section bg-[var(--color-primary-500)] pt-[63px] ${sectionStyle}`}
      >
        <div className="text-white px-4 py-10 font-['JalnanGothic']">
          <div className="mt-10 text-justify">
            <div className="text-4xl lg:text-6xl">AIVLE 19조 개발자들은</div>
            <div className="text-4xl lg:text-6xl mt-2">
              항상 열정으로 개발합니다.
            </div>
            <div className="text-xl font-light mt-4">
              저희 개발자들을 소개합니다.
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <DeveloperSection title="AI" subtitle="인공지능" part="AI" />
      <DeveloperSection title="FE" subtitle="프론트엔드" part="FE" reverse />
      <DeveloperSection title="BE" subtitle="백엔드" part="BE" />
    </>
  );
};

export default Developers;
