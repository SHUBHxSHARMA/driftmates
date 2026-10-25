const img = (id, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const phone = "+91 82737 22456";
export const phoneHref = "tel:+918273722456";
export const whatsapp = "https://wa.me/918273722456";
export const email = "info@driftmates.com";
export const address =
  "Krishna Colony, Dahariya Road, near Government ITI, Haldwani, Uttarakhand 263139";

export const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const destinations = [
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "High Himalaya",
    ideal: "6–8 days",
    image: img("photo-1464822759023-fed622ff2c3b"),
    portrait: img("photo-1483728642387-6c3bdd6c93e5", 1200),
    blurb:
      "Barren ridgelines, monastery light, and roads that climb past the last village. Ladakh is where most of our riders come to feel how big the map really is.",
    highlights: [
      "Umling La and the high passes",
      "Nubra, Turtuk, and the border villages",
      "Small-group bike and backpack journeys",
    ],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "Kumaon & Garhwal",
    ideal: "4–8 days",
    image: img("photo-1506905925346-21bda4d32df4"),
    portrait: img("photo-1469474968028-56623f02e42e", 1200),
    blurb:
      "Home ground. Munsiyari, Darma, Tungnath, Adi Kailash — valleys we have walked, driven, and recce’d until the pacing feels right.",
    highlights: [
      "Panchachuli and Darma Valley",
      "Tungnath & Chandrashila",
      "Slow mountain roads, not checklist stops",
    ],
  },
  {
    slug: "himachal",
    name: "Himachal Pradesh",
    region: "Kullu, Parvati & beyond",
    ideal: "6–7 days",
    image: img("photo-1441974231531-c6227db76b6e"),
    portrait: img("photo-1501785888041-af3ef285b470", 1200),
    blurb:
      "Cedar air, river towns, and a backpacking pace that leaves room for the unplanned evening. Manali, Kasol, Jibhi — held loosely.",
    highlights: [
      "Manali, Kasol, and Jibhi",
      "Forest walks and river towns",
      "Departures from Kashmere Gate",
    ],
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "Eastern Himalaya",
    ideal: "8 days",
    image: img("photo-1544735716-392fe2489ffa"),
    portrait: img("photo-1526772662000-3f88f10405ff", 1200),
    blurb:
      "A quieter kingdom. Dzongs, valley light, and days that are allowed to breathe. We cross in from Bagdogra and keep the group small.",
    highlights: [
      "Valleys, dzongs, and high roads",
      "Culture without the rush",
      "Pickup from Bagdogra",
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "Annapurna",
    ideal: "8 days",
    image: img("photo-1486870591958-9b9d0d1dda99"),
    portrait: img("photo-1551632811-561732d1e306", 1200),
    blurb:
      "The Annapurna sanctuary, walked properly. Stone steps, rhododendron, and a base camp that earns its weather.",
    highlights: [
      "Annapurna Base Camp",
      "Teahouse trails, real altitude",
      "Guided by people who know the mountain",
    ],
  },
  {
    slug: "africa",
    name: "Africa",
    region: "When the map widens",
    ideal: "Custom",
    image: img("photo-1516426122078-c23e76319801"),
    portrait: img("photo-1547471080-7cc2caa01a7e", 1200),
    blurb:
      "The same instinct — small groups, ground knowledge, no rushed itinerary — carried beyond the Himalaya when a journey asks for it.",
    highlights: [
      "Wildlife and wide country",
      "Built around your pace",
      "Planned as a private journey",
    ],
  },
];

export const journeys = [
  {
    slug: "leh-ladakh-umling-la",
    title: "Leh Ladakh with Umling La",
    destination: "Ladakh",
    place: "ladakh",
    kind: "Backpacking · Biking",
    nights: "7 nights · 8 days",
    price: 35500,
    was: 40000,
    pickup: "Leh Kushok Bakula Rimpochee Airport",
    season: "June – September",
    image: img("photo-1469474968028-56623f02e42e"),
    gallery: [
      img("photo-1464822759023-fed622ff2c3b"),
      img("photo-1483728642387-6c3bdd6c93e5"),
      img("photo-1470770841072-f978cf4d019e"),
    ],
    summary:
      "A high, unhurried circuit out of Leh. Umling La, the great lakes, and enough silence between the passes that the group actually talks.",
    highlights: [
      "Umling La, one of the world’s highest motorable passes",
      "Small group, bikes and a support rhythm that isn’t a convoy",
      "Monasteries, lakes, and nights that aren’t overscheduled",
    ],
    included: [
      "Stay on the circuit",
      "Local transport as per the riding plan",
      "Expedition lead and on-ground support",
      "Permits coordination for the route",
    ],
    notIncluded: ["Flights to Leh", "Personal riding gear", "Meals unless noted in your final plan"],
    days: [
      { t: "Arrive in Leh", d: "Land, meet the group, and let the altitude settle. No heroics on day one." },
      { t: "Leh & the Indus", d: "A short acclimatisation day. Palaces, markets, and a first look at how the light works here." },
      { t: "Toward the high road", d: "The ride opens up. Villages thin out. The mountains stop pretending to be gentle." },
      { t: "Umling La", d: "The pass itself — slow, cold, and worth every metre. We don’t rush the photographs or the breathing." },
      { t: "Lakes and long horizons", d: "Water the colour of tin and sky. Time to ride, stop, and not fill the afternoon." },
      { t: "A quieter valley", d: "Monastery, tea, and a route chosen because it still feels local." },
      { t: "Back toward Leh", d: "The return is part of the journey. Different light on the same ridges." },
      { t: "Departure", d: "Airport drop. The group is usually quieter than when it arrived." },
    ],
  },
  {
    slug: "bhutan",
    title: "Bhutan",
    destination: "Bhutan",
    place: "bhutan",
    kind: "Small-group journey",
    nights: "7 nights · 8 days",
    price: 60000,
    was: 70000,
    pickup: "Bagdogra Airport, Siliguri",
    season: "March – May · September – November",
    image: img("photo-1544735716-392fe2489ffa"),
    gallery: [
      img("photo-1526772662000-3f88f10405ff"),
      img("photo-1464822759023-fed622ff2c3b"),
      img("photo-1506905925346-21bda4d32df4"),
    ],
    summary:
      "Eight days in a country that still knows how to be quiet. Valleys, dzongs, and a pace set by the road, not a checklist.",
    highlights: [
      "Cross-border start from Bagdogra",
      "Culture, walking, and high valley roads",
      "Room in the day to actually be there",
    ],
    included: ["Stay", "Ground transport in Bhutan", "Trip lead", "Monument and route coordination"],
    notIncluded: ["Flights into Bagdogra", "Sustainable development fee as applicable", "Personal expenses"],
    days: [
      { t: "Bagdogra to the border", d: "Meet, cross, and let the first valley do the introducing." },
      { t: "A western valley", d: "Dzong, town, and a walk that isn’t a march." },
      { t: "Higher country", d: "The road climbs. Prayer flags, switchbacks, weather that changes its mind." },
      { t: "A day with room in it", d: "This is the day most itineraries delete. We keep it." },
      { t: "Central valleys", d: "Farms, rivers, and a stay chosen for the morning, not the brochure." },
      { t: "Ridge and return", d: "One last high view before the road bends back west." },
      { t: "Slow exit", d: "Markets, a last meal, stories already forming." },
      { t: "Back to Bagdogra", d: "Border and airport. You’ll want a longer trip. That’s the point." },
    ],
  },
  {
    slug: "adi-kailash",
    title: "Adi Kailash",
    destination: "Uttarakhand",
    place: "uttarakhand",
    kind: "Pilgrimage · Trek",
    nights: "7 nights · 8 days",
    price: 29999,
    was: 45000,
    pickup: "Kathgodam Railway Station",
    season: "May – June · September – October",
    image: img("photo-1519904981063-b0cf448d479e"),
    gallery: [
      img("photo-1454496522488-7a8e488e8606"),
      img("photo-1483728642387-6c3bdd6c93e5"),
      img("photo-1478131143081-80f7f84ca84d"),
    ],
    summary:
      "The quieter Kailash. A high, careful journey from Kathgodam into the Darma country, held by people who treat the mountain as more than a tick.",
    highlights: [
      "Kathgodam start, no scramble at the railhead",
      "High villages and the Om Parvat landscape",
      "Pacing for altitude, not for Instagram",
    ],
    included: ["Stay and camps as per route", "Transport from Kathgodam", "Trek support and lead", "Permits coordination"],
    notIncluded: ["Rail or flight to Kathgodam", "Personal gear", "Pony or porter upgrades unless added"],
    days: [
      { t: "Kathgodam", d: "Pickup and the long, beautiful drive into the hills. The journey starts in the car." },
      { t: "Toward the inner valleys", d: "Rivers, hairpins, and a night that already feels far from the plains." },
      { t: "The road ends", d: "Where vehicles stop being the point. We walk." },
      { t: "High villages", d: "Stone, barley, and the particular quiet of Kumaon above the tree line’s argument." },
      { t: "Adi Kailash country", d: "The approach. Weather permitting, the view that people come all this way to stand in front of." },
      { t: "A second look", d: "Mountains reward people who don’t leave the morning they arrive." },
      { t: "Descent", d: "Back through the villages, slower than the way up." },
      { t: "Return to Kathgodam", d: "Plains again. The group is usually already planning the next one." },
    ],
  },
  {
    slug: "turtuk-bike",
    title: "Leh Ladakh with Turtuk",
    destination: "Ladakh",
    place: "ladakh",
    kind: "Bike trip",
    nights: "6 nights · 7 days",
    price: 35500,
    was: 40000,
    pickup: "Leh Kushok Bakula Rimpochee Airport",
    season: "June – September",
    image: img("photo-1558981806-ec527fa84c39"),
    gallery: [
      img("photo-1501785888041-af3ef285b470"),
      img("photo-1469854523086-cc02fe5d8800"),
      img("photo-1470770841072-f978cf4d019e"),
    ],
    summary:
      "A riding trip that goes past the postcard lakes and into Turtuk — apricot trees, Balti kitchens, and a village that still feels like a discovery.",
    highlights: [
      "Khardung La and the Nubra approach",
      "Turtuk, the last village",
      "A bike trip that isn’t a race",
    ],
    included: ["Stay", "Support vehicle rhythm", "Expedition lead", "Inner line permit coordination"],
    notIncluded: ["Flights", "Motorcycle hire if you are not riding with our fleet", "Riding gear"],
    days: [
      { t: "Leh", d: "Arrive, breathe, meet the bikes and the people you’ll trust with a week." },
      { t: "Acclimatise", d: "A gentle day. Thiksey or the palace road. Sleep matters more than sightseeing." },
      { t: "Khardung La", d: "Over the pass and down into Nubra. The landscape changes its entire vocabulary." },
      { t: "Nubra", d: "Sand, monasteries, and a valley wide enough to get lost in on purpose." },
      { t: "Turtuk", d: "The border village. Apricots, stories, and a night that doesn’t feel like a tour stop." },
      { t: "Return toward Leh", d: "A long, good riding day. Stops where the view insists." },
      { t: "Fly out", d: "Airport. Dust on your boots. That’s the souvenir." },
    ],
  },
  {
    slug: "darma-panchachuli",
    title: "Darma Valley & Panchachuli Base Camp",
    destination: "Uttarakhand",
    place: "uttarakhand",
    kind: "Trek",
    nights: "6 nights · 7 days",
    price: 37999,
    was: 41999,
    pickup: "Kathgodam Railway Station",
    season: "May – June · September – October",
    image: img("photo-1454496522488-7a8e488e8606"),
    gallery: [
      img("photo-1486870591958-9b9d0d1dda99"),
      img("photo-1478131143081-80f7f84ca84d"),
      img("photo-1464822759023-fed622ff2c3b"),
    ],
    summary:
      "Munsiyari’s famous wall of peaks, approached from the valley rather than the viewpoint. A trek for people who want the mountain, not the railing.",
    highlights: [
      "Panchachuli from the Darma side",
      "Villages most itineraries skip",
      "Kathgodam pickup, fully held logistics",
    ],
    included: ["Stay and camp", "Transport from Kathgodam", "Trek lead and support", "Meals on the trail as planned"],
    notIncluded: ["Train to Kathgodam", "Personal equipment", "Insurance"],
    days: [
      { t: "Kathgodam to the hills", d: "The drive is long and it is the right way to arrive." },
      { t: "Munsiyari", d: "First sight of the Panchachuli. Tea, layers, and an early night." },
      { t: "Into Darma", d: "The valley narrows. Villages get smaller and more specific." },
      { t: "Trail day", d: "A proper walking day. Forest, then the open." },
      { t: "Base camp", d: "The wall of peaks, close enough to change how you stand." },
      { t: "Walk out", d: "Descent through the same villages, which look different on the way down." },
      { t: "Back to Kathgodam", d: "Road, railhead, and a group that now has a private language." },
    ],
  },
  {
    slug: "himachal-backpacking",
    title: "Himachal Backpacking — Manali, Kasol & Jibhi",
    destination: "Himachal",
    place: "himachal",
    kind: "Backpacking",
    nights: "6 nights · 7 days",
    price: 23999,
    was: 30000,
    pickup: "Kashmere Gate, Delhi",
    season: "March – June · September – November",
    image: img("photo-1441974231531-c6227db76b6e"),
    gallery: [
      img("photo-1501785888041-af3ef285b470"),
      img("photo-1506905925346-21bda4d32df4"),
      img("photo-1470770841072-f978cf4d019e"),
    ],
    summary:
      "A week that starts at Kashmere Gate and ends somewhere quieter than you expected. Manali for the scale, Kasol for the river, Jibhi for the exhale.",
    highlights: [
      "Delhi departure, no hill-station scramble",
      "Three places, one unhurried line",
      "Small group, real evenings",
    ],
    included: ["Transport from Kashmere Gate", "Stay", "Trip host", "Local transfers on the circuit"],
    notIncluded: ["Meals unless noted", "Personal shopping and cafes", "Adventure add-ons"],
    days: [
      { t: "Delhi overnight", d: "Kashmere Gate. The city falls away somewhere after midnight." },
      { t: "Manali", d: "Arrive into pine and river noise. A walk, not a schedule." },
      { t: "Old Manali & the valley", d: "The parts of Manali that aren’t the mall road." },
      { t: "Kasol", d: "Parvati Valley. The river is the itinerary." },
      { t: "A free day", d: "Walk to a village, sit in a cafe, do less than you planned. We protect this." },
      { t: "Jibhi", d: "Smaller, greener, and the reason people message us a month later." },
      { t: "Return", d: "Back toward Delhi with a playlist nobody will admit they made." },
    ],
  },
  {
    slug: "annapurna-base-camp",
    title: "Annapurna Base Camp",
    destination: "Nepal",
    place: "nepal",
    kind: "Trek",
    nights: "7 nights · 8 days",
    price: 42000,
    was: 55000,
    pickup: "Pokhara trailhead, as planned",
    season: "March – May · October – November",
    image: img("photo-1486870591958-9b9d0d1dda99"),
    gallery: [
      img("photo-1551632811-561732d1e306"),
      img("photo-1544735716-392fe2489ffa"),
      img("photo-1519904981063-b0cf448d479e"),
    ],
    summary:
      "The sanctuary, walked with a group small enough that the guide still knows your name on day six. Stone steps, weather, and a base camp morning.",
    highlights: [
      "Classic ABC trail, properly paced",
      "Teahouses, not a forced march",
      "Certified lead, altitude taken seriously",
    ],
    included: ["Teahouse stay", "Trek lead", "Permits", "Ground transfers as per the final plan"],
    notIncluded: ["Flights to Nepal", "Meals and hot drinks", "Travel insurance"],
    days: [
      { t: "Into the hills", d: "The trail starts gently. That is a kindness, not a flaw." },
      { t: "Villages", d: "Stone houses, terraces, and the first real climb." },
      { t: "Forest", d: "Rhododendron or moss, depending on the month. The mountain is still a rumour." },
      { t: "Higher camps", d: "The air thins. We watch the group more than the view." },
      { t: "Base camp", d: "The amphitheatre. Annapurna, Machhapuchhre, and a morning you will describe badly and often." },
      { t: "A second sunrise", d: "If the weather gives it. If it doesn’t, the cloud is also the mountain." },
      { t: "Descent", d: "Knees, tea, and the trail running downhill for once." },
      { t: "Pokhara", d: "Lake light and a very long shower." },
    ],
  },
  {
    slug: "tungnath-chandrashila",
    title: "Tungnath & Chandrashila",
    destination: "Uttarakhand",
    place: "uttarakhand",
    kind: "Trek",
    nights: "4 nights · 5 days",
    price: 12000,
    was: 15000,
    pickup: "Dehradun ISBT",
    season: "April – June · September – November",
    image: img("photo-1464822759023-fed622ff2c3b"),
    gallery: [
      img("photo-1506905925346-21bda4d32df4"),
      img("photo-1454496522488-7a8e488e8606"),
      img("photo-1483728642387-6c3bdd6c93e5"),
    ],
    summary:
      "The highest Shiva temple in the world, and the ridge above it. A short, sharp introduction to how Driftmates likes to walk — unhurried, looked after, and high.",
    highlights: [
      "Dehradun ISBT pickup",
      "Tungnath and the Chandrashila summit ridge",
      "The right first Himalayan trek",
    ],
    included: ["Stay", "Transport from Dehradun", "Trek lead", "Trail support"],
    notIncluded: ["Bus or train to Dehradun", "Personal meals in town", "Gear hire"],
    days: [
      { t: "Dehradun", d: "ISBT pickup and the drive toward Chopta. The hills begin properly after dusk." },
      { t: "Chopta", d: "Meadows, a short walk, and sleep at a sensible altitude." },
      { t: "Tungnath", d: "The stone path to the temple. Bells, wind, and a climb that earns its tea." },
      { t: "Chandrashila", d: "Above the temple. On a clear morning the whole Garhwal range stands up." },
      { t: "Return", d: "Down to the road and back toward Dehradun, already talking about a longer one." },
    ],
  },
];

export const beliefs = [
  {
    title: "Small groups. Bigger connections.",
    text: "We keep groups intentionally small. You get flexibility, more one-to-one guidance, and a group that starts as strangers and rarely ends that way.",
  },
  {
    title: "Challenge, nature, growth.",
    text: "The trips are built to nudge you past the familiar — a pass, a first trek, a road you’ve only seen in photographs — without turning the journey into a test.",
  },
  {
    title: "Curated, not commercial.",
    text: "No rushed itineraries and no checklist tourism. Every route is balanced between thrill, culture, and the downtime that makes a place stick.",
  },
  {
    title: "Leaders who know the ground.",
    text: "Certified adventure leaders, a decade on these trails, and safety treated as a craft. The people out front have already walked the risky parts.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Tell us who’s coming along",
    text: "Two of you, a family, or a handful of friends. Share dates, group size, and whether you want to ride, walk, or simply be taken somewhere high.",
  },
  {
    n: "02",
    title: "We craft. You tweak.",
    text: "You get a route shaped around pace and budget — one of our departures, or a private plan. Then we adjust it until it sounds like your trip.",
  },
  {
    n: "03",
    title: "Confirm. Pack. Go high.",
    text: "We lock stays, permits, and the people on the ground. Your job is to show up. The mountains take it from there.",
  },
];

export const reviews = [
  {
    name: "Phoebe Lim",
    place: "Munsiyari",
    text: "Went to Munsiyari solo and honestly had a great time. I joined the group alone but everyone was really nice and the vibe was amazing. Everything was well planned. Didn’t feel like I was travelling alone at all.",
  },
  {
    name: "Disha Lahoti",
    place: "Kashmir · 9-day hike",
    text: "Pankaj and his crew were very organised and protective guides. They made sure we were comfortable and our documents were ready between camps. There was weather, and they were quick. I would look forward to another trail with his team.",
  },
  {
    name: "Pushpak Bakshi",
    place: "Ladakh · bike",
    text: "My wife and I rode Ladakh with Driftmates, led by Pankaj. From the early starts to the way the days were held together, it felt like a community rather than a planner. Memories we will keep.",
  },
];

export const faqs = [
  {
    q: "How much does a Driftmates journey cost?",
    a: "Published departures currently run from about ₹12,000 for Tungnath & Chandrashila to ₹60,000 for Bhutan, per person. Private trips are quoted around your dates, group size, and how you like to stay.",
  },
  {
    q: "Do I need previous riding or trekking experience?",
    a: "Not for every departure. Tungnath and the Himachal backpacking week are gentle entries. Umling La, Turtuk, Adi Kailash, and Annapurna Base Camp ask for fitness and, on the bike trips, real riding comfort. We’ll tell you honestly before you pay.",
  },
  {
    q: "How small are the groups?",
    a: "Small on purpose. The point of Driftmates is more guidance, more flexibility, and a group you can actually know by the third day — not a coach full of strangers.",
  },
  {
    q: "Where do the trips start?",
    a: "It depends on the route: Leh airport for Ladakh, Kathgodam for Kumaon, Dehradun ISBT for Tungnath, Kashmere Gate for Himachal, and Bagdogra for Bhutan. The pickup is on the journey page.",
  },
  {
    q: "Can you plan something that isn’t on the list?",
    a: "Yes. The fixed departures are routes we already trust. If you want a private Munsiyari week, a family pace, or a line we haven’t published, write to us and we’ll shape it.",
  },
];

export function getJourney(slug) {
  return journeys.find((j) => j.slug === slug);
}

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug);
}
