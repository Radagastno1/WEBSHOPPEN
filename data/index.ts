export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  inStock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    title: "KVINNA ESSENS NO°1",
    price: 1500,
    description:
      "En keramisk skulptur föreställande en kvinnokropp i en förförisk mörkbrun färg, likt den rika tonen av mörk kaffe. Denna eleganta skulptur utstrålar kvinnlighet och konstnärlighet.",
    image: "https://i.imgur.com/bhT4KZe.jpg",
    inStock: 1,
  },
  {
    id: "2",
    title: "SKÅL SOMMARKVÄLL",
    price: 350,
    description:
      "En skål som går från blå till lila och har en blank yta. Den här skålen är som en färgrik himmel i skymningen och kommer att tillföra en touch av mystik och elegans till din servering.",
    image: "https://i.imgur.com/OTXngiT.jpg",
    inStock: 1,
  },
  {
    id: "3",
    title: "BLOMMA MIDNATT",
    price: 600,
    description:
      " En keramisk skapelse i nyanser av mörkblått som gradvis övergår till svart, liknande formen av en blomma. Denna skulptur förkroppsligar det dramatiska och gåtfulla i naturens skönhet och kommer att addera en touch av mystik till ditt utrymme.",
    image: "https://i.imgur.com/XYshqOS.jpg",
    inStock: 1,
  },
  {
    id: "4",
    title: "SKÅL ELEGANS",
    price: 450,
    description:
      "En svart skål med subtila röda nyanser som ger den en skimrande, glänsande yta. Den här skålen är en perfekt kombination av elegans och praktisk användning.",
    image: "https://i.imgur.com/HyVOKyU.jpg",
    inStock: 1,
  },
  {
    id: "5",
    title: "SKÅL MIDNATT",
    price: 400,
    description:
      "En mörkblå skål med en unik form - smalare nedtill och mer skålformad upptill. Den här skålen är ett uttryck för elegans och funktionalitet och kommer att göra varje servering till en upplevelse.",
    image: "https://i.imgur.com/PRpEisa.jpg",
    inStock: 1,
  },
  {
    id: "6",
    title: "SKÅL NATUR",
    price: 600,
    description:
      "En låg skål i vitt med randiga och sprackliga gröna och blåa mönster. Denna skål förmedlar en känsla av friskhet och natur, och den ger en levande och livfull touch till din dukning eller inredning.",
    image: "https://i.imgur.com/ScEZIJH.jpg",
    inStock: 1,
  },
  {
    id: "7",
    title: "SKÅL NATUR",
    price: 1000,
    description:
      "Beskrivning: En skål i sandig brun färg med en mörk kant, som kan användas som en låg kruka om så önskas. Den här produkten har en naturlig och jordnära estetik, och den passar perfekt in i en inredning som hyllar naturens skönhet.",
    image: "https://i.imgur.com/xr1Uyj6.jpg",
    inStock: 1,
  },
  {
    id: "8",
    title: "KVINNA ESSENS NO°2",
    price: 1000,
    description:
      "En skulptur som framställer en kvinnas överkropp i vit keramik. Denna skulptur är en hyllning till kvinnlig skönhet och elegans, med fokus på enkelheten i färgen vitt som betonar renhet och klarhet.",
    image: "https://i.imgur.com/Mgg4zoe.jpg",
    inStock: 1,
  },
  {
    id: "9",
    title: "TALLRIK NATUR",
    price: 650,
    description:
      "En tallrik i naturfärger med inslag av grönt, lite oranget och svart. Den har en rustik charm och en mångsidig design som passar perfekt för en avslappnad måltid med en touch av konstnärlig kreativitet.",
    image: "https://i.imgur.com/pqTB4BE.jpg",
    inStock: 1,
  },
  {
    id: "10",
    title: "KVINNA ESSENS NO°3",
    price: 1500,
    description:
      "En skulptur som representerar kvinnlighet i en ljus och ganska grå färg. Denna skulptur förkroppsligar en subtil och enkel elegans som framhäver den feminina styrkan.",
    image: "https://i.imgur.com/cKGOOxB.jpg",
    inStock: 1,
  },
  {
    id: "11",
    title: "TALLRIK MIDNATT",
    price: 400,
    description:
      "En glansig mörkblå tallrik med ett vackert handgjort mönster i mitten. Tallriken är som en stjärnklar natt med ett konstnärligt inslag som gör varje måltid till en upplevelse.",
    image: "https://i.imgur.com/7EsVFH2.jpg",
    inStock: 1,
  },
];
