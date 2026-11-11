import { journeys } from "./officialJourneys.js";

export { journeys };

const dm = (path) => `https://driftmates.com/wp-content/uploads/${path}`;

export const photos = {
  hero: dm("2026/06/IMG_8112.JPG-scaled.jpeg"),
  leh: dm("2024/08/IMG_8386-scaled.jpg"),
  shey: dm("2026/02/shey-palace.webp"),
  og: dm("2026/02/IMG_7060-2048x1152.jpg"),
  moto: dm("2026/09/IMG_0659-scaled.jpg"),
  adi: dm("2024/08/IMG_0736-scaled.jpg"),
  darma: dm("2026/09/184f2d02-243b-4188-83a9-c6ec7d8312be-scaled.jpg"),
  munsiyari: dm("2026/09/c52fcc8f-35ed-411f-80de-f597473f7af2-scaled.jpg"),
  johar: dm("2026/09/IMG_8840-scaled.jpg"),
  tungnath: dm("2026/02/1747812183272-chopta-tungnath.webp"),
  kainchi: dm("2026/04/IMG_5763-scaled.jpg"),
  bir: dm("2026/02/bir-billing.webp"),
  himachal: dm("2016/11/9403133.jpg"),
  bhutan: dm("2026/03/IMG_4682.jpg"),
  chelela: dm("2026/04/IMG_5566.jpg"),
  annapurna: dm("2026/04/IMG_5663-scaled.jpg"),
  about: dm("2026/02/IMG_0773-scaled.jpg"),
  route: dm("2026/09/IMG_6219-scaled.jpg"),
  routePortrait: dm("2026/09/IMG_5970-scaled.jpg"),
  trips: dm("2026/09/d9cbd1d5-0e2a-46d4-82ce-ad740feeb6d1-scaled.jpg"),
  wide: dm("2026/09/IMG_9844-scaled.jpg"),
  wide2: dm("2026/09/b2a386f3-82d5-4c6c-8824-76f22570eff7-scaled.jpg"),
  camp: dm("2024/08/IMG_5529-scaled.jpg"),
  kenya: dm("2026/03/premium_photo-1661809249946-8a6b00e29ea4.avif"),
  tanzania: dm("2026/03/lion-7866017_1280.jpg"),
  kilimanjaro: dm("2026/03/photo-1531242450852-175ae27d351c.avif"),
};

export const phone = "+91 82737 22456";
export const phoneHref = "tel:+918273722456";
export const whatsappNumber = "+91 86790 33487";
export const whatsapp = "https://wa.me/918679033487";
export const email = "info@driftmates.com";
export const address =
  "Krishna Colony, Dahariya Road, near Government ITI, Haldwani, Uttarakhand 263139";

export const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export function stayLabel(value) {
  return String(value).replace(/(\d+)\s*(nights|night|days|day)/gi, (_, num, word) => {
    const n = Number(num);
    const kind = word.toLowerCase().startsWith("d") ? "Day" : "Night";
    return `${n} ${kind}${n === 1 ? "" : "s"}`;
  });
}

