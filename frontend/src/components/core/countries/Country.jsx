import { countryMappings } from "@utils/countryMappings";
/**
 * This component is used to render the country in the country list in the /country page. It uses images from flagcdn.com to render the flag and fetches the country code from the countryMappings util file. It also uses tailwindcss to style the component.
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {string} param0.country
 */
export default function Country({ country }) {
  return (
    <li
      key={country}
      className="py-6 px-3 min-h-20 bg-gray-100 rounded-md gap-4 text-sm flex flex-col justify-center items-center text-lg font-medium text-center"
    >
      <img
        src={`https://flagcdn.com/120x90/${countryMappings[
          country
        ].toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/240x180/${countryMappings[
          country
        ].toLowerCase()}.png 2x`}
        width="120"
        height="90"
        className="w-10"
        loading="lazy"
        encoding="async"
        draggable="false"
        alt={country}
      ></img>
      {country}
    </li>
  );
}
