import React, { useReducer, useEffect, useState } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, hotels: action.payload, filteredHotels: action.payload };

    case "FILTER":
      const { city } = action.payload;
      const filteredHotels = state.hotels.filter((hotel) =>
        hotel.city.toLowerCase().includes(city.toLowerCase())
      );
      return { ...state, filteredHotels };

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels");
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const city = event.target.value;
    dispatch({ type: "FILTER", payload: { city } });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        onChange={handleFilterChange}
      />

      <div>
        {state.filteredHotels.map((hotel) => (
          <p key={hotel.hotel_name}>{hotel.hotel_name}</p>
        ))}
      </div>
    </div>
  );
}