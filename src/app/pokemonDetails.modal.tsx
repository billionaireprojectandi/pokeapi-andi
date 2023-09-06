import Modal from "@/components/ui/modal";
import { getPokemonDetail, read } from "@/utils/api";
import { getImageSource } from "@/utils/function";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

type Props = {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  selectedPokemon: string;
};

const PokemonDetailsModal = (props: Props) => {
  const { data, isLoading } = useQuery<PokemonDetailsResponse>({
    queryKey: [props.selectedPokemon],
    async queryFn() {
      return read({ query: getPokemonDetail(props.selectedPokemon) });
    },
    enabled: !!props.selectedPokemon,
  });

  if (isLoading) {
    return (
      <div className="">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <Modal isOpen={props.openModal} setIsOpen={props.setOpenModal}>
      <div className="flex flex-col items-center">
        <div className="hidden md:block">
          <p className="text-lg font-light">Press ESC to close</p>
        </div>
        <div className="relative w-56 h-56 md:w-80 md:h-80">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto object-cover object-center"
            alt={data?.pokemonDetails[0].name!}
            src={getImageSource(data?.pokemonDetails[0].id!)}
          />
        </div>
        <div className="">
          <p className="text-lg font-bold">{data?.pokemonDetails[0].name!}</p>
        </div>
        <div className="w-40 md:w-64 text-sm md:text-base text-center">
          <p>{data?.pokemonDetails[0].flavorText[0].flavorText}</p>
        </div>
        <div className="flex flex-col text-sm md:text-base items-start gap-2 w-full">
          {data?.pokemonDetails[0].pokemon[0].stats.map((status) => {
            return (
              <div className="flex gap-2" key={status.baseStat}>
                <p>{status.stat.name}</p>
                <p>:</p>
                <p>{status.baseStat}</p>
              </div>
            );
          })}
        </div>
        <div className="w-full text-sm md:text-base mt-4">
          <p>Types:</p>
          <div className="flex gap-4">
            {data?.pokemonDetails[0].pokemon[0].types.map((type) => {
              return <p key={type.type.id}>{type.type.name}</p>;
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonDetailsModal;
