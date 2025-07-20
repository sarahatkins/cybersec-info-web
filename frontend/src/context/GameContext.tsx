import React, { createContext, useState, useContext } from "react";

type GameContextType = {
  gameStage: number;
  setGameStage: (stage: number) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameStage, setGameStage] = useState(0);

  return (
    <GameContext.Provider value={{ gameStage, setGameStage }}>
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
