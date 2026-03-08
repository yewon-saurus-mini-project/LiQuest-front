import { useState } from "react";
import SignupForm from "./SignupForm";
import Description from "../LoginPage/Description";
import TermsOfUseForm from "./TermsOfUseForm";

function SignupPage() {
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div className="pt-[63px] min-h-screen h-fit">
      <section
        style={{
          width: "100%",
          height: "calc(100vh - 63px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-1">
          <Description />
          {showSignupForm ? (
            <SignupForm />
          ) : (
            <TermsOfUseForm setShowSignupForm={setShowSignupForm} />
          )}
        </div>
      </section>
    </div>
  );
}

export default SignupPage;
