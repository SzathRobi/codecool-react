import React, { useEffect, useState } from "react";
import Laptop from "./components/Laptop";
import LoadingMask from "./components/LoadingMask";

const App = () => {
  const [laptops, setLaptops] = useState([]);
  const [filtered, setFiltered] = useState(laptops);
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState("asc");
  const [searchValue, setSearchValue] = useState("");

  const updateSorter = () => {
    sorter === "asc" ? setSorter("desc") : setSorter("asc");
  };

  const getLaptops = async () => {
    setLoading(true);
    const res = await fetch("https://demoapi.com/api/laptop");
    const data = await res.json();
    setLaptops(data);
    setLoading(false);
  };

  useEffect(() => {
    getLaptops();
  }, []);

  const compare1 = (a, b) => {
    if (a.weigth > b.weigth) {
      return -1;
    }
    if (a.weigth < b.weigth) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };
  const compare2 = (a, b) => {
    if (a.weigth < b.weigth) {
      return -1;
    }
    if (a.weigth > b.weigth) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  useEffect(() => {
    if (laptops.length !== 0) {
      if (sorter === "asc") {
        setLaptops(laptops.sort((a, b) => compare1(a, b)));
      } else {
        setLaptops(laptops.sort((a, b) => compare2(a, b)));
      }
    }
  }, [sorter, laptops]);

  useEffect(() => {
    const filtered = laptops.filter((laptop) =>
      laptop.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setFiltered(filtered);
  }, [searchValue]);
  return (
    <div>
      <h1>Laptops</h1>
      <label>
        Search laptop
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </label>
      <button onClick={updateSorter} className="sortBtn">
        Sort by Weight
      </button>
      <div className="container">
        {loading ? (
          <LoadingMask />
        ) : searchValue === "" ? (
          laptops.map((laptop, index) => (
            <Laptop
              key={index}
              name={laptop.name}
              brand={laptop.brand}
              weight={laptop.weigth}
            >
              {laptop.brand}
            </Laptop>
          ))
        ) : (
          filtered.map((laptop, index) => (
            <Laptop
              key={index}
              name={laptop.name}
              brand={laptop.brand}
              weight={laptop.weigth}
            >
              {laptop.brand}
            </Laptop>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
