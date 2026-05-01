export type Colorway = {
  id: string;
  nome: string;
  preco: number;
  imagens: string[];
  tamanhosDisponiveis: number[];
};

export type Produto = {
  slug: string;
  nome: string;
  thumbnail: string; // movido do mapa hardcoded nas pages
  descricao: string;
  colorways: Colorway[];
};

export const TAMANHOS_EXIBIDOS = [
  34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
];

const todosOsTamanhos = [...TAMANHOS_EXIBIDOS];

export const produtos: Produto[] = [
  {
    slug: "nikeairzoomgtcut3",
    nome: "Nike Air Zoom GT Cut 3",
    thumbnail: "/layout/thumbnails/nikeairzoomgtcut3.png",
    descricao:
      "Resposta rápida, tração agressiva e leveza para quem joga em alta velocidade.",
    colorways: [
      {
        id: "dreamers",
        nome: "Dreamers",
        preco: 849.99,
        imagens: [
          "/produtos/nikeairzoomgtcut3/dreamers/nikeairzoomgtcut3dreamers1.png",
          "/produtos/nikeairzoomgtcut3/dreamers/nikeairzoomgtcut3dreamers2.png",
          "/produtos/nikeairzoomgtcut3/dreamers/nikeairzoomgtcut3dreamers3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "punch",
        nome: "Punch",
        preco: 849.99,
        imagens: [
          "/produtos/nikeairzoomgtcut3/punch/nikeairzoomgtcut3punch1.png",
          "/produtos/nikeairzoomgtcut3/punch/nikeairzoomgtcut3punch2.png",
          "/produtos/nikeairzoomgtcut3/punch/nikeairzoomgtcut3punch3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "shinetogether",
        nome: "Shine Together",
        preco: 849.99,
        imagens: [
          "/produtos/nikeairzoomgtcut3/shinetogether/nikeairzoomgtcut3shinetogether1.png",
          "/produtos/nikeairzoomgtcut3/shinetogether/nikeairzoomgtcut3shinetogether2.png",
          "/produtos/nikeairzoomgtcut3/shinetogether/nikeairzoomgtcut3shinetogether3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "smokegray",
        nome: "Smoke Gray",
        preco: 849.99,
        imagens: [
          "/produtos/nikeairzoomgtcut3/smokegray/nikeairzoomgtcut3smokegray1.png",
          "/produtos/nikeairzoomgtcut3/smokegray/nikeairzoomgtcut3smokegray2.png",
          "/produtos/nikeairzoomgtcut3/smokegray/nikeairzoomgtcut3smokegray3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "swooshsquad",
        nome: "Swoosh Squad",
        preco: 849.99,
        imagens: [
          "/produtos/nikeairzoomgtcut3/swooshsquad/nikeairzoomgtcut3swooshsquad1.png",
          "/produtos/nikeairzoomgtcut3/swooshsquad/nikeairzoomgtcut3swooshsquad2.png",
          "/produtos/nikeairzoomgtcut3/swooshsquad/nikeairzoomgtcut3swooshsquad3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "washedcoral",
        nome: "Washed Coral",
        preco: 849.99,
        imagens: [
          "/produtos/nikeairzoomgtcut3/washedcoral/nikeairzoomgtcut3washedcoral1.png",
          "/produtos/nikeairzoomgtcut3/washedcoral/nikeairzoomgtcut3washedcoral2.png",
          "/produtos/nikeairzoomgtcut3/washedcoral/nikeairzoomgtcut3washedcoral3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikeajawilsonaone",
    nome: "Nike A'ja Wilson A'One",
    thumbnail: "/layout/thumbnails/nikeajawilsonaone.png",
    descricao:
      "Estabilidade, conforto e presença para quem domina a quadra com força e controle.",
    colorways: [
      {
        id: "blackmetallicgold",
        nome: "Black Metallic Gold",
        preco: 899.9,
        imagens: [
          "/produtos/nikeajawilsonaone/blackmetallicgold/nikeajawilsonaoneblackmetallicgold1.png",
          "/produtos/nikeajawilsonaone/blackmetallicgold/nikeajawilsonaoneblackmetallicgold2.png",
          "/produtos/nikeajawilsonaone/blackmetallicgold/nikeajawilsonaoneblackmetallicgold3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "pinkaura",
        nome: "Pink Aura",
        preco: 899.9,
        imagens: [
          "/produtos/nikeajawilsonaone/pinkaura/nikeajawilsonaonepinkaura1.png",
          "/produtos/nikeajawilsonaone/pinkaura/nikeajawilsonaonepinkaura2.png",
          "/produtos/nikeajawilsonaone/pinkaura/nikeajawilsonaonepinkaura3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "unapologeticfierce",
        nome: "Unapologetic Fierce",
        preco: 899.9,
        imagens: [
          "/produtos/nikeajawilsonaone/unapologeticfierce/nikeajawilsonaoneunapologeticfierce1.png",
          "/produtos/nikeajawilsonaone/unapologeticfierce/nikeajawilsonaoneunapologeticfierce2.png",
          "/produtos/nikeajawilsonaone/unapologeticfierce/nikeajawilsonaoneunapologeticfierce3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikefreak7",
    nome: "Nike Freak 7",
    thumbnail: "/layout/thumbnails/nikefreak7.png",
    descricao:
      "Explosão, estabilidade e presença para quem joga forte dos dois lados da quadra.",
    colorways: [
      {
        id: "courtpurple",
        nome: "Court Purple",
        preco: 999.9,
        imagens: [
          "/produtos/nikefreak7/courtpurple/nikefreak7courtpurple1.png",
          "/produtos/nikefreak7/courtpurple/nikefreak7courtpurple2.png",
          "/produtos/nikefreak7/courtpurple/nikefreak7courtpurple3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "pinksiclefireberry",
        nome: "Pinksicle Fireberry",
        preco: 999.9,
        imagens: [
          "/produtos/nikefreak7/pinksiclefireberry/nikefreak7pinksiclefireberry1.png",
          "/produtos/nikefreak7/pinksiclefireberry/nikefreak7pinksiclefireberry2.png",
          "/produtos/nikefreak7/pinksiclefireberry/nikefreakpinksiclefireberry3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "solarred",
        nome: "Solar Red",
        preco: 999.9,
        imagens: [
          "/produtos/nikefreak7/solarred/nikefreak7solarred1.png",
          "/produtos/nikefreak7/solarred/nikefreak7solarred2.png",
          "/produtos/nikefreak7/solarred/nikefreak7solarred3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "totalorange",
        nome: "Total Orange",
        preco: 999.9,
        imagens: [
          "/produtos/nikefreak7/totalorange/nikefreak7totalorange1.png",
          "/produtos/nikefreak7/totalorange/nikefreak7totalorange2.png",
          "/produtos/nikefreak7/totalorange/nikefreak7totalorange3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikeja3",
    nome: "Nike Ja 3",
    thumbnail: "/layout/thumbnails/nikeja3.png",
    descricao:
      "Leve, agressivo e pronto para mudança de direção rápida e infiltração sem medo.",
    colorways: [
      {
        id: "channel12",
        nome: "Channel 12",
        preco: 899.9,
        imagens: [
          "/produtos/nikeja3/channel12/nikeja3channel121.png",
          "/produtos/nikeja3/channel12/nikeja3channel122.png",
          "/produtos/nikeja3/channel12/nikeja3channel123.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "priceofadmission",
        nome: "Price of Admission",
        preco: 899.9,
        imagens: [
          "/produtos/nikeja3/priceofadmission/nikeja3priceofadmission1.png",
          "/produtos/nikeja3/priceofadmission/nikeja3priceofadmission2.png",
          "/produtos/nikeja3/priceofadmission/nikeja3priceofadmission3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "zombie",
        nome: "Zombie",
        preco: 899.9,
        imagens: [
          "/produtos/nikeja3/zombie/nikeja3zombie1.png",
          "/produtos/nikeja3/zombie/nikeja3zombie2.png",
          "/produtos/nikeja3/zombie/nikeja3zombie3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikekd18",
    nome: "Nike KD 18",
    thumbnail: "/layout/thumbnails/nikekd18.png",
    descricao:
      "Conforto, resposta e fluidez para quem gosta de jogar liso e pontuar de qualquer lugar.",
    colorways: [
      {
        id: "eggplant",
        nome: "Eggplant",
        preco: 899.9,
        imagens: [
          "/produtos/nikekd18/eggplant/nikekd18eggplant1.png",
          "/produtos/nikekd18/eggplant/nikekd18eggplant2.png",
          "/produtos/nikekd18/eggplant/nikekd18eggplant3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "smartcity",
        nome: "Smart City",
        preco: 899.9,
        imagens: [
          "/produtos/nikekd18/smartcity/nikekd18smartcity1.png",
          "/produtos/nikekd18/smartcity/nikekd18smartcity2.png",
          "/produtos/nikekd18/smartcity/nikekd18smartcity3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "softpearl",
        nome: "Soft Pearl",
        preco: 899.9,
        imagens: [
          "/produtos/nikekd18/softpearl/nikekd18softpearl1.png",
          "/produtos/nikekd18/softpearl/nikekd18softpearl2.png",
          "/produtos/nikekd18/softpearl/nikekd18softpearl3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikekyrie5spongebob",
    nome: "Nike Kyrie 5 SpongeBob",
    thumbnail: "/layout/thumbnails/nikekyrie5spongebob.png",
    descricao:
      "Controle, tração e personalidade para quem quer jogar diferente e chamar atenção na quadra.",
    colorways: [
      {
        id: "lulamolusco",
        nome: "Lula Molusco",
        preco: 1499.9,
        imagens: [
          "/produtos/nikekyrie5spongebob/lulamolusco/nikekyrie5spongeboblulamolusco1.png",
          "/produtos/nikekyrie5spongebob/lulamolusco/nikekyrie5spongeboblulamolusco2.png",
          "/produtos/nikekyrie5spongebob/lulamolusco/nikekyrie5spongeboblulamolusco3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "patrick",
        nome: "Patrick",
        preco: 1499.9,
        imagens: [
          "/produtos/nikekyrie5spongebob/patrick/nikekyrie5spongebobpatrick1.png",
          "/produtos/nikekyrie5spongebob/patrick/nikekyrie5spongebobpatrick2.png",
          "/produtos/nikekyrie5spongebob/patrick/nikekyrie5spongebobpatrick3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "pinapplehouse",
        nome: "Pineapple House",
        preco: 1499.9,
        imagens: [
          "/produtos/nikekyrie5spongebob/pinapplehouse/nikekyrie5spongebobpinapplehouse1.png",
          "/produtos/nikekyrie5spongebob/pinapplehouse/nikekyrie5spongebobpinapplehouse2.png",
          "/produtos/nikekyrie5spongebob/pinapplehouse/nikekyrie5spongebobpinapplehouse3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "squarepantes",
        nome: "SquarePants",
        preco: 1499.9,
        imagens: [
          "/produtos/nikekyrie5spongebob/squarepantes/nikekyrie5spongebobsquarepantes1.png",
          "/produtos/nikekyrie5spongebob/squarepantes/nikekyrie5spongebobsquarepantes2.png",
          "/produtos/nikekyrie5spongebob/squarepantes/nikekyrie5spongebobsquarepantes3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikelebronwitness8",
    nome: "Nike LeBron Witness 8",
    thumbnail: "/layout/thumbnails/nikelebronwitness8.png",
    descricao:
      "Amortecimento, suporte e força para quem joga pesado e precisa de confiança em cada passada.",
    colorways: [
      {
        id: "armorynavy",
        nome: "Armory Navy",
        preco: 873.99,
        imagens: [
          "/produtos/nikelebronwitness8/armorynavy/nikelebronwitness8armorynavy1.png",
          "/produtos/nikelebronwitness8/armorynavy/nikelebronwitness8armorynavy2.png",
          "/produtos/nikelebronwitness8/armorynavy/nikelebronwitness8armorynavy3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "fazeclanbred",
        nome: "FaZe Clan Bred",
        preco: 873.99,
        imagens: [
          "/produtos/nikelebronwitness8/fazeclanbred/nikelebronwitness8fazeclanbred1.png",
          "/produtos/nikelebronwitness8/fazeclanbred/nikelebronwitness8fazeclanbred2.png",
          "/produtos/nikelebronwitness8/fazeclanbred/nikelebronwitness8fazeclanbred3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "ipromiseschool",
        nome: "I Promise School",
        preco: 873.99,
        imagens: [
          "/produtos/nikelebronwitness8/ipromiseschool/nikelebronwitness8ipromiseschool1.png",
          "/produtos/nikelebronwitness8/ipromiseschool/nikelebronwitness8ipromiseschool2.png",
          "/produtos/nikelebronwitness8/ipromiseschool/nikelebronwitness8ipromiseschool3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "lightcrimson",
        nome: "Light Crimson",
        preco: 873.99,
        imagens: [
          "/produtos/nikelebronwitness8/lightcrimson/nikelebronwitness8lightcrimson1.png",
          "/produtos/nikelebronwitness8/lightcrimson/nikelebronwitness8lightcrimson2.png",
          "/produtos/nikelebronwitness8/lightcrimson/nikelebronwitness8lightcrimson3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikemind002",
    nome: "Nike Mind 002",
    thumbnail: "/layout/thumbnails/nikemind002.png",
    descricao:
      "Modelo com visual futurista e pegada diferenciada para quem gosta de presença fora do comum.",
    colorways: [
      {
        id: "blackhypercrimson",
        nome: "Black Hyper Crimson",
        preco: 899.9,
        imagens: [
          "/produtos/nikemind002/blackhypercrimson/nikemind002blackhypercrimson1.png",
          "/produtos/nikemind002/blackhypercrimson/nikemind002blackhypercrimson2.png",
          "/produtos/nikemind002/blackhypercrimson/nikemind002blackhypercrimson3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "lightsmoke",
        nome: "Light Smoke",
        preco: 899.9,
        imagens: [
          "/produtos/nikemind002/lightsmoke/nikemind002lightsmoke1.png",
          "/produtos/nikemind002/lightsmoke/nikemind002lightsmoke2.png",
          "/produtos/nikemind002/lightsmoke/nikemind002lightsmoke3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "sailwhite",
        nome: "Sail White",
        preco: 899.9,
        imagens: [
          "/produtos/nikemind002/sailwhite/nikemind002sailwhite1.png",
          "/produtos/nikemind002/sailwhite/nikemind002sailwhite2.png",
          "/produtos/nikemind002/sailwhite/nikemind002sailwhite3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikesabrina2",
    nome: "Nike Sabrina 2",
    thumbnail: "/layout/thumbnails/nikesabrina2.png",
    descricao:
      "Leve, responsivo e firme para quem joga com velocidade e controle.",
    colorways: [
      {
        id: "byyou",
        nome: "By You",
        preco: 899.9,
        imagens: [
          "/produtos/nikesabrina2/byyou/nikesabrina2byyou1.png",
          "/produtos/nikesabrina2/byyou/nikesabrina2byyou2.png",
          "/produtos/nikesabrina2/byyou/nikesabrina2byyou3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "midnightnavy",
        nome: "Midnight Navy",
        preco: 899.9,
        imagens: [
          "/produtos/nikesabrina2/midnightnavy/nikesabrina2midnightnavy1.png",
          "/produtos/nikesabrina2/midnightnavy/nikesabrina2midnightnavy2.png",
          "/produtos/nikesabrina2/midnightnavy/nikesabrina2midnightnavy3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "tbp",
        nome: "TBP",
        preco: 899.9,
        imagens: [
          "/produtos/nikesabrina2/tbp/nikesabrina2tbp1.png",
          "/produtos/nikesabrina2/tbp/nikesabrina2tbp2.png",
          "/produtos/nikesabrina2/tbp/nikesabrina2tbp3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "nikesabrina3",
    nome: "Nike Sabrina 3",
    thumbnail: "/layout/thumbnails/nikesabrina3.png",
    descricao:
      "Suporte, leveza e resposta para cortes rápidos e arremessos em movimento.",
    colorways: [
      {
        id: "allstar",
        nome: "All Star",
        preco: 999.9,
        imagens: [
          "/produtos/nikesabrina3/allstar/nikesabrina3allstar1.png",
          "/produtos/nikesabrina3/allstar/nikesabrina3allstar2.png",
          "/produtos/nikesabrina3/allstar/nikesabrina3allstar3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "claygreen",
        nome: "Clay Green",
        preco: 999.9,
        imagens: [
          "/produtos/nikesabrina3/claygreen/nikesabrina3claygreen1.png",
          "/produtos/nikesabrina3/claygreen/nikesabrina3claygreen2.png",
          "/produtos/nikesabrina3/claygreen/nikesabrina3claygreen3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "gamer",
        nome: "Gamer",
        preco: 999.9,
        imagens: [
          "/produtos/nikesabrina3/gamer/nikesabrina3gamer1.png",
          "/produtos/nikesabrina3/gamer/nikesabrina3gamer2.png",
          "/produtos/nikesabrina3/gamer/nikesabrina3gamer3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "nby",
        nome: "NBY",
        preco: 999.9,
        imagens: [
          "/produtos/nikesabrina3/nby/nikesabrina3nby1.png",
          "/produtos/nikesabrina3/nby/nikesabrina3nby2.png",
          "/produtos/nikesabrina3/nby/nikesabrina3nby3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "pumalamelomb04",
    nome: "Puma LaMelo MB.04",
    thumbnail: "/layout/thumbnails/pumalamelomb04.png",
    descricao:
      "Visual forte e pegada moderna para quem quer conforto e presença em cada posse.",
    colorways: [
      {
        id: "halloween",
        nome: "Halloween",
        preco: 1299.9,
        imagens: [
          "/produtos/pumalamelomb04/halloween/pumalamelomb04halloween1.png",
          "/produtos/pumalamelomb04/halloween/pumalamelomb04halloween2.png",
          "/produtos/pumalamelomb04/halloween/pumalamelomb04halloween3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "1d1",
        nome: "1D1",
        preco: 1299.9,
        imagens: [
          "/produtos/pumalamelomb04/1d1/pumalamelomb041d11.png",
          "/produtos/pumalamelomb04/1d1/pumalamelomb041d12.png",
          "/produtos/pumalamelomb04/1d1/pumalamelomb041d13.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
  {
    slug: "underarmourcurry8",
    nome: "Under Armour Curry 8",
    thumbnail: "/layout/thumbnails/underarmourcurry8.png",
    descricao:
      "Leveza, encaixe e resposta rápida para quem vive de movimentação, leitura e arremesso.",
    colorways: [
      {
        id: "chinesenewyear",
        nome: "Chinese New Year",
        preco: 999.9,
        imagens: [
          "/produtos/underarmourcurry8/chinesenewyear/underarmourcurry8chinesenewyear1.png",
          "/produtos/underarmourcurry8/chinesenewyear/underarmourcurry8chinesenewyear2.png",
          "/produtos/underarmourcurry8/chinesenewyear/underarmourcurry8chinesenewyear3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "shineflow",
        nome: "Shine Flow",
        preco: 999.9,
        imagens: [
          "/produtos/underarmourcurry8/shineflow/underarmourcurry8shineflow1.png",
          "/produtos/underarmourcurry8/shineflow/underarmourcurry8shineflow2.png",
          "/produtos/underarmourcurry8/shineflow/underarmourcurry8shineflow3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
      {
        id: "zenflow",
        nome: "Zen Flow",
        preco: 999.9,
        imagens: [
          "/produtos/underarmourcurry8/zenflow/underarmourcurry8zenflow1.png",
          "/produtos/underarmourcurry8/zenflow/underarmourcurry8zenflow2.png",
          "/produtos/underarmourcurry8/zenflow/underarmourcurry8zenflow3.png",
        ],
        tamanhosDisponiveis: todosOsTamanhos,
      },
    ],
  },
];