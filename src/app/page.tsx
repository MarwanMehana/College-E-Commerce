"use server";

// components
import Header from "./_components/ForHome/Header/Header";
import AllProducts from "./_components/ForProducts/AllProducts/AllProducts";

const Home = async () => {
  

  return (
    <div className="font-sans grid justify-center items-center py-20 container mx-auto px-4 ">
      <Header />
      <AllProducts />
    </div>
  );
};

export default Home;
