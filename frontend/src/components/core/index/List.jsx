/**
 * This component renders a list of boxes with features of the application. It is used in the index page to display features of the application.
 * @author Filip Brebera w21020340
 */

import DocumentIcon from "@components/shared/icons/DocumentIcon";
import GlobeIcon from "@components/shared/icons/GlobeIcon";
import PenIcon from "@components/shared/icons/PenIcon";
import Box from "./list/Box";

export default function List() {
  return (
    <div
      className="grid gap-8 my-8 md:mx-10 mx-[5%]"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      <Box
        icon={<GlobeIcon></GlobeIcon>}
        title="Countries"
        description="See the list of countries participating in the CHI 2023 Conference."
        buttonText="See Countries"
        link="/kf6012/coursework/frontend/countries/"
        index={1}
      ></Box>
      <Box
        icon={<DocumentIcon></DocumentIcon>}
        title="Content"
        color="orange"
        description="See the content published for the CHI 2023 Conference."
        buttonText="See Content"
        link="/kf6012/coursework/frontend/content/"
        index={2}
      ></Box>
      <Box
        icon={<PenIcon></PenIcon>}
        title="Notes"
        color="purple"
        description="See and write private notes related to the content published for the CHI 2023 Conference."
        buttonText="See Notes"
        link="/kf6012/coursework/frontend/notes/"
        index={3}
      ></Box>
    </div>
  );
}
