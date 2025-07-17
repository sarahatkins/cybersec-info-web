import { useEffect, useRef, useState } from "react";
import "./Window.css";
import {
  lockClosedOutline,
  reloadOutline,
  ellipsisVertical,
  close,
  expand,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import NewsSite from "./WebContentPages/News";
import HackerForum from "./WebContentPages/HackerForum";
import EmailSite from "./WebContentPages/EmailSite/EmailSite";
import HomeSite from "./WebContentPages/Home";
import Home from "./WebContentPages/Home";
import NotFound from "./WebContentPages/NotFound";
import React from "react";

type WindowProps = {
  title: string;
  isOpen: boolean;
  onClose: any;
};

export type WebsiteProps = {
  id: number;
  title: string;
  dns: string;
  ip_address: number;
  icon?: any;
};

const websiteMap: Record<string, React.FC> = {
  "https://home.com": HomeSite,
  "https://hackerforum.com": HackerForum,
  "https://your-emails.com": EmailSite,
  "https://global-news.com": NewsSite,
  "https://unknown-address.com": NotFound,
  // "litespeed-ddos-services.com":
};

const WINDOW_URLS: WebsiteProps[] = [
  {
    id: 3,
    title: "Home",
    dns: "https://home.com",
    ip_address: 0,
  },
  {
    id: 1,
    title: "Hacker Forum",
    dns: "https://hackerforum.com",
    ip_address: 0,
  },
  { id: 2, title: "Email", dns: "your-emails.com", ip_address: 0 },

  {
    id: 4,
    title: "DDoS Services",
    dns: "https://litespeed-ddos-services.com",
    ip_address: 0,
  },
  {
    id: 5,
    title: "Global News",
    dns: "https://global-news.com",
    ip_address: 0,
  },
  {
    id: 6,
    title: "ProTraf Services",
    dns: "https://protraf-services.com",
    ip_address: 0,
  },
];

const Window: React.FC<WindowProps> = ({ isOpen, onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [url, setUrl] = useState(WINDOW_URLS[0].dns);
  const [currentComponent, setCurrentComponent] = useState<React.FC | null>(
    null
  );

  // const normalizeUrl = (url: string) =>
  //   url.replace(/^https?:\/\//, "").toLowerCase();

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    const Component = websiteMap[url.toLowerCase()] || NotFound;
    setCurrentComponent(() => Component);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const bounds = windowRef.current.getBoundingClientRect();
      setRel({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
    setDragging(true);
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    }
  };

  const onMouseUp = () => setDragging(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const FoundComponent = websiteMap[url] || NotFound;

    setCurrentComponent(() => FoundComponent);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  return isOpen ? (
    <div ref={windowRef} className="window" style={{ top: pos.y, left: pos.x }}>
      <div className="fake-browser">
        {/* Tab Bar */}
        <div className="tab-bar" onMouseDown={onMouseDown}>
          <div className="tab active">My Fake Website</div>
          <div>
            <IonIcon
              className="window-tab-btn"
              icon={expand}
              onClick={onClose}
            />
            <IonIcon
              className="window-tab-btn"
              icon={close}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Address Bar */}
        <div className="address-bar">
          <IonIcon icon={lockClosedOutline} className="icon lock" />
          <form onSubmit={handleSearch} className="address-bar">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              spellCheck={false}
              className="url-input"
            />
          </form>
          <IonIcon
            icon={reloadOutline}
            className="icon reload"
            onClick={() => alert("Refreshing!")}
          />
          <IonIcon icon={ellipsisVertical} className="icon menu" />
        </div>

        {/* Content */}
        <div className="page-content">
          {currentComponent ? React.createElement(currentComponent) : <Home />}
          {/* <LiteSpeed /> */}
        </div>
      </div>
    </div>
  ) : null;
};

export default Window;
