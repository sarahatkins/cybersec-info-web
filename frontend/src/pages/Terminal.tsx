import { useState, useRef, useEffect } from "react";
import "./Terminal.css";
import { IonIcon } from "@ionic/react";
import { close, expand } from "ionicons/icons";
import { alaskan_logs, honey_pot_logs } from "../components/db";
type CommandKey =
  | "help"
  | "about"
  | "leaks"
  | "./watchtower --mode honeypot"
  | "./alaskan-security-camera-dvr --mode infectionLogs";

interface TerminalProps {
  isOpen: boolean;
  onClose: any;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState([
    "Welcome to a very fun terminal",
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
    "./watchtower --mode honeypot": () => honey_pot_logs,
    "./alaskan-security-camera-dvr --mode infectionLogs": () => alaskan_logs,
  };

  const isCommandKey = (cmd: string): cmd is CommandKey => cmd in commands;

  const handleCommand = async (cmd: string) => {
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) => [...prev, `>>> ${cmd}`]);

    if (
      cmd === "./watchtower --mode honeypot" ||
      cmd === "./alaskan-security-camera-dvr --mode infectionLogs"
    ) {
      const logs = commands[cmd as CommandKey]();
      await simulateLogOutput(logs, cmd);
    } else if (isCommandKey(cmd)) {
      setLines((prev) => [...prev, ...commands[cmd](), ""]);
    } else {
      setLines((prev) => [
        ...prev,
        `'${cmd}' is not recognized as a command.`,
        "",
      ]);
    }
  };

  const simulateLogOutput = async (logs: string[], cmd: string) => {
    const loadingMessages = [
      "[*] Establishing secure session...",
      "[*] Checking credentials...",
      "[*] Downloading telemetry from remote device...",
      "[*] Loading data into memory...",
      "[+] Starting live stream...",
    ];

    // Print loading messages first
    for (const line of loadingMessages) {
      await new Promise((res) => setTimeout(res, 500));
      setLines((prev) => [...prev, line]);
    }

    // Simulate actual log line-by-line output
    for (const line of logs) {
      await new Promise((res) => setTimeout(res, 150));
      setLines((prev) => [...prev, line]);
    }

    setLines((prev) => [...prev, ""]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
    }
    setInput("");
  };

  useEffect(() => {
    const term = terminalRef.current;
    if (term) {
      term.scrollTop = term.scrollHeight;
    }
  }, [lines]);

  return isOpen ? (
    <div
      className="terminal"
      ref={terminalRef}
      style={{ top: "50px", left: "50px" }}
    >
      <div className="terminal-header" onMouseDown={startDrag}>
        <div className="terminal-controls" />
        <div className="terminal-title">blow/up/internet</div>
        <div className="terminal-actions">
          <IonIcon icon={expand} onClick={() => console.log("Expand")} />
          <IonIcon icon={close} color="danger" onClick={() => onClose(false)} />
        </div>
      </div>

      <div className="output">
        {lines.map((line, idx) => (
          <div key={idx} className="line">
            {line}
          </div>
        ))}

        <form onSubmit={onSubmit} className="line input-line">
          <span className="prompt">file@file-desktop:~$</span>
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
        </form>
      </div>
    </div>
  ) : null;
};

export default Terminal;
