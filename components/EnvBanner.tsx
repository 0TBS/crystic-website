// A small banner that appears ONLY on the staging site, so you never confuse
// staging with the live site. It renders nothing when NEXT_PUBLIC_SITE_ENV
// is "production".
export default function EnvBanner() {
  const env = process.env.NEXT_PUBLIC_SITE_ENV;

  if (env !== "staging") {
    return null;
  }

  return (
    <div
      style={{
        background: "#b45309",
        color: "white",
        textAlign: "center",
        padding: "6px 12px",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      STAGING — this is a test copy of the site. Changes here are not live.
    </div>
  );
}
