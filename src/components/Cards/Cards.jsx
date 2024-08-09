/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFillted, setIsHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

  // add cart btn

  const handleAddtoCart = (item) => {
    //console.log("clicou,", item)
    if (user && user?.email) {
      const cardItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      //console.log(cardItem)
      fetch('http://localhost:6001/carts', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cardItem),
      })
        .them(res => res.json())
        .then(data => {
          console.log(data);
        });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };

  return (
    <div className="card bg-base-100 mr-5 md:my-5 shadow-xl relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 hearStar bg-green ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
