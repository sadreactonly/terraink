import { useState } from "react";
import {
  LocationIcon,
  ThemeIcon,
  LayoutIcon,
  LayersIcon,
  MarkersIcon,
  StyleIcon,
  ExportIcon,
  SettingsIcon,
  InfoIcon,
} from "./Icons";
import InfoPanel from "./InfoPanel";
import { useSwipeDown } from "@/shared/hooks/useSwipeDown";

export type MobileTab =
  | "location"
  | "theme"
  | "layout"
  | "style"
  | "layers"
  | "markers"
  | "export";

const tabs: {
  id: MobileTab;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "location", label: "Location", Icon: LocationIcon },
  { id: "theme", label: "Theme", Icon: ThemeIcon },
  { id: "layout", label: "Layout", Icon: LayoutIcon },
  { id: "style", label: "Style", Icon: StyleIcon },
  { id: "layers", label: "Layers", Icon: LayersIcon },
  { id: "markers", label: "Markers", Icon: MarkersIcon },
  { id: "export", label: "Export", Icon: ExportIcon },
];

interface MobileNavBarProps {
  activeTab: MobileTab;
  drawerOpen: boolean;
  onTabChange: (tab: MobileTab) => void;
}

function InfoDrawer({ onClose }: { onClose: () => void }) {
  const { sheetRef, handleRef, handleProps } = useSwipeDown(onClose);

  return (
    <div className="mobile-drawer" role="dialog" aria-label="Help Us Grow">
      <div
        className="mobile-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="mobile-drawer-sheet" ref={sheetRef}>
        <div
          className="mobile-drawer-handle"
          ref={handleRef}
          aria-hidden="true"
          {...handleProps}
        />
        <div className="mobile-drawer-content">
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}

export default function MobileNavBar({
  activeTab,
  drawerOpen,
  onTabChange,
}: MobileNavBarProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <div className="mobile-nav-wrapper">
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-scroll-container">
            <div className="mobile-nav-tabs">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`mobile-nav-tab${drawerOpen && activeTab === id ? " is-active" : ""}`}
                  onClick={() => onTabChange(id)}
                  aria-current={activeTab === id ? "page" : undefined}
                >
                  <Icon className="mobile-nav-icon" />
                  <span className="mobile-nav-label">{label}</span>
                </button>
              ))}
              <button
                type="button"
                className={`mobile-nav-tab${infoOpen ? " is-active" : ""}`}
                onClick={() => setInfoOpen((v) => !v)}
                aria-label="Help Us Grow"
              >
                <InfoIcon className="mobile-nav-icon" />
                <span className="mobile-nav-label">Info</span>
              </button>
            </div>
            <div className="mobile-nav-fade" aria-hidden="true" />
          </div>
        </nav>

        <button
          type="button"
          className="mobile-nav-settings"
          aria-label="Settings"
          disabled
        >
          <SettingsIcon className="mobile-nav-settings-icon" />
        </button>
      </div>

      {infoOpen && <InfoDrawer onClose={() => setInfoOpen(false)} />}
    </>
  );
}
