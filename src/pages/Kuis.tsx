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
        <h1 className="font-semibold">Kuis SIBI</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          
        </div>
      </div>
    </LayoutPage>
  );
};


export default Kuis;
