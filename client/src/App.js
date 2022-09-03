import FlashCards from "./components/FlashCards/FlashCards";
import NavBar from "./components/Navbar";
import SubjectBar from "./components/SubjectBar";
import LoadingIcon from "./components/svg/LoadingIcon";
import { useFlashCardsContext } from "./contexts/flashcardContext";
import { PanelProvider } from "./contexts/panelContext";
import "./index.css";

function App() {
  const { loading, error, flashCardData: value } = useFlashCardsContext();

  return (
    <div className="main__container">
      {loading && <LoadingIcon />}
      {error && error}
      <PanelProvider data={value?.flashCards}>
        <NavBar />
        <div className="main__wrapper">
          <SubjectBar />
          <FlashCards />
        </div>
      </PanelProvider>
    </div>
  );
}

export default App;
