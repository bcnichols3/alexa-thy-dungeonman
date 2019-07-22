module.exports = {
  intro: {
    default: {
      ssml:
        "<p>Ye arrive at Dennis. He wears a sporty frock coat and a long jimberjam. He paces about nervously. Obvious exits are not dennis.</p>",
      altText:
        "Ye arrive at Dennis. He wears a sporty frock coat and a long jimberjam. He paces about nervously. Obvious exits are not dennis.",
    },
    look: {
      ssml: "<p>That jimberjam really makes the outfit.</p>",
      altText: "That jimberjam really makes the outfit.",
    },
    with: {},
  },
  connections: {
    notDennis: "dungeon",
  },
  items: {
    dennis: {
      look: {
        ssml: "<p>That jimberjam really makes the outfit.</p>",
        altText: "That jimberjam really makes the outfit.",
      },
      talk: {
        ssml:
          "<p>You engage Dennis in leisurely discussion. Ye learns that his jimberjam was purchased on sale at a discount market and that he enjoys pacing about nervously. You become bored and begin thinking about parapets.</p>",
        altText:
          "You engage Dennis in leisurely discussion. Ye learns that his jimberjam was purchased on sale at a discount market and that he enjoys pacing about nervously. You become bored and begin thinking about parapets.",
      },
    },
    jimberjam: {
      look: {
        ssml: "<p>Man, that art a nice jimberjam.</p>",
        altText: "Man, that art a nice jimberjam.",
      },
    },
  },
};
