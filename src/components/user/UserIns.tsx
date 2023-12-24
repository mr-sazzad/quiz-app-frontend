import React from "react";

const Instruction = () => {
  return (
    <div>
      <h2 className="text-5xl font-bold mt-20 mb-8 text-center">
        Instruction_
      </h2>
      <div className="flex md:flex-row flex-col gap-5">
        <div className="p-5 border border-gray-400 rounded">
          <ul>
            <li className="mb-3">
              <p>
                {" "}
                <span className="text-lg font-medium">
                  - **Sign In First**:
                </span>{" "}
                Make sure you sign in to your account. This is needed to join
                the quiz.{" "}
              </p>
            </li>

            <li>
              <p>
                {" "}
                <span className="text-lg font-medium">
                  - **Complete in One Go**:
                </span>{" "}
                Try to finish the quiz without stopping. We won&apos;t save your
                answers until you submit them at the end.
              </p>
            </li>
          </ul>
        </div>
        <div className="p-5 border border-gray-400 rounded">
          <ul>
            <li className="mb-3">
              <p>
                {" "}
                <span className="text-lg font-medium">
                  - **Answer Carefully**:
                </span>{" "}
                Some questions might have more than one correct answer. Take
                your time to think about each answer.{" "}
              </p>
            </li>

            <li>
              <p>
                {" "}
                <span className="text-lg font-medium">
                  - **Submitting Your Answers**:
                </span>{" "}
                When you`&apos;re finished, submit your answers. We`&apos;ll
                then update your score and let you know how you did.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
