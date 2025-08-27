"use client"

const companies = [
  { name: "MindCare" },
  { name: "WellNest" },
  { name: "YouthReach" },
  { name: "CalmCircle" },
  { name: "BrightPath" },
  { name: "GrowTogether" },
  { name: "ThriveNow" },
  { name: "CareBridge" }
];

const Companies = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-6">
          Trusted by forward-thinking organizations
        </p>

        <div className="relative overflow-hidden rounded-2xl shadow-md bg-background/40">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-14 md:w-16 bg-gradient-to-r from-background to-transparent rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-14 md:w-16 bg-gradient-to-l from-background to-transparent rounded-r-2xl" />
          <div className="marquee flex items-center gap-6 sm:gap-8 md:gap-10 whitespace-nowrap py-4 sm:py-5">
            {companies.concat(companies).map((company, index) => (
              <div
                key={index}
                className="h-12 sm:h-12 md:h-14 flex items-center px-5 sm:px-6 md:px-8 rounded-full bg-card text-foreground/90 text-base md:text-lg font-semibold shadow-sm"
              >
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 22s linear infinite;
        }
        @media (max-width: 640px) {
          .marquee { animation-duration: 18s; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Companies;


