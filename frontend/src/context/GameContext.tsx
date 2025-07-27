import React, { createContext, useState, useContext, useEffect } from "react";

type GameContextType = {
  gameStage: number;
  setGameStage: (stage: number) => void;
  internetBroken: boolean;
  setInternetBroken: (isBroken: boolean) => void;
  newMessage:boolean;
  setNewMessage: (newMessage: boolean) => void;
  newEmail:boolean;
  setNewEmail: (newEmail: boolean) => void;
  gameFinished:boolean;
  setGameFinished: (finished: boolean) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameStage, setGameStage] = useState<number>(0);
  const [internetBroken, setInternetBroken] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(true);

// useEffect(() => {
//   let i = 0;
//   const interval = setInterval(() => {
//     setGameStage(i);
//     console.log("Setting gameStage to", i);
//     i++;
//     if (i > 7) clearInterval(interval);
//   }, 500);
//   return () => clearInterval(interval);
// }, []);
// useEffect(() => {
//   console.log("gameStage updated:", gameStage);
// }, [gameStage]);
  return (
    <GameContext.Provider
      value={{ gameStage, setGameStage, internetBroken, setInternetBroken, newMessage, setNewMessage,newEmail, setNewEmail, gameFinished, setGameFinished }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
