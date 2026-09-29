/**
 * Custom hero graphic for the landing page — the "Haven" wordmark, set in
 * the app's own Quicksand headline font, backlit by a soft sunrise glow
 * over rolling hills. Pure vector, so it's always crisp, and it draws its
 * palette straight from the app's own sage/lavender/tan design tokens
 * rather than a generic stock illustration.
 */
export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 700 560"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Haven"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="haven-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3f7f1" />
          <stop offset="100%" stopColor="#ece8f4" />
        </linearGradient>
        <radialGradient id="haven-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe7b0" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#f3d17a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f3d17a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haven-sun-core" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffeeb8" />
          <stop offset="100%" stopColor="#e8b65c" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="700" height="560" rx="40" fill="url(#haven-sky)" />

      {/* Sunrise glow, centered behind the wordmark */}
      <circle cx="350" cy="215" r="220" fill="url(#haven-sun-glow)" />
      <circle cx="350" cy="215" r="95" fill="url(#haven-sun-core)" />

      {/* A few soft sparkle accents */}
      <circle cx="145" cy="120" r="5" fill="#beb4d6" opacity="0.8" />
      <circle cx="575" cy="150" r="4" fill="#e8b65c" opacity="0.8" />
      <circle cx="530" cy="90" r="3" fill="#8ba888" opacity="0.7" />
      <circle cx="120" cy="220" r="3" fill="#d9c5b2" opacity="0.8" />

      {/* Rolling hills, back to front */}
      <path
        d="M0,410 C110,370 230,400 350,370 C470,340 580,390 700,360 L700,560 L0,560 Z"
        fill="#beb4d6"
        opacity="0.55"
      />
      <path
        d="M0,450 C130,410 260,460 390,430 C510,400 610,440 700,410 L700,560 L0,560 Z"
        fill="#d9c5b2"
        opacity="0.8"
      />
      <path
        d="M0,490 C150,440 290,480 420,450 C540,420 630,460 700,440 L700,560 L0,560 Z"
        fill="#4a6549"
      />

      {/* "Haven" wordmark, with a soft offset shadow for depth */}
      <text
        x="350"
        y="255"
        textAnchor="middle"
        fill="#2c3d2b"
        opacity="0.18"
        style={{
          fontFamily: "var(--font-quicksand), sans-serif",
          fontWeight: 700,
          fontSize: "104px",
          letterSpacing: "-2px",
        }}
      >
        Haven
      </text>
      <text
        x="350"
        y="250"
        textAnchor="middle"
        fill="#4a6549"
        style={{
          fontFamily: "var(--font-quicksand), sans-serif",
          fontWeight: 700,
          fontSize: "104px",
          letterSpacing: "-2px",
        }}
      >
        Haven
      </text>
    </svg>
  );
}
