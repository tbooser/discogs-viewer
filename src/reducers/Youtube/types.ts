export interface PayloadTypes {
  response_json: ResourceUrlResponseTypes;
  img_url: string;
}

export interface InitialStateTypes {
  videosList: Array<PayloadTypes>;
  currentImage: string | undefined;
}

export interface ResourceUrlResponseTypes {
  artists: Array<any>;
  artists_sort: string;
  blocked_from_sale: boolean;
  community?: object;
  companies?: Array<any>;
  country: string;
  data_quality: string;
  date_added: string;
  date_changed: string;
  estimated_weight: number | undefined;
  extraartists: Array<any>;
  format_quantity: number | undefined;
  formats: Array<any>;
  genres: Array<string>;
  id: number | undefined;
  identifiers: Array<any>;
  images: Array<any>;
  labels: Array<any>;
  lowest_price: number | undefined;
  num_for_sale: number | undefined;
  released: string;
  released_formatted: string;
  resource_url: string;
  series: Array<any>;
  status: string;
  styles: Array<string>;
  thumb: string;
  title: string;
  tracklist: Array<any>;
  uri: string;
  videos: Array<any>;
  year: number | undefined;
}
