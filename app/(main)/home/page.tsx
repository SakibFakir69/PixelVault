"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconPhoto,
  IconFolder,
  IconStar,
  IconTrash,
  IconSettings,
  IconSearch,
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconUser,
  IconLogout,
  IconX,
  IconDownload,
} from "@tabler/icons-react";
import { supabaseConfig } from "@/lib/supabase/supabase";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AssetRow {
  id: string;
  category: string;
  title: string;
  description: string | null;
  image_url: string;
  price: number;
  tier: string;
  created_at: string;
}

interface VaultImage {
  id: string;
  name: string;
  url: string;
  category: string;
  rare: boolean;
  price: number;
  createdAt: string;
}

interface NavItem {
  key: "all" | "collections" | "favorites" | "trash";
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "all", label: "All images", icon: <IconPhoto size={16} /> },
  { key: "collections", label: "Collections", icon: <IconFolder size={16} /> },
  { key: "favorites", label: "Favorites", icon: <IconStar size={16} /> },
  { key: "trash", label: "Trash", icon: <IconTrash size={16} /> },
];

const PAGE_SIZE = 60;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PixelVault() {
  const router = useRouter();

  const [images, setImages] = useState<VaultImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeNav, setActiveNav] = useState<NavItem["key"]>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [rareOnly, setRareOnly] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // lightbox
  const [selectedImage, setSelectedImage] = useState<VaultImage | null>(null);
  const [downloading, setDownloading] = useState(false);

  // sign out
  const [signingOut, setSigningOut] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchAssets() {
      setLoading(true);
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabaseConfig
        .from("assets")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (cancelled) return;

      if (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const mapped: VaultImage[] = (data as AssetRow[]).map((row) => ({
        id: row.id,
        name: row.title,
        url: row.image_url,
        category: row.category,
        rare: row.tier === "Rare",
        price: row.price,
        createdAt: row.created_at,
      }));

      setImages(mapped);
      setTotalCount(count ?? 0);
      setLoading(false);
    }

    fetchAssets();
    return () => {
      cancelled = true;
    };
  }, [page]);

  // build category list + counts dynamically from the loaded page
  const categoryMeta = useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((img) => {
      map.set(img.category, (map.get(img.category) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([category, count]) => ({ category, count }));
  }, [images]);

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

    // always newest first now that the sort toggle is gone
    result = [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return result;
  }, [images, activeCategory, rareOnly, search]);

  const clearFilters = () => {
    setActiveCategory("all");
    setRareOnly(false);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // -------------------------------------------------------------------------
  // Auth
  // -------------------------------------------------------------------------
  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    const { error } = await supabaseConfig.auth.signOut();
    setSigningOut(false);
    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }
    setProfileOpen(false);
    router.push("/auth/login"); // adjust to your actual login route
    router.refresh();
  }

  // -------------------------------------------------------------------------
  // Download
  // -------------------------------------------------------------------------
  async function handleDownload(img: VaultImage) {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(img.url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const ext = blob.type.split("/")[1]?.split("+")[0] || "png";
      const safeName = img.name.replace(/[^a-z0-9_-]+/gi, "_").toLowerCase();

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${safeName || img.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // fallback: open in a new tab so the user can save manually
      window.open(img.url, "_blank");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-950 text-neutral-100">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-neutral-800 bg-neutral-900 p-3 overflow-y-auto">
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
          Categories (this page)
        </div>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              activeCategory === "all"
                ? "bg-blue-500/15 text-blue-400"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            }`}
          >
            <span>All</span>
            <span className="text-[11px] text-neutral-500">{images.length}</span>
          </button>
          {categoryMeta.map(({ category, count }) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(active ? "all" : category)}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                }`}
              >
                <span className="truncate">{category.replace(/_/g, " ")}</span>
                <span className="text-[11px] text-neutral-500 shrink-0 ml-2">{count}</span>
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
        <header className="flex shrink-0 flex-wrap items-center gap-2.5 border-b border-neutral-800 px-4 py-3">
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

          {/* Active filter chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {activeCategory !== "all" && (
              <span className="flex items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-xs text-blue-400">
                {activeCategory.replace(/_/g, " ")}
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
                <div className="text-[10px] text-neutral-500">{totalCount} images total</div>
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
                  <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800">
                    <IconUser size={15} />
                    Account
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800">
                    <IconSettings size={15} />
                    Settings
                  </button>
                  <div className="my-1 h-px bg-neutral-800" />
                  <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <IconLogout size={15} />
                    {signingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Image grid */}
        <main className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center text-neutral-500 text-sm">
              Loading assets...
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center text-red-400 text-sm">
              Error: {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-neutral-500">
              <IconPhoto size={32} className="mb-2" />
              <p className="text-sm">No images match your filters.</p>
              <button onClick={clearFilters} className="mt-2 text-sm text-blue-400 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
                {filtered.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 text-left"
                  >
                    <Image
                      height={100}
                      width={100}
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
                      {img.name} · {img.price === 0 ? "Free" : `$${img.price}`}
                    </div>
                  </button>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-center gap-3 text-sm text-neutral-400">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="rounded-lg border border-neutral-800 px-3 py-1.5 disabled:opacity-30 hover:bg-neutral-800"
                >
                  ← Prev
                </button>
                <span>
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-neutral-800 px-3 py-1.5 disabled:opacity-30 hover:bg-neutral-800"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex max-h-full max-w-3xl flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-1.5 text-neutral-300 hover:bg-black/80"
            >
              <IconX size={18} />
            </button>

            <div className="flex max-h-[70vh] items-center justify-center bg-neutral-950">
              <Image
                src={selectedImage.url}
                alt={selectedImage.name}
                width={800}
                height={800}
                className="max-h-[70vh] w-auto object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-neutral-800 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-neutral-100">
                  {selectedImage.name}
                </div>
                <div className="text-xs text-neutral-500">
                  {selectedImage.category.replace(/_/g, " ")} ·{" "}
                  {selectedImage.price === 0 ? "Free" : `$${selectedImage.price}`}
                </div>
              </div>
              <button
                onClick={() => handleDownload(selectedImage)}
                disabled={downloading}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
              >
                <IconDownload size={15} />
                {downloading ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}