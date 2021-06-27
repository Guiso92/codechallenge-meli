import React, { useContext } from "react";

import { LoaderContext } from "../context/loader-context";
import "../../styles/loader.scss";

export default function Loader() {
  const { isLoading } = useContext(LoaderContext);
  return !!isLoading && <div className="loader" />;
}
