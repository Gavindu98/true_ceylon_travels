export type DestinationItem = {
  slug: string;
  title: string;
  location: string;
  area: string;
  rating: string;
  reviews: number;
  duration: string;
  bestFor: string;
  image: string;
  highlights: string;
  description: string;
};

export const destinations: DestinationItem[] = [
  {
    slug: "sigiriya-rock-fortress",
    title: "Sigiriya Rock Fortress",
    location: "Cultural Triangle",
    area: "Cultural Triangle",
    rating: "4.9",
    reviews: 128,
    duration: "Full Day",
    bestFor: "History Lovers",
    image: "/images/hero-sigiriya.svg",
    highlights: "Ancient fortress, village experience, and panoramic sunset views.",
    description:
      "Climb the iconic Sigiriya Rock and explore Sri Lanka's royal history with local storytelling, village life, and scenic viewpoints.",
  },
  {
    slug: "yala-safari-adventure",
    title: "Yala Safari Adventure",
    location: "Southern Wild Coast",
    area: "Southern Province",
    rating: "4.8",
    reviews: 89,
    duration: "Full Day",
    bestFor: "Wildlife Travelers",
    image: "/images/hero-yala.svg",
    highlights: "Leopard tracking, birdwatching, and expert naturalist-guided safari.",
    description:
      "Experience Sri Lanka's most famous safari park with opportunities to spot leopards, elephants, and rich birdlife.",
  },
  {
    slug: "ella-scenic-highlands",
    title: "Ella Scenic Highlands",
    location: "Hill Country",
    area: "Uva Province",
    rating: "5.0",
    reviews: 156,
    duration: "2 Days",
    bestFor: "Nature & Couples",
    image: "/images/hero-lanka.svg",
    highlights: "Nine Arch Bridge, tea estates, and Little Adam's Peak hikes.",
    description:
      "Unwind in cool mountain air with tea country landscapes, scenic train moments, and easy hikes for all travel styles.",
  },
  {
    slug: "mirissa-whale-coast",
    title: "Mirissa Whale Coast",
    location: "South Coast",
    area: "South Coast",
    rating: "4.9",
    reviews: 128,
    duration: "2 Days",
    bestFor: "Beach Holidays",
    image: "/images/hero-mirissa.svg",
    highlights: "Golden beaches, whale watching, and seafood nights.",
    description:
      "Enjoy tropical beach life, optional whale watching, and a relaxing south-coast atmosphere with sunset vibes.",
  },
  {
    slug: "kandy-heritage-walk",
    title: "Kandy Heritage Walk",
    location: "Central Province",
    area: "Central Province",
    rating: "4.7",
    reviews: 74,
    duration: "Full Day",
    bestFor: "Families",
    image: "/images/hero-sigiriya.svg",
    highlights: "Temple of the Tooth, cultural dance, and botanical gardens.",
    description:
      "Discover Sri Lanka's cultural heart with sacred temples, heritage streets, and vibrant traditional performances.",
  },
  {
    slug: "galle-fort-beaches",
    title: "Galle Fort & Beaches",
    location: "Southwest Coast",
    area: "Southwest Coast",
    rating: "4.8",
    reviews: 96,
    duration: "Half Day",
    bestFor: "Relaxed Explorers",
    image: "/images/hero-mirissa.svg",
    highlights: "Dutch fort streets, boutique cafes, and sunset rampart views.",
    description:
      "Walk colonial-era lanes, enjoy coastal cafes, and end your day with ocean sunsets from Galle's historic fort walls.",
  },
  {
    slug: "nuwara-eliya-tea-country",
    title: "Nuwara Eliya Tea Country",
    location: "Central Highlands",
    area: "Central Highlands",
    rating: "4.8",
    reviews: 85,
    duration: "Full Day",
    bestFor: "Scenic Routes",
    image: "/images/hero-lanka.svg",
    highlights: "Tea factory tours, waterfalls, and cool mountain climate.",
    description:
      "Visit tea estates and highland viewpoints in Sri Lanka's scenic central region with relaxed pacing and photo stops.",
  },
  {
    slug: "anuradhapura-sacred-city",
    title: "Anuradhapura Sacred City",
    location: "North Central Province",
    area: "North Central Province",
    rating: "4.9",
    reviews: 101,
    duration: "Full Day",
    bestFor: "Cultural Deep Dive",
    image: "/images/hero-sigiriya.svg",
    highlights: "Ancient stupas, sacred bodhi tree, and archeological treasures.",
    description:
      "Explore one of the world's oldest continuously inhabited cities and connect with Sri Lanka's sacred Buddhist heritage.",
  },
];
