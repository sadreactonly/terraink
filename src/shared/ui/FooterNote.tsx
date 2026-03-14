import {
  CONTACT_EMAIL,
  DEVELOPER_NAME,
  DEVELOPER_PROFILE_URL,
  LEGAL_NOTICE_URL,
  PRIVACY_URL,
} from "@/core/config";

export default function FooterNote() {
  const contactEmail = String(CONTACT_EMAIL ?? "").trim();
  const legalNoticeUrl = String(LEGAL_NOTICE_URL ?? "").trim();
  const privacyUrl = String(PRIVACY_URL ?? "").trim();
  const developerName = String(DEVELOPER_NAME ?? "").trim();
  const developerProfileUrl = String(DEVELOPER_PROFILE_URL ?? "").trim();
  const hasLegal = Boolean(contactEmail || legalNoticeUrl || privacyUrl);

  return (
    <footer className="app-footer">
      <p className="source-note">
        Map data &copy;{" "}
        <a
          className="source-link"
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
        >
          OpenStreetMap contributors
        </a>
        {" | "}Tiles &copy;{" "}
        <a
          className="source-link"
          href="https://openmaptiles.org/"
          target="_blank"
          rel="noreferrer"
        >
          OpenMapTiles
        </a>
        {" | "}Powered by{" "}
        <a
          className="source-link"
          href="https://openfreemap.org/"
          target="_blank"
          rel="noreferrer"
        >
          OpenFreeMap
        </a>
        ,{" "}
        <a
          className="source-link"
          href="https://nominatim.openstreetmap.org/"
          target="_blank"
          rel="noreferrer"
        >
          Nominatim
        </a>{" "}
        &amp;{" "}
        <a
          className="source-link"
          href="https://maplibre.org/"
          target="_blank"
          rel="noreferrer"
        >
          MapLibre
        </a>
        .
      </p>
      {hasLegal && (
        <p className="source-note">
          {contactEmail && (
            <a className="source-link" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          )}
          {contactEmail && (legalNoticeUrl || privacyUrl) && " | "}
          {legalNoticeUrl && (
            <a
              className="source-link"
              href={legalNoticeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Imprint
            </a>
          )}
          {legalNoticeUrl && privacyUrl && " | "}
          {privacyUrl && (
            <a
              className="source-link"
              href={privacyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Data Privacy
            </a>
          )}
        </p>
      )}
      <p className="made-note">
        Made with <span className="heart">❤︎</span> in Hannover, Germany
        {developerName ? " - by " : ""}
        {developerName ? (
          developerProfileUrl ? (
            <a
              className="source-note source-link"
              href={developerProfileUrl}
              target="_blank"
              rel="noreferrer"
            >
              {developerName}
            </a>
          ) : (
            developerName
          )
        ) : null}
      </p>
    </footer>
  );
}
