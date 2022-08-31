import { useEffect } from "react";
import { useState } from "react";
import { ellipsis } from "../../../util";
import BulbIcon from "../../svg/BulbIcon";
import BulbOffIcon from "../../svg/BulbOffIcon";

export default function Flashcards({ rsf, handleFlashCard, searchSolution }) {
  const [showSolution, setShowSolution] = useState(false);

  function handleSolutionSwitch(e) {
    e.stopPropagation();
    setShowSolution((prev) => !prev);
  }

  useEffect(() => {
    setShowSolution(false);
  }, [searchSolution]);

  return (
    <div className="search_result_flashcard_panel btn" onClick={handleFlashCard}>
      {searchSolution && (
        <div
          className={`search_result_flashcard_bulb btn ${showSolution && "toggled"}`}
          onClick={handleSolutionSwitch}
        >
          {showSolution ? <BulbOffIcon /> : <BulbIcon />}
        </div>
      )}
      <div className="search_result_flashcard_title ">
        {ellipsis(searchSolution && showSolution && rsf?.solution ? rsf.solution : rsf.question, 150)}
      </div>
    </div>
  );
}
