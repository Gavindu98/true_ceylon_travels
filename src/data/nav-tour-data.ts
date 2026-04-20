type BaseNavTourItem = {
  slug: string;
  title: string;
  description: string;
};

export type DayTourItem = BaseNavTourItem & {
  location: string;
  duration: string;
  bestFor: string;
  startingPrice: string;
  highlights: string[];
  itinerary: string[];
  inclusions: string[];
  idealFor: string[];
};

export type TourCategoryItem = BaseNavTourItem & {
  routeFlow: string;
  sampleDuration: string;
  travelStyle: string;
  sampleDestinations: string[];
  featuredExperiences: string[];
  whyTravelersChoose: string[];
  packageIncludes: string[];
};

export const dayTours: DayTourItem[] = [
  {
    slug: "colombo-city-tour",
    title: "Colombo City Tour",
    description: "Explore the vibrant capital city with culture, shopping, and oceanfront views.",
    location: "Colombo",
    duration: "8-10 Hours",
    bestFor: "First-time visitors and cruise stopovers",
    startingPrice: "From USD 65",
    highlights: ["Gangaramaya Temple", "Independence Square", "Pettah local market", "Galle Face sunset"],
    itinerary: ["Hotel pickup and city overview drive", "Temple and heritage zone visit", "Lunch and shopping stop", "Evening coastal promenade"],
    inclusions: ["Private A/C vehicle", "English-speaking chauffeur guide", "Flexible photo stops", "Hotel pickup and drop-off"],
    idealFor: ["Families", "Couples", "Business travelers with one free day"],
  },
  {
    slug: "kandy-day-tour",
    title: "Kandy Day Tour",
    description: "Visit Sri Lanka's sacred hill capital and experience spiritual and cultural heritage.",
    location: "Kandy",
    duration: "10-12 Hours",
    bestFor: "Culture lovers and heritage-focused travelers",
    startingPrice: "From USD 85",
    highlights: ["Temple of the Tooth", "Kandy lake walk", "Gem and craft experience", "Cultural dance show"],
    itinerary: ["Early departure to hill country", "Temple and city highlights", "Lunch with scenic viewpoint", "Traditional dance performance"],
    inclusions: ["Private transfer", "Driver guidance", "Route customization", "Refreshment breaks"],
    idealFor: ["History enthusiasts", "Pilgrimage travelers", "Small groups"],
  },
  {
    slug: "galle-day-tour",
    title: "Galle Day Tour",
    description: "Discover the historic Dutch fort and relaxed southern coastal lifestyle.",
    location: "Galle",
    duration: "9-11 Hours",
    bestFor: "Couples and beach-plus-history travelers",
    startingPrice: "From USD 90",
    highlights: ["Galle Fort ramparts", "Lighthouse and museums", "Seafood and cafe streets", "South coast viewpoints"],
    itinerary: ["Scenic south expressway drive", "Fort walking tour", "Leisure lunch inside fort", "Beach stop before return"],
    inclusions: ["Private highway transfer", "Flexible itinerary", "Local recommendations", "Pickup and drop-off"],
    idealFor: ["Honeymooners", "Photographers", "Slow-paced travelers"],
  },
  {
    slug: "sigiriya-day-tour",
    title: "Sigiriya Day Tour",
    description: "Explore the iconic ancient rock fortress and surrounding cultural triangle.",
    location: "Sigiriya",
    duration: "10-12 Hours",
    bestFor: "Ancient history and UNESCO site explorers",
    startingPrice: "From USD 95",
    highlights: ["Sigiriya Rock Fortress", "Ancient frescoes and mirror wall", "Village-side landscapes", "Optional Dambulla stop"],
    itinerary: ["Early start from Colombo/Negombo", "Rock fortress climb", "Local lunch and village area", "Return via scenic route"],
    inclusions: ["Private transport", "Flexible return timing", "Comfort-focused pacing", "Driver support all day"],
    idealFor: ["Active travelers", "Culture seekers", "Families with teens"],
  },
  {
    slug: "yala-day-tour",
    title: "Yala Day Tour",
    description: "Experience Sri Lanka's top safari reserve for leopard and wildlife sightings.",
    location: "Yala National Park",
    duration: "Full Day Safari",
    bestFor: "Wildlife enthusiasts and adventure seekers",
    startingPrice: "From USD 120",
    highlights: ["Leopard tracking zones", "Elephant and bird sightings", "Sunrise or sunset safari", "Scenic buffer forest roads"],
    itinerary: ["Arrival and safari jeep entry", "Guided wildlife game drive", "Break and second safari session", "Transfer back to hotel"],
    inclusions: ["Private transfer coordination", "Safari timing support", "Water and comfort stops", "Driver standby"],
    idealFor: ["Nature photographers", "Couples", "Friends traveling together"],
  },
  {
    slug: "wilpattu-day-tour",
    title: "Wilpattu Day Tour",
    description: "Discover Sri Lanka's oldest national park with a quieter premium safari feel.",
    location: "Wilpattu National Park",
    duration: "Full Day Safari",
    bestFor: "Travelers seeking less-crowded wildlife routes",
    startingPrice: "From USD 115",
    highlights: ["Natural lakes (villus)", "Leopard and sloth bear habitat", "Low-traffic safari trails", "Forest ecosystem variety"],
    itinerary: ["Morning departure and park entry", "Extended safari drive", "Lunch break in designated zone", "Afternoon wildlife tracking"],
    inclusions: ["Private transport planning", "Route assistance", "Flexible stopovers", "Hotel transfers"],
    idealFor: ["Bird watchers", "Wildlife repeat visitors", "Premium safari travelers"],
  },
  {
    slug: "whale-watching-day-tour",
    title: "Whale Watching Day Tour",
    description: "Witness blue whales and dolphins off the southern coast during season.",
    location: "Mirissa",
    duration: "7-9 Hours",
    bestFor: "Marine life and ocean lovers",
    startingPrice: "From USD 110",
    highlights: ["Early morning whale cruise", "Dolphin pods", "Mirissa beach downtime", "Coastal seafood lunch"],
    itinerary: ["Pre-dawn transfer to harbor", "Boat excursion", "Rest and beach break", "Return with optional sunset stop"],
    inclusions: ["Private road transfer", "Schedule coordination", "Comfort rest stops", "Pickup and drop-off"],
    idealFor: ["Families", "Couples", "International guests in season"],
  },
  {
    slug: "udawalawe-day-tour",
    title: "Udawalawe Day Tour",
    description: "See elephants in their natural habitat with one of Sri Lanka's best safari experiences.",
    location: "Udawalawe",
    duration: "Full Day",
    bestFor: "Elephant sightings and family safari trips",
    startingPrice: "From USD 105",
    highlights: ["Large elephant herds", "Open grassland views", "Udawalawe reservoir scenery", "Elephant transit home option"],
    itinerary: ["Morning transfer to park", "Safari drive with open views", "Lunch and optional transit home visit", "Evening return"],
    inclusions: ["Private transfer service", "Safari support", "Flexible timing", "Comfort-focused routing"],
    idealFor: ["Families with children", "Nature lovers", "Slow-travel guests"],
  },
  {
    slug: "sinharaja-day-tour",
    title: "Sinharaja Day Tour",
    description: "Explore a UNESCO rainforest reserve with endemic birds, plants, and nature trails.",
    location: "Sinharaja",
    duration: "9-11 Hours",
    bestFor: "Eco travelers and rainforest enthusiasts",
    startingPrice: "From USD 100",
    highlights: ["Rainforest trekking trails", "Endemic bird species", "Waterfall and stream crossings", "Dense tropical biodiversity"],
    itinerary: ["Transfer to reserve entrance", "Guided nature walk", "Local meal and rest break", "Return drive through scenic villages"],
    inclusions: ["Private transfer", "Trek timing flexibility", "Hydration stopovers", "Pickup and drop-off"],
    idealFor: ["Hikers", "Birding travelers", "Eco-conscious groups"],
  },
];

