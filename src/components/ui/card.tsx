import { getImageSource } from "@/utils/function";
import Image from "next/image";
import React from "react";

type Props = {
  data: Pokemons;
};

const Card = (props: Props) => {
  const { id, name, pokemon } = props.data;
  return (
    <div className="rounded-lg bg-blue-200 h-fit w-fit relative overflow-hidden p-2">
      <div className="relative w-32 h-32">
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto object-cover object-center"
          alt="asdasd"
          src={getImageSource(id)}
        />
      </div>
      <div className="">
        <p>#{String(id).padStart(4, "0")}</p>
      </div>
      <div className="">
        <p>{name}</p>
      </div>
      <div className="flex gap-2 text-xs">
        {pokemon[0].types.map((type) => {
          return (
            <div className="bg" key={type.type.id}>
              <p>{type.type.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
