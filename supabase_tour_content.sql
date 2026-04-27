-- True Ceylon Travels: Tour dropdown content + page covers
-- Run this in Supabase SQL Editor.

create table if not exists public.tour_content_items (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  type text not null check (type in ('day_tour', 'tour_category')),
  slug text not null unique,
  title text not null,
  short_description text,
  location text,
  duration text,
  best_for text,
  starting_price text,
  route_flow text,
  sample_duration text,
  travel_style text,
  cover_image_url text,
  highlights jsonb not null default '[]'::jsonb,
  itinerary jsonb not null default '[]'::jsonb,
  inclusions jsonb not null default '[]'::jsonb,
  ideal_for jsonb not null default '[]'::jsonb,
  sample_destinations jsonb not null default '[]'::jsonb,
  featured_experiences jsonb not null default '[]'::jsonb,
  why_travelers_choose jsonb not null default '[]'::jsonb,
  package_includes jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0
);

create index if not exists idx_tour_content_items_type on public.tour_content_items(type);
create index if not exists idx_tour_content_items_active_sort on public.tour_content_items(is_active, sort_order);

create table if not exists public.tour_page_covers (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  page_key text not null unique check (page_key in ('day-tours', 'tour-categories')),
  title text not null,
  subtitle text,
  image_url text
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_tour_content_items_updated_at on public.tour_content_items;
create trigger trg_tour_content_items_updated_at
before update on public.tour_content_items
for each row execute function public.set_updated_at();

drop trigger if exists trg_tour_page_covers_updated_at on public.tour_page_covers;
create trigger trg_tour_page_covers_updated_at
before update on public.tour_page_covers
for each row execute function public.set_updated_at();

-- Optional RLS setup (safe defaults)
alter table public.tour_content_items enable row level security;
alter table public.tour_page_covers enable row level security;

drop policy if exists "Public can read tour content items" on public.tour_content_items;
create policy "Public can read tour content items"
on public.tour_content_items
for select
using (is_active = true);

drop policy if exists "Public can read tour page covers" on public.tour_page_covers;
create policy "Public can read tour page covers"
on public.tour_page_covers
for select
using (true);

-- Seed data
insert into public.tour_content_items (
  type, slug, title, short_description, location, duration, best_for, starting_price, highlights, itinerary, inclusions, ideal_for, is_active, sort_order
) values
('day_tour', 'colombo-city-tour', 'Colombo City Tour', 'Explore the vibrant capital city with culture, shopping, and oceanfront views.', 'Colombo', '8-10 Hours', 'First-time visitors and cruise stopovers', 'From USD 65',
 '["Gangaramaya Temple","Independence Square","Pettah local market","Galle Face sunset"]'::jsonb,
 '["Hotel pickup and city overview drive","Temple and heritage zone visit","Lunch and shopping stop","Evening coastal promenade"]'::jsonb,
 '["Private A/C vehicle","English-speaking chauffeur guide","Flexible photo stops","Hotel pickup and drop-off"]'::jsonb,
 '["Families","Couples","Business travelers with one free day"]'::jsonb,
 true, 1),
('day_tour', 'kandy-day-tour', 'Kandy Day Tour', 'Visit Sri Lanka''s sacred hill capital and experience spiritual and cultural heritage.', 'Kandy', '10-12 Hours', 'Culture lovers and heritage-focused travelers', 'From USD 85',
 '["Temple of the Tooth","Kandy lake walk","Gem and craft experience","Cultural dance show"]'::jsonb,
 '["Early departure to hill country","Temple and city highlights","Lunch with scenic viewpoint","Traditional dance performance"]'::jsonb,
 '["Private transfer","Driver guidance","Route customization","Refreshment breaks"]'::jsonb,
 '["History enthusiasts","Pilgrimage travelers","Small groups"]'::jsonb,
 true, 2),
('day_tour', 'galle-day-tour', 'Galle Day Tour', 'Discover the historic Dutch fort and relaxed southern coastal lifestyle.', 'Galle', '9-11 Hours', 'Couples and beach-plus-history travelers', 'From USD 90',
 '["Galle Fort ramparts","Lighthouse and museums","Seafood and cafe streets","South coast viewpoints"]'::jsonb,
 '["Scenic south expressway drive","Fort walking tour","Leisure lunch inside fort","Beach stop before return"]'::jsonb,
 '["Private highway transfer","Flexible itinerary","Local recommendations","Pickup and drop-off"]'::jsonb,
 '["Honeymooners","Photographers","Slow-paced travelers"]'::jsonb,
 true, 3),
('day_tour', 'sigiriya-day-tour', 'Sigiriya Day Tour', 'Explore the iconic ancient rock fortress and surrounding cultural triangle.', 'Sigiriya', '10-12 Hours', 'Ancient history and UNESCO site explorers', 'From USD 95',
 '["Sigiriya Rock Fortress","Ancient frescoes and mirror wall","Village-side landscapes","Optional Dambulla stop"]'::jsonb,
 '["Early start from Colombo/Negombo","Rock fortress climb","Local lunch and village area","Return via scenic route"]'::jsonb,
 '["Private transport","Flexible return timing","Comfort-focused pacing","Driver support all day"]'::jsonb,
 '["Active travelers","Culture seekers","Families with teens"]'::jsonb,
 true, 4),
('day_tour', 'yala-day-tour', 'Yala Day Tour', 'Experience Sri Lanka''s top safari reserve for leopard and wildlife sightings.', 'Yala National Park', 'Full Day Safari', 'Wildlife enthusiasts and adventure seekers', 'From USD 120',
 '["Leopard tracking zones","Elephant and bird sightings","Sunrise or sunset safari","Scenic buffer forest roads"]'::jsonb,
 '["Arrival and safari jeep entry","Guided wildlife game drive","Break and second safari session","Transfer back to hotel"]'::jsonb,
 '["Private transfer coordination","Safari timing support","Water and comfort stops","Driver standby"]'::jsonb,
 '["Nature photographers","Couples","Friends traveling together"]'::jsonb,
 true, 5),
('day_tour', 'wilpattu-day-tour', 'Wilpattu Day Tour', 'Discover Sri Lanka''s oldest national park with a quieter premium safari feel.', 'Wilpattu National Park', 'Full Day Safari', 'Travelers seeking less-crowded wildlife routes', 'From USD 115',
 '["Natural lakes (villus)","Leopard and sloth bear habitat","Low-traffic safari trails","Forest ecosystem variety"]'::jsonb,
 '["Morning departure and park entry","Extended safari drive","Lunch break in designated zone","Afternoon wildlife tracking"]'::jsonb,
 '["Private transport planning","Route assistance","Flexible stopovers","Hotel transfers"]'::jsonb,
 '["Bird watchers","Wildlife repeat visitors","Premium safari travelers"]'::jsonb,
 true, 6),
('day_tour', 'whale-watching-day-tour', 'Whale Watching Day Tour', 'Witness blue whales and dolphins off the southern coast during season.', 'Mirissa', '7-9 Hours', 'Marine life and ocean lovers', 'From USD 110',
 '["Early morning whale cruise","Dolphin pods","Mirissa beach downtime","Coastal seafood lunch"]'::jsonb,
 '["Pre-dawn transfer to harbor","Boat excursion","Rest and beach break","Return with optional sunset stop"]'::jsonb,
 '["Private road transfer","Schedule coordination","Comfort rest stops","Pickup and drop-off"]'::jsonb,
 '["Families","Couples","International guests in season"]'::jsonb,
 true, 7),
('day_tour', 'udawalawe-day-tour', 'Udawalawe Day Tour', 'See elephants in their natural habitat with one of Sri Lanka''s best safari experiences.', 'Udawalawe', 'Full Day', 'Elephant sightings and family safari trips', 'From USD 105',
 '["Large elephant herds","Open grassland views","Udawalawe reservoir scenery","Elephant transit home option"]'::jsonb,
 '["Morning transfer to park","Safari drive with open views","Lunch and optional transit home visit","Evening return"]'::jsonb,
 '["Private transfer service","Safari support","Flexible timing","Comfort-focused routing"]'::jsonb,
 '["Families with children","Nature lovers","Slow-travel guests"]'::jsonb,
 true, 8),
('day_tour', 'sinharaja-day-tour', 'Sinharaja Day Tour', 'Explore a UNESCO rainforest reserve with endemic birds, plants, and nature trails.', 'Sinharaja', '9-11 Hours', 'Eco travelers and rainforest enthusiasts', 'From USD 100',
 '["Rainforest trekking trails","Endemic bird species","Waterfall and stream crossings","Dense tropical biodiversity"]'::jsonb,
 '["Transfer to reserve entrance","Guided nature walk","Local meal and rest break","Return drive through scenic villages"]'::jsonb,
 '["Private transfer","Trek timing flexibility","Hydration stopovers","Pickup and drop-off"]'::jsonb,
 '["Hikers","Birding travelers","Eco-conscious groups"]'::jsonb,
 true, 9),
('tour_category', 'cultural-tours', 'Cultural Tours', 'Explore ancient cities, sacred temples, and living Sri Lankan heritage.', null, null, null, null,
 '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb,
 true, 20),
('tour_category', 'wildlife-tours', 'Wildlife Tours', 'Safari adventures, birdwatching routes, and immersive nature encounters.', null, null, null, null,
 '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb,
 true, 21),
('tour_category', 'beach-tours', 'Beach Tours', 'Coastal paradise escapes with beach stays, sunsets, and marine activities.', null, null, null, null,
 '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb,
 true, 22),
('tour_category', 'hill-country-tours', 'Hill Country Tours', 'Tea plantation landscapes, cool weather, and mountain viewpoints.', null, null, null, null,
 '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb,
 true, 23),
('tour_category', 'adventure-tours', 'Adventure Tours', 'Thrilling experiences including trekking, rafting, and active outdoor routes.', null, null, null, null,
 '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb,
 true, 24),
('tour_category', 'custom-tours', 'Custom Tours', 'Personalized travel plans built around your dates, style, and budget.', null, null, null, null,
 '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb,
 true, 25)
on conflict (slug) do update set
  type = excluded.type,
  title = excluded.title,
  short_description = excluded.short_description,
  location = excluded.location,
  duration = excluded.duration,
  best_for = excluded.best_for,
  starting_price = excluded.starting_price,
  highlights = excluded.highlights,
  itinerary = excluded.itinerary,
  inclusions = excluded.inclusions,
  ideal_for = excluded.ideal_for,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

update public.tour_content_items
set
  route_flow = case slug
    when 'cultural-tours' then 'Airport -> Anuradhapura -> Sigiriya -> Kandy -> Colombo'
    when 'wildlife-tours' then 'Colombo -> Wilpattu -> Sigiriya -> Yala -> Udawalawe'
    when 'beach-tours' then 'Colombo -> Bentota -> Galle -> Mirissa -> Tangalle'
    when 'hill-country-tours' then 'Kandy -> Nuwara Eliya -> Ella -> Haputale'
    when 'adventure-tours' then 'Kithulgala -> Ella -> Yala -> South Coast'
    when 'custom-tours' then 'Fully tailored route based on your travel plan'
    else route_flow
  end,
  sample_duration = case slug
    when 'cultural-tours' then '4 to 8 Days'
    when 'wildlife-tours' then '5 to 12 Days'
    when 'beach-tours' then '3 to 7 Days'
    when 'hill-country-tours' then '3 to 6 Days'
    when 'adventure-tours' then '4 to 9 Days'
    when 'custom-tours' then '2 to 15 Days'
    else sample_duration
  end,
  travel_style = case slug
    when 'cultural-tours' then 'History-focused with relaxed city pacing'
    when 'wildlife-tours' then 'Nature-first with early safari starts'
    when 'beach-tours' then 'Leisure, relaxation, and coastal scenery'
    when 'hill-country-tours' then 'Scenic and climate-comfort travel'
    when 'adventure-tours' then 'Active pace with adventure activities'
    when 'custom-tours' then 'Private and fully personalized'
    else travel_style
  end,
  sample_destinations = case slug
    when 'cultural-tours' then '["Anuradhapura","Sigiriya","Dambulla","Kandy"]'::jsonb
    when 'wildlife-tours' then '["Wilpattu","Yala","Udawalawe","Minneriya"]'::jsonb
    when 'beach-tours' then '["Bentota","Galle","Mirissa","Tangalle"]'::jsonb
    when 'hill-country-tours' then '["Kandy","Nuwara Eliya","Ella","Haputale"]'::jsonb
    when 'adventure-tours' then '["Kithulgala","Ella","Yala","Arugam Bay"]'::jsonb
    when 'custom-tours' then '["Any destination in Sri Lanka","Multi-region combinations","Special interest routes"]'::jsonb
    else sample_destinations
  end,
  featured_experiences = case slug
    when 'cultural-tours' then '["Temple of the Tooth","Ancient ruins","Village experiences","Cultural dance show"]'::jsonb
    when 'wildlife-tours' then '["Leopard safaris","Elephant herds","Birding hotspots","Sunrise game drives"]'::jsonb
    when 'beach-tours' then '["Whale watching","Fort sunsets","Beach dinners","Water sports options"]'::jsonb
    when 'hill-country-tours' then '["Tea estate visits","Nine Arch Bridge","Train-view points","Waterfalls and hikes"]'::jsonb
    when 'adventure-tours' then '["White-water rafting","Little Adam''s Peak","Safari drives","Surf and beach action"]'::jsonb
    when 'custom-tours' then '["Family-friendly pacing","Honeymoon route planning","Luxury and budget options","Flexible pickups"]'::jsonb
    else featured_experiences
  end,
  why_travelers_choose = case slug
    when 'cultural-tours' then '["Strong heritage storytelling","Balanced road time","Ideal for first Sri Lanka trip"]'::jsonb
    when 'wildlife-tours' then '["Multi-park coverage","Great for wildlife photography","Comfort-focused transfers"]'::jsonb
    when 'beach-tours' then '["Low-stress itinerary","Best for couples","Easy add-on after cultural tour"]'::jsonb
    when 'hill-country-tours' then '["Instagram-friendly routes","Relaxing weather","Ideal for romantic travel"]'::jsonb
    when 'adventure-tours' then '["High-energy itinerary","Great for groups","Mix of land and water experiences"]'::jsonb
    when 'custom-tours' then '["Made-to-order itinerary","No fixed group schedule","Best for unique travel goals"]'::jsonb
    else why_travelers_choose
  end,
  package_includes = case slug
    when 'cultural-tours' then '["Private chauffeur vehicle","Flexible sightseeing windows","Route optimization support"]'::jsonb
    when 'wildlife-tours' then '["Tour transport planning","Safari slot coordination","Flexible hotel route design"]'::jsonb
    when 'beach-tours' then '["Private highway transfers","Beach timing suggestions","Custom relaxation schedule"]'::jsonb
    when 'hill-country-tours' then '["Private hill-country transfer","Scenic stop planning","Flexible timing support"]'::jsonb
    when 'adventure-tours' then '["Adventure route planning","Transfer between activity zones","Flexible rest day options"]'::jsonb
    when 'custom-tours' then '["Trip consultation","Custom route proposal","Private chauffeur support"]'::jsonb
    else package_includes
  end
where type = 'tour_category';

insert into public.tour_page_covers (page_key, title, subtitle, image_url)
values
('day-tours', 'Day Tours', 'Choose from our most popular one-day experiences across Sri Lanka.', null),
('tour-categories', 'Tour Categories', 'Explore our travel styles and pick the experience that matches your trip goals.', null)
on conflict (page_key) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  image_url = excluded.image_url;
