import { useEffect, useRef, useState } from "react";
import "./Window.css";
import {
  lockClosedOutline,
  reloadOutline,
  ellipsisVertical,
  close,
  expand,
  add,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import HomeSite from "./WebContentPages/Home";
import NotFound from "./WebContentPages/NotFound";
import React from "react";
import { websiteMap } from "../../components/db";
import EmailSite from "./WebContentPages/EmailSite/EmailSite";
import { useGame } from "../../context/GameContext";
import ProTraf from "./WebContentPages/ProTraf";

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({ isOpen, onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [url, setUrl] = useState("https://home.com");
  const { gameStage, setGameStage, internetBroken } = useGame();

  const [tabs, setTabs] = useState([
    {
      id: 0,
      url: "https://your-emails.com",
      title: "Emails",
      Component: ProTraf,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState(0);

  // Dragging
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dragging && !isFullscreen) {
        setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
      }
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, rel, isFullscreen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = url.startsWith("https://") ? url : `https://${url}`;
    const Component = websiteMap[formattedUrl] || NotFound;
    const title = formattedUrl.replace("https://", "").split(".")[0];

    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              url: formattedUrl,
              title: title.charAt(0).toUpperCase() + title.slice(1),
              Component,
            }
          : tab
      )
    );
  };

  const handleExternalSearch = (searchUrl: string) => {
    const Component = websiteMap[searchUrl] || NotFound;
    const title = searchUrl.replace("https://", "").split(".")[0];

    const newTab = {
      id: Date.now(),
      url: searchUrl,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      Component,
    };

    if (title === "hackerforum" && gameStage < 3) {
      console.log("Woah");
      setGameStage(3);
    }

    setTabs((prevTabs) => [
      ...prevTabs.filter((tab) => tab.id !== activeTab?.id),
      newTab,
    ]);

    setActiveTabId(newTab.id);
    setUrl(searchUrl);
  };

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      url: "https://home.com",
      title: "Home",
      Component: HomeSite,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: number) => {
    setTabs((prev) => {
      const updated = prev.filter((tab) => tab.id !== id);
      if (activeTabId === id) {
        setActiveTabId(updated.length ? updated[0].id : -1);
      }
      return updated;
    });
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  useEffect(() => {
    const active = tabs.find((tab) => tab.id === activeTabId);
    if (active) setUrl(active.url);
  }, [activeTabId, tabs]);

  useEffect(() => {});

  return isOpen ? (
    <div
      ref={windowRef}
      className={`window ${isFullscreen ? "fullscreen" : ""}`}
      style={isFullscreen ? {} : { top: pos.y, left: pos.x }}
    >
      <div className="fake-browser">
        {/* Tabs */}
        <div
          className="tab-bar"
          onMouseDown={(e) => {
            if (!isFullscreen && windowRef.current) {
              const bounds = windowRef.current.getBoundingClientRect();
              setRel({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
              setDragging(true);
            }
          }}
        >
          <div className="tab-container">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab ${tab.id === activeTabId ? "active" : ""}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {internetBroken ? "404 WEBSITE OFFLINE" : tab.title}
                <IonIcon
                  icon={close}
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                />
              </div>
            ))}
            <IonIcon icon={add} className="tab-add" onClick={addTab} />
          </div>
          <div>
            <IonIcon
              icon={expand}
              className="window-tab-btn"
              onClick={toggleFullscreen}
            />
            <IonIcon
              icon={close}
              className="window-tab-btn"
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
              disabled={true}
              value={internetBroken ? "000:111;2222":url}
              className="url-input"
            />
          </form>
          <IonIcon
            icon={reloadOutline}
            className="icon reload"
          />
          <IonIcon icon={ellipsisVertical} className="icon menu" />
        </div>

        {/* Page Content */}
        {!internetBroken && (
          <div className="page-content">
            {activeTab ? (
              activeTab.Component === HomeSite ? (
                <HomeSite onSearchSubmit={handleExternalSearch} />
              ) : (
                React.createElement(activeTab.Component)
              )
            ) : (
              <HomeSite onSearchSubmit={handleExternalSearch} />
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Window;
