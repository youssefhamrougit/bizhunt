/* ── BizHunt main.js ─────────────────────────────────────────────────────── */
 
const CATEGORIES = [
  {icon:"💈",label:"Barbershops",query:"barbershop"},
  {icon:"🔪",label:"Tattoo Artists",query:"tattoo shop"},
  {icon:"💅",label:"Nail Salons",query:"nail salon"},
  {icon:"💉",label:"Aesthetic Clinics",query:"aesthetic clinic"},
  {icon:"🧖",label:"Spas & Wellness",query:"spa"},
  {icon:"🏋️",label:"Gyms & Fitness",query:"gym"},
  {icon:"💊",label:"Pharmacies",query:"pharmacy"},
  {icon:"🦷",label:"Dental Clinics",query:"dentist"},
  {icon:"👓",label:"Optical Shops",query:"optician"},
  {icon:"🍕",label:"Restaurants",query:"restaurant"},
  {icon:"☕",label:"Cafes",query:"cafe"},
  {icon:"🥐",label:"Bakeries",query:"bakery"},
  {icon:"🍦",label:"Ice Cream Shops",query:"ice cream shop"},
  {icon:"🍔",label:"Fast Food",query:"fast food"},
  {icon:"🧁",label:"Pastry Shops",query:"pastry shop"},
  {icon:"🛒",label:"Supermarkets",query:"supermarket"},
  {icon:"🥩",label:"Butcher Shops",query:"butcher"},
  {icon:"🐟",label:"Fish Markets",query:"fish market"},
  {icon:"🌿",label:"Organic Stores",query:"organic food store"},
  {icon:"🍷",label:"Wine & Spirits",query:"wine shop"},
  {icon:"👗",label:"Clothing Boutiques",query:"clothing boutique"},
  {icon:"👟",label:"Shoe Stores",query:"shoe store"},
  {icon:"💎",label:"Jewelry Shops",query:"jewelry shop"},
  {icon:"👜",label:"Accessories Shops",query:"accessories shop"},
  {icon:"🧵",label:"Tailors",query:"tailor"},
  {icon:"🖨️",label:"Print Shops",query:"print shop"},
  {icon:"📱",label:"Phone Repair",query:"phone repair"},
  {icon:"🔧",label:"Auto Repair",query:"auto repair"},
  {icon:"🧽",label:"Cleaning Services",query:"cleaning service"},
  {icon:"🏠",label:"Real Estate",query:"real estate agency"},
  {icon:"📸",label:"Photography Studios",query:"photography studio"},
  {icon:"🎨",label:"Art Studios",query:"art studio"},
  {icon:"🎸",label:"Music Schools",query:"music school"},
  {icon:"📚",label:"Bookstores",query:"bookstore"},
  {icon:"🐾",label:"Pet Shops",query:"pet shop"},
  {icon:"🌸",label:"Flower Shops",query:"florist"},
  {icon:"🩺",label:"Veterinary Clinics",query:"veterinary clinic"},
  {icon:"🏊",label:"Swimming Pools",query:"swimming pool"},
  {icon:"🎮",label:"Gaming Centers",query:"gaming center"},
  {icon:"🎭",label:"Event Venues",query:"event venue"},
];
 
let selectedCats = new Set();
let selectedStars = 0;
let huntResults = [];
 
/* ── Build UI ─────────────────────────────────────────────────────────────── */
function buildCatGrid() {
  const grid = document.getElementById("cat-grid");
  CATEGORIES.forEach((c, i) => {
    const el = document.createElement("div");
    el.className = "cat-item";
    el.dataset.i = i;
    el.innerHTML = `<span class="cat-icon">${c.icon}</span><span class="cat-label">${c.label}</span><div class="cat-check"></div>`;
    el.onclick = () => toggleCat(i, el);
    grid.appendChild(el);
  });
}
 
function buildStarRow() {
  const row = document.getElementById("star-row");
  [[0,"Any rating"],[4,"4★ & above"],[4.5,"4.5★ & above"]].forEach(([v, label]) => {
 
    const el = document.createElement("div");
    el.className = "star-option" + (v === 0 ? " selected" : "");
    const stars = v > 0 ? `<span class="stars">${"★".repeat(Math.floor(v))}${v % 1 ? "½" : ""}</span>` : "";
    el.innerHTML = `${stars}${label}`;
    el.onclick = () => {
      document.querySelectorAll(".star-option").forEach(e => e.classList.remove("selected"));
      el.classList.add("selected");
      selectedStars = v;
    };
    row.appendChild(el);
  });
}
 
