export interface Property {
  _id: string;
  name: string;
  title: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  property_type: string;
  property_owner: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  full_address: string;
  deleted_at: string | null;
  metadata: Metadata[];
  images: Image[];
  floorimages: FloorImage[];
  owner_details: OwnerDetails;
  car_places_counting: number;
  construction_status: string;
  isParking: boolean;
  is_feature_property: boolean;
  is_leasehold: boolean;
  lease_year: number;
  location: Location;
  project_developer: string;
  unit_mix_breakdown: string[];
  site_plan: string[];
  schematic: string[];
}

export interface Metadata {
  _id: string;
  location: Location;
  max_price: string;
  min_price: string;
  area: string;
  bath_counting: number;
  room_counting: number;
  isParking: boolean;
  parking_area_counting: number;
  car_places_counting: number;
  features: string[];
  property: string;
  status: string;
  construction_status: string;
  pin_code: string;
  floor: number;
  bhk: string;
  facing: string;
  flat_number: string;
  sold_out_date: string | null;
  is_leasehold: boolean;
  lease_year: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  embedding: number[];
  deleted_at: string | null;
}

export interface Location {
  longitude: number;
  latitude: number;
  city_address: string;
  type: string;
  coordinates: [number, number];
}

export interface OwnerDetails {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  description: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  mobile: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: string;
  embedding: number[];
  deleted_at: string | null;
}

export interface Image {
  _id: string;
  title: string;
  fileName: string;
  recordType: string;
  recordId: string;
  path: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface FloorImage {
  _id: string;
  title: string;
  fileName: string;
  recordType: string;
  recordId: string;
  is_floor_img: boolean;
  path: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for the individual context object
export interface Context {
  id: string;
  mapbox_id?: string;
  wikidata?: string;
  short_code?: string;
  text: string;
}

// Interface for the main feature object
export interface Feature {
  id: string;
  text: string;
  context: Context[];
}

// Interface for the API response
export interface MapboxAPIResponse {
  features: Feature[];
}
