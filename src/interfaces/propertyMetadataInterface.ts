export interface PropertyMetaData {
  _id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  max_price: string;
  min_price: string;
  area: string;
  bath_counting: number;
  room_counting: number;
  features: string[];
  property: string;
  floor: string;
  status: string;
  bhk: string;
  facing: string;
  flat_number: string;
  sold_out_date: string | null;
  deleted_at: string | null;
  unit_mix_breakdown: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  images: Image;
  propertyDetails: PropertyDetail[];
}

export interface PropertyDetail {
  _id: string;
  name: string;
  title: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  full_address: string;
  property_type: string;
  property_owner: string;
  deleted_at: string | null;
  location: {
    latitude: number;
    longitude: number;
  };
  pin_code: string;
  project_developer: string;
  isParking: boolean;
  parking_area_counting: number;
  car_places_counting: number;
  construction_status: string;
  is_leasehold: boolean;
  lease_year: number;
  is_feature_property: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
