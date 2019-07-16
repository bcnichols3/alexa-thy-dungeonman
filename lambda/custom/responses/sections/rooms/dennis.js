module.exports = {
  intro: {
    ssml:
      "<p>Ye arrive at Dennis. He wears a sporty frock coat and a long jimberjam. He paces about nervously. Obvious exits are not dennis.</p>",
    altText:
      "Ye arrive at Dennis. He wears a sporty frock coat and a long jimberjam. He paces about nervously. Obvious exits are not dennis.",
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
    },
    jimberjam: {
      look: {
        ssml: "<p>Man, that art a nice jimberjam.</p>",
        altText: "Man, that art a nice jimberjam.",
      },
    },
  },
};
