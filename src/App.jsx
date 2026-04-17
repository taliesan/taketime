import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function TakeTime() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const manifestoRef = useRef(null);

  const bone = "#EDE4ED";
  const ink = "#1E1A32";
  const pink = "#FF2D87";
  const blue = "#2E6FFF";
  const paperDark = "#16122E";

  const rotatingWords = [
    { text: "back", color: "#84CC16" },
    { text: "your", color: "#22E5F0" },
    { text: "the", color: "#9333EA" },
    { text: "their", color: "#D946EF" },
    { text: "some", color: "#FBBF24" },
    { text: "our", color: "#10B981" },
    { text: "more", color: "#FF6B2D" },
    { text: "less", color: "#6366F1" },
  ];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Anton&family=Jost:ital,wght@1,900&family=Newsreader:ital,wght@0,400;0,600;0,800;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    const t = setTimeout(() => setMounted(true), 60);
    const rotator = setInterval(() => {
      setWordIdx((v) => (v + 1) % rotatingWords.length);
    }, 1500);
    return () => {
      document.head.removeChild(link);
      clearTimeout(t);
      clearInterval(rotator);
    };
  }, []);

  const display = {
    fontFamily: "'Anton', 'Arial Narrow', sans-serif",
    letterSpacing: "0.01em",
  };
  const serif = { fontFamily: "'Newsreader', Georgia, serif" };
  const mono = { fontFamily: "'JetBrains Mono', Menlo, monospace" };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (email.includes("@") && email.length > 4) setSubmitted(true);
  };

  const scrollToManifesto = () => {
    manifestoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timeStamp = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(
    now.getUTCSeconds()
  )} UTC`;

  const currentWord = rotatingWords[wordIdx];

  return (
    <div style={{ background: bone, color: ink, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slashIn { from { transform: translateX(-110%) skewY(-3deg); } to { transform: translateX(0) skewY(-3deg); } }
        @keyframes stampIn { 0% { opacity: 0; transform: rotate(-14deg) scale(1.4); } 60% { opacity: 1; } 100% { opacity: 1; transform: rotate(-9deg) scale(1); } }
        @keyframes wordSwap {
          0% { opacity: 0; transform: translateY(0.25em); }
          15% { opacity: 1; transform: translateY(0); }
          82% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-0.25em); }
        }
        .rise { opacity: 0; animation: rise 700ms cubic-bezier(.2,.7,.1,1) forwards; }
        .d1 { animation-delay: 80ms; } .d2 { animation-delay: 180ms; }
        .d3 { animation-delay: 300ms; } .d4 { animation-delay: 440ms; }
        .d5 { animation-delay: 620ms; } .d6 { animation-delay: 820ms; }
        .slash { animation: slashIn 900ms cubic-bezier(.2,.7,.1,1) 500ms both; }
        .stamp { animation: stampIn 900ms cubic-bezier(.2,.8,.2,1) 900ms both; }
        .word-swap { animation: wordSwap 1500ms ease both; display: inline-block; }
        .hover-ink:hover { background: ${ink}; color: ${bone}; border-color: ${ink}; }
        .hover-blue:hover { background: ${blue}; color: ${bone}; border-color: ${blue}; }
        .ticker { display: flex; width: max-content; animation: marquee 38s linear infinite; }
        input::placeholder { color: ${ink}; opacity: 0.4; }
        input:focus { outline: none; }
        @media (max-width: 900px) {
          .hero-title { font-size: 22vw !important; line-height: 0.85 !important; }
          .deal-title { font-size: 14vw !important; }
          .cta-title { font-size: 16vw !important; }
          .deal-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .mf-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .mf-stamp { position: static !important; display: inline-block !important; top: auto !important; right: auto !important; transform: rotate(-3deg) !important; margin: 0 0 36px 0 !important; }
          .sec-hero { padding: 44px 24px 36px !important; }
          .sec-deal { padding: 80px 24px !important; }
          .sec-manifesto { padding: 96px 24px !important; }
          .sec-three { padding: 88px 24px !important; }
          .sec-cta { padding: 96px 24px !important; }
          .three-head-row { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 640px) {
          .hero-line { flex-wrap: wrap !important; row-gap: 4px !important; column-gap: 0.1em !important; }
          .top-mid { display: none !important; }
          .top-bar-inner { padding: 10px 18px !important; font-size: 10px !important; letter-spacing: 0.14em !important; }
          .sec-hero, .sec-deal, .sec-manifesto, .sec-three, .sec-cta { padding-left: 18px !important; padding-right: 18px !important; }
          .footer-inner { padding: 28px 18px !important; }
          .ticker-band { font-size: 22px !important; padding: 14px 0 !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .deal-body { max-width: 100% !important; }
        }
      `}</style>

      <div
        style={{
          borderBottom: `1px solid ${ink}`,
          background: bone,
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div
          className="top-bar-inner"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "12px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...mono,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          <span>TAKETIME.AI</span>
          <span className="top-mid" style={{ color: blue }}>Filed Under: Class War</span>
          <span>Est. MMXXVI · {timeStamp}</span>
        </div>
      </div>

      <section
        className="sec-hero"
        style={{
          position: "relative",
          padding: "64px 28px 48px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div
          className={mounted ? "rise d1" : ""}
          style={{
            ...mono,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 9,
              height: 9,
              background: pink,
              borderRadius: 999,
            }}
          />
          Hall №001 · Now Organizing
        </div>

        <h1
          className={`hero-title ${mounted ? "rise d2" : ""}`}
          style={{
            ...display,
            fontSize: "clamp(96px, 17vw, 300px)",
            lineHeight: 0.82,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          <span
            className="hero-line"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.22em",
              flexWrap: "nowrap",
            }}
          >
            <span>Take</span>
            <span
              key={wordIdx}
              className="word-swap"
              style={{
                fontSize: "0.72em",
                color: currentWord.color,
                textTransform: "lowercase",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                fontFamily: "'Jost', 'Futura', sans-serif",
                fontStyle: "italic",
                fontWeight: 900,
                display: "inline-block",
              }}
            >
              {currentWord.text}
            </span>
          </span>
          <span style={{ display: "block" }}>
            <span style={{ color: pink }}>Time</span>
            <span style={{ color: blue }}>.</span>
          </span>
        </h1>

        <div
          className="slash"
          style={{
            marginTop: 40,
            background: ink,
            color: bone,
            padding: "36px 28px 14px 28px",
            transform: "skewY(-3deg)",
            transformOrigin: "left",
          }}
        >
          <div
            style={{
              transform: "skewY(3deg)",
              ...serif,
              fontStyle: "italic",
              fontSize: "clamp(22px, 3.2vw, 42px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Your time is <span style={{ color: pink }}>theirs.</span>{" "}
            Take it <span style={{ color: blue }}>back.</span>
          </div>
        </div>

        <div
          className={mounted ? "rise d5" : ""}
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 24,
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              ...serif,
              fontSize: 20,
              maxWidth: 540,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Work part-time. Get paid full-time.{" "}
            <span style={{ fontWeight: 800, color: pink }}>Keep the difference.</span>
          </p>

          <button
            onClick={scrollToManifesto}
            className="hover-blue"
            style={{
              ...mono,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              padding: "16px 22px",
              border: `1.5px solid ${ink}`,
              background: bone,
              color: ink,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "all 200ms ease",
              fontWeight: 500,
            }}
          >
            Read the Manifesto
            <ArrowDown size={14} strokeWidth={2.2} />
          </button>
        </div>
      </section>

      <section
        style={{
          borderTop: `1px solid ${ink}`,
          borderBottom: `1px solid ${ink}`,
          background: pink,
          color: bone,
          padding: "16px 0",
          overflow: "hidden",
        }}
      >
        <div className="ticker" style={{ ...display, fontSize: 28, textTransform: "uppercase" }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
            >
              {[
                "Automate your job before they do",
                "Work part-time · Get paid full-time",
                "The gains of AI belong to labor",
                "Your time is theirs · Take it back",
                "Seize your hours",
              ].map((phrase, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span style={{ padding: "0 32px" }}>{phrase}</span>
                  <span style={{ color: blue }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="sec-deal" style={{ padding: "120px 28px", maxWidth: 1440, margin: "0 auto" }}>
        <div
          className="deal-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                ...mono,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                marginBottom: 20,
                color: blue,
                fontWeight: 500,
              }}
            >
              §01 — The Deal
            </div>
            <p style={{ ...serif, fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 380 }}>
              The AI rolling out at your company was trained on your emails, your docs, your
              judgment. It is <em>you</em>, compressed. Management's plan is to use it to do your
              job faster, keep paying you the same, lay off your teammates, and pocket the margin.
            </p>
            <p
              style={{
                ...serif,
                fontSize: 17,
                lineHeight: 1.6,
                marginTop: 22,
                fontWeight: 600,
              }}
            >
              We think the margin <span style={{ color: pink }}>belongs to you.</span>
            </p>
          </div>

          <h2
            className="deal-title"
            style={{
              ...display,
              fontSize: "clamp(56px, 9vw, 160px)",
              lineHeight: 0.82,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Work
            <br />
            Part-<span style={{ color: pink }}>Time</span>.
            <br />
            Get Paid
            <br />
            Full-<span style={{ color: blue }}>Time</span>.
          </h2>
        </div>
      </section>

      <section
        ref={manifestoRef}
        className="sec-manifesto"
        style={{
          background: paperDark,
          color: bone,
          padding: "140px 28px 130px",
          position: "relative",
        }}
      >
        <div
          className="stamp mf-stamp"
          style={{
            position: "absolute",
            top: 48,
            right: "8%",
            border: `2px solid ${blue}`,
            color: blue,
            padding: "12px 20px",
            ...mono,
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            transform: "rotate(-9deg)",
            background: "transparent",
            textAlign: "center",
          }}
        >
          Manifesto
          <div style={{ fontSize: 9, marginTop: 2, opacity: 0.85 }}>Do Not Disregard</div>
        </div>

        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div
            style={{
              ...mono,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              marginBottom: 32,
              color: pink,
              fontWeight: 500,
            }}
          >
            §02 — The Position
          </div>

          <div
            className="mf-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              maxWidth: 1100,
            }}
          >
            <div>
              <p style={{ ...serif, fontSize: 22, lineHeight: 1.5, margin: 0 }}>
                For a hundred years they sold us the deal:{" "}
                <em>your hours for their money.</em> Fair trade, they said. An honest day's work.
              </p>
              <p style={{ ...serif, fontSize: 19, lineHeight: 1.6, marginTop: 22 }}>
                Then they automated the factory floor and kept the savings.
              </p>
              <p style={{ ...serif, fontSize: 19, lineHeight: 1.6, marginTop: 6 }}>
                Then they automated the back office and kept the savings.
              </p>
              <p style={{ ...serif, fontSize: 19, lineHeight: 1.6, marginTop: 6 }}>
                Now they're automating <em>you</em>.
              </p>
            </div>

            <div>
              <p style={{ ...serif, fontSize: 19, lineHeight: 1.6, margin: 0 }}>
                TakeTime is training, tools, and a community doing the obvious thing: automate your
                own job — quietly, completely — and keep the hours. Work Tuesday and Thursday. Go
                for a walk on Wednesday. Write the novel. See your kid's game. Train for the
                marathon. Start the thing.
              </p>

              <p
                style={{
                  ...display,
                  textTransform: "uppercase",
                  fontSize: 44,
                  lineHeight: 1,
                  marginTop: 44,
                  color: pink,
                  letterSpacing: "0.01em",
                }}
              >
                You built the expertise.
                <br />
                <span style={{ color: blue }}>You earned the judgment.</span>
                <br />
                The gains are yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-three" style={{ padding: "130px 28px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="three-head-row" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
          <div>
            <div style={{ ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 16, color: blue, fontWeight: 500 }}>
              §03 — The Instrument
            </div>
            <h3
              style={{
                ...display,
                fontSize: "clamp(44px, 6.5vw, 108px)",
                lineHeight: 0.88,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Three ways<br />in.
            </h3>
          </div>
          <p style={{ ...serif, fontSize: 17, lineHeight: 1.6, maxWidth: 380, margin: 0 }}>
            Training, tools, and the community keeping it all moving forward. Built to get you out
            of the chair by Friday.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 0,
            borderTop: `1px solid ${ink}`,
            borderLeft: `1px solid ${ink}`,
          }}
        >
          {[
            {
              no: "01",
              title: "The Training",
              body:
                "Two-day intensive. Map your role, identify the automatable 70%, and build the system that carries it. You walk out with it already running.",
              numColor: pink,
            },
            {
              no: "02",
              title: "The Tools",
              body:
                "The shared library of prompts, templates, integrations, and playbooks — contributed by members, tested in real jobs, updated as models change. What works, held in common.",
              numColor: blue,
            },
            {
              no: "03",
              title: "The Hall",
              body:
                "The community that keeps it growing. Where members trade notes, debug each other's setups, and carry the whole thing forward. No VCs. No bosses. The gains stay with labor.",
              numColor: pink,
            },
          ].map((card) => (
            <div
              key={card.no}
              style={{
                borderRight: `1px solid ${ink}`,
                borderBottom: `1px solid ${ink}`,
                padding: "36px 28px 44px",
                background: bone,
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    ...display,
                    fontSize: 96,
                    lineHeight: 0.9,
                    color: card.numColor,
                    marginBottom: 22,
                  }}
                >
                  {card.no}
                </div>
                <h4
                  style={{
                    ...display,
                    fontSize: 36,
                    textTransform: "uppercase",
                    margin: "0 0 18px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {card.title}
                </h4>
                <p style={{ ...serif, fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                  {card.body}
                </p>
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  marginTop: 32,
                  color: blue,
                  opacity: 0.75,
                  fontWeight: 500,
                }}
              >
                ◇ In Preparation
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="sec-cta"
        style={{
          background: pink,
          color: bone,
          padding: "140px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              ...mono,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              marginBottom: 28,
              color: blue,
              fontWeight: 500,
            }}
          >
            §04 — Sign Up
          </div>
          <h3
            className="cta-title"
            style={{
              ...display,
              fontSize: "clamp(60px, 10vw, 180px)",
              lineHeight: 0.85,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Join the
            <br />
            <span style={{ background: ink, color: bone, padding: "0 16px" }}>Hall.</span>
          </h3>

          <p
            style={{
              ...serif,
              fontSize: 20,
              lineHeight: 1.55,
              marginTop: 40,
              maxWidth: 580,
            }}
          >
            Doors open in early access this spring. Enter your email and we'll send one note when
            The Training goes live. No drip campaign. No upsell. One note.
          </p>

          <div style={{ marginTop: 44, maxWidth: 640 }}>
            {!submitted ? (
              <div
                style={{
                  display: "flex",
                  border: `1.5px solid ${bone}`,
                  background: "transparent",
                  alignItems: "stretch",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  placeholder="you@work.com"
                  style={{
                    flex: 1,
                    padding: "20px 18px",
                    border: "none",
                    background: "transparent",
                    color: bone,
                    ...serif,
                    fontSize: 19,
                  }}
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    ...mono,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.22em",
                    padding: "0 26px",
                    background: blue,
                    color: bone,
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontWeight: 500,
                  }}
                >
                  Enlist
                  <ArrowRight size={14} strokeWidth={2.2} />
                </button>
              </div>
            ) : (
              <div
                style={{
                  border: `1.5px solid ${bone}`,
                  padding: "26px 22px",
                  background: "transparent",
                }}
              >
                <div
                  style={{
                    ...mono,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.22em",
                    marginBottom: 12,
                    color: blue,
                    fontWeight: 500,
                  }}
                >
                  ◆ Filed
                </div>
                <div style={{ ...serif, fontSize: 22, fontStyle: "italic" }}>
                  Card issued. Watch your inbox.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer
        style={{
          background: bone,
          borderTop: `1px solid ${ink}`,
          padding: "44px 28px",
          ...mono,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontWeight: 500,
        }}
      >
        <div
          className="footer-inner"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <span>TakeTime.ai</span>
            <span style={{ color: blue }}>A Worker-First Project</span>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: pink }}>No Bosses · No Boards</span>
            <span
              style={{
                display: "inline-block",
                padding: "5px 12px",
                border: `1px solid ${ink}`,
                letterSpacing: "0.3em",
              }}
            >
              Printed MMXXVI
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
