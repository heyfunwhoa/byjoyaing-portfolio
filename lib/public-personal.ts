/** Public, deliberately curated interests. No automatic import from private Joy Index. */
export const personalInterests = [
  {
    id: "music",
    title: "Electronic music",
    detail: "House, techno, trance, finding new artists, and the feeling of a really good live set.",
    connection: "I love the energy of music and sharing experiences with other people.",
  },
  {
    id: "home",
    title: "House projects & everyday DIY",
    detail: "Home projects, learning simple maintenance, fixing little things around the house, and figuring out what I can tackle myself.",
    connection: "Sometimes it's satisfying. Sometimes it's three trips to the hardware store.",
  },
  {
    id: "cars",
    title: "Simple car repairs",
    detail: "Basic car maintenance and repairs—learning what a part does, getting my hands dirty, and figuring things out as I go.",
    connection: "Not a mechanic; just someone who likes learning how to fix things (most of the time).",
  },
  {
    id: "travel",
    title: "Travel & exploring",
    detail: "Traveling, discovering new places, exploring neighborhoods and finding good food, music and experiences along the way.",
    connection: "A change of scenery is one of my favorite ways to stay curious.",
  },
  {
    id: "creative",
    title: "Creative exploration",
    detail: "Photography, art, and trying creative projects just because they sound interesting.",
    connection: "Not everything I enjoy needs to turn into a project.",
  },
] as const;

export const personalValues = ["Curiosity", "Authenticity", "Connection", "Growth", "Independence"] as const;
