import React, { useState, useRef, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import jwt from "jwt-decode";
import Swal from "sweetalert2";



const CardListado = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("user") ? jwt(localStorage.getItem("user")).user : false
  );

 
  const hearth = useRef(null);
  const [favourite, setFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const calificacion = ["Malo", "Regular", "Bueno", "Muy Bueno", "Excelente"];

  useEffect(() => {
    setData(props.cardInfo);
    setFavourite(props.favourite);
    setIsLoading(false);
  }, [props.favourite]);
  useEffect(()=>{

  },[props.handleShowOnMap])

  const onclickHeart = (valueHeart) => {
    if (!valueHeart) {
      handleAddFav();
    } else {
      handleDeleteFav();
    }
  }
  const handleAddFav = () => {
    Swal.fire({
      title: "Deseas añadir este producto a favoritos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, deseo añadir este producto!",
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        addFavourite();
        Swal.fire({
          title: `${data.title} se agrego a favoritos`,
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: "Success",
          confirmButtonColor: "#f0572d",
          confirmButtonText: "Aceptar",
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    });
  };
  const handleDeleteFav = () => {
    Swal.fire({
      title: "Deseas eliminar este producto de favoritos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, deseo eliminar este producto!",
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFavourite();
        Swal.fire({
          title: `${data.title} se elimino de tus favoritos`,
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: "Success",
          confirmButtonColor: "#f0572d",
          confirmButtonText: "Aceptar",
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    });
  };

  
  const deleteFavourite = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + AuthService.getCurrentUser().jwt
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${url}/user/favorite/delete/${user.email}/${data.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        
        setFavourite(false)
      })
      .catch((error) => {});
  };
  const addFavourite = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + AuthService.getCurrentUser().jwt
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${url}/user/favorite/create/${user.email}/${data.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        
        setFavourite(true);
      })
      .catch((error) => {});
  };
  return (
    <div className="card-main">
      {isLoading ? (
        <h1>Cargando</h1>
      ) : (
        <>
          <div className="img-container-listado">
            <svg
              ref={hearth}
              onClick={()=>user?onclickHeart(favourite):null}
              className="icon"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={favourite ?
                {
                  display: "block",
                  fill: "red",
                  height: "28px",
                  width: "28px",
                  stroke: "white",
                  strokeWidth: "2",
                  overflow: "visible"
                }
                :
                {
                  display: "block",
                  fill: "rgba(0,0,0,0.5)",
                  height: "28px",
                  width: "28px",
                  stroke: "white",
                  strokeWidth: "2",
                  overflow: "visible"
                }
              }
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
            <img className="img1" src={data?.images[0]?.url} alt="Hotel-Ref" />
          </div>
          <div className="card-text">
            <div className="top">
              <div className="type-title">
                <div className="type-stars">
                  <p>{data.category?.title}</p>
                  <div className="stars-rating">
                    <i
                      id="star1"
                      className={
                        data.score >= 2
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star2"
                      className={
                        data.score >= 4
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star3"
                      className={
                        data.score >= 6
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star4"
                      className={
                        data.score >= 8
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star5"
                      className={
                        data.score == 10
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                  </div>
                </div>
                <div className="card-h5-container">
                  <h5>{data.title}</h5>
                </div>
              </div>
              <div className="rating-container">
                <div className="average">
                  <p>{data.score}</p>
                </div>
                <p>
                  {data.score === 0
                    ? "Sin valoraciones"
                    : calificacion[data.score / 2 - 1]}
                </p>
              </div>
            </div>
           
           
           
          </div>
        </>
      )}
    </div>
  );
};

export default CardListado;