/* ── Category toggles ─────────────────────────────────────────────────────── */
function toggleCat(i, el) {
  if (selectedCats.has(i)) { selectedCats.delete(i); el.classList.remove("selected"); }
  else { selectedCats.add(i); el.classList.add("selected"); }
}
function selectAllCats() {
  document.querySelectorAll(".cat-item").forEach((el, i) => { selectedCats.add(i); el.classList.add("selected"); });
}
function clearAllCats() {
  selectedCats.clear();
  document.querySelectorAll(".cat-item").forEach(el => el.classList.remove("selected"));
}
 
/* ── Cities data ─────────────────────────────────────────────────────────── */
const CITIES = {
  "Afghanistan": ["Kabul","Kandahar","Herat","Mazar-i-Sharif","Jalalabad"],
  "Albania": ["Tirana","Durrës","Vlorë","Shkodër","Elbasan"],
  "Algeria": ["Algiers","Oran","Constantine","Annaba","Blida","Batna","Sétif","Tlemcen","Sidi Bel Abbès","Béjaïa"],
  "Argentina": ["Buenos Aires","Córdoba","Rosario","Mendoza","Tucumán","La Plata","Mar del Plata","Salta","Santa Fe","San Juan"],
  "Australia": ["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Canberra","Hobart","Darwin","Newcastle"],
  "Austria": ["Vienna","Graz","Linz","Salzburg","Innsbruck","Klagenfurt","Wels","St. Pölten"],
  "Bangladesh": ["Dhaka","Chittagong","Sylhet","Khulna","Rajshahi","Comilla","Narayanganj","Gazipur"],
  "Belgium": ["Brussels","Antwerp","Ghent","Charleroi","Liège","Bruges","Namur","Leuven"],
  "Bolivia": ["La Paz","Santa Cruz","Cochabamba","Sucre","Oruro","Potosí"],
  "Brazil": ["São Paulo","Rio de Janeiro","Brasília","Salvador","Fortaleza","Belo Horizonte","Manaus","Curitiba","Recife","Porto Alegre"],
  "Cambodia": ["Phnom Penh","Siem Reap","Sihanoukville","Battambang","Kampong Cham"],
  "Canada": ["Toronto","Montreal","Vancouver","Calgary","Edmonton","Ottawa","Winnipeg","Quebec City","Hamilton","Kitchener"],
  "Chile": ["Santiago","Valparaíso","Concepción","La Serena","Antofagasta","Temuco","Rancagua","Arica"],
  "China": ["Beijing","Shanghai","Guangzhou","Shenzhen","Chengdu","Wuhan","Xi'an","Hangzhou","Chongqing","Nanjing","Tianjin","Dongguan"],
  "Colombia": ["Bogotá","Medellín","Cali","Barranquilla","Cartagena","Bucaramanga","Pereira","Santa Marta"],
  "Croatia": ["Zagreb","Split","Rijeka","Osijek","Zadar","Dubrovnik"],
  "Czech Republic": ["Prague","Brno","Ostrava","Plzeň","Liberec","Olomouc"],
  "Denmark": ["Copenhagen","Aarhus","Odense","Aalborg","Frederiksberg","Esbjerg"],
  "Ecuador": ["Quito","Guayaquil","Cuenca","Ambato","Manta","Portoviejo"],
  "Egypt": ["Cairo","Alexandria","Giza","Shubra El Kheima","Port Said","Suez","Luxor","Aswan","Mansoura","Tanta"],
  "Ethiopia": ["Addis Ababa","Dire Dawa","Mek'ele","Gondar","Hawassa","Bahir Dar"],
  "Finland": ["Helsinki","Espoo","Tampere","Vantaa","Oulu","Turku","Jyväskylä"],
  "France": ["Paris","Marseille","Lyon","Toulouse","Nice","Nantes","Strasbourg","Montpellier","Bordeaux","Lille","Rennes","Reims"],
  "Germany": ["Berlin","Hamburg","Munich","Cologne","Frankfurt","Stuttgart","Düsseldorf","Dortmund","Essen","Leipzig","Bremen","Dresden"],
  "Ghana": ["Accra","Kumasi","Tamale","Sekondi-Takoradi","Cape Coast"],
  "Greece": ["Athens","Thessaloniki","Patras","Heraklion","Larissa","Volos","Rhodes"],
  "Guatemala": ["Guatemala City","Quetzaltenango","Escuintla","Cobán","Huehuetenango"],
  "Hungary": ["Budapest","Debrecen","Miskolc","Szeged","Pécs","Győr"],
  "India": ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad","Surat","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Bhopal","Visakhapatnam","Kochi","Coimbatore"],
  "Indonesia": ["Jakarta","Surabaya","Bandung","Medan","Semarang","Makassar","Palembang","Tangerang","Depok","Bekasi","Bali","Yogyakarta"],
  "Iran": ["Tehran","Mashhad","Isfahan","Karaj","Tabriz","Shiraz","Qom","Ahvaz"],
  "Iraq": ["Baghdad","Basra","Mosul","Erbil","Kirkuk","Najaf","Karbala"],
  "Ireland": ["Dublin","Cork","Limerick","Galway","Waterford","Drogheda"],
  "Israel": ["Jerusalem","Tel Aviv","Haifa","Rishon LeZion","Petah Tikva","Ashdod","Beer Sheva"],
  "Italy": ["Rome","Milan","Naples","Turin","Palermo","Genoa","Bologna","Florence","Bari","Catania","Venice","Verona"],
  "Japan": ["Tokyo","Osaka","Nagoya","Yokohama","Sapporo","Kobe","Kyoto","Fukuoka","Hiroshima","Sendai","Kawasaki","Saitama"],
  "Jordan": ["Amman","Zarqa","Irbid","Russeifa","Aqaba","Madaba"],
  "Kenya": ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika"],
  "Lebanon": ["Beirut","Tripoli","Sidon","Tyre","Zahle","Jounieh"],
  "Malaysia": ["Kuala Lumpur","George Town","Ipoh","Shah Alam","Petaling Jaya","Johor Bahru","Kota Kinabalu","Kuching"],
  "Mexico": ["Mexico City","Guadalajara","Monterrey","Puebla","Tijuana","León","Juárez","Zapopan","Mérida","San Luis Potosí","Querétaro","Cancún"],
  "Morocco": ["Casablanca","Rabat","Fez","Marrakech","Tangier","Agadir","Meknes","Oujda","Kenitra","Tetouan","Nador","Beni Mellal"],
  "Netherlands": ["Amsterdam","Rotterdam","The Hague","Utrecht","Eindhoven","Tilburg","Groningen","Almere","Breda","Nijmegen"],
  "New Zealand": ["Auckland","Wellington","Christchurch","Hamilton","Tauranga","Dunedin"],
  "Nigeria": ["Lagos","Kano","Ibadan","Abuja","Port Harcourt","Benin City","Maiduguri","Zaria","Aba","Enugu"],
  "Norway": ["Oslo","Bergen","Trondheim","Stavanger","Drammen","Fredrikstad"],
  "Pakistan": ["Karachi","Lahore","Faisalabad","Rawalpindi","Gujranwala","Peshawar","Multan","Islamabad","Hyderabad","Quetta"],
  "Peru": ["Lima","Arequipa","Trujillo","Chiclayo","Cusco","Piura","Iquitos"],
  "Philippines": ["Manila","Quezon City","Davao","Caloocan","Cebu City","Zamboanga","Antipolo","Taguig","Pasig","Makati"],
  "Poland": ["Warsaw","Kraków","Łódź","Wrocław","Poznań","Gdańsk","Szczecin","Lublin","Katowice","Białystok"],
  "Portugal": ["Lisbon","Porto","Amadora","Braga","Coimbra","Funchal","Faro","Setúbal"],
  "Romania": ["Bucharest","Cluj-Napoca","Timișoara","Iași","Constanța","Brașov","Craiova","Galați"],
  "Russia": ["Moscow","Saint Petersburg","Novosibirsk","Yekaterinburg","Kazan","Nizhny Novgorod","Chelyabinsk","Omsk","Samara","Rostov-on-Don","Ufa","Krasnoyarsk"],
  "Saudi Arabia": ["Riyadh","Jeddah","Mecca","Medina","Dammam","Khobar","Tabuk","Buraidah","Khamis Mushait","Abha"],
  "Senegal": ["Dakar","Thiès","Kaolack","Ziguinchor","Saint-Louis"],
  "Serbia": ["Belgrade","Novi Sad","Niš","Kragujevac","Subotica"],
  "Singapore": ["Singapore"],
  "South Africa": ["Johannesburg","Cape Town","Durban","Pretoria","Port Elizabeth","Bloemfontein","Soweto","East London"],
  "South Korea": ["Seoul","Busan","Incheon","Daegu","Daejeon","Gwangju","Suwon","Ulsan","Changwon","Seongnam"],
  "Spain": ["Madrid","Barcelona","Valencia","Seville","Zaragoza","Málaga","Murcia","Palma","Las Palmas","Bilbao","Alicante","Córdoba"],
  "Sri Lanka": ["Colombo","Kandy","Galle","Jaffna","Negombo","Trincomalee"],
  "Sweden": ["Stockholm","Gothenburg","Malmö","Uppsala","Västerås","Örebro","Linköping","Helsingborg"],
  "Switzerland": ["Zurich","Geneva","Basel","Bern","Lausanne","Winterthur","Lucerne","St. Gallen"],
  "Syria": ["Damascus","Aleppo","Homs","Latakia","Hama","Deir ez-Zor"],
  "Taiwan": ["Taipei","Kaohsiung","Taichung","Tainan","Hsinchu","Keelung","Taoyuan"],
  "Thailand": ["Bangkok","Chiang Mai","Pattaya","Phuket","Nonthaburi","Udon Thani","Khon Kaen","Hat Yai","Nakhon Ratchasima"],
  "Tunisia": ["Tunis","Sfax","Sousse","Kairouan","Bizerte","Gabès","Ariana","La Marsa","Hammamet","Nabeul","Monastir","Mahdia","Gafsa","Kasserine","Beja","Jendouba","Siliana","Zaghouan","Médenine","Tataouine","Tozeur","Kebili","Le Kef","Sidi Bouzid","Msaken","Korba","Djerba","Zarzis"],
  "Turkey": ["Istanbul","Ankara","Izmir","Bursa","Adana","Gaziantep","Konya","Antalya","Kayseri","Mersin","Eskişehir","Diyarbakır","Samsun","Denizli"],
  "Uganda": ["Kampala","Gulu","Lira","Mbarara","Jinja","Entebbe"],
  "Ukraine": ["Kyiv","Kharkiv","Odessa","Dnipro","Donetsk","Zaporizhzhia","Lviv","Mykolaiv","Mariupol","Lutsk"],
  "United Arab Emirates": ["Dubai","Abu Dhabi","Sharjah","Al Ain","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain"],
  "United Kingdom": ["London","Birmingham","Manchester","Glasgow","Liverpool","Leeds","Sheffield","Edinburgh","Bristol","Cardiff","Leicester","Coventry","Bradford","Nottingham","Newcastle"],
  "United States": ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville","Fort Worth","Columbus","Charlotte","Indianapolis","San Francisco","Seattle","Denver","Nashville","Washington DC","Las Vegas","Portland","Boston","El Paso","Miami","Atlanta","Minneapolis"],
  "Uruguay": ["Montevideo","Salto","Ciudad de la Costa","Paysandú","Las Piedras"],
  "Venezuela": ["Caracas","Maracaibo","Valencia","Barquisimeto","Maracay","Maturín","Ciudad Guayana"],
  "Vietnam": ["Hanoi","Ho Chi Minh City","Da Nang","Hai Phong","Can Tho","Bien Hoa","Hue","Nha Trang","Da Lat","Vung Tau"],
};
 
