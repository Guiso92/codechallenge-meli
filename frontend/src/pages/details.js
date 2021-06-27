import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Items } from "../shared/services";
import { LoaderContext } from "../shared/context/loader-context";
import "../styles/details.scss";

export default function Details() {
  const { id } = useParams();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const itemData = await Items.single(id);
      setData(itemData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [id, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      className={`details ${!isLoading ? "details-load" : "details-loading"}`}
    >
      {!isLoading && data?.item && (
        <>
          <div className="details-data">
            <div className="details-image-container">
              <img
                className="details-image"
                src={data.item.picture}
                alt="Imagen del producto"
              />
            </div>
            <div className="details-info-container">
              <div className="details-info-subtitle-container">
                <span className="details-info-subtitle">{`${
                  data.item.condition === "new" ? "Nuevo" : "Usado"
                } - ${data.item.sold_quantity} vendidos`}</span>
              </div>
              <div className="details-info-title-container">
                <h1 className="details-info-title">{data.item.title}</h1>
              </div>
              <div className="details-info-price-container">
                <span className="details-info-price">
                  ${new Intl.NumberFormat().format(data.item.price.amount)}
                </span>
              </div>
              <div className="details-info-button-container">
                <a
                  href={data.item.link}
                  target="blank"
                  className="details-info-button"
                >
                  Comprar
                </a>
              </div>
            </div>
          </div>
          <div className="details-description">
            <span className="details-description-title">
              Descripción del producto
            </span>
            <p className="details-description-paragraph">
              {data.item.description}
            </p>
          </div>
        </>
      )}
      {!isLoading && !data && (
        <div className="no-results">
          <span>
            NO HAY RESULTADOS DISPONIBLES, POR FAVOR VUELVA A LA PANTALLA
            ANTERIOR HACIENDO CLICK <Link to="/">AQUÍ</Link> O INTENTE UNA NUEVA
            BUSQUEDA EN LA BARRA SUPERIOR.
          </span>
        </div>
      )}
    </div>
  );
}
