import { motion } from "framer-motion";

const hours = [
  { day: "Monday – Thursday", time: "11:00 AM – 10:00 PM", late: false },
  { day: "Friday", time: "11:00 AM – 3:00 AM", late: true },
  { day: "Saturday", time: "11:30 AM – 3:00 AM", late: true },
  { day: "Sunday", time: "11:00 AM – 10:00 PM", late: false },
];

function getCurrentDayIndex() {
  const d = new Date().getDay(); // 0=Sun, 5=Fri, 6=Sat
  if (d >= 1 && d <= 4) return 0;
  if (d === 5) return 1;
  if (d === 6) return 2;
  return 3;
}

export default function BusinessHours() {
  const todayIndex = getCurrentDayIndex();

  return (
    <section className="py-24 geometric-bg" style={{ background: "hsl(var(--background-dark))" }}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-10 md:p-14"
            style={{
              background: "hsl(28 36% 10%)",
              border: "1px solid hsl(var(--gold) / 0.25)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <div className="text-center mb-10">
              <p className="section-label-gold mb-3">Visit Us</p>
              <h2 className="section-title-light text-4xl md:text-5xl">We're Open</h2>
              <div className="shimmer-divider mt-6" />
            </div>

            <div className="space-y-5">
              {hours.map((h, i) => (
                <motion.div
                  key={h.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`flex items-center justify-between py-4 px-5 rounded-2xl transition-all duration-300 ${
                    i === todayIndex ? "ring-1" : ""
                  }`}
                  style={{
                    background: i === todayIndex ? "hsl(var(--primary) / 0.08)" : "hsl(28 36% 13%)",
                    borderColor: i === todayIndex ? "hsl(var(--primary) / 0.3)" : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {i === todayIndex && (
                      <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "hsl(var(--primary))" }} />
                    )}
                    <span className="font-body font-medium text-sm" style={{ color: "hsl(38 64% 85%)" }}>
                      {h.day}
                    </span>
                    {i === todayIndex && (
                      <span className="font-label text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "hsl(var(--primary) / 0.15)",
                          color: "hsl(var(--primary))",
                          border: "1px solid hsl(var(--primary) / 0.3)",
                          letterSpacing: "0.1em",
                        }}>
                        TODAY
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-body text-sm tabular-nums"
                      style={{ color: h.late ? "hsl(var(--gold))" : "hsl(38 64% 75%)" }}>
                      {h.time}
                    </span>
                    {h.late && (
                      <span className="open-late-badge hidden sm:inline-flex">
                        🌙 Open Late
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="shimmer-divider mt-10 mb-6" />
            <p className="text-center font-body text-sm" style={{ color: "hsl(var(--foreground-muted))" }}>
              Dine-In · Takeout · Catering Available
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