/* ── Country / City change ───────────────────────────────────────────────── */
function onCountryChange() {
  const country = document.getElementById("country-select").value;
  const citySelect = document.getElementById("city-select");
  const areaInput = document.getElementById("area-input");
 
  citySelect.innerHTML = '<option value="">— Select city —</option>';
  citySelect.disabled = !country;
  areaInput.disabled = true;
 
  if (country && CITIES[country]) {
    CITIES[country].forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      // Pre-select Tunis if Tunisia
      if (country === "Tunisia" && city === "Tunis") opt.selected = true;
      citySelect.appendChild(opt);
    });
    // Trigger city change to enable area if a city is pre-selected
    if (citySelect.value) areaInput.disabled = false;
  }
}
 
function onCityChange() {
  const city = document.getElementById("city-select").value;
  document.getElementById("area-input").disabled = !city;
}
 
/* ── UI helpers ──────────────────────────────────────────────────────────── */
function showError(msg) {
  const b = document.getElementById("error-box");
  b.textContent = "⚠ " + msg;
  b.classList.add("active");
}
function clearError() { document.getElementById("error-box").classList.remove("active"); }
 
function log(msg, type = "") {
  const el = document.getElementById("progress-log");
  const line = document.createElement("div");
  line.className = "log-line" + (type ? " " + type : "");
  line.textContent = "› " + msg;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}
 
