const Footer = () => {
  const lastUpdated = process.env.LAST_UPDATED;
  if (!lastUpdated) return null;

  // Use the commit's own calendar date so every time zone shows the same day
  const date = new Date(lastUpdated.slice(0, 10)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="px-8 md:px-16 pb-6">
      <p className="text-[13px] text-gray-400 text-center">Last updated: {date}</p>
    </footer>
  )
}

export default Footer
