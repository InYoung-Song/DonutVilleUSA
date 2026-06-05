import Link from "next/link";

export const dynamic = "force-dynamic";

// The editor sections are built in feat/07. This dashboard lists them.
const SECTIONS = [
  { href: "/admin/hours", title: "Hours", desc: "Weekly & holiday hours" },
  { href: "/admin/banner", title: "Announcement", desc: "Top-of-site banner" },
  { href: "/admin/home", title: "Home & About", desc: "Hero, intro, story" },
  { href: "/admin/contact", title: "Contact & Location", desc: "Address, phone, map" },
  { href: "/admin/menu", title: "Menu", desc: "Donuts, beverages, prices" },
  { href: "/admin/media", title: "Gallery", desc: "Photos & images" },
  { href: "/admin/extras", title: "Video, Social & Badges", desc: "Links & amenities" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-cocoa">Dashboard</h1>
      <p className="mt-1 text-cocoa-700">
        Update your site content here. Changes go live right away.
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="block rounded-2xl border border-cream-200 bg-cream p-5 transition-colors hover:border-berry"
            >
              <span className="font-display text-lg font-semibold text-cocoa">
                {s.title}
              </span>
              <span className="mt-1 block text-sm text-cocoa-500">{s.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
