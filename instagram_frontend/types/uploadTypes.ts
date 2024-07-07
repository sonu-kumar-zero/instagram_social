export interface DefaultOption {
  name: string;
  property: string;
  value: number;
  range: {
    min: number;
    max: number;
  };
  unit: string;
  defaultValue: number;
}

export interface VideoDefaultOption {
  imageUrl: string;
  videoMuted: boolean;
  startTime: number;
  endTime: number;
}

export interface Property {
  scale: number;
  type: string;
  DEFAULT_OPTIONS: DefaultOption[];
  VIDEO_DEFAULT_OPTIONS: VideoDefaultOption;
}

export interface ArrayOfUrlObjects {
  idx: number;
  url: string;
  type: string;
}
