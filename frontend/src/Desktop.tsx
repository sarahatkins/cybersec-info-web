import Terminal from "./pages/Terminal";
import "./Desktop.css";
import Toolbar from "./components/Toolbar";
import Window from "./pages/Web/Window";
import { useState } from "react";
import Chatroom from "./pages/Chatroom/ChatApp";
import GameMaster from "./components/GameMaster";
import { useGame } from "./context/GameContext";
import GameEndWidget from "./GameEnd";
import Login from "./Login";

export default function FakeDesktop() {
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [webOpen, setWebOpen] = useState<boolean>(true);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const { gameFinished, setGameStage, setGameFinished } = useGame();

  return !loggedIn ? (
    <Login onLogin={() => setLoggedIn(true)} />
  ) : (
    <div className="desktop-view">
      <GameMaster />
      {!gameFinished ? (
        <>
          <Terminal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />
          <Window isOpen={webOpen} onClose={() => setWebOpen(false)} />
          <Chatroom isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        </>
      ) : (
        <GameEndWidget
          onRestart={() => {
            setLoggedIn(false);
            setGameStage(0);
            setGameFinished(false);
          }}
        />
      )}
      <Toolbar
        openTerminal={() => setTerminalOpen(true)}
        openWeb={() => setWebOpen(true)}
        openChat={() => setChatOpen(true)}
        logout={() => setLoggedIn(false)}
      />
    </div>
  );
}