export const destinations = [
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "High Himalaya",
    ideal: "6–8 days",
    image: photos.leh,
    portrait: photos.shey,
    seoTitle: "Ladakh bike trips | Umling La, Nubra and Turtuk",
    seoDescription:
      "Ladakh motorcycle and backpacking trips from Leh airport. Umling La, Nubra, Turtuk, and Pangong Tso with Driftmates.",
    blurb:
      "Barren ridgelines, monastery light, and roads that climb past the last village. Ladakh is where most of our riders come to feel how big the map really is.",
    highlights: [
      "Leh, Sham Valley, Nubra, and Khardung La",
      "Turtuk, Pangong Tso, and Chang La",
      "Hanle, Chumathang, and Umling La",
    ],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "Kumaon & Garhwal",
    ideal: "4–8 days",
    image: photos.tungnath,
    portrait: photos.munsiyari,
    seoTitle: "Uttarakhand trips | Munsiyari, Darma, Adi Kailash, Tungnath",
    seoDescription:
      "Kumaon and Garhwal departures from Haldwani, Kathgodam, and Dehradun. Munsiyari, Darma Valley, Adi Kailash, Kainchi Dham, and Tungnath.",
    blurb:
      "Home ground. Munsiyari, Darma, Tungnath, Adi Kailash — valleys we have walked, driven, and recce’d until the pacing feels right.",
    highlights: [
      "Munsiyari, Khaliya Top, and Birthi",
      "Darma Valley, Panchachuli, Dantu, Chaukori, and Bageshwar",
      "Adi Kailash, Om Parvat, Gunji, Dharchula, and Pithoragarh",
      "Tungnath, Chandrashila, Chopta, and Deoriatal",
      "Nainital, Bhimtal, Kainchi Dham, and Kasar Devi",
      "Binsar, Mukteshwar, Patal Bhuvaneshwar, Lohaghat, and Almora",
    ],
  },
  {
    slug: "himachal",
    name: "Himachal Pradesh",
    region: "Kullu, Parvati & beyond",
    ideal: "6–7 days",
    image: photos.himachal,
    portrait: photos.bir,
    seoTitle: "Himachal trips | Manali, Kasol, Jibhi and Winter Spiti",
    seoDescription:
      "Himachal backpacking from Kashmere Gate, plus a winter road into Spiti. Manali, Solang, Kasol, Jibhi, Jalori, and Kaza.",
    blurb:
      "Cedar air, river towns, and a backpacking pace that leaves room for the unplanned evening. Manali, Kasol, Jibhi — held loosely.",
    highlights: [
      "Manali, Solang, and Sissu",
      "Kasol, Jibhi, and Jalori Pass",
      "Shimla, Sarahan, and Chitkul",
      "Tabo, Kaza, and Kalpa",
    ],
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "Eastern Himalaya",
    ideal: "8 days",
    image: photos.bhutan,
    portrait: photos.chelela,
    seoTitle: "Bhutan tour from Bagdogra | Paro, Thimphu, Punakha",
    seoDescription:
      "An 8-day Bhutan tour from Bagdogra. Phuentsholing, Thimphu, Dochula, Phobjikha, Punakha, Paro, and the Tiger’s Nest.",
    blurb:
      "A quieter kingdom. Dzongs, valley light, and days that are allowed to breathe. We cross in from Bagdogra and keep the group small.",
    highlights: [
      "Phuentsholing, Thimphu, and Dochula",
      "Punakha, Phobjikha, and Paro",
      "Tiger’s Nest and Chele La",
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "Annapurna",
    ideal: "8 days",
    image: photos.annapurna,
    portrait: photos.routePortrait,
    seoTitle: "Annapurna Base Camp trek from Pokhara",
    seoDescription:
      "Annapurna Base Camp trek with Driftmates, starting at Pokhara. Teahouses, a paced climb to 4,130 m, and a group of 15 to 20.",
    blurb:
      "The Annapurna sanctuary, walked properly. Stone steps, rhododendron, and a base camp that earns its weather.",
    highlights: [
      "Pokhara and Ghandruk",
      "Lower Sinuwa, Bamboo, and Jhinu Danda",
      "Deurali and Annapurna Base Camp",
    ],
  },
  {
    slug: "africa",
    name: "Africa",
    region: "Kenya & Tanzania",
    ideal: "3–8 days",
    image: photos.kenya,
    portrait: photos.kilimanjaro,
    seoTitle: "Africa safaris | Masai Mara, Serengeti, Ngorongoro, Kilimanjaro",
    seoDescription:
      "Driftmates safaris in Kenya and Tanzania: Masai Mara, Amboseli, Serengeti, Ngorongoro, and Kilimanjaro climbs from Moshi.",
    blurb:
      "Savannah, crater, and the highest freestanding mountain on earth. Kenya and Tanzania, planned with the same care as the Himalayan weeks.",
    highlights: [
      "Nairobi, Masai Mara, Amboseli, Lake Naivasha, and Lake Nakuru",
      "Arusha, Serengeti, Ndutu, Ngorongoro, Lake Manyara, and Tarangire",
      "Kilimanjaro, from Moshi",
    ],
    safaris: [
      {
        country: "Kenya",
        title: "3-day Masai Mara luxury safari",
        nights: "2 nights",
        route: "Nairobi → Masai Mara → Nairobi",
        note: "Private 4×4, Big Five tracking, and a luxury tented camp or lodge.",
        image: photos.kenya,
      },
      {
        country: "Kenya",
        title: "Masai Mara — 4-day signature safari",
        nights: "3 nights",
        route: "Nairobi → Masai Mara → Nairobi",
        note: "Sunrise and sunset drives, with a seasonal hot-air balloon if you want it.",
        image: photos.kenya,
      },
      {
        country: "Kenya",
        title: "Kenya grand circuit — 5 days",
        nights: "4 nights",
        route: "Nairobi → Lake Naivasha → Lake Nakuru → Masai Mara → Nairobi",
        note: "A boat safari on Naivasha, rhinos at Nakuru, then longer drives in the Mara.",
        image: photos.kenya,
      },
      {
        country: "Kenya",
        title: "Kenya ultimate wilderness — 6 days",
        nights: "5 nights",
        route: "Nairobi → Amboseli → Lake Naivasha → Masai Mara → Nairobi",
        note: "Amboseli’s elephants with Kilimanjaro behind them, then the Mara.",
        image: photos.kenya,
      },
      {
        country: "Tanzania",
        title: "3-day Serengeti safari",
        nights: "2 nights",
        route: "Arusha → Serengeti → Arusha",
        note: "Game drives on the plains, with a chance of the migration in season.",
        image: photos.tanzania,
      },
      {
        country: "Tanzania",
        title: "4-day Serengeti and Ngorongoro",
        nights: "3 nights",
        route: "Arusha → Serengeti → Ngorongoro Crater → Arusha",
        note: "Two nights on the Serengeti, then the crater, with a private guide.",
        image: photos.tanzania,
      },
      {
        country: "Tanzania",
        title: "5-day Serengeti and Ngorongoro",
        nights: "4 nights",
        route: "Arusha → Ndutu → Central Serengeti → Ngorongoro → Arusha",
        note: "Ndutu for the migration season, then central Serengeti and the crater.",
        image: photos.tanzania,
      },
      {
        country: "Tanzania",
        title: "6-day Serengeti and Ngorongoro",
        nights: "5 nights",
        route: "Arusha → Ndutu → Central Serengeti → Ngorongoro → Arusha",
        note: "Two nights in Ndutu, two in central Serengeti, then the crater.",
        image: photos.tanzania,
      },
      {
        country: "Tanzania",
        title: "8-day northern circuit",
        nights: "7 nights",
        route: "Arusha → Lake Manyara → Serengeti → Ngorongoro → Tarangire → Arusha",
        note: "Manyara, three nights in the Serengeti, the crater, and Tarangire’s elephants.",
        image: photos.tanzania,
      },
      {
        country: "Kilimanjaro",
        title: "5-day Kilimanjaro, Marangu route",
        nights: "On the mountain",
        route: "Moshi → Marangu Gate → Uhuru Peak → Moshi",
        note: "Hut accommodation, a gradual ascent, and a sunrise attempt at 5,895 m.",
        image: photos.kilimanjaro,
      },
      {
        country: "Kilimanjaro",
        title: "6-day Kilimanjaro, Machame route",
        nights: "On the mountain",
        route: "Moshi → Machame Gate → Uhuru Peak → Moshi",
        note: "Tented camps and a longer acclimatisation than the five-day route.",
        image: photos.kilimanjaro,
      },
      {
        country: "Kilimanjaro",
        title: "7-day Kilimanjaro, Lemosho route",
        nights: "On the mountain",
        route: "Moshi → Londorossi Gate → Uhuru Peak → Moshi",
        note: "The scenic west-to-east traverse, with more time to acclimatise.",
        image: photos.kilimanjaro,
      },
    ],
  },
];

