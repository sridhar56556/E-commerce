const MESSAGES = [
  'Free shipping on orders over ₹12,000',
  'New Season — Autumn Collection just landed',
  'Members get early access to every drop',
  'Easy 30-day returns, always',
]

export default function AnnouncementBar() {
  // Duplicate the track so the marquee loops seamlessly
  const track = [...MESSAGES, ...MESSAGES]
  return (
    <div className="announce" role="complementary" aria-label="Store announcements">
      <div className="announce__track">
        {track.map((m, i) => (
          <span className="announce__item" key={i}>
            {m}
            <span className="announce__dot" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
