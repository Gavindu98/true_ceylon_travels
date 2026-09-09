export type HoneymoonTripItem = {
  slug: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  duration: string;
  bestFor: string;
  routeFlow: string;
  highlights: string[];
  romanticTouches: string[];
  sampleItinerary: string[];
  inclusions: string[];
  idealFor: string[];
};

export const honeymoonTrips: HoneymoonTripItem[] = [
  {
    slug: "coastal-romance-escape",
    title: "Coastal Romance Escape",
    description: "A slow south-coast getaway with fort sunsets, quiet beaches, and private leisure time.",
    duration: "4 to 6 Days",
    bestFor: "Couples seeking beach calm and golden-hour walks",
    routeFlow: "Airport -> Bentota / Beruwala -> Galle -> Mirissa -> Airport",
    highlights: [
      "Private beach time on the southwest coast",
      "Galle Fort sunset stroll",
      "Boutique cafe and seaside dining",
      "Optional whale-watching in season",
    ],
    romanticTouches: [
      "Flexible late mornings built into the plan",
      "Sunset viewpoints chosen for quieter moments",
      "Private vehicle so you travel at your own pace",
    ],
    sampleItinerary: [
      "Arrival transfer and coastal check-in",
      "Leisure beach day with optional spa or boat ride",
      "Galle Fort exploration and sunset on the ramparts",
      "Mirissa or Tangalle beach day before departure",
    ],
    inclusions: [
      "Private A/C chauffeur vehicle",
      "Comfort-first route planning",
      "Hotel pickup and drop-off support",
      "Flexible photo and rest stops",
    ],
    idealFor: ["Newlyweds", "Anniversary travelers", "Couples wanting a short romantic break"],
  },
  {
    slug: "hill-country-honeymoon",
    title: "Hill Country Honeymoon",
    description: "Cool climate romance through tea estates, misty viewpoints, and scenic mountain towns.",
    duration: "5 to 7 Days",
    bestFor: "Couples who love nature, tea country, and cooler weather",
    routeFlow: "Airport -> Kandy -> Nuwara Eliya -> Ella -> Airport",
    highlights: [
      "Temple of the Tooth and Kandy Lake",
      "Tea plantation landscapes",
      "Nuwara Eliya highland charm",
      "Ella viewpoints and Nine Arch Bridge",
    ],
    romanticTouches: [
      "Scenic viewpoint stops for couple photos",
      "Optional train segment where schedules allow",
      "Relaxed pacing through winding hill roads",
    ],
    sampleItinerary: [
      "Transfer to Kandy with cultural evening options",
      "Tea country drive toward Nuwara Eliya",
      "Highland leisure and estate viewpoints",
      "Ella walks and scenic lookouts before return",
    ],
    inclusions: [
      "Private hill-country chauffeur service",
      "Route customization around your dates",
      "Comfort stops and flexible timing",
      "Local dining recommendations",
    ],
    idealFor: ["Nature-loving couples", "Photographers", "Cool-climate honeymooners"],
  },
  {
    slug: "classic-island-romance",
    title: "Classic Island Romance",
    description: "A balanced honeymoon mixing heritage highlights, hill country beauty, and a soft beach finish.",
    duration: "7 to 9 Days",
    bestFor: "First-time visitors wanting culture, scenery, and coast in one trip",
    routeFlow: "Airport -> Sigiriya -> Kandy -> Nuwara Eliya / Ella -> Beach -> Airport",
    highlights: [
      "Sigiriya Rock Fortress",
      "Kandy cultural experiences",
      "Tea country and mountain views",
      "Final days by the beach",
    ],
    romanticTouches: [
      "Smooth routing with minimal backtracking",
      "Private vehicle for privacy throughout",
      "Space for unhurried evenings together",
    ],
    sampleItinerary: [
      "Arrival and Cultural Triangle introduction",
      "Sigiriya and village-side landscapes",
      "Kandy heritage and lake area",
      "Hill country scenic drive",
      "Beach unwind before departure",
    ],
    inclusions: [
      "Private chauffeur-driven vehicle",
      "Comfort-focused multi-day routing",
      "Flexible sightseeing windows",
      "Airport transfer coordination",
    ],
    idealFor: ["First honeymoon in Sri Lanka", "Couples wanting variety", "Medium-length romantic holidays"],
  },
  {
    slug: "wildlife-and-beach-romance",
    title: "Wildlife & Beach Romance",
    description: "Shared safari adventure paired with soft coastal days for an exciting yet relaxed honeymoon.",
    duration: "6 to 8 Days",
    bestFor: "Couples who want wildlife moments plus beach downtime",
    routeFlow: "Airport -> Yala / Udawalawe -> Mirissa / Tangalle -> Galle -> Airport",
    highlights: [
      "Private safari coordination",
      "Open grassland and wildlife viewing",
      "South-coast beach leisure",
      "Optional Galle Fort evening",
    ],
    romanticTouches: [
      "Adventure by day, quiet beach evenings",
      "Flexible safari timing support",
      "Private transfers between parks and coast",
    ],
    sampleItinerary: [
      "Transfer toward wildlife region",
      "Guided safari game drive",
      "Move to the south coast for beach days",
      "Optional fort sunset and departure transfer",
    ],
    inclusions: [
      "Private road transfers",
      "Safari slot coordination support",
      "Flexible coastal leisure planning",
      "Comfort-focused pacing",
    ],
    idealFor: ["Adventure-leaning couples", "Nature lovers", "Active honeymoon styles"],
  },
  {
    slug: "luxury-leisure-honeymoon",
    title: "Luxury Leisure Honeymoon",
    description: "A soft-paced private journey designed around boutique stays, scenic drives, and unhurried romance.",
    duration: "8 to 12 Days",
    bestFor: "Couples prioritizing privacy, comfort, and slow travel",
    routeFlow: "Fully tailored across cultural, hill, and beach regions",
    highlights: [
      "Boutique and premium stay suggestions",
      "Private chauffeur service throughout",
      "Scenic routes with fewer rushed stops",
      "Custom mix of culture, nature, and coast",
    ],
    romanticTouches: [
      "Itinerary shaped around your preferred pace",
      "Extra leisure windows each day",
      "Discreet private transfers and flexible timing",
    ],
    sampleItinerary: [
      "Consultation on preferred regions and stay style",
      "Tailored multi-region route proposal",
      "Daily pacing adjusted for rest and romance",
      "Departure with airport transfer support",
    ],
    inclusions: [
      "Trip consultation and custom route design",
      "Private luxury-focused vehicle options",
      "Stay-category guidance",
      "Full-trip chauffeur support",
    ],
    idealFor: ["Luxury honeymooners", "Couples wanting full customization", "Longer romantic stays"],
  },
  {
    slug: "short-romantic-getaway",
    title: "Short Romantic Getaway",
    description: "A compact private escape for couples with limited days who still want signature Sri Lanka romance.",
    duration: "3 to 4 Days",
    bestFor: "Short breaks, anniversaries, and long-weekend couples",
    routeFlow: "Airport -> Kandy or Galle / Beach -> Airport",
    highlights: [
      "One signature region chosen around your dates",
      "Private transfers with no group schedule",
      "Scenic viewpoints and relaxed dining time",
      "Easy airport connections",
    ],
    romanticTouches: [
      "Focused route to reduce road fatigue",
      "Evening free time prioritized",
      "Simple, elegant pacing for short stays",
    ],
    sampleItinerary: [
      "Arrival and transfer to your romantic base",
      "Leisure sightseeing and couple free time",
      "Optional second highlight before departure",
      "Airport drop-off",
    ],
    inclusions: [
      "Private A/C vehicle",
      "Short-break route planning",
      "Flexible stopovers",
      "Pickup and drop-off support",
    ],
    idealFor: ["Anniversary trips", "Busy couples", "Add-on romantic extensions"],
  },
];