export const beliefs = [
  {
    title: "Help is never far.",
    text: "Your leaders are certified by leading mountaineering institutes and trained in first response, with years of experience on these roads. Oxygen, first-aid, a backup vehicle and a mechanic travel with you. We climb slowly. If someone struggles, we go down. No ego, no heroics.",
  },
  {
    title: "What’s in. What’s out. In writing.",
    text: "Stays, meals, permits, fuel: it’s all listed before you pay, and so is what isn’t covered. No surprise charges, no vague promises. If weather or a landslide forces a change, we tell you straight and we tell you why.",
  },
  {
    title: "Tell us your fear. We’ll tell you the truth.",
    text: "Not fit enough? First time at altitude? Never ridden a road like this? Ask us. We’ll say whether the trip is right for you, and if it isn’t, we’ll say that too.",
  },
  {
    title: "The India most visitors never see.",
    text: "Adi Kailash. Darma Valley. Johar Valley. Roads that never make the usual list. Stays, food, sightseeing, permits: we take care of it all, so you can just focus on the trip.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Who’s coming? What’s on your mind?",
    text: "Just you, a couple, a family, or a few friends. Tell us your dates, what you want to do, and what worries you.",
  },
  {
    n: "02",
    title: "We listen. Then we plan it.",
    text: "Someone who’s been there tells you honestly if the trip suits you. Then we shape a route around your pace and budget, from one of our departures or as a private plan, and adjust it until it sounds like your trip.",
  },
  {
    n: "03",
    title: "We get you ready.",
    text: "Before you go, we tell you what to pack, what to bring for permits, and what to expect on the road. On Day 1, you meet your leader and your group.",
  },
  {
    n: "04",
    title: "Pack light. Go high.",
    text: "Stays, permits and the people on the ground are sorted. Your job is to show up. The mountains take it from there.",
  },
];

