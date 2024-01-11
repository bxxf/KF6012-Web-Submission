/**
 * This page renders the list of countries. It fetches list of countries from the backend based on the state handling the search term.
 * @author Filip Brebera
 */

import { useMemo, useState } from "react";

import { rootRoute } from "@routes/__root";
import { Route } from "@tanstack/react-router";

import { useApi } from "@hooks/useApi";
import { getCountries, setCountries } from "@stores/data";

import Country from "@components/core/countries/Country";

// Fetcher
const fetchCountries = async () => {
  const { fetchCountries } = useApi();
  if ((await getCountries().length) > 0) return;
  setCountries(await fetchCountries());
};

// Route definiton
export const countriesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/kf6012/coursework/frontend/countries/",
  component: Countries,
  beforeLoad: () => fetchCountries(),
});

function Countries() {
  const [searchTerm, setSearchTerm] = useState("");
  // useMemo for auto rerenders
  const countries = useMemo(() =>
    getCountries().filter((country) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="px-[5%] md:px-10 mt-10">
      <h1 className="text-2xl md:text-3xl font-bold">Countries</h1>
      <p className="text-gray-500 mt-2">
        List of countries participating in the Conference on Human Factors in
        Computing Systems 
      </p>
      <hr className="my-5"></hr>
      <input
        className="py-3 px-3 rounded-lg border-[1px] border-gray-300 w-full mb-5"
        placeholder="Search here.."
        onKeyUpCapture={(e) => setSearchTerm(e.target.value)}
      ></input>
      <ul
        className="grid gap-2 md:gap-3 min-h-[520px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}
      >
        {countries.map((country, index) => (
          <Country country={country} key={index}></Country>
        ))}
        {countries.length === 0 && (
          <li className="text-center my-10 text-lg text-gray-800">
            No countries found with the search term or no countries in the list.
          </li>
        )}
      </ul>
    </div>
  );
}
