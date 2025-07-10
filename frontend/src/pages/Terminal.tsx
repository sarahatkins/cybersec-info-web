import { useState, useRef, useEffect } from "react";
import "./Terminal.css";

type CommandKey = "help" | "about" | "leaks" | "join";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState([
    "Welcome to Elite Cyber Overlords Terminal",
    "Type 'help' for a list of commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Drag logic
  const terminalRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 50, y: 50, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const startDrag = (e: React.MouseEvent) => {
    const term = terminalRef.current;
    if (!term) return;

    pos.current.offsetX = e.clientX - term.offsetLeft;
    pos.current.offsetY = e.clientY - term.offsetTop;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  const drag = (e: MouseEvent) => {
    const x = e.clientX - pos.current.offsetX;
    const y = e.clientY - pos.current.offsetY;
    pos.current.x = x;
    pos.current.y = y;
    const term = terminalRef.current;
    if (term) {
      term.style.left = `${x}px`;
      term.style.top = `${y}px`;
    }
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  };

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

  const isCommandKey = (cmd: string): cmd is CommandKey => cmd in commands;

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) => [...prev, `> ${cmd}`]);

    if (isCommandKey(cmd)) {
      setLines((prev) => [...prev, ...commands[cmd](), ""]);
    } else {
      setLines((prev) => [...prev, `'${cmd}' is not recognized as a command.`, ""]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
    }
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="terminal" ref={terminalRef} style={{ top: "50px", left: "50px" }}>
      <div className="terminal-header" onMouseDown={startDrag}>
        <span className="terminal-title">Elite Cyber Terminal</span>
        <button className="terminal-close" onClick={onClose}>X</button>
      </div>

      <div className="output">
        {lines.map((line, idx) => (
          <div key={idx} className="line">{line}</div>
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
    </div>
  );
};

export default Terminal;
