"use client";

import { useMemo, useState } from "react";
import {
  IconPhoto,
  IconFolder,
  IconStar,
  IconTrash,
  IconSettings,
  IconSearch,
  IconAdjustmentsHorizontal,
  IconSortDescending,
  IconUpload,
  IconChevronDown,
  IconCloud,
  IconUser,
  IconMoon,
  IconLogout,
  IconCat,
  IconGhost,
  IconBallFootball,
  IconX,
} from "@tabler/icons-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Category = "all" | "animals" | "icons" | "sports";

interface VaultImage {
  id: string;
  name: string;
  url: string;
  category: Exclude<Category, "all">;
  rare: boolean;
  createdAt: string; // ISO date
}

interface NavItem {
  key: "all" | "collections" | "favorites" | "trash";
  label: string;
  icon: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Mock data — replace with real fetch from your catalog / DB
// ---------------------------------------------------------------------------

const CATEGORY_META: Record<
  Exclude<Category, "all">,
  { label: string; icon: React.ReactNode; count: number }
> = {
  animals: { label: "Animals", icon: <IconCat size={16} />, count: 412 },
  icons: { label: "Icons", icon: <IconGhost size={16} />, count: 288 },
  sports: { label: "Sports", icon: <IconBallFootball size={16} />, count: 150 },
};

const NAV_ITEMS: NavItem[] = [
  { key: "all", label: "All images", icon: <IconPhoto size={16} /> },
  { key: "collections", label: "Collections", icon: <IconFolder size={16} /> },
  { key: "favorites", label: "Favorites", icon: <IconStar size={16} /> },
  { key: "trash", label: "Trash", icon: <IconTrash size={16} /> },
];

function generateMockImages(count: number): VaultImage[] {
  const categories: Exclude<Category, "all">[] = ["animals", "icons", "sports"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `img_${i + 1}`,
    name: `Pixel #${String(i + 1).padStart(4, "0")}`,
    url: `https://picsum.photos/seed/pixel${i}/200/200`,
    category: categories[i % categories.length],
    rare: i % 9 === 0,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PixelVault() {
  const [images] = useState<VaultImage[]>(() => generateMockImages(48));
  const [activeNav, setActiveNav] = useState<NavItem["key"]>("all");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [rareOnly, setRareOnly] = useState(false);
  const [sortNewest, setSortNewest] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = images;

    if (activeCategory !== "all") {
      result = result.filter((img) => img.category === activeCategory);
    }
    if (rareOnly) {
      result = result.filter((img) => img.rare);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (img) => img.name.toLowerCase().includes(q) || img.id.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) =>
      sortNewest
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return result;
  }, [images, activeCategory, rareOnly, search, sortNewest]);

  const clearFilters = () => {
    setActiveCategory("all");
    setRareOnly(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-950 text-neutral-100">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-neutral-800 bg-neutral-900 p-3">
        <div className="mb-4 flex items-center gap-2 px-1.5">
          <div className="grid h-6 w-6 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-md">
            <div className="bg-teal-500" />
            <div className="bg-orange-500" />
            <div className="bg-amber-500" />
            <div className="bg-violet-500" />
          </div>
          <span className="text-sm font-medium">Pixel vault</span>
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = activeNav === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                  active
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 px-2.5 pb-1.5 text-[11px] uppercase tracking-wide text-neutral-500">
          Categories
        </div>
        <div className="flex flex-col gap-0.5">
          {(Object.keys(CATEGORY_META) as Exclude<Category, "all">[]).map((cat) => {
            const meta = CATEGORY_META[cat];
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(active ? "all" : cat)}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  {meta.icon}
                  {meta.label}
                </span>
                <span className="text-[11px] text-neutral-500">{meta.count}</span>
              </button>
            );
          })}
        </div>

        <button className="mt-auto flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200">
          <IconSettings size={16} />
          Settings
        </button>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex shrink-0 items-center gap-2.5 border-b border-neutral-800 px-4 py-3">
          <div className="relative max-w-xs flex-1">
            <IconSearch
              size={16}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search images, tags, IDs"
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-2 pl-8 pr-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
            >
              <IconAdjustmentsHorizontal size={15} />
              Filter
            </button>
            {filterOpen && (
              <div className="absolute left-0 top-full z-10 mt-1.5 w-48 rounded-xl border border-neutral-800 bg-neutral-900 p-2 shadow-xl">
                <label className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800">
                  Rare only
                  <input
                    type="checkbox"
                    checked={rareOnly}
                    onChange={(e) => setRareOnly(e.target.checked)}
                  />
                </label>
              </div>
            )}
          </div>

          <button
            onClick={() => setSortNewest((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            <IconSortDescending size={15} />
            {sortNewest ? "Newest" : "Oldest"}
          </button>

          {/* Active filter chips */}
          <div className="flex items-center gap-1.5">
            {activeCategory !== "all" && (
              <span className="flex items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-xs text-blue-400">
                {CATEGORY_META[activeCategory].label}
                <IconX
                  size={12}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory("all")}
                />
              </span>
            )}
            {rareOnly && (
              <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300">
                Rare
                <IconX size={12} className="cursor-pointer" onClick={() => setRareOnly(false)} />
              </span>
            )}
            {(activeCategory !== "all" || rareOnly) && (
              <button
                onClick={clearFilters}
                className="text-xs text-neutral-500 underline-offset-2 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex-1" />

          <button className="flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
            <IconUpload size={15} />
            Upload
          </button>

          <div className="mx-1 h-5 w-px bg-neutral-800" />

          {/* Profile corner */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 py-1 pl-1 pr-2.5 hover:bg-neutral-800"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-medium text-blue-400">
                SK
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-medium">Sakib</div>
                <div className="text-[10px] text-neutral-500">{images.length} images</div>
              </div>
              <IconChevronDown size={14} className="text-neutral-500" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-20 mt-1.5 w-56 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl">
                <div className="border-b border-neutral-800 px-3.5 py-2.5">
                  <div className="text-sm font-medium">Sakib</div>
                  <div className="text-[11px] text-neutral-500">Seven Venture Labs</div>
                </div>
                <div className="flex flex-col gap-0.5 p-1.5">
                  <div className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-neutral-300">
                    <span className="flex items-center gap-2">
                      <IconCloud size={15} />
                      Storage used
                    </span>
                    <span className="text-[11px] text-neutral-500">2.1 GB of 10 GB</span>
                  </div>
                  <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800">
                    <IconUser size={15} />
                    Account
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800">
                    <IconSettings size={15} />
                    Settings
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800">
                    <IconMoon size={15} />
                    Dark mode
                  </button>
                  <div className="my-1 h-px bg-neutral-800" />
                  <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-400 hover:bg-red-500/10">
                    <IconLogout size={15} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Image grid */}
        <main className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-neutral-500">
              <IconPhoto size={32} className="mb-2" />
              <p className="text-sm">No images match your filters.</p>
              <button onClick={clearFilters} className="mt-2 text-sm text-blue-400 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
              {filtered.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    style={{ imageRendering: "pixelated" }}
                    loading="lazy"
                  />
                  {img.rare && (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-medium text-amber-950">
                      Rare
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[11px] text-neutral-200 opacity-0 transition-opacity group-hover:opacity-100">
                    {img.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}