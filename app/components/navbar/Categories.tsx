"use client";
// Components
import Container from "../Container";
import CategoryBox from "../CategoryBox";
//Icons
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiIsland,
  GiWindmill,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    title: "Plage",
    icon: TbBeach,
    description: "Cette propriété est proche de la plage !",
  },
  {
    label: "Windmills",
    title: "Moulins à vent",
    icon: GiWindmill,
    description: "Cette propriété est possède des moulins à vent !",
  },
  {
    label: "Modern",
    title: "Moderne",
    icon: MdOutlineVilla,
    description: "Cette propriété est moderne !",
  },
  {
    label: "Countryside",
    title: "Campagne",
    icon: TbMountain,
    description: "Cette propriété est à la campagne !",
  },
  {
    label: "Pool",
    title: "Piscine",
    icon: TbPool,
    description: "Cette propriété possède une piscine !",
  },
  {
    label: "Islands",
    title: "Île",
    icon: GiIsland,
    description: "Cette propriété est sur une Île !",
  },
  {
    label: "Lake",
    title: "Lac",
    icon: GiBoatFishing,
    description: "Cette propriété est proche d'un lac !",
  },
  {
    label: "Skiing",
    title: "Montagne",
    icon: FaSkiing,
    description: "Cette propriété est proche des pistes de ski!",
  },
  {
    label: "Castles",
    title: "Châteaux",
    icon: GiCastle,
    description: "Cette propriété est un château",
  },
  {
    label: "Camping",
    title: "Camping",
    icon: GiForestCamp,
    description: "Camping",
  },
  {
    label: "Arctic",
    title: "Arctic",
    icon: BsSnow,
    description: "Neige",
  },
  {
    label: "Cave",
    title: "Grotte",
    icon: GiCaveEntrance,
    description: "Proche d'une grotte",
  },
  {
    label: "Desert",
    title: "Désert",
    icon: GiCactus,
    description: "Proche du désert",
  },
  {
    label: "Barns",
    title: "Granges",
    icon: GiBarn,
    description: "Cette propriété est une grange",
  },
  {
    label: "Lux",
    title: "Luxe",
    icon: IoDiamond,
    description: "Cette propriété est luxueuse",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            title={item.title}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
