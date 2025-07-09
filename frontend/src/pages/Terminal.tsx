import { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import "./Terminal.css";
import { Box } from "@mui/material";

type CommandKey = "help" | "about" | "leaks" | "join";

const Terminal = () => {
  const [lines, setLines] = useState([
    "Welcome to Elite Cyber Overlords Terminal",
    "Type 'help' for a list of commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Auto focus input when component mounts
    inputRef.current !== null && inputRef.current.focus();
  }, [lines]);

  const commands: Record<CommandKey, () => string[]> = {
    help: () => [
      "Available commands:",
      "  help       - Show this help message",
      "  about      - About Elite Cyber Overlords",
      "  leaks      - Show latest leaks",
      "  join       - How to join us",
      "  clear      - Clear the terminal",
    ],
    about: () => [
      "We’re a totally legitimate hacking collective.",
      "We hack the planet, one fake exploit at a time.",
    ],
    leaks: () => [
      "Latest leaks:",
      "- Leaked the source code to 'Hello World' — world shaken.",
      "- Compromised grandma’s cookie jar. Sweet success.",
      "- Injected memes into the Matrix. Reality destabilizing.",
    ],
    join: () => [
      "Wanna be a keyboard ninja?",
      "Just bring snacks and questionable morals.",
      "Recruitment currently open.",
    ],
  };

  const isCommandKey = (cmd: string): cmd is CommandKey => {
    return cmd in commands;
  };

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) => [...prev, `> ${cmd}`]);

    if (isCommandKey(cmd)) {
      setLines((prev) => [...prev, ...commands[cmd](), ""]);
    } else {
      setLines((prev) => [
        ...prev,
        `'${cmd}' is not recognized as a command.`,
        "",
      ]);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <Modal
      open={true}
      onClick={() => inputRef.current !== null && inputRef.current.focus()}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="output">
        <div>
          {lines.map((line, idx) => (
            <div key={idx} className="line">
              {line}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="input-form">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <span className="cursor" />
        </form>
      </Box>
    </Modal>
  );
};

export default Terminal;
