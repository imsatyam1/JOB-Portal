import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";

const arraySearch = [1, 2, 3, 4, 5, 6, 7, 8];

function Browse() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mb-5">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mx-3 my-4 md:my-6 lg:my-8">
          Search Results ({arraySearch.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {arraySearch.map((item, index) => (
            <div key={index}>
              <Job />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Browse;
