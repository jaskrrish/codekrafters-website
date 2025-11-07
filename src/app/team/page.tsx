import Image from "next/image";

const leadership = [
  {
    name: "Jas K Krish Singh",
    role: "President",
    bio: "Visionary leader steering CK towards bold collaborations and student empowerment.",
    image: "/images/PRESIDENT.png"
  },
  {
    name: "Abhinav",
    role: "Head of Operations",
    bio: "Keeps initiatives running smoothly across clubs, partners and internal teams.",
    image: "/images/Abhinav.png"
  },
  {
    name: "Yaswanth",
    role: "Head of Operations",
    bio: "Transforms ideas into launch-ready experiences with sharp execution skills.",
    image: "/images/Yashvanth.png"
  }
];

const teamChapters = [
  {
    name: "Content Studio",
    summary:
      "Storytellers shaping narratives across newsletters, podcasts and social campaigns with a consistent CK voice.",
    members: [
      { name: "Aaron", role: "Head" },
      { name: "Hari Prasad", role: "Head" },
      { name: "Noorul Hatim", role: "Lead" }
    ],
    accent: "from-purple-500/20 via-purple-500/10 to-transparent"
  },
  {
    name: "Creatives Guild",
    summary:
      "Designers and filmmakers crafting immersive visuals, event identities and after-movies.",
    members: [
      { name: "Bhavna", role: "Head" },
      { name: "Akash Ravindran", role: "Head" },
      { name: "Sashank", role: "Lead" }
    ],
    accent: "from-pink-500/20 via-pink-500/10 to-transparent"
  },
  {
    name: "Development Lab",
    summary:
      "Engineers building community products, dashboards and digital experiences for the club network.",
    members: [
      { name: "Nithesh", role: "Head" },
      { name: "Srivatsa", role: "Head" },
      { name: "Vikas", role: "Lead" },
      { name: "Vinoth", role: "Lead" }
    ],
    accent: "from-sky-500/20 via-sky-500/10 to-transparent"
  },
  {
    name: "Cybersecurity Collective",
    summary:
      "Ethical hackers safeguarding projects, running workshops and prepping members for CTF victories.",
    members: [
      { name: "Dhanush Adithyan", role: "Head" },
      { name: "Archangel", role: "Head" },
      { name: "Adithya", role: "Lead" }
    ],
    accent: "from-emerald-500/20 via-emerald-500/10 to-transparent"
  },
  {
    name: "Web3 Frontier",
    summary:
      "Explorers prototyping decentralized apps, running on-chain experiments and decoding token economies.",
    members: [
      { name: "Deepanshu", role: "Head" },
      { name: "Achyuth", role: "Lead" },
      { name: "Sanjay Ganesh", role: "Lead" }
    ],
    accent: "from-amber-500/20 via-amber-500/10 to-transparent"
  },
  {
    name: "PR & Management",
    summary:
      "Community architects managing partnerships, event logistics and campus-wide outreach.",
    members: [
      { name: "Kavya", role: "Head" },
      { name: "Pragathi", role: "Head" },
      { name: "Siddarth", role: "Lead" },
      { name: "Satya", role: "Lead" }
    ],
    accent: "from-blue-500/20 via-blue-500/10 to-transparent"
  },
  {
    name: "Competitive Programming",
    summary:
      "Mentors guiding members through ICPC, LeetCode and hackathon prep with weekly problem-solving sprints.",
    members: [
      { name: "Shashikumar", role: "Head" },
      { name: "Manasa", role: "Lead" },
      { name: "Mrudhubashni", role: "Lead" }
    ],
    accent: "from-lime-500/20 via-lime-500/10 to-transparent"
  }
];

const impactHighlights = [
  {
    stat: "40+",
    label: "Active core contributors",
    description: "Volunteers who drive operations, workshops and community projects every single week."
  },
  {
    stat: "18",
    label: "Flagship events hosted",
    description: "From hackathons to cross-campus challenges designed by the team for the community."
  },
  {
    stat: "12",
    label: "Industry partners",
    description: "Start-ups, NGOs and tech giants collaborating with CK through student-led initiatives."
  }
];

const values = [
  {
    title: "Radical Ownership",
    detail: "Every member ships real work, leads squads and learns by doing from day one."
  },
  {
    title: "Cross-Club Collaboration",
    detail: "We connect departments to orchestrate hackathons, podcasts, design labs and more."
  },
  {
    title: "Continuous Discovery",
    detail: "Curiosity keeps us experimenting with new technologies, formats and partnerships."
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden px-6 py-24 sm:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(192,132,252,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Meet the crew</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            A collective of builders, storytellers and strategists shaping CK
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            Inspired by the vibrant culture at Goodway, our team page celebrates the people behind CK. Dive into
            leadership, meet chapter leads and discover how we collaborate to deliver memorable student experiences.
          </p>
        </div>
        <div className="relative mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
          {leadership.map((leader) => (
            <article
              key={leader.name}
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/30" />
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border border-slate-700">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{leader.name}</h3>
                <p className="text-sm uppercase tracking-widest text-cyan-300/90">{leader.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{leader.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
          <div className="lg:w-1/3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">How we operate</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Chapters powering programs, products and community impact
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Every chapter owns its craft—from production studios to engineering labs. Together we co-create everything
              that shows up across CK, ensuring every initiative feels polished, intentional and people-first.
            </p>
          </div>
          <div className="grid flex-1 gap-6 sm:grid-cols-2">
            {teamChapters.map((chapter) => (
              <article
                key={chapter.name}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${chapter.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white">{chapter.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{chapter.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200">
                    {chapter.members.map((member) => (
                      <li key={member.name} className="flex items-center justify-between gap-4 rounded-full bg-slate-800/60 px-4 py-2 text-xs uppercase tracking-widest text-slate-300">
                        <span>{member.name}</span>
                        <span className="text-slate-400">{member.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Impact in motion</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Scaling student-led innovation across our ecosystem
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {impactHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-center shadow-[0_0_30px_rgba(15,23,42,0.3)]"
              >
                <p className="text-4xl font-semibold text-cyan-300">{item.stat}</p>
                <p className="mt-2 text-sm uppercase tracking-widest text-slate-400">{item.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Why we do it</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Values that keep the team in sync</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{value.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 p-10">
            <h3 className="text-2xl font-semibold text-white">Join the crew</h3>
            <p className="mt-4 text-base text-slate-200">
              Want to contribute to CK? We are always scouting for designers, developers, storytellers and strategists who
              love building community-first experiences.
            </p>
            <a
              href="mailto:team@ckgroup.io"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-cyan-400"
            >
              Email the team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
