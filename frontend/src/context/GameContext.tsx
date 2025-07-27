import React, { createContext, useState, useContext, useEffect } from "react";

type GameContextType = {
  gameStage: number;
  setGameStage: (stage: number) => void;
  internetBroken: boolean;
  setInternetBroken: (isBroken: boolean) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameStage, setGameStage] = useState<number>(0);
  const [internetBroken, setInternetBroken] = useState<boolean>(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setGameStage(i);
      console.log("Setting gameStage to", i);
      i++;
      if (i > 7) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    console.log("gameStage updated:", gameStage);
  }, [gameStage]);
  return (
    <GameContext.Provider
      value={{ gameStage, setGameStage, internetBroken, setInternetBroken }}
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
