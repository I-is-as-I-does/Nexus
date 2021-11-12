export const charMinMax = {
  handle: [3, 30],
  about: [0, 400],
  name: [3, 30],
  description: [0, 400],
  main: [1, 1000],
  aside: [0, 400],
  caption: [0, 200],
};
export const itemsMinMax = {
  threads: [1, 100],
  linked: [0, 100],
};
export const appUrl = "https://github.com/I-is-as-I-does/Nexus-Prototype";
export const supportedMediaTypes = [
  "page",
  "video",
  "image",
  "audio",
  "youtube",
  "vimeo",
  "soundcloud",
];
export const timestampPattern =
  "^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))?$";
export const idPattern = "[a-zA-Z0-9-]{3,36}";
export const typesMap = {
  data: "Object",
  nexus: "String",
  author: "Object",
  handle: "String",
  about: "String",
  url: "String",
  threads: "Array",
  "threads.item": "Object",
  id: "String",
  name: "String",
  description: "String",
  record: "Object",
  timestamp: "String",
  main: "String",
  aside: "String",
  media: "Object",
  type: "String",
  caption: "String",
  linked: "Array",
  "linked.item": "Object",
};

export const defaultSelector = "#Nexus";
export const defaultCss =
  "https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus-Prototype@latest/cdn/css/NexusI.css";
