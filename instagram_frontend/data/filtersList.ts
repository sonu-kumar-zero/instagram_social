interface DefaultOption {
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

export interface FilterType {
  name: string;
  properties: DefaultOption[];
}

export const DEFAULT_OPTIONS: DefaultOption[] = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%",
    defaultValue: 100
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    defaultValue: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    defaultValue: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: "deg"
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: "px"
  },
  {
    name: "Vignette",
    property: "vignette",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "px"
  }
];

const OriginalFilter: FilterType = {
  name: "Original",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 100,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 100,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const VintageFilter: FilterType = {
  name: "Vintage",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 90,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 120,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 80,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 50,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 350,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const CoolToneFilter: FilterType = {
  name: "Cool Tone",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 110,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 120,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 150,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 50,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 180,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const WarmGlowFilter: FilterType = {
  name: "Warm glow",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 120,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 110,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 180,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 40,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 15,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const NoirEffectFilter: FilterType = {
  name: "Noir effect",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 80,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 150,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 100,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 100,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const HighContrastPopFilter: FilterType = {
  name: "High Contrast Pop",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 130,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 200,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 150,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const DreamyPastelFilter: FilterType = {
  name: "Dreamy pastel",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 130,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 90,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 80,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 45,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const MoodyDarkFilter: FilterType = {
  name: "Moody dark",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 70,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 140,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 90,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const CinematicTealAndOrangeFilter: FilterType = {
  name: "Cinematic",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 110,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 130,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 120,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 20,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 25,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

const Retro80sFilter: FilterType = {
  name: "Retro 80s",
  properties: [
    {
      name: "Brightness",
      property: "brightness",
      value: 110,
      range: {
        min: 0,
        max: 200
      },
      unit: "%",
      defaultValue: 100
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 120,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 150,
      defaultValue: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: "%"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Sepia",
      property: "sepia",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "%"
    },
    {
      name: "Hue Rotate",
      property: "hue-rotate",
      value: 270,
      defaultValue: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: "px"
    },
    {
      name: "Vignette",
      property: "vignette",
      value: 0,
      defaultValue: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: "px"
    }
  ]
};

export const preBuiltFilters: FilterType[] = [
  OriginalFilter,
  VintageFilter,
  CoolToneFilter,
  WarmGlowFilter,
  NoirEffectFilter,
  HighContrastPopFilter,
  DreamyPastelFilter,
  MoodyDarkFilter,
  CinematicTealAndOrangeFilter,
  Retro80sFilter
];
