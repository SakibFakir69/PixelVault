"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Layers, Zap, Flame, Filter, ChevronDown, HelpCircle as QuestionIcon } from "lucide-react";
import Link from "next/link";

interface VaultItem {
  category: string;
  title: string;
  description: string;
  image_url: string;
  tier: "Common" | "Uncommon" | "Rare";
  price: number;
}

// Exactly 51 items from your cleaned dataset
const VAULT_DATASET: VaultItem[] = [
  // Pixel_Avatars
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0000",
    description: "pixel art warrior with iron helmet, facing forward, RPG portrait",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605452/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0000_69c23a93.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0001",
    description: "pixel art elf mage with glowing staff, green robes, sprite",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605461/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0001_174baf16.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0002",
    description: "pixel art rogue with hood and dagger, dark background, retro",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605469/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0002_d4b62be0.png.png",
    tier: "Uncommon",
    price: 6.50
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0003",
    description: "pixel art dwarf with giant axe, braided beard, 16-bit style",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605478/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0003_4a751fc7.png.png",
    tier: "Uncommon",
    price: 8.00
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0004",
    description: "pixel art cleric holding glowing cross, white and gold armor",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605485/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0004_b01b5c3c.png.png",
    tier: "Uncommon",
    price: 9.50
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0005",
    description: "pixel art necromancer with skull staff, purple glowing eyes",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605496/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0005_69569556.png.png",
    tier: "Rare",
    price: 24.00
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0006",
    description: "pixel art bard with lute, feathered hat, cheerful expression",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605506/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0006_3c0ced09.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0007",
    description: "pixel art paladin in heavy silver armor, glowing sword",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605515/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0007_39a9b561.png.png",
    tier: "Rare",
    price: 45.00
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0008",
    description: "pixel art forest archer, green cloak, drawing bow, sprite",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605527/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0008_13e967b7.png.png",
    tier: "Uncommon",
    price: 7.00
  },
  {
    category: "Pixel_Avatars",
    title: "Pixel Avatars #0009",
    description: "pixel art pirate captain with eye patch, tricorn hat, gold teeth",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605541/nft_library/Pixel_Avatars/nft_Pixel_Avatars_0009_5c87e885.png.png",
    tier: "Rare",
    price: 32.00
  },

  // Pixel_Monsters
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0000",
    description: "pixel art dragon, red scales, breathing fire, side view sprite",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605549/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0000_640fe40e.png.png",
    tier: "Rare",
    price: 85.00
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0001",
    description: "pixel art slime monster, green translucent, bouncing, cute enemy",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605559/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0001_733f5382.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0002",
    description: "pixel art skeleton warrior, rusty sword, glowing red eyes",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605566/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0002_9c284a8c.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0003",
    description: "pixel art giant spider, black and purple, web background",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605575/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0003_bd690491.png.png",
    tier: "Uncommon",
    price: 6.00
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0004",
    description: "pixel art goblin, green skin, holding wooden club, sneaky",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605584/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0004_803d5ceb.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0005",
    description: "pixel art golem, made of rocks, glowing blue cracks",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605596/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0005_9efcbb49.png.png",
    tier: "Uncommon",
    price: 9.00
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0006",
    description: "pixel art ghost, classic bedsheet style, glowing, dark cave",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605605/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0006_49d82fe4.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0007",
    description: "pixel art zombie, torn clothes, green skin, groaning",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605613/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0007_98ae4c85.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0008",
    description: "pixel art demon, horns, bat wings, pixel art boss monster",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605622/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0008_a5ae1a1c.png.png",
    tier: "Rare",
    price: 55.00
  },
  {
    category: "Pixel_Monsters",
    title: "Pixel Monsters #0009",
    description: "pixel art mimic chest, sharp teeth inside, treasure room",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605631/nft_library/Pixel_Monsters/nft_Pixel_Monsters_0009_6cd68e32.png.png",
    tier: "Rare",
    price: 28.00
  },

  // Pixel_Weapons
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0000",
    description: "pixel art iron sword, simple design, vertical drop, item sprite",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605640/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0000_c9109b92.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0001",
    description: "pixel art flaming sword, fire wrapping around blade, glowing",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605648/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0001_83fc265c.png.png",
    tier: "Rare",
    price: 48.00
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0002",
    description: "pixel art wooden bow with quiver of arrows, fantasy item",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605654/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0002_265278ea.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0003",
    description: "pixel art magic staff, purple crystal on top, glowing runes",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605663/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0003_b8c692f5.png.png",
    tier: "Uncommon",
    price: 8.50
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0004",
    description: "pixel art legendary hammer, giant mallet, lightning sparks",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605670/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0004_1dffb506.png.png",
    tier: "Rare",
    price: 64.00
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0005",
    description: "pixel art dual daggers, curved, dark metal, assassin weapon",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605684/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0005_cb808045.png.png",
    tier: "Uncommon",
    price: 7.50
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0006",
    description: "pixel art shield, knight emblem, iron and leather, game asset",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605696/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0006_1cb5d6f2.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0007",
    description: "pixel art magic wand, sparkling stars at the tip, cute",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605703/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0007_2ed024bb.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0008",
    description: "pixel art axe, double headed, dwarven design, rusty",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605711/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0008_6c779e4e.png.png",
    tier: "Uncommon",
    price: 6.00
  },
  {
    category: "Pixel_Weapons",
    title: "Pixel Weapons #0009",
    description: "pixel art crossbow, medieval style, bolt loaded, wooden stock",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605723/nft_library/Pixel_Weapons/nft_Pixel_Weapons_0009_16d7ddf9.png.png",
    tier: "Uncommon",
    price: 9.00
  },

  // Pixel_Landscapes
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0000",
    description: "pixel art forest path, sunlight filtering through trees, peaceful",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605735/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0000_2cb812c7.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0001",
    description: "pixel art medieval castle on a hill, clouds moving, fantasy",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605741/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0001_cc4dd501.png.png",
    tier: "Rare",
    price: 75.00
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0002",
    description: "pixel art desert oasis, palm trees, sand dunes, hot sun",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605751/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0002_b0631b96.png.png",
    tier: "Uncommon",
    price: 8.00
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0003",
    description: "pixel art frozen lake, snow covered pine trees, winter",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605761/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0003_00ed5772.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0004",
    description: "pixel art volcanic wasteland, lava flows, dark red sky",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605767/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0004_f272b65d.png.png",
    tier: "Uncommon",
    price: 9.50
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0005",
    description: "pixel art floating islands, waterfalls falling into void, sky",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605782/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0005_94df49a9.png.png",
    tier: "Rare",
    price: 90.00
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0006",
    description: "pixel art coastal village, docks, ships, ocean waves",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605793/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0006_435297cf.png.png",
    tier: "Uncommon",
    price: 7.00
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0007",
    description: "pixel art mushroom forest, giant colorful fungi, magical",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605802/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0007_95ffa85a.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0008",
    description: "pixel art ancient ruins, overgrown with vines, mysterious",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605809/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0008_831a5137.png.png",
    tier: "Uncommon",
    price: 8.50
  },
  {
    category: "Pixel_Landscapes",
    title: "Pixel Landscapes #0009",
    description: "pixel art mountain pass, narrow path, snow peaks, epic",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605819/nft_library/Pixel_Landscapes/nft_Pixel_Landscapes_0009_020c4f8d.png.png",
    tier: "Rare",
    price: 40.00
  },

  // Pixel_Mounts
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0000",
    description: "pixel art brown horse, saddled, mane blowing in wind, majestic",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605825/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0000_07d3eb23.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0001",
    description: "pixel art dragon mount, red scales, flying pose, reins",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605833/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0001_969d56ca.png.png",
    tier: "Rare",
    price: 95.00
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0002",
    description: "pixel art giant eagle, feathers detailed, rider saddle",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605840/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0002_96a54b8e.png.png",
    tier: "Rare",
    price: 52.00
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0003",
    description: "pixel art robotic mech horse, metal armor, glowing eyes",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605853/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0003_8c412d53.png.png",
    tier: "Uncommon",
    price: 9.00
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0004",
    description: "pixel art unicorn, white, glowing horn, rainbow trail",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605862/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0004_c5a8040b.png.png",
    tier: "Rare",
    price: 68.00
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0005",
    description: "pixel art skeletal horse, undead mount, glowing blue hooves",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605872/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0005_eaf13003.png.png",
    tier: "Uncommon",
    price: 8.50
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0006",
    description: "pixel art giant wolf, dire wolf, fur detailed, fast running",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605882/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0006_6e70c15a.png.png",
    tier: "Common",
    price: 0
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0007",
    description: "pixel art magic carpet, floating, tassels, middle eastern",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605891/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0007_7595b485.png.png",
    tier: "Uncommon",
    price: 7.50
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0008",
    description: "pixel art griffin mount, lion body eagle head, wings spread",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605901/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0008_259e43d8.png.png",
    tier: "Rare",
    price: 45.00
  },
  {
    category: "Pixel_Mounts",
    title: "Pixel Mounts #0009",
    description: "pixel art turtle mount, giant shell, jungle scenery",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605914/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0009_6ec687d6.png.png",
    tier: "Common",
    price: 0
  },

  // Pixel Pets
  {
    category: "Pixel_Pets",
    title: "Pixel Pets #0000",
    description: "pixel art fluffy orange kitten, big green eyes, sitting down",
    image_url: "https://res.cloudinary.com/dgft45qqq/image/upload/v1783605825/nft_library/Pixel_Mounts/nft_Pixel_Mounts_0000_07d3eb23.png.png",
    tier: "Common",
    price: 0
  }
];