export const reviews = [
  {
    name: "Yogesh Giri",
    place: "Munsyari",
    text: "Went to Munsyari solo with Driftmates and honestly had a great time. I joined the group alone but everyone was really nice and the vibe was amazing. Everything was well planned and I got to enjoy the mountains, meet new people and make some good memories. Didn’t feel like I was travelling alone at all. Would definitely love to travel with Driftmates again!",
  },
  {
    name: "Phoebe Lim",
    place: "Kashmir",
    text: "Pankaj and his crew mates were very organised and protective guides. We did a 9 days hike at Kashmir, they took care of us well. Making sure we are comfortable, making sure our documents were all ready to transit to the next base camp, it was smooth sailing. There were weather problems, but they were quick to react and make sure we’re ready to weather it before continuing our hike. It was a great experience with Pankaj! I would look forward to another hiking trial with his team.",
  },
  {
    name: "Disha Lahoti",
    place: "Munsiyari",
    text: "Sometimes you need a trip where you don’t have to think too much and can simply enjoy being somewhere new. That’s what Munsiyari was for me. The long mountain drives, little stops along the way, fresh air, and those beautiful Himalayan views made the journey worth it. I was a little particular about the stay and travel arrangements, but everything went smoothly. The food was good, and I never felt like the trip was just about rushing through tourist spots. There was enough time to sit back and enjoy the place. Pankaj helped coordinate the arrangements and made things easier throughout the trip. I appreciate that kind of support because it lets you enjoy your holiday without constantly figuring things out yourself. Came back feeling refreshed, with a camera full of pictures and a mind full of memories. Thanks to Driftmates for a lovely Munsiyari experience!",
  },
  {
    name: "Rakesh",
    place: "Munsiyari",
    text: "We didn’t want a trip where every day was packed with activities and we had to keep checking the clock. We wanted to explore Munsiyari in our own way, enjoy the drive, spend time around the mountains, and have some flexibility in our plans. Driftmates helped us put together an itinerary that suited what we had in mind. The best part was having the freedom to enjoy the destination instead of treating it like a checklist. The travel arrangements, stay, and meals were managed well, and the overall coordination was smooth. Ritvik helped with organising the trip around our preferences, which made the planning process easier. We appreciated being able to discuss what we wanted rather than simply being given a fixed plan. Munsiyari is beautiful, but having the right pace made the experience even better for us. Thanks to Ritvik and Drift mates for helping us enjoy the mountains our way. We’d happily plan another customised trip with the team.",
  },
  {
    name: "Vipin Upadhyay",
    place: "Munsiyari",
    text: "We planned this Munsiyari trip as a getaway with friends, but honestly, the journey became just as memorable as the destination. The mountain roads, random conversations, stopping to admire the views, and spending time together away from our usual routine made it such a fun experience. Of course, travelling with a group means everyone has their own preferences, but the arrangements were handled well. The stay was comfortable, the food was satisfying, and we had enough time to explore without feeling like someone was constantly rushing us. Ritvik was helpful with the coordination, which made things easier for all of us. We could focus on enjoying the trip instead of worrying about the logistics. Munsiyari gave us the kind of break we didn’t know we needed. Thanks, Driftmates, for putting this together. We’re already talking about where to go next!",
  },
  {
    name: "Manvi Agarwal",
    place: "Munsiyari",
    text: "We wanted to take a break from our busy routine and spend some quality time together, and Munsiyari turned out to be a lovely choice. The mountains were beautiful, the surroundings were peaceful, and the journey gave us plenty of moments to enjoy as a family. When travelling with family, small things matter a lot — a comfortable room after a long drive, timely meals, and knowing that the travel arrangements are taken care of. We were happy with the overall arrangements, accommodation, and food during the trip. Pankaj was helpful in coordinating everything and addressing our queries. That made us feel more relaxed, especially while travelling with the family. We returned with some lovely photographs and memories that we will cherish for a long time. Thank you, Driftmates, for helping us experience Munsiyari in such a comfortable and enjoyable way.",
  },
  {
    name: "Akshay Poriya",
    place: "Trek",
    text: "Highly recommended for anyone looking for a well-organized, memorable trek. Their guides are knowledgeable, caring, and have expertise in keeping the group safe and motivated throughout.",
  },
  {
    name: "Pushpak Bakshi",
    place: "Ladakh",
    text: "An Unforgettable Ladakh Adventure with The Driftmates! Last year, my wife and I had the incredible opportunity to explore the breathtaking landscapes of Ladakh on a bike trip organized by The Driftmates, led by Pankaj Sir. The overall experience was absolutely fantastic and truly memorable. From the well-planned itinerary and early morning starts to the thrilling rides and unforgettable experiences, everything was organized exceptionally well. A special mention goes to Pankaj Sir, whose constant support, guidance, and dedication made the entire journey smooth, comfortable, and enjoyable. His inspiring journey and passion for adventure make The Driftmates more than just a travel planner — it’s a community that turns travel dreams into lifelong memories. Highly recommended for anyone looking for an adventurous, well-organized, and truly memorable travel experience! If you’re planning to explore Ladakh or embark on your next adventure, The Driftmates is definitely worth considering. Thank you, Pankaj Sir and The Driftmates, for giving us memories that we will cherish forever!",
  },
  {
    name: "Rekha Lohani",
    place: "Spiti",
    text: "This was my first time visiting Spiti, and I had quite a few questions before the trip, especially about what to pack, how to prepare for the altitude and what to expect during the journey. The Driftmates team helped us understand these things beforehand, which made me feel much more prepared and confident. Once we were there, I could actually enjoy the experience instead of worrying about every little detail. Seeing the villages, monasteries and those incredible mountains in person was something special. Would definitely recommend preparing properly before visiting Spiti.",
  },
  {
    name: "AnkiT Upadhyay",
    place: "Munsyari",
    text: "An Unforgettable Munsyari Experience. My trip to Munsyari with Driftmates was an amazing experience. The breathtaking views of the Panchachuli peaks, peaceful mountain roads, and beautiful local villages made the journey truly special. What I loved most was the vibe of the group. Travelling with strangers and ending up sharing laughs, good food, and unforgettable memories made the trip even better. The arrangements were smooth, and the team was helpful throughout. Overall, it was a perfect mix of mountains, adventure, and great company. I’d definitely recommend Driftmates to anyone looking to explore Munsyari and experience the beauty of Uttarakhand!",
  },
  {
    name: "Manisha Pai",
    place: "Sela Pass · Bum La",
    text: "Everything was so well organized — from the bikes, accommodation, permits, and meals to the constant support from the crew throughout the journey. Pankaj made sure everyone felt safe and comfortable, even on the toughest routes through Sela Pass and Bum La. The trip itself was beyond beautiful. Special mention to the backup team — they were always around to help with any bike issues or weather challenges.",
  },
  {
    name: "Achal Tiwari",
    place: "With Pankaj",
    text: "From the very beginning to the last mile of our journey, our travel instructor and trip captain Pankaj Singh proved to be nothing short of exceptional. Their leadership, energy, and knowledge added immense value to the entire experience. Always approachable and full of enthusiasm, they managed every detail with precision — from route planning and safety to group coordination and local insights. Whether it was navigating challenging terrain, offering motivational support, or simply cracking a well-timed joke, they made sure every traveler felt comfortable, confident, and included. Their passion for travel was infectious, turning each moment into a memory — not just a trip, but an experience we’ll always carry with us. Highly recommended for anyone seeking an adventure that’s as smooth as it is unforgettable. Kudos and a big thank you Pankaj Bhai for making this journey so special!",
  },
  {
    name: "Mayuresh Yadav",
    place: "Manali to Srinagar",
    text: "Manali to Srinagar Bike Trip – An Unforgettable Journey. We recently completed the incredible bike trip from Manali to Srinagar, and it was truly the adventure of a lifetime. From snow-capped peaks to winding mountain roads and breathtaking landscapes, every moment was unforgettable. A huge shout-out to our trip captain, Pankaj, whose leadership, guidance, and calm presence made all the difference. Whether it was navigating tough terrains, ensuring everyone’s safety, or just keeping the spirits high with his positivity, Pankaj was truly the backbone of this journey. He was always approachable, professional, and went the extra mile to make sure each rider was comfortable and confident. Thanks to Pankaj and the entire team, we didn’t just complete a trip — we created lifelong memories. Highly recommend this experience to anyone looking for a real adventure!",
  },
  {
    name: "Milind Patil",
    place: "Leh Ladakh",
    text: "I recently went on a mountain ride to leh-ladakh and it was nothing short of breathtaking! From the moment we began the ascent, the views were absolutely stunning — rolling hills, lush greenery, and crisp, fresh air that instantly lifted my mood. Our guide Pankaj was skilled and made us feel safe throughout, even on the steeper curves. We made several scenic stops along the way which were perfect for photos and a bit of exploration. Overall, the mountain ride was a perfect blend of adventure, natural beauty, and peace. Highly recommended for anyone looking to escape the city noise and reconnect with nature!",
  },
  {
    name: "Prathmesh Yadav",
    place: "With Pankaj",
    text: "The trip was an amazing experience from start to finish. The journey was smooth and enjoyable, with beautiful scenery along the way. Everything was well-organized, and the moments spent exploring new places made it truly memorable. It was a perfect mix of relaxation, adventure, and discovery. A special thanks to Captain Pankaj Singh for his excellent leadership and calm presence — he made the journey feel safe and enjoyable throughout. His professionalism and friendly nature truly stood out.",
  },
  {
    name: "Shubhankar Gogate",
    place: "Manali to Srinagar",
    text: "An unforgettable ride from Manali to Srinagar via Ladakh! Stunning landscapes and challenging high passes like Baralacha La and Khardung La — every mile was worth it. Special thanks to Captain Pankaj for guiding us safely and making it fun. If you love adventure, epic views, and testing your limits, this trip is a must!",
  },
  {
    name: "Meghana Gowda",
    place: "With the crew",
    text: "Memorable experience. Such a wholesome and knowledgeable team! Captain Pankaj was such a considerate and Kind person, Namgyal, Zulfi and Manish (might’ve butchered their names, sorry)are a vibe! They were always available — helped, guided and kept us informed throughout our journey. Food, accommodation, itinerary, breaks during our rides, time given to explore the place were perfectly followed. No compromise, no complaints. Delivered what was promised!",
  },
];

