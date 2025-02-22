import LayoutPage from "@/components/templates/LayoutPage";
import useNavbarStore from "@/stores/NavbarStore";
import { useEffect } from "react";

const Kuis = () => {
  const store = useNavbarStore();

  useEffect(() => {
    store.setNavSelected("kuis");
  }, []);
  return (
    <LayoutPage>
      <div className="flex flex-col flex-1 py-4">
        <h1 className="font-semibold text-3xl">Ayoo Kuiss</h1>
        <p>Be the first!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-6 mt-24 md:mt-52 h-full mb-12">
          <div className="relative ">
            <img
              className="absolute w-24 -top-12 left-4 md:left-12"
              src="/assets/images/tebak-huruf.png"
              alt="Tebak Huruf"
            />
            <div className="flex flex-col w-full bg-[#7FAFEF] hover:bg-[#6290cc] rounded-md px-4 md:px-12 py-6 pb-12 text-white pt-32 duration-300">
              <h1 className="font-semibold text-4xl">Tebak Huruf</h1>
              <p>Tebak huruf dan coba simulasikan</p>
            </div>
          </div>
          <div className="relative ">
            <img
              className="absolute w-42 -top-12 left-4 md:left-12"
              src="/assets/images/menyusun-huruf.png"
              alt="Menyusun Huruf"
            />
            <div className="flex flex-col w-full bg-[#FF6884] hover:bg-[#d3546b] rounded-md px-4 md:px-12 py-6 pb-12 text-white pt-32 duration-300">
              <h1 className="font-semibold text-4xl">Menyusun Huruf</h1>
              <p>Susun huruf jadi kata yang tepat</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Kuis;
