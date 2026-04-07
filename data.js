// Centralized data (destinations, typed POIs with icons, hotels with details)
window.SARATHI_DATA = (() => {
  // icon per POI type
  const POI_ICON = {
    heritage: "🏛️",
    temple: "🛕",
    beach: "🏖️",
    mall: "🛍️",
    waterfront: "🌊",
    museum: "🏺",
    cliff: "⛰️",
    market: "🧺",
    food: "🍲",
  };

  const DESTS = [
    {
      id: "Kochi",
      lat: 9.9312,
      lng: 76.2673,
      pois: [
        {
          id: "fortkochi",
          n: "Fort Kochi",
          type: "heritage",
          lat: 9.9665,
          lng: 76.2425,
        },
        {
          id: "lulumall",
          n: "Lulu Mall",
          type: "mall",
          lat: 10.0269,
          lng: 76.3083,
        },
        {
          id: "marinedrive",
          n: "Marine Drive",
          type: "waterfront",
          lat: 9.984,
          lng: 76.275,
        },
        {
          id: "jewtown",
          n: "Jew Town Street",
          type: "market",
          lat: 9.9626,
          lng: 76.2439,
        },
      ],
    },
    {
      id: "Thiruvananthapuram",
      lat: 8.5241,
      lng: 76.9366,
      pois: [
        {
          id: "padmanabha",
          n: "Padmanabhaswamy Temple",
          type: "temple",
          lat: 8.4825,
          lng: 76.9432,
        },
        {
          id: "kovalam",
          n: "Kovalam Beach",
          type: "beach",
          lat: 8.4019,
          lng: 76.9783,
        },
        {
          id: "veli",
          n: "Veli Tourist Village",
          type: "waterfront",
          lat: 8.5236,
          lng: 76.9,
        },
      ],
    },
    {
      id: "Alappuzha",
      lat: 9.4981,
      lng: 76.3388,
      pois: [
        {
          id: "backwaterjetty",
          n: "Backwaters Jetty",
          type: "waterfront",
          lat: 9.4988,
          lng: 76.338,
        },
        {
          id: "alpybeach",
          n: "Alappuzha Beach",
          type: "beach",
          lat: 9.4896,
          lng: 76.318,
        },
      ],
    },
    {
      id: "Munnar",
      lat: 10.0892,
      lng: 77.0595,
      pois: [
        {
          id: "teamuseum",
          n: "Tea Museum",
          type: "museum",
          lat: 10.0842,
          lng: 77.0622,
        },
        {
          id: "topstation",
          n: "Top Station",
          type: "cliff",
          lat: 10.1265,
          lng: 77.2485,
        },
      ],
    },
    {
      id: "Varkala",
      lat: 8.7379,
      lng: 76.716,
      pois: [
        {
          id: "varkalacliff",
          n: "Varkala Cliff",
          type: "cliff",
          lat: 8.7369,
          lng: 76.7112,
        },
        {
          id: "papanasam",
          n: "Papanasam Beach",
          type: "beach",
          lat: 8.7338,
          lng: 76.7087,
        },
      ],
    },
    {
      id: "Wayanad",
      lat: 11.6854,
      lng: 76.132,
      pois: [
        {
          id: "edakkal",
          n: "Edakkal Caves",
          type: "heritage",
          lat: 11.6217,
          lng: 76.2575,
        },
      ],
    },
    {
      id: "Kozhikode",
      lat: 11.2588,
      lng: 75.7804,
      pois: [
        {
          id: "calicutbeach",
          n: "Calicut Beach",
          type: "beach",
          lat: 11.2596,
          lng: 75.7667,
        },
        {
          id: "smstreet",
          n: "S.M. Street",
          type: "market",
          lat: 11.2541,
          lng: 75.7812,
        },
      ],
    },
    {
      id: "Thrissur",
      lat: 10.5276,
      lng: 76.2144,
      pois: [
        {
          id: "vadakkunnathan",
          n: "Vadakkunnathan Temple",
          type: "temple",
          lat: 10.5231,
          lng: 76.2145,
        },
      ],
    },
  ];

  // Rich hotels: area, address, coords, phone, rating, amenities
  const HOTELS = [
    {
      name: "Fort Kochi Stay",
      area: "Kochi",
      addr: "2/17 Princess St, Fort Kochi",
      lat: 9.9669,
      lng: 76.2423,
      phone: "+91-484-0000001",
      rating: { avg: 4.3, count: 182 },
      price: [2200, 3600],
      amenities: ["wifi", "ac", "breakfast"],
    },
    {
      name: "Marine Drive View",
      area: "Kochi",
      addr: "Opp. GCDA, Marine Drive",
      lat: 9.9836,
      lng: 76.2761,
      phone: "+91-484-0000002",
      rating: { avg: 4.1, count: 129 },
      price: [2600, 4200],
      amenities: ["wifi", "ac"],
    },
    {
      name: "Lulu Business",
      area: "Kochi",
      addr: "Edappally, near Lulu Mall",
      lat: 10.0278,
      lng: 76.3105,
      phone: "+91-484-0000003",
      rating: { avg: 4.5, count: 342 },
      price: [3200, 5200],
      amenities: ["wifi", "ac", "breakfast", "parking"],
    },

    {
      name: "Varkala Cliff Inn",
      area: "Varkala",
      addr: "North Cliff, Varkala",
      lat: 8.7376,
      lng: 76.7115,
      phone: "+91-470-0000004",
      rating: { avg: 4.2, count: 211 },
      price: [2000, 3200],
      amenities: ["wifi", "breakfast"],
    },
    {
      name: "Papanasam Bay",
      area: "Varkala",
      addr: "Beach Rd, Papanasam",
      lat: 8.7342,
      lng: 76.7091,
      phone: "+91-470-0000005",
      rating: { avg: 4.0, count: 98 },
      price: [2200, 3400],
      amenities: ["wifi"],
    },

    {
      name: "Munnar Tea View",
      area: "Munnar",
      addr: "Old Munnar Rd",
      lat: 10.0884,
      lng: 77.0602,
      phone: "+91-4865-000006",
      rating: { avg: 4.4, count: 260 },
      price: [3000, 4800],
      amenities: ["wifi", "breakfast", "parking"],
    },
    {
      name: "Top Station Camp",
      area: "Munnar",
      addr: "Top Station Rd",
      lat: 10.1258,
      lng: 77.2468,
      phone: "+91-4865-000007",
      rating: { avg: 4.1, count: 150 },
      price: [2400, 3600],
      amenities: ["wifi", "parking"],
    },

    {
      name: "Backwater Homestay",
      area: "Alappuzha",
      addr: "Finishing Point, Punnamada",
      lat: 9.4989,
      lng: 76.3392,
      phone: "+91-477-0000008",
      rating: { avg: 4.3, count: 173 },
      price: [1800, 2800],
      amenities: ["wifi", "breakfast"],
    },
    {
      name: "Houseboat Deluxe",
      area: "Alappuzha",
      addr: "Boat Jetty, Finishing Pt",
      lat: 9.4982,
      lng: 76.3377,
      phone: "+91-477-0000009",
      rating: { avg: 4.6, count: 320 },
      price: [4500, 8000],
      amenities: ["ac", "breakfast"],
    },

    {
      name: "City Comfort",
      area: "Thiruvananthapuram",
      addr: "Statue Jn, MG Rd",
      lat: 8.4882,
      lng: 76.949,
      phone: "+91-471-0000010",
      rating: { avg: 4.0, count: 215 },
      price: [2200, 3600],
      amenities: ["wifi", "ac", "parking"],
    },

    {
      name: "Wayanad Mist",
      area: "Wayanad",
      addr: "Kalpetta",
      lat: 11.6102,
      lng: 76.082,
      phone: "+91-4936-0000011",
      rating: { avg: 4.3, count: 142 },
      price: [2400, 3800],
      amenities: ["wifi", "breakfast", "parking"],
    },

    {
      name: "Calicut Beachfront",
      area: "Kozhikode",
      addr: "Beach Rd, Kozhikode",
      lat: 11.261,
      lng: 75.7701,
      phone: "+91-495-0000012",
      rating: { avg: 4.1, count: 180 },
      price: [2300, 3700],
      amenities: ["wifi", "ac"],
    },
  ];

  const ROUTES = [
    {
      name: "Muvattupuzha → Wayanad (Daylight)",
      tips: "Fuel @ Kalady; halt @ Adivaram; avoid night hairpins.",
      rating: 4.6,
    },
    {
      name: "Ernakulam → Munnar",
      tips: "Fog risk; check weather; reviewed tea stalls.",
      rating: 4.3,
    },
    {
      name: "Kozhikode → Wayanad Ghat",
      tips: "Hairpins; take breaks; avoid rain-night.",
      rating: 4.5,
    },
    {
      name: "Thrissur → Athirappilly",
      tips: "Monsoon caution; water levels; start early.",
      rating: 4.2,
    },
  ];

  const METRO_STATIONS = [
    "Aluva",
    "Pulinchodu",
    "Companypady",
    "Ambattukavu",
    "Muttom",
    "Kalamassery",
    "CUSAT",
    "Pathadipalam",
    "Edappally",
    "Changampuzha Park",
    "Palarivattom",
    "JLN Stadium",
    "Kaloor",
    "Town Hall",
    "M.G. Road",
    "Maharaja College",
    "Kadavanthra",
    "Elamkulam",
    "Vyttila",
    "Thaikoodam",
    "Petta",
  ];

  const PT_CITY_PAIRS = [
    ["Kochi", "Alappuzha"],
    ["Kochi", "Thrissur"],
    ["Kochi", "Kozhikode"],
    ["Kochi", "Thiruvananthapuram"],
    ["Kozhikode", "Wayanad"],
    ["Thiruvananthapuram", "Varkala"],
    ["Munnar", "Kochi"],
  ];

  return { DESTS, HOTELS, ROUTES, METRO_STATIONS, PT_CITY_PAIRS, POI_ICON };
})();
