import FlashCards from "./components/FlashCards/FlashCards";
import NavBar from "./components/Navbar";
import SubjectBar from "./components/SubjectBar";
import { CardProvider } from "./contexts/cardContext";
import { FlashCardProvider } from "./contexts/flashcardContext";
import { SubjectProvider } from "./contexts/subjectContext";
import { UrlProvider } from "./contexts/urlContext";

function App() {
  return (
    <div className="main__container">
      <UrlProvider>
        <CardProvider>
          <SubjectProvider>
            <FlashCardProvider>
              <NavBar />
              <div className="main__wrapper">
                <SubjectBar />
                <FlashCards />
              </div>
            </FlashCardProvider>
          </SubjectProvider>
        </CardProvider>
      </UrlProvider>
    </div>
  );
}

export default App;
