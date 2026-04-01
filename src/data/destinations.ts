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
  routeSnapshot: string;
  keyExperiences: string[];
  featuredIn?: string[];
  hotelSuggestions?: string[];
};

export const destinations: DestinationItem[] = [
  {
    slug: "sigiriya-rock-fortress",
    title: "Sigiriya",
    location: "Cultural Triangle",
    area: "Cultural Triangle",
    rating: "4.9",
    reviews: 128,
    duration: "Full Day",
    bestFor: "Cultural Triangle Tours",
    image: "/images/hero-sigiriya.svg",
    highlights: "Sigiriya Rock Fortress, village safari experience, and cultural triangle sightseeing.",
    description:
      "Visit Sigiriya as a core stop in cultural routes with rock fortress views, nearby village experiences, and easy connections to Kandy.",
    routeSnapshot: "Airport -> Dambulla -> Sigiriya -> Kandy",
    keyExperiences: ["Climb Sigiriya Rock Fortress", "Village safari experience", "Dambulla cave temples", "Scenic cultural triangle drives"],
    featuredIn: ["04 Days Miniature Tour", "06 Days Classic Escape", "07 Days Splendor Tour", "08 Days Grand Splendor Tour", "09 Days Witness the Beauty"],
    hotelSuggestions: [
      "Hotel Sigiriya (mid-range, high reviews)",
      "Roo Mansala Boutique Villa (luxury)",
      "Sigiriya Kings Resort",
      "Lion See Hotel (budget-friendly)",
      "EKHO Sigiriya",
      "Sigiriya Jungles Resort & Spa",
      "Wild Grass Nature Resort (premium nature stay)",
    ],
  },
  {
    slug: "yala-safari-adventure",
    title: "Yala National Park",
    location: "Southern Wild Coast",
    area: "Southern Province",
    rating: "4.8",
    reviews: 89,
    duration: "Full Day",
    bestFor: "Safari Routes",
    image: "/images/hero-yala.svg",
    highlights: "Yala jeep safari, wildlife sightings, and nature-focused travel.",
    description:
      "Experience Sri Lanka's most famous safari park with opportunities to spot leopards, elephants, and rich birdlife.",
    routeSnapshot: "Ella -> Yala National Park -> South Coast",
    keyExperiences: ["Yala safari (leopards)", "Multiple wildlife sightings", "Bird watching", "Nature-focused travel flow"],
    featuredIn: ["07 Days Splendor Tour", "09 Days Witness the Beauty", "12 Days Nature & Safari Tour", "15 Days Supreme Sri Lanka Tour"],
  },
  {
    slug: "ella-scenic-highlands",
    title: "Ella",
    location: "Hill Country",
    area: "Uva Province",
    rating: "5.0",
    reviews: 156,
    duration: "2 Days",
    bestFor: "Hill Country Tours",
    image: "/images/hero-lanka.svg",
    highlights: "Nine Arch Bridge, Little Adam's Peak, and scenic hill-country views.",
    description:
      "Unwind in cool mountain air with tea country landscapes, scenic train moments, and easy hikes for all travel styles.",
    routeSnapshot: "Kandy -> Nuwara Eliya -> Ella",
    keyExperiences: ["Nine Arch Bridge", "Little Adam's Peak", "Scenic hill-country views", "Tea country stopovers"],
    hotelSuggestions: ["Cool climate and scenic views", "Ideal for romantic and nature stays"],
    featuredIn: ["06 Days Classic Escape", "07 Days Splendor Tour", "08 Days Grand Splendor Tour", "09 Days Witness the Beauty", "12 Days Nature & Safari Tour"],
  },
  {
    slug: "mirissa-whale-coast",
    title: "Mirissa",
    location: "South Coast",
    area: "South Coast",
    rating: "4.9",
    reviews: 128,
    duration: "2 Days",
    bestFor: "South Coast Tours",
    image: "/images/hero-mirissa.svg",
    highlights: "Beach relaxation, whale watching (seasonal), and south coast stays.",
    description:
      "Enjoy tropical beach life, optional whale watching, and a relaxing south-coast atmosphere with sunset vibes.",
    routeSnapshot: "Yala -> Mirissa -> Galle",
    keyExperiences: ["Whale watching (seasonal)", "Beach relaxation", "Safari + beach combination", "Instagram-worthy coast views"],
    featuredIn: ["07 Days Splendor Tour", "09 Days Witness the Beauty"],
  },
  {
    slug: "kandy-heritage-walk",
    title: "Kandy",
    location: "Central Province",
    area: "Central Province",
    rating: "4.7",
    reviews: 74,
    duration: "Full Day",
    bestFor: "Culture + Hill Country",
    image: "/images/hero-sigiriya.svg",
    highlights: "Temple of the Tooth, cultural dance show, and city heritage.",
    description:
      "Discover Sri Lanka's cultural heart with sacred temples, heritage streets, and vibrant traditional performances.",
    routeSnapshot: "Sigiriya -> Kandy -> Nuwara Eliya",
    keyExperiences: ["Temple of the Tooth Relic", "Cultural dance show", "Smooth hill-country transition", "Culture + nature route balance"],
    featuredIn: ["04 Days Miniature Tour", "06 Days Classic Escape", "07 Days Splendor Tour", "08 Days Grand Splendor Tour", "09 Days Witness the Beauty", "12 Days Nature & Safari Tour"],
    hotelSuggestions: [
      "Radisson Hotel Kandy",
      "Kings Pavilion Kandy (luxury)",
      "The Radh Hotel",
      "Coffee Bungalow Kandy",
      "Castle Hill Bungalow",
      "Boutique options available",
    ],
  },
  {
    slug: "galle-fort-beaches",
    title: "Galle",
    location: "Southwest Coast",
    area: "Southwest Coast",
    rating: "4.8",
    reviews: 96,
    duration: "Half Day",
    bestFor: "South Coast + Fort",
    image: "/images/hero-mirissa.svg",
    highlights: "Dutch fort sunset, beach + history combination, and coastal route.",
    description:
      "Walk colonial-era lanes, enjoy coastal cafes, and end your day with ocean sunsets from Galle's historic fort walls.",
    routeSnapshot: "Ella -> Galle -> Bentota -> Colombo",
    keyExperiences: ["Dutch Fort sunset", "Beach + history combination", "Coastal route stopovers", "Relaxed evening city walk"],
    featuredIn: ["08 Days Grand Splendor Tour", "15 Days Supreme Sri Lanka Tour"],
  },
  {
    slug: "nuwara-eliya-tea-country",
    title: "Nuwara Eliya",
    location: "Central Highlands",
    area: "Central Highlands",
    rating: "4.8",
    reviews: 85,
    duration: "Full Day",
    bestFor: "Tea Country",
    image: "/images/hero-lanka.svg",
    highlights: "Tea plantations, waterfalls, and cool hill-country climate.",
    description:
      "Visit tea estates and highland viewpoints in Sri Lanka's scenic central region with relaxed pacing and photo stops.",
    routeSnapshot: "Kandy -> Nuwara Eliya -> Ella",
    keyExperiences: ["Tea plantations and waterfalls", "Cool hill-country climate", "Romantic viewpoints", "Nature-focused stays"],
    hotelSuggestions: ["Cool climate and scenic views", "Ideal for romantic and nature stays"],
    featuredIn: ["06 Days Classic Escape", "09 Days Witness the Beauty", "15 Days Supreme Sri Lanka Tour"],
  },
  {
    slug: "anuradhapura-sacred-city",
    title: "Anuradhapura",
    location: "North Central Province",
    area: "North Central Province",
    rating: "4.9",
    reviews: 101,
    duration: "Full Day",
    bestFor: "Ancient Heritage",
    image: "/images/hero-sigiriya.svg",
    highlights: "Ancient stupas, sacred bodhi tree, and archeological treasures.",
    description:
      "Explore one of the world's oldest continuously inhabited cities and connect with Sri Lanka's sacred Buddhist heritage.",
    routeSnapshot: "Negombo -> Anuradhapura -> Sigiriya",
    keyExperiences: ["Ancient stupas", "Sri Maha Bodhi", "Sacred city heritage", "Archaeological park zones"],
    featuredIn: ["08 Days Grand Splendor Tour", "15 Days Supreme Sri Lanka Tour"],
  },
];
