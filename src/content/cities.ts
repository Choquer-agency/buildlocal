export interface CityConfig {
  slug: string;
  name: string;
  stateCode: string;
  state: string;
  population: string;
  latitude: number;
  longitude: number;
  nearbyAreas: string;
  marketContext: string;
  housingNote: string;
  growthNote: string;
}

export const cityMap: Record<string, CityConfig> = {
  phoenix: {
    slug: "phoenix",
    name: "Phoenix",
    stateCode: "AZ",
    state: "Arizona",
    population: "1.6M",
    latitude: 33.4484,
    longitude: -112.074,
    nearbyAreas: "Scottsdale, Tempe, Mesa, Glendale, and Chandler",
    marketContext:
      "Phoenix is the 5th largest city in the US and the fastest-growing major metro. Extreme heat drives year-round HVAC demand, and monsoon season creates consistent roofing work.",
    housingNote:
      "Median home value $380K with a mix of new construction in the suburbs and aging housing stock in central Phoenix.",
    growthNote:
      "Population grew 11% from 2010-2020, with continued rapid expansion in surrounding areas like Buckeye and Goodyear.",
  },
  scottsdale: {
    slug: "scottsdale",
    name: "Scottsdale",
    stateCode: "AZ",
    state: "Arizona",
    population: "242K",
    latitude: 33.4942,
    longitude: -111.9261,
    nearbyAreas: "Phoenix, Paradise Valley, Fountain Hills, and Cave Creek",
    marketContext:
      "Scottsdale is an affluent market with high-end residential properties. Homeowners invest heavily in landscaping, custom hardscaping, and premium home services.",
    housingNote:
      "Median home value $650K with 40% custom homes. High willingness to pay for quality trades work.",
    growthNote:
      "Steady growth driven by luxury real estate development and retiree relocation.",
  },
  mesa: {
    slug: "mesa",
    name: "Mesa",
    stateCode: "AZ",
    state: "Arizona",
    population: "508K",
    latitude: 33.4152,
    longitude: -111.8315,
    nearbyAreas: "Tempe, Gilbert, Chandler, Apache Junction, and Phoenix",
    marketContext:
      "Mesa is the 3rd largest city in Arizona with a diverse housing stock. Older neighborhoods in west Mesa drive plumbing and electrical upgrade demand.",
    housingNote:
      "Median home value $375K. Mix of 1960s-80s builds in west Mesa and newer developments in east Mesa.",
    growthNote:
      "Steady growth with major employment centers attracting young families.",
  },
  tempe: {
    slug: "tempe",
    name: "Tempe",
    stateCode: "AZ",
    state: "Arizona",
    population: "185K",
    latitude: 33.4255,
    longitude: -111.9405,
    nearbyAreas: "Phoenix, Scottsdale, Mesa, Chandler, and Guadalupe",
    marketContext:
      "Home to Arizona State University with a mix of student rentals and established residential neighborhoods. Strong demand for property management-related trades.",
    housingNote:
      "Median home value $410K. Dense housing near ASU campus and suburban homes in south Tempe.",
    growthNote:
      "Limited land for new development, driving renovation and remodel work.",
  },
  chandler: {
    slug: "chandler",
    name: "Chandler",
    stateCode: "AZ",
    state: "Arizona",
    population: "276K",
    latitude: 33.3062,
    longitude: -111.8413,
    nearbyAreas: "Gilbert, Mesa, Tempe, Phoenix, and Queen Creek",
    marketContext:
      "Major tech employment hub (Intel, PayPal, Wells Fargo) with high-income households that invest in home improvements and professional services.",
    housingNote:
      "Median home value $450K. Predominantly newer construction with HOA-managed communities.",
    growthNote:
      "Established market with steady demand driven by tech sector employment.",
  },
  gilbert: {
    slug: "gilbert",
    name: "Gilbert",
    stateCode: "AZ",
    state: "Arizona",
    population: "272K",
    latitude: 33.3528,
    longitude: -111.789,
    nearbyAreas: "Chandler, Mesa, Queen Creek, and Tempe",
    marketContext:
      "One of the fastest-growing cities in Arizona, consistently ranked among the best places to live. Family-oriented community with high demand for home services.",
    housingNote:
      "Median home value $480K. Predominantly newer suburban homes built 2000-present.",
    growthNote:
      "Grew 13% from 2010-2020. New construction continues in southeast Gilbert.",
  },
  glendale: {
    slug: "glendale",
    name: "Glendale",
    stateCode: "AZ",
    state: "Arizona",
    population: "252K",
    latitude: 33.5387,
    longitude: -112.1859,
    nearbyAreas: "Phoenix, Peoria, Surprise, and Avondale",
    marketContext:
      "Home to State Farm Stadium and major sports venues. Mix of established neighborhoods and newer developments in the northwest. Strong demand for general contracting and home renovation.",
    housingNote:
      "Median home value $350K. Older homes in south Glendale, newer builds in the north.",
    growthNote:
      "Moderate growth with commercial development driving residential expansion.",
  },
  peoria: {
    slug: "peoria",
    name: "Peoria",
    stateCode: "AZ",
    state: "Arizona",
    population: "195K",
    latitude: 33.5806,
    longitude: -112.2374,
    nearbyAreas: "Glendale, Surprise, Sun City, and Phoenix",
    marketContext:
      "Growing suburb with a mix of active-adult communities and young families. Spring training baseball brings seasonal economic activity.",
    housingNote:
      "Median home value $390K. Active-adult communities (Sun City) drive specialized home service demand.",
    growthNote:
      "Steady growth in northwest Peoria with new master-planned communities.",
  },
  surprise: {
    slug: "surprise",
    name: "Surprise",
    stateCode: "AZ",
    state: "Arizona",
    population: "143K",
    latitude: 33.6292,
    longitude: -112.3679,
    nearbyAreas: "Peoria, Sun City West, Buckeye, and Goodyear",
    marketContext:
      "Fast-growing western suburb with predominantly newer construction. Active-adult communities and young families create diverse home service demand.",
    housingNote:
      "Median home value $370K. Most homes built after 2000.",
    growthNote:
      "One of Arizona's fastest-growing cities, doubling in population since 2000.",
  },
  goodyear: {
    slug: "goodyear",
    name: "Goodyear",
    stateCode: "AZ",
    state: "Arizona",
    population: "105K",
    latitude: 33.4353,
    longitude: -112.3585,
    nearbyAreas: "Avondale, Buckeye, Litchfield Park, and Phoenix",
    marketContext:
      "Rapidly growing southwest suburb with major master-planned communities. New construction creates immediate demand for landscaping, fencing, and finishing trades.",
    housingNote:
      "Median home value $400K. Predominantly new construction in master-planned communities.",
    growthNote:
      "Population tripled since 2010. Estrella, Palm Valley, and Canyon Trails developments driving growth.",
  },
  buckeye: {
    slug: "buckeye",
    name: "Buckeye",
    stateCode: "AZ",
    state: "Arizona",
    population: "108K",
    latitude: 33.3703,
    longitude: -112.5838,
    nearbyAreas: "Goodyear, Avondale, Surprise, and Litchfield Park",
    marketContext:
      "The #1 fastest-growing city in the United States. Massive new construction creates enormous demand for all trades — from foundation work to finishing.",
    housingNote:
      "Median home value $380K. Almost entirely new construction with large master-planned communities.",
    growthNote:
      "Population grew 79% from 2010-2020. Projected to reach 300K+ by 2040.",
  },
  avondale: {
    slug: "avondale",
    name: "Avondale",
    stateCode: "AZ",
    state: "Arizona",
    population: "89K",
    latitude: 33.4356,
    longitude: -112.3496,
    nearbyAreas: "Goodyear, Phoenix, Buckeye, and Tolleson",
    marketContext:
      "Growing community between Phoenix and the western suburbs. Mix of established and new residential areas with steady demand for home services.",
    housingNote:
      "Median home value $340K. Mix of older homes near downtown and newer builds in the south.",
    growthNote:
      "Moderate growth with affordability attracting first-time homebuyers.",
  },
  tucson: {
    slug: "tucson",
    name: "Tucson",
    stateCode: "AZ",
    state: "Arizona",
    population: "543K",
    latitude: 32.2226,
    longitude: -110.9747,
    nearbyAreas: "Oro Valley, Marana, Sahuarita, Green Valley, and Sierra Vista",
    marketContext:
      "Arizona's second-largest city with University of Arizona as an economic anchor. Distinct market from Phoenix metro — more affordable, different climate patterns, and older housing stock.",
    housingNote:
      "Median home value $280K. Significant older housing stock from 1950s-80s drives renovation and repair demand.",
    growthNote:
      "Steady growth in northwest Tucson and surrounding communities like Marana and Oro Valley.",
  },
  maricopa: {
    slug: "maricopa",
    name: "Maricopa",
    stateCode: "AZ",
    state: "Arizona",
    population: "62K",
    latitude: 33.058,
    longitude: -112.0476,
    nearbyAreas: "Chandler, Casa Grande, Gilbert, and Queen Creek",
    marketContext:
      "Fast-growing bedroom community between Phoenix metro and Tucson. New construction and first-time homebuyers create demand for affordable home services.",
    housingNote:
      "Median home value $330K. Predominantly newer construction in planned communities.",
    growthNote:
      "One of the fastest-growing small cities in Arizona since 2005.",
  },
  "queen-creek": {
    slug: "queen-creek",
    name: "Queen Creek",
    stateCode: "AZ",
    state: "Arizona",
    population: "65K",
    latitude: 33.2487,
    longitude: -111.6343,
    nearbyAreas: "Gilbert, Chandler, San Tan Valley, and Mesa",
    marketContext:
      "Upscale, fast-growing community in the southeast valley. Affluent homeowners invest in premium landscaping, custom hardscaping, and high-end home improvements.",
    housingNote:
      "Median home value $500K. Large-lot custom homes and premium master-planned communities.",
    growthNote:
      "Recently incorporated with explosive growth, doubling population since 2015.",
  },
  "cave-creek": {
    slug: "cave-creek",
    name: "Cave Creek",
    stateCode: "AZ",
    state: "Arizona",
    population: "5.8K",
    latitude: 33.8314,
    longitude: -111.9507,
    nearbyAreas: "Carefree, Scottsdale, Phoenix, and Fountain Hills",
    marketContext:
      "Rural-suburban community north of Scottsdale with horse properties and custom estates. Small population but high-value projects — ideal for premium trades businesses.",
    housingNote:
      "Median home value $700K+. Large lots, custom builds, and horse properties.",
    growthNote:
      "Limited growth due to terrain and zoning, maintaining exclusive character.",
  },
  "fountain-hills": {
    slug: "fountain-hills",
    name: "Fountain Hills",
    stateCode: "AZ",
    state: "Arizona",
    population: "24K",
    latitude: 33.6117,
    longitude: -111.7174,
    nearbyAreas: "Scottsdale, Mesa, Fort McDowell, and Rio Verde",
    marketContext:
      "Retirement-heavy community with affluent residents. Known for the world's fourth-tallest fountain. High demand for home maintenance, landscaping, and accessibility modifications.",
    housingNote:
      "Median home value $500K. Mix of golf course communities, patio homes, and custom estates.",
    growthNote:
      "Stable population with low turnover. Aging-in-place modifications drive trades demand.",
  },
};

export function getAllCitySlugs(): string[] {
  return Object.keys(cityMap);
}

export function getCityConfig(slug: string): CityConfig | undefined {
  return cityMap[slug];
}

export function getAllCities(): CityConfig[] {
  return Object.values(cityMap);
}
