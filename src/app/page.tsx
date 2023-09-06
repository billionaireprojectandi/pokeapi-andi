"use client";
import Card from "@/components/ui/card";
import { getPokemonsQuery, getTypesQuery, read } from "@/utils/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const limit = 20;

export default function Home() {
  const [types, setTypes] = useState<number[]>([]);

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery<{
    pokemons: Pokemons[];
  }>({
    queryKey: ["pokemons", types],
    async queryFn({ pageParam: offset = 0 }) {
      const response = await read<{ pokemons: Pokemons[] }>({
        query: getPokemonsQuery({ offset, typeIds: types }),
      });
      return response;
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (limit) {
        const hasNext = limit <= lastPage.pokemons.length;
        return hasNext ? allPages.length * limit : undefined;
      }
      return undefined;
    },
  });

  const { data: typesData } = useQuery<{ types: Type[] }>({
    queryKey: ["types"],
    async queryFn() {
      return read<{ types: Type[] }>({ query: getTypesQuery() });
    },
  });

  const handleFetch: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    fetchNextPage();
  };

  const handleCheckboxChange = (type: Type) => {
    if (types.includes(type.id)) {
      setTypes((prevState) =>
        prevState.filter((selectedType) => selectedType !== type.id)
      );
    } else {
      setTypes((prevState) => [...prevState, type.id]);
    }
  };

  if (isLoading) {
    return (
      <main className="">
        <section>
          <div className="">Loading</div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="flex items-center flex-col gap-4 py-4">
        <div className="w-fit space-y-4">
          <div className="">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg grid grid-cols-5">
              {typesData &&
                typesData.types.map((type) => {
                  return (
                    <li
                      className="w-full border-b border-gray-200"
                      key={type.id}
                    >
                      <div className="flex items-center pl-3">
                        <input
                          id={`checkbox-${type.id}`}
                          type="checkbox"
                          checked={types.includes(type.id)}
                          onChange={() => handleCheckboxChange(type)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor={`checkbox-${type.id}`}
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                          key={type.id}
                        >
                          {type.name}
                        </label>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {data?.pages.map((page, idx) => {
            return (
              <div className="grid grid-cols-4 gap-4" key={idx}>
                {page.pokemons.map((pokemon) => {
                  return (
                    <div
                      className="w-fit"
                      key={pokemon.id}
                      onClick={() => alert(pokemon.name)}
                    >
                      <Card data={pokemon} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {hasNextPage && (
          <div className="">
            <button
              className="p-4 bg-blue-100 rounded-lg"
              onClick={handleFetch}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
