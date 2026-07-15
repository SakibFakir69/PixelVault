import React from "react";

const FEATURED = [
  { title: "Ironfoot Strikers #0004", cat: "Ironfoot Strikers", tier: "Uncommon", price: 7.1, img: "https://res.cloudinary.com/dgft45qqq/image/upload/q_20/c_scale,w_500/l_text:Arial_50:PREVIEW/v1/pfp_collection/Ironfoot_Strikers/pfp_Ironfoot_Strikers_0004_b75cdc.png" },
  { title: "Backline Titans #0015", cat: "Backline Titans", tier: "Rare", price: 42.3, img: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783855469/pfp_collection/Backline_Titans/pfp_Backline_Titans_0015_4cda25.png.png" },
  { title: "Cosmic Outcasts #0019", cat: "Cosmic Outcasts", tier: "Common", price: 0, img: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783860976/pfp_collection/Cosmic_Outcasts/pfp_Cosmic_Outcasts_0019_8c8bbb.png.png" },
  { title: "Deepcore Titans #0006", cat: "Deepcore Titans", tier: "Uncommon", price: 9.8, img: "https://res.cloudinary.com/dgft45qqq/image/upload/s--ohDD_Fh0--/v1/pfp_collection/Deepcore_Titans/pfp_Deepcore_Titans_0006_de2bd4.png.png" },
];

const TIER_STYLE: Record<string, string> = {
  Common: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  Uncommon: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  Rare: "text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0A0817] text-[#F3F1FA] font-[family-name:var(--font-body)] overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0817]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 via-fuchsia-400 to-cyan-400" />
            <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">PixelVault</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#collections" className="hover:text-white transition">Collections</a>
            <a href="#tiers" className="hover:text-white transition">Tiers</a>
            <a href="#how" className="hover:text-white transition">How it works</a>
          </div>
          <a href="#collections" className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition">
            Enter Vault
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] opacity-30 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            933 ASSETS LIVE
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            Collect the{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              pixel underground.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            25 hand-generated collections. Some free to claim, some rare enough to matter. No auctions — just a manifest and a price.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#collections" className="px-7 py-3.5 rounded-full font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition">
              Browse the vault
            </a>
            <a href="#how" className="px-7 py-3.5 rounded-full font-semibold border border-white/15 hover:border-white/30 transition">
              How it works
            </a>
          </div>
        </div>

        {/* stat strip */}
        <div className="relative z-10 max-w-2xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {[["933", "ASSETS"], ["25", "COLLECTIONS"], ["3", "TIERS"], ["100%", "ORIGINAL"]].map(([n, l], i) => (
            <div key={i} className="p-5 border-r border-white/10 last:border-r-0 border-b md:border-b-0">
              <div className="font-[family-name:var(--font-display)] font-bold text-2xl bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{n}</div>
              <div className="text-[10px] font-mono text-white/40 tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section id="collections" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <div className="text-xs font-mono tracking-widest text-fuchsia-400 mb-3">FEATURED</div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight">A pull from the vault.</h2>
          </div>
          <p className="text-white/50 text-sm max-w-xs">A sample across collections and rarity tiers.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {FEATURED.map((item, i) => (
            <div key={i} className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-violet-400/40 hover:-translate-y-1 transition-all duration-200">
              <div className="relative aspect-square overflow-hidden bg-white/[0.03]">
                <img src={item.img} alt={item.title} loading="lazy"
                  className="w-full h-full object-cover [image-rendering:pixelated] group-hover:scale-110 transition-transform duration-300" />
                <span className={`absolute top-2.5 left-2.5 text-[10px] font-mono px-2 py-1 rounded-md border ${TIER_STYLE[item.tier]}`}>
                  {item.tier.toUpperCase()}
                </span>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-mono text-white/35 tracking-wide uppercase mb-1">{item.cat}</div>
                <div className="text-sm font-semibold mb-3 truncate">{item.title}</div>
                <div className="flex justify-between items-center">
                  <span className={`font-mono text-sm font-bold ${item.price === 0 ? "text-emerald-300" : "text-fuchsia-300"}`}>
                    {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                  </span>
                  <span className="text-white/30 group-hover:text-violet-300 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="text-xs font-mono tracking-widest text-fuchsia-400 mb-3">PROCESS</div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-lg">
          Three steps. No bidding wars.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["01", "Browse the manifest", "Filter by collection, tier, or search by name across the full catalog."],
            ["02", "Claim or acquire", "Common assets are free instantly. Rare pieces are priced individually."],
            ["03", "It's yours", "Claimed assets are tied to your account, ready to use anywhere."],
          ].map(([num, title, desc], i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <div className="font-[family-name:var(--font-display)] italic text-violet-400 text-lg mb-4">{num}</div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mb-3">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="text-xs font-mono tracking-widest text-fuchsia-400 mb-3">RARITY</div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-lg">
          Three tiers, honestly priced.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-emerald-300 text-xs font-mono tracking-widest mb-6">🟢 COMMON</div>
            <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl mb-1">Free</div>
            <div className="text-white/40 text-xs mb-7">Claim instantly</div>
            <button className="w-full py-3 rounded-full border border-white/15 hover:border-white/30 text-sm font-medium transition">
              Browse free assets
            </button>
          </div>
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.04] p-8">
            <div className="text-cyan-300 text-xs font-mono tracking-widest mb-6">🟡 UNCOMMON</div>
            <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl mb-1">$6–10</div>
            <div className="text-white/40 text-xs mb-7">Own It tier</div>
            <button className="w-full py-3 rounded-full border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-300 text-sm font-medium transition">
              Browse Own It
            </button>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/40 bg-gradient-to-b from-fuchsia-500/10 to-transparent p-8">
            <div className="text-fuchsia-300 text-xs font-mono tracking-widest mb-6">🔴 RARE</div>
            <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl mb-1">$20–95</div>
            <div className="text-white/40 text-xs mb-7">Premium tier</div>
            <button className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-sm font-semibold hover:opacity-90 transition">
              Browse Premium
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4 text-xs text-white/40 font-mono">
          <span>© 2026 SEVEN VENTURE LABS</span>
          <span>GENERATED VIA FLUX.1-SCHNELL · HOSTED ON CLOUDINARY</span>
        </div>
      </footer>
    </div>
  );
}