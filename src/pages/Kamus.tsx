import LayoutPage from "@/components/templates/LayoutPage";
import useNavbarStore from "@/stores/NavbarStore";
import { abjads } from "@/utils/ConvertResult";
import { useEffect } from "react";

const Kamus = () => {
  const store = useNavbarStore();

  useEffect(() => {
    store.setNavSelected("kamus");
  }, []);
  return (
    <LayoutPage>
      <div className="flex flex-col flex-1 py-4">
        <h1 className="font-semibold">Kamus SIBI</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {abjads.map((abjad, index) => (
            <CardKamus
              key={index}
              title={`Abjad ${abjad.toLocaleUpperCase()}`}
              image={`/assets/kamus/${abjad.toLocaleLowerCase()}.jpg`}
            />
          ))}
        </div>
      </div>
    </LayoutPage>
  );
};

const CardKamus = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="flex flex-col rounded-md bg-base-100 shadow-lg overflow-hidden">
      <img className="h-[250px] object-cover" src={image} alt="Kamus SIBI" />
      <div className="p-3 flex items-center justify-center font-semibold">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Kamus;
