import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary grid place-items-center text-primary-foreground font-bold">
              V
            </div>
            <span className="font-bold text-lg">Verdant</span>
          </Link>

          <nav className="flex items-center gap-3">
            <a
              href="#about"
              className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </a>

            <Link
              to="/thrift/login"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow hover:opacity-90 transition"
            >
              Thrift
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide">
            NEW · Daily Thrift
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Save a little <span className="text-primary">every day</span>,
            watch it grow.
          </h1>

          <p className="mt-5 text-lg text-muted-foreground max-w-lg">
            Verdant now ships with a built-in daily thrift card. Track your
            contributions, let your collector tick them off, and see your
            monthly payout in real time.
          </p>

          <div className="mt-8 flex gap-3 flex-wrap">
            <Link
              to="/thrift/signup"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition"
            >
              Start your Thrift
            </Link>

            <Link
              to="/thrift/login"
              className="px-6 py-3 rounded-full bg-card border border-border font-semibold hover:bg-secondary transition"
            >
              I have an account
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full"
            aria-hidden
          />

          <div className="relative rounded-3xl bg-card border border-border shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">January Card</h3>

              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                Preview
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => (
                <div
                  key={week}
                  className="rounded-lg border border-border p-2"
                >
                  <div className="text-[10px] font-semibold text-primary mb-1">
                    {week}
                  </div>

                  <div className="space-y-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[10px]"
                      >
                        <span className="text-muted-foreground">
                          D{i + 1}
                        </span>

                        <span
                          className={`size-2.5 rounded-sm ${
                            Math.random() > 0.4
                              ? "bg-primary"
                              : "bg-border"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
              <span className="text-muted-foreground">Payout</span>

              <span className="font-bold text-primary">₦27,000</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6"
      >
        {[
          {
            t: "Daily check-ins",
            d: "Your collector ticks each day's payment from the admin dashboard.",
          },
          {
            t: "Auto totals",
            d: "Live monthly total with the 10% service deduction worked out for you.",
          },
          {
            t: "Always visible",
            d: "Months unlock as the year rolls on. No clutter, no confusion.",
          },
        ].map((feature) => (
          <div
            key={feature.t}
            className="rounded-2xl bg-card border border-border p-6"
          >
            <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center font-bold mb-3">
              ✓
            </div>

            <h3 className="font-semibold">{feature.t}</h3>

            <p className="text-sm text-muted-foreground mt-1">
              {feature.d}
            </p>
          </div>
        ))}
      </section>

      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Verdant</span>

          <Link to="/thrift/login" className="hover:text-foreground">
            Open Thrift →
          </Link>
        </div>
      </footer>
    </div>
  );
}