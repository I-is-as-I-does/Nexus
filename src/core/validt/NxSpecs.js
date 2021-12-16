/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
export const appUrl = "https://nexus-dock.github.io/";
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
  title: "String",
  description: "String",
  content: "Object",
  timestamp: "String",
  main: "String",
  aside: "String",
  media: "Object",
  type: "String",
  caption: "String",
  linked: "Array",
  "linked.item": "Object",
};
export const required = ["nexus","author","threads","handle", "url", "id", "title", "content","timestamp", "main", "type"];
export const charMinMax = {
    handle: [3, 30],
    about: [0, 400],
    title: [3, 30],
    description: [0, 400],
    main: [1, 1000],
    aside: [0, 400],
    caption: [0, 200],
  };
  export const itemsMinMax = {
    threads: [1, 100],
    linked: [0, 100],
  };
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
  export const distantIdPattern = "(/|"+idPattern+")";
  export const urlPattern = "^https?:\/\/.*";
