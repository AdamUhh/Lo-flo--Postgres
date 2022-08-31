import FlashCards from "./components/FlashCards/FlashCards";
import NavBar from "./components/Navbar";
import SubjectBar from "./components/SubjectBar";
import { useFlashCardsContext } from "./contexts/flashcardContext";
import { PanelProvider } from "./contexts/panelContext";

function App() {
  const { loading, error, flashCardData: value } = useFlashCardsContext();

  return (
    <div className="main__container">
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