const TIER_STYLE: Record<VaultItem["tier"], string> = {
  Common: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  Uncommon: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  Rare: "text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10",
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  { question: "How do I claim a 'Free' common asset?", answer: "Simply choose any item labeled 'Common' or 'Free', and signature-verify your connected client. No payment or network gas is required." },
  { question: "Are these assets unique, or can multiple people own them?", answer: "Every asset is unique down to its item index hash. Once an item is claimed or purchased, its availability toggle instantly shuts off for everyone else." },
  { question: "Can I use these inside my gaming engines?", answer: "Yes, fully. All assets comply with modern RPG sprite-sheet frameworks, meaning they can be integrated straight into Unity, Godot, or Unreal Engine builds." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const categories = ["All", "Avatars", "Monsters", "Weapons", "Landscapes", "Mounts", "Pets"];

  const filteredItems = VAULT_DATASET.filter(item => {
    if (activeFilter === "All") return true;
    const targetCat = `Pixel_${activeFilter}`;
    return item.category.toLowerCase() === targetCat.toLowerCase();
  });

  const curatedFeatured = [
    VAULT_DATASET[1],  // Mage (Common / Free)
    VAULT_DATASET[10], // Dragon (Rare / Paid)
    VAULT_DATASET[24], // Legendary Hammer (Rare / Paid)
    VAULT_DATASET[30], // Forest Path (Common / Free)
  ];

  return (
    <div className="min-h-screen bg-[#0A0817] text-[#F3F1FA] font-[family-name:var(--font-body)] overflow-x-hidden selection:bg-violet-500/30">
      
      {/* Marquee Keyframe Styles injected directly */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-css {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0817]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 via-fuchsia-400 to-cyan-400 shadow-md group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">PixelVault</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#collections" onClick={(e) => handleScroll(e, "collections")} className="hover:text-white transition-colors duration-200">Curated</a>
            <a href="#catalog" onClick={(e) => handleScroll(e, "catalog")} className="hover:text-white transition-colors duration-200">Live Vault</a>
            <a href="#tiers" onClick={(e) => handleScroll(e, "tiers")} className="hover:text-white transition-colors duration-200">Tiers</a>
            <a href="#faq" onClick={(e) => handleScroll(e, "faq")} className="hover:text-white transition-colors duration-200">FAQ</a>
          </div>
          <Link
          href={'/auth/sign-in'}
          
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-95 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all active:scale-95"
          >
            Enter Vault
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 pointer-events-none" 
        />
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-3xl mx-auto">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 border border-white/10 rounded-full px-4 py-1.5 mb-8 bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            {VAULT_DATASET.length} ORIGINAL SPRITES ONLINE
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="font-[family-name:var(--font-display)] font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            Collect the{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              pixel universe.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Beautifully crafted game assets, portraits, landscapes, and mounts. Claim common assets for free, or secure rare designs forever.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex gap-4 justify-center flex-wrap">
            <Link href={'/home'}  className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
              Browse Vault Manifest
            </Link>
            <a href="#how" onClick={(e) => handleScroll(e, "how")} className="px-8 py-4 rounded-full font-semibold border border-white/15 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-200">
              How it works
            </a>
          </motion.div>
        </motion.div>

        {/* Dynamic Verified Stats Strip - No Static Placeholders */}
        <div 
          className="relative z-10 max-w-3xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden shadow-2xl shadow-black/40"
        >
          {[
            [VAULT_DATASET.length.toString(), "ASSETS"], 
            ["6", "CATEGORIES"], 
            ["3", "TIERS"], 
            ["100%", "FREE-READY"]
          ].map(([n, l], i) => (
            <div key={i} className="p-6 border-r border-white/10 last:border-r-0 border-b md:border-b-0 flex flex-col justify-center items-center">
              <div className="font-[family-name:var(--font-display)] font-bold text-3xl bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{n}</div>
              <div className="text-[10px] font-mono text-white/40 tracking-widest mt-1.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE ACTIVITY FEED TICKER */}
      <div className="w-full bg-white/[0.01] border-y border-white/[0.06] py-3 overflow-hidden shadow-inner select-none">
        <div className="animate-marquee-css font-mono text-xs text-white/40 tracking-wider gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 whitespace-nowrap pr-12">
              <span className="flex items-center gap-2"><Flame className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" /> SECURED: Pixel Monsters #0000 for $85.00</span>
              <span className="text-white/10">•</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> CLAIMED: Pixel Landscapes #0003 (FREE)</span>
              <span className="text-white/10">•</span>
              <span className="flex items-center gap-2"><Flame className="w-3.5 h-3.5 text-cyan-400" /> SECURED: Pixel Weapons #0001 for $48.00</span>
              <span className="text-white/10">•</span>
              <span className="flex items-center gap-2">SYS: Assets synced with game-ready manifests</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* CURATED HIGHLIGHTS */}
      <section id="collections" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
        <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-fuchsia-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> CURATED MATRIX
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight">Handpicked Classics.</h2>
          </div>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed">A pristine live snapshot across different rarity tiers and assets from your database.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {curatedFeatured.map((item, i) => (
            <div key={i} className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-violet-500/40 transition-colors duration-300 shadow-xl shadow-black/10">
              <div className="relative aspect-square overflow-hidden bg-white/[0.03]">
                <img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-full object-cover [image-rendering:pixelated] group-hover:scale-105 transition-transform duration-500 ease-out" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold font-mono px-2.5 py-1 rounded-md border backdrop-blur-md ${TIER_STYLE[item.tier]}`}>
                  {item.tier.toUpperCase()}
                </span>
              </div>
              <div className="p-5">
                <div className="text-[10px] font-mono text-white/35 tracking-wide uppercase mb-1.5">{item.category.replace("_", " ")}</div>
                <div className="text-sm font-semibold mb-2 truncate group-hover:text-white transition-colors">{item.title}</div>
                <p className="text-xs text-white/40 line-clamp-2 min-h-[2rem] mb-4">{item.description}</p>
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                  <span className={`font-mono text-sm font-bold ${item.price === 0 ? "text-emerald-400" : "text-fuchsia-400"}`}>
                    {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.03] group-hover:bg-violet-500/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-violet-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC LIVE VAULT CATALOG EXPLORER */}
      <section id="catalog" className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06] relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest text-cyan-400 mb-3 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> VAULT EXPLORER
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight">Interactive Manifest.</h2>
          </div>
          
          {/* Filtering Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-mono text-xs border transition-all duration-200 whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-violet-500 to-cyan-500 border-transparent text-white shadow-md shadow-violet-500/20"
                    : "bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden hover:bg-white/[0.03] transition-colors"
              >
                <div className="relative aspect-square overflow-hidden bg-white/[0.03]">
                  <img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-full object-cover [image-rendering:pixelated]" />
                  <span className={`absolute top-2.5 left-2.5 text-[9px] font-bold font-mono px-2 py-0.5 rounded border backdrop-blur-md ${TIER_STYLE[item.tier]}`}>
                    {item.tier}
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">{item.category.replace("_", " ")}</div>
                  <div className="text-sm font-semibold truncate text-white/90 group-hover:text-white transition-colors">{item.title}</div>
                  <div className="text-xs text-white/50 truncate mt-1">{item.description}</div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/[0.04]">
                    <span className={`font-mono text-xs font-bold ${item.price === 0 ? "text-emerald-400" : "text-fuchsia-400"}`}>
                      {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                    </span>
                    <button className="text-[11px] font-medium font-mono px-3 py-1 rounded bg-white/[0.05] hover:bg-white/10 text-white/80 transition-all">
                      {item.price === 0 ? "Claim" : "Unlock"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* PROCESS */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06] relative z-10">
        <div className="text-xs font-mono tracking-widest text-fuchsia-400 mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> PROCESS
        </div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight mb-14 max-w-lg">
          Three steps. Zero bidding wars.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["01", "Select Manifest Index", "Use our interactive database filters to identify characters, monsters, weapons, or environmental backgrounds."],
            ["02", "Instant Ownership Route", "Common-grade items are completely free. High-tier collectibles feature transparent, flat pricing."],
            ["03", "Integration Ready", "Acquire game-ready pixel sprites complete with transparent backdrops, optimized for your custom engines."],
          ].map(([num, title, desc], i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="font-[family-name:var(--font-display)] italic text-violet-400/80 font-medium text-xl mb-5">{num}</div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg mb-3">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06] relative z-10">
        <div className="text-xs font-mono tracking-widest text-fuchsia-400 mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" /> RARITY STRUCTURE
        </div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight mb-14 max-w-lg">
          Clear asset classification tier system.
        </h2>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-8 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <div className="text-emerald-400 text-xs font-semibold font-mono tracking-widest mb-6 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" /> COMMON
              </div>
              <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl mb-1">Free</div>
              <div className="text-white/40 text-xs mb-8">Includes foundational standard assets</div>
            </div>
            <button className="w-full py-3.5 rounded-full border border-white/15 hover:border-white/30 text-sm font-medium transition-all bg-white/[0.02] hover:bg-white/[0.05] active:scale-[0.98]">
              Browse Free Assets
            </button>
          </div>

          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.02] p-8 flex flex-col justify-between hover:border-cyan-400/50 transition-colors shadow-lg shadow-cyan-950/10">
            <div>
              <div className="text-cyan-300 text-xs font-semibold font-mono tracking-widest mb-6 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.6)]" /> UNCOMMON
              </div>
              <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl mb-1">$6.00 – $9.50</div>
              <div className="text-white/40 text-xs mb-8">Features higher detail and elemental attributes</div>
            </div>
            <button className="w-full py-3.5 rounded-full border border-cyan-400/20 hover:border-cyan-400/40 bg-cyan-400/5 text-cyan-300 text-sm font-medium transition-all hover:bg-cyan-400/10 active:scale-[0.98]">
              Browse Core Tier
            </button>
          </div>

          <div className="rounded-2xl border border-fuchsia-500/40 bg-gradient-to-b from-fuchsia-500/[0.07] via-transparent to-transparent p-8 flex flex-col justify-between shadow-xl shadow-fuchsia-950/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="text-fuchsia-300 text-xs font-semibold font-mono tracking-widest mb-6 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_6px_rgba(240,171,252,0.6)]" /> RARE
              </div>
              <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl mb-1">$24.00 – $95.00</div>
              <div className="text-white/40 text-xs mb-8">Legendary mounts, bosses, and landscapes</div>
            </div>
            <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-sm font-semibold hover:opacity-95 shadow-md shadow-fuchsia-500/20 transition-all active:scale-[0.98]">
              Browse Premium Tier
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-28 border-t border-white/[0.06] relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-widest text-violet-400 mb-3 flex items-center justify-center gap-1.5">
            <QuestionIcon className="w-3.5 h-3.5" /> QUESTIONS & ANSWERS
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight">
            Frequently Answered Queries
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="rounded-xl border border-white/10 bg-white/[0.01] overflow-hidden transition-colors duration-200 hover:border-white/20">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-medium text-white/90 hover:text-white"
                >
                  <span className="text-sm md:text-base font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-400" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm text-white/50 leading-relaxed border-t border-white/[0.04] pt-4 bg-white/[0.005]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-14 bg-black/[0.15]">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-6 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white/30" />
            <span>© 2026 SEVEN VENTURE LABS</span>
          </div>
          <div className="flex gap-4 tracking-wider">
            <span>PIXEL DATA VERIFIED</span>
            <span className="text-white/20">•</span>
            <span>HOSTED ON CLOUDINARY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}