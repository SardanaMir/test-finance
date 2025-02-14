import MainPage from "./pages/Main/MainPage";
import ToastWrapper from "./components/ToastWrapper/ToastWrapper";
import { ModalProvider } from "./hooks/useModal";
import "./App.css";

function App() {
  return (
    <>
      <ModalProvider>
        <MainPage />
        <ToastWrapper />
      </ModalProvider>
    </>
  );
}

export default App;