export const tourStyles: TourCategoryItem[] = [
  {
    slug: "cultural-tours",
    title: "Cultural Tours",
    description: "Explore ancient cities, sacred temples, and living Sri Lankan heritage.",
    routeFlow: "Airport -> Anuradhapura -> Sigiriya -> Kandy -> Colombo",
    sampleDuration: "4 to 8 Days",
    travelStyle: "History-focused with relaxed city pacing",
    sampleDestinations: ["Anuradhapura", "Sigiriya", "Dambulla", "Kandy"],
    featuredExperiences: ["Temple of the Tooth", "Ancient ruins", "Village experiences", "Cultural dance show"],
    whyTravelersChoose: ["Strong heritage storytelling", "Balanced road time", "Ideal for first Sri Lanka trip"],
    packageIncludes: ["Private chauffeur vehicle", "Flexible sightseeing windows", "Route optimization support"],
  },
  {
    slug: "wildlife-tours",
    title: "Wildlife Tours",
    description: "Safari adventures, birdwatching routes, and immersive nature encounters.",
    routeFlow: "Colombo -> Wilpattu -> Sigiriya -> Yala -> Udawalawe",
    sampleDuration: "5 to 12 Days",
    travelStyle: "Nature-first with early safari starts",
    sampleDestinations: ["Wilpattu", "Yala", "Udawalawe", "Minneriya"],
    featuredExperiences: ["Leopard safaris", "Elephant herds", "Birding hotspots", "Sunrise game drives"],
    whyTravelersChoose: ["Multi-park coverage", "Great for wildlife photography", "Comfort-focused transfers"],
    packageIncludes: ["Tour transport planning", "Safari slot coordination", "Flexible hotel route design"],
  },
  {
    slug: "beach-tours",
    title: "Beach Tours",
    description: "Coastal paradise escapes with beach stays, sunsets, and marine activities.",
    routeFlow: "Colombo -> Bentota -> Galle -> Mirissa -> Tangalle",
    sampleDuration: "3 to 7 Days",
    travelStyle: "Leisure, relaxation, and coastal scenery",
    sampleDestinations: ["Bentota", "Galle", "Mirissa", "Tangalle"],
    featuredExperiences: ["Whale watching", "Fort sunsets", "Beach dinners", "Water sports options"],
    whyTravelersChoose: ["Low-stress itinerary", "Best for couples", "Easy add-on after cultural tour"],
    packageIncludes: ["Private highway transfers", "Beach timing suggestions", "Custom relaxation schedule"],
  },
  {
    slug: "hill-country-tours",
    title: "Hill Country Tours",
    description: "Tea plantation landscapes, cool weather, and mountain viewpoints.",
    routeFlow: "Kandy -> Nuwara Eliya -> Ella -> Haputale",
    sampleDuration: "3 to 6 Days",
    travelStyle: "Scenic and climate-comfort travel",
    sampleDestinations: ["Kandy", "Nuwara Eliya", "Ella", "Haputale"],
    featuredExperiences: ["Tea estate visits", "Nine Arch Bridge", "Train-view points", "Waterfalls and hikes"],
    whyTravelersChoose: ["Instagram-friendly routes", "Relaxing weather", "Ideal for romantic travel"],
    packageIncludes: ["Private hill-country transfer", "Scenic stop planning", "Flexible timing support"],
  },
  {
    slug: "adventure-tours",
    title: "Adventure Tours",
    description: "Thrilling experiences including trekking, rafting, and active outdoor routes.",
    routeFlow: "Kithulgala -> Ella -> Yala -> South Coast",
    sampleDuration: "4 to 9 Days",
    travelStyle: "Active pace with adventure activities",
    sampleDestinations: ["Kithulgala", "Ella", "Yala", "Arugam Bay"],
    featuredExperiences: ["White-water rafting", "Little Adam's Peak", "Safari drives", "Surf and beach action"],
    whyTravelersChoose: ["High-energy itinerary", "Great for groups", "Mix of land and water experiences"],
    packageIncludes: ["Adventure route planning", "Transfer between activity zones", "Flexible rest day options"],
  },
  {
    slug: "custom-tours",
    title: "Custom Tours",
    description: "Personalized travel plans built around your dates, style, and budget.",
    routeFlow: "Fully tailored route based on your travel plan",
    sampleDuration: "2 to 15 Days",
    travelStyle: "Private and fully personalized",
    sampleDestinations: ["Any destination in Sri Lanka", "Multi-region combinations", "Special interest routes"],
    featuredExperiences: ["Family-friendly pacing", "Honeymoon route planning", "Luxury and budget options", "Flexible pickups"],
    whyTravelersChoose: ["Made-to-order itinerary", "No fixed group schedule", "Best for unique travel goals"],
    packageIncludes: ["Trip consultation", "Custom route proposal", "Private chauffeur support"],
  },
];