export const faqs = [
  {
    q: "Who is behind Driftmates?",
    a: "Driftmates is a team that helps people travel across the Himalayas. We bring years of ground experience, mountaineering-certified members, and a real passion for travel.",
  },
  {
    q: "What makes Driftmates different?",
    a: "We work directly with the people who live in these mountains. Our team visits each place, checks every route, and spends time there to understand it properly. Then we craft each itinerary together with locals, so you experience the Himalayas the way they are truly lived.",
  },
  {
    q: "Who will I be travelling with?",
    a: "Our groups are limited to 15 travelers, so every guest is looked after personally. Many of our guests travel solo, including women, and our team makes sure you feel at ease from the first day. An experienced person from our team is with you on the ground throughout.",
  },
  {
    q: "Is Driftmates a registered company?",
    a: "Yes. Driftmates is a registered travel company based in Uttarakhand, operating as Driftmates Adventure, UDYAM-UK-07-0052704. Our team leads are certified by a mountaineering institute. If you have any questions, you are always welcome to reach out.",
  },
  {
    q: "What about food and dietary needs?",
    a: "Tell us when you book if you are vegetarian, Jain, or have any allergy, and we will arrange your meals with our stays. In remote areas the menu is simple and local, but it will always suit your needs.",
  },
  {
    q: "Can I plan a private or custom trip?",
    a: "Yes. Families, couples and friend groups can travel on their own dates and plan. Tell us what you have in mind and we will craft it with our local team.",
  },
  {
    q: "When is the best time to travel?",
    a: "It depends on the destination, as each part of the Himalayas has its own season. Every trip page shows the best months, and we will happily advise you if you are unsure.",
  },
  {
    q: "How do you support the places you visit?",
    a: "We work directly with local people, from homestays to drivers and guides, so the money from your trip stays in the mountain communities. We ask every traveler to take their waste back with them and to respect local life.",
  },
  {
    q: "Where will we stay?",
    a: "Our stays follow the itinerary and the places we explore. In cities we stay in good hotels, in remote villages in homestays, and on treks in tents, so you experience the mountains the way they really are.",
  },
  {
    q: "How do I book?",
    a: "You can reach us by message, call or email, whichever is easiest for you, and we will take you through it step by step. Payment and cancellation terms are shared clearly before you confirm.",
  },
];

export function getJourney(slug) {
  return journeys.find((j) => j.slug === slug);
}

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug);
}
