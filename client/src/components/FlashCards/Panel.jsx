import Banner from "./Banner";
import Queue from "./Queue";
import DataPanel from "./DataPanel";
import { useState, useEffect } from "react";
import { usePanel } from "../../contexts/panelContext";
import { useUrl } from "../../contexts/urlContext";

export default function Panel({ data }) {
  const { subjectIdParam, handleFlashCardIdParam } = useUrl();
  const [showSolution, setShowSolution] = useState(false);
  const { goToIndex } = usePanel();

  useEffect(() => {
    goToIndex(0);
    setShowSolution(false);
  }, [subjectIdParam]);

  useEffect(() => {
    if (data?.length < 1) {
      handleFlashCardIdParam();
    }
  }, [data?.length < 1]);

  return (
    <div className="flashcards__panel">
      <div className="flashcards__panel_wrapper">
        {subjectIdParam?.length > 0 && (
          <Banner
            data={data}
            isData={data?.length > 0}
            showSolution={showSolution}
            setShowSolution={setShowSolution}
          />
        )}
        {data?.length > 1 && subjectIdParam?.length > 0 && (
          <Queue data={data} setShowSolution={setShowSolution} />
        )}
      </div>
      {subjectIdParam?.length > 0 && <DataPanel isData={data?.length > 0} />}
    </div>
  );
}
