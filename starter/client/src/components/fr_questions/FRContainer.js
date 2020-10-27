import React, { useContext } from "react";

import { FRContext } from "../../context/fr_context_all";
import FRForm from "./FRForm";

export default function FRContainer() {
  // const [allFr, loading] = useContext(FRContext)
	const [allFr, loading] = useContext(FRContext);
	if (loading) {
		return null
	}
	console.log(allFr)
  return (
    <>
      {allFr.map((fr, idx) => (
        <FRForm key={idx} fr={fr} />
      ))}
    </>
  );
}