function setProgress(p) { document.getElementById("progress-bar").style.width = p + "%"; }
 
/* ── API calls (through Vercel serverless proxy) ───────────────── */
async function placesTextSearch(query) {
  const res = await fetch(`/api/places?action=textsearch&query=${encodeURIComponent(query)}`);
  return res.json();
}
 
async function placeDetails(placeId) {
  const res = await fetch(`/api/places?action=details&place_id=${encodeURIComponent(placeId)}`);
  return res.json();
}
 
async function claudeSocials(bizName, bizAddress, bizType) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bizName, bizAddress, bizType }),
  });
  return res.json();
}
 
/* ── HUNT ────────────────────────────────────────────────────────────────── */
async function startHunt() {
  clearError();
 
  const country = document.getElementById("country-select").value;
  const city = document.getElementById("city-select").value;
  const area = document.getElementById("area-input").value.trim();
 
  if (!country) return showError("Please select a country.");
  if (!city) return showError("Please select a city.");
  if (selectedCats.size === 0) return showError("Please select at least one category.");
 
  const cats = [...selectedCats].map(i => CATEGORIES[i]);
  const locationStr = [area, city, country].filter(Boolean).join(", ");
 
  document.getElementById("hunt-btn").disabled = true;
  document.getElementById("results-wrap").classList.remove("active");
  document.getElementById("progress-wrap").classList.add("active");
  document.getElementById("progress-log").innerHTML = "";
  setProgress(5);
 
  log(`Starting hunt in: ${locationStr}`);
  log(`Categories: ${cats.map(c => c.label).join(", ")}`);
  log(`Min rating: ${selectedStars > 0 ? selectedStars + "★" : "Any"}`);
 
  huntResults = [];
  const allPlaces = [];
 
  try {
    /* ── Step 1: Gather places ── */
    for (let ci = 0; ci < cats.length; ci++) {
      const cat = cats[ci];
      const queryStr = `${cat.query} in ${locationStr}`;
      log(`Searching: ${queryStr}...`);
      setProgress(5 + (ci / cats.length) * 40);
 
      let data;
      try {
        data = await placesTextSearch(queryStr);
      } catch (e) {
        log(`Network error for ${cat.label}: ${e.message}`, "err");
        continue;
      }
 
      if (data.error) {
        showError(data.error);
        document.getElementById("hunt-btn").disabled = false;
        document.getElementById("progress-wrap").classList.remove("active");
        return;
      }
 
      if (data.status === "REQUEST_DENIED") {
        showError("Google Maps API key is invalid or missing Places API access. Check server env vars.");
        document.getElementById("hunt-btn").disabled = false;
        document.getElementById("progress-wrap").classList.remove("active");
        return;
      }
 
      if (data.results && data.results.length > 0) {
        for (const place of data.results) {
          if (!allPlaces.find(p => p.place_id === place.place_id)) {
            allPlaces.push({ ...place, cat });
          }
        }
        log(`Found ${data.results.length} results for ${cat.label}`, "ok");
      } else {
        log(`No results for ${cat.label}`);
      }
    }
 
    log(`Total unique places: ${allPlaces.length}. Filtering no-website businesses...`);
    setProgress(50);
 
    /* ── Step 2: Filter + enrich ── */
    let kept = 0;
    for (let pi = 0; pi < allPlaces.length; pi++) {
      const place = allPlaces[pi];
      setProgress(50 + (pi / allPlaces.length) * 35);
 
      const rating = place.rating || 0;
      if (selectedStars > 0 && rating < selectedStars) continue;
 
      let details = {};
      try {
        const det = await placeDetails(place.place_id);
        details = det.result || {};
      } catch (_) {}
 
      // Skip if they have a website — not our target
      if (details.website) continue;
 
      const bizName = details.name || place.name || "Unknown";
      const bizAddress = details.formatted_address || place.formatted_address || "";
      const bizType = place.cat ? place.cat.label : "Business";
      const bizRating = details.rating || place.rating || 0;
      const bizReviews = details.user_ratings_total || place.user_ratings_total || 0;
      const mapsUrl = details.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bizName + " " + bizAddress)}`;
 
      log(`[${kept + 1}] ${bizName} — fetching social data...`);
 
      let socials = { instagram: null, facebook: null };
      try {
        const s = await claudeSocials(bizName, bizAddress, bizType);
        if (!s.error) socials = s;
      } catch (_) {}
 
      huntResults.push({ name: bizName, type: bizType, rating: bizRating, reviews: bizReviews, mapsUrl, instagram: socials.instagram, facebook: socials.facebook, address: bizAddress });
      kept++;
    }
 
    setProgress(100);
    log(`Hunt complete! ${huntResults.length} businesses without websites found.`, "ok");
 
    setTimeout(() => {
      document.getElementById("progress-wrap").classList.remove("active");
      renderResults(locationStr, cats);
      document.getElementById("hunt-btn").disabled = false;
    }, 800);
 
  } catch (e) {
    showError("Unexpected error: " + e.message);
    document.getElementById("hunt-btn").disabled = false;
    document.getElementById("progress-wrap").classList.remove("active");
  }
}
 
/* ── Render results table ─────────────────────────────────────────────────── */
function starHtml(r) {
  if (!r) return '<span class="not-found">—</span>';
  const full = Math.floor(r);
  const half = (r - full) >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const stars = "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  return `<span class="rating-num">${r.toFixed(1)}</span><span class="stars">${stars}</span>`;
}
 
function renderResults(location, cats) {
  const wrap = document.getElementById("results-wrap");
  const tbody = document.getElementById("results-body");
  tbody.innerHTML = "";
 
  document.getElementById("count-badge").textContent = huntResults.length;
  document.getElementById("results-meta").textContent = `${location} · ${cats.map(c => c.label).join(", ")} · No website`;
 
  if (huntResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="big">🔍</div>No businesses found matching all filters. Try a broader area or more categories.</div></td></tr>`;
  } else {
    huntResults.forEach((b, i) => {
      const tr = document.createElement("tr");
      const igLink = b.instagram        ? `<a class="social-link insta" href="https://instagram.com/${b.instagram}" target="_blank">📸 @${b.instagram}</a>`
      : `<span class="not-found">not found</span>`;
      const fbLink = b.facebook        ? `<a class="social-link fb" href="https://facebook.com/${b.facebook}" target="_blank">👤 ${b.facebook}</a>`
      : `<span class="not-found">not found</span>`;
      const revLink = `<a class="social-link reviews" href="${b.mapsUrl}" target="_blank">⭐ ${b.reviews.toLocaleString()} reviews</a>`;
      tr.innerHTML = `
      <td style="color:var(--muted);font-family:var(--font-mono);font-size:12px">${i + 1}</td>
      <td><div class="biz-name">${b.name}</div><div style="font-size:11px;color:var(--muted);margin-top:2px">${b.address}</div></td>
      <td><span class="biz-type">${b.type}</span></td>
      <td>${starHtml(b.rating)}</td>
      <td>${revLink}</td>
      <td>${igLink}</td>
      <td>${fbLink}</td>
      `;
      tbody.appendChild(tr);
    });
  }
 
  wrap.classList.add("active");
  wrap.scrollIntoView({ behavior: "smooth", block: "start" });
}
 
/* ── Export CSV ──────────────────────────────────────────────────────────── */
function exportCSV() {
  const rows = [["#","Business Name","Address","Type","Rating","Reviews","Google Maps","Instagram","Facebook"]];
  huntResults.forEach((b, i) => {
    rows.push([
      i + 1, b.name, b.address, b.type, b.rating, b.reviews, b.mapsUrl,
      b.instagram ? `https://instagram.com/${b.instagram}` : "",
      b.facebook ? `https://facebook.com/${b.facebook}` : "",
    ]);
  });
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = "bizhunt_results.csv";
  a.click();
}
 
/* ── Init ────────────────────────────────────────────────────────────────── */
buildCatGrid();
buildStarRow();