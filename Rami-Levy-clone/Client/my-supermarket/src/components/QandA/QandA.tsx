import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import arrow icons

interface QandAProps {
  qAndA: {
    qId: number | undefined;
    q: string;
    a: string;
  };
}

const QandA: React.FC<QandAProps> = ({ qAndA }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<boolean>(false);

  const handleQuestionClick = () => {
    setExpandedQuestion(!expandedQuestion);
  };

  return (
    <div>
      <div key={qAndA.qId}>
        <h2 onClick={() => handleQuestionClick()}>
          {qAndA.q} {expandedQuestion ? <FaChevronUp /> : <FaChevronDown />}
        </h2>
        {expandedQuestion && <p>{qAndA.a}</p>}
      </div>
    </div>
  );
};

export default QandA;
