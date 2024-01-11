import { Link } from "@tanstack/react-router";
import ArrowIcon from "@components/shared/icons/ArrowIcon";

/**
 * This component renders a box with an icon, title, description and a button. It is used in the index page to display features of the application.
 * @author Filip Brebera w21020340
 * @param {*} param0
 * @param {string} param0.icon
 * @param {string} param0.title
 * @param {string} param0.link
 * @param {string} param0.description
 * @param {string} param0.buttonText
 * @param {string} param0.color
 * @param {number} param0.index
 */
export default function Box({
  icon,
  title = "Title",
  link,
  description = "Description",
  buttonText = "See More",
  color = "blue",
  index = 1,
}) {
  return (
    <div className="rounded-3xl border-2 border-gray-100 md:min-h-[400px] p-8 md:p-12 flex flex-col justify-center max-w-[90vw]">
      <div
        className={`bg-${color}-200 rounded-md rounded-xl w-14 h-14 flex items-center justify-center`}
      >
        {icon}
      </div>
      <span className="block  mt-6 uppercase text-gray-700 text-xs mb-2">
        Feature {index}
      </span>
      <span className="text-xl md:text-2xl font-bold mb-4">{title}</span>
      <p className="mt-2 text-sm md:text-base h-20">{description}</p>
      <Link
        className={`text-lg mt-2 flex gap-x-2 items-center border-2 border-${color}-200 w-max py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors`}
        to={link}
      >
        <span className="font-medium md:text-base text-sm">{buttonText}</span>
        <ArrowIcon></ArrowIcon>
      </Link>
      {/* We need this to prevent auto purging of tailwind classes */}
      <span className="bg-blue-200 bg-orange-200 bg-purple-200"></span>
      <span className="border-blue-200 border-orange-200 border-purple-200"></span>
    </div>
  );
}
