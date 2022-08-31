import { useState } from "react";
import { usePanel } from "../../../contexts/panelContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { searchCards } from "../../../services/cards";
import LoadingIcon from "../../svg/LoadingIcon";
import Flashcards from "./Flashcards";

const CheckBox = ({ label, value, onChange, disable }) => {
  return (
    <label className={`${disable ? "crossout" : ""}`}>
      <input className="search_checkbox" type="checkbox" checked={value} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
};

export default function SearchModal({ handleModalOpen }) {
  const [searchInput, setSearchInput] = useState("");

  const { handleCardIdParam, handleSubjectIdParam } = useUrl();
  const { goToIndex } = usePanel();
  const { loading, error, execute: searchCardsFn } = useAsyncFn(searchCards);
  const [filters, setFilters] = useState({
    Card: true,
    Subject: true,
    FlashCard: true,
    Solution: false,
  });
  const [result, setResult] = useState();

  function handleSearch(e) {
    e.preventDefault();
    return searchCardsFn({ searchInput, ...filters }).then((result) => {
      setResult(result);
    });
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  const handleChange = (e) => {
    const handle = e.target.labels[0].childNodes[1].innerText;
    switch (handle) {
      // case "Card":
      //   setFilters((prevState) => ({
      //     ...prevState,
      //     Card: !prevState.Card,
      //     Subject: false,
      //     FlashCard: false,
      //   }));
      //   break;
      case "Subject":
        setFilters((prevState) => ({ ...prevState, Subject: !prevState.Subject, FlashCard: false }));
        break;
      case "FlashCard":
        if (!filters.Subject)
          setFilters((prevState) => ({ ...prevState, Subject: true, FlashCard: !prevState.FlashCard }));
        else setFilters((prevState) => ({ ...prevState, FlashCard: !prevState.FlashCard }));
        break;
      case "Solution":
        if (filters.FlashCard) setFilters((prevState) => ({ ...prevState, Solution: !prevState.Solution }));
        break;
      default:
        break;
    }
  };
  function handleCard(cardId) {
    handleCardIdParam(cardId);
    handleModalOpen();
  }
  function handleSubject(e, cardId, subjectId) {
    e.stopPropagation();
    handleCardIdParam(cardId);
    handleSubjectIdParam(subjectId);
    goToIndex();
    handleModalOpen();
  }
  function handleFlashCard(e, cardId, subjectId, indx) {
    e.stopPropagation();
    handleCardIdParam(cardId);
    handleSubjectIdParam(subjectId);
    goToIndex(indx);
    handleModalOpen();
  }

  return (
    <div className="search__container">
      <div className="search_wrapper">
        <form onSubmit={handleSearch}>
          <div className="search_wrapper_flex">
            <input
              type="text"
              className="search_input"
              value={searchInput}
              onChange={handleSearchInput}
              autoFocus
              placeholder="🔎 Search"
            />
            <button className="btn" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="search_checkbox_container">
          {Object.keys(filters).map((cb) => (
            <CheckBox
              key={cb}
              label={cb}
              value={filters[cb]}
              onChange={handleChange}
              disable={(filters.FlashCard !== true && cb === "Solution") || cb === "Card"}
            />
          ))}
        </div>
      </div>
      <div className="search_result_container">
        {loading ? (
          <LoadingIcon />
        ) : error ? (
          error
        ) : (
          result?.map((r) => (
            <div key={r.id} className="search_result_wrapper" onClick={() => handleCard(r.id)}>
              <div className="search_result_title">{r.title}</div>
              {filters.Subject && (
                <div className={`search_result_subject_container ${filters.FlashCard ? "" : "subjOnly"}`}>
                  {r?.subjects?.map((rs) => (
                    <div key={rs.id} className="search_result_subject_wrapper">
                      <span
                        className="search_result_subject_title btn"
                        onClick={(e) => handleSubject(e, r.id, rs.id)}
                      >
                        {rs.title}
                      </span>
                      {filters.FlashCard && (
                        <div className="search_result_flashcard_wrapper ">
                          {rs?.flashCards?.map((rsf, indx) => (
                            <Flashcards
                              key={rsf.id}
                              rsf={rsf}
                              handleFlashCard={(e) => handleFlashCard(e, r.id, rs.id, indx)}
                              searchSolution={filters.Solution}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
