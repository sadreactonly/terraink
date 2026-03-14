import { useState } from "react";
import { AppProviders } from "@/core/AppProviders";
import AppHeader from "@/shared/ui/AppHeader";
import FooterNote from "@/shared/ui/FooterNote";
import SettingsPanel from "@/features/poster/ui/SettingsPanel";
import PreviewPanel from "@/features/poster/ui/PreviewPanel";
import InfoPanel from "@/shared/ui/InfoPanel";
import AnnouncementModal from "@/features/updates/ui/AnnouncementModal";
import MobileNavBar, { type MobileTab } from "@/shared/ui/MobileNavBar";
import { useSwipeDown } from "@/shared/hooks/useSwipeDown";

function SettingsDrawer({
  mobileTab,
  onClose,
}: {
  mobileTab: MobileTab;
  onClose: () => void;
}) {
  const { sheetRef, handleRef, handleProps } = useSwipeDown(onClose);

  return (
    <div className="mobile-drawer" role="dialog" aria-label="Settings">
      <div
        className="mobile-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="mobile-drawer-sheet"
        ref={sheetRef}
        data-mobile-tab={mobileTab}
      >
        <div
          className="mobile-drawer-handle"
          ref={handleRef}
          aria-hidden="true"
          {...handleProps}
        />
        <div className="mobile-drawer-content">
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("location");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleTabChange = (tab: MobileTab) => {
    if (tab === mobileTab && mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    } else {
      setMobileTab(tab);
      setMobileDrawerOpen(true);
    }
  };

  return (
    <div className="app-shell" data-mobile-tab={mobileTab}>
      <AppHeader />
      <main className="app-grid">
        <SettingsPanel />
        <PreviewPanel />
        <InfoPanel />
      </main>
      <div className="mobile-persistent-footer">
        <InfoPanel />
      </div>
      {mobileDrawerOpen && (
        <SettingsDrawer
          mobileTab={mobileTab}
          onClose={() => setMobileDrawerOpen(false)}
        />
      )}
      <MobileNavBar
        activeTab={mobileTab}
        drawerOpen={mobileDrawerOpen}
        onTabChange={handleTabChange}
      />
      <FooterNote />
      <AnnouncementModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}
