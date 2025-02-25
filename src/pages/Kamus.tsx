import LayoutPage from "@/components/templates/LayoutPage";
import useNavbarStore from "@/stores/NavbarStore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { constantKamus, constantKamusType } from "@/constant/constantKamus";

const Kamus = () => {
  const store = useNavbarStore();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedKamus, setSelectedKamus] = useState<constantKamusType>();

  useEffect(() => {
    store.setNavSelected("kamus");
  }, []);
  return (
    <LayoutPage>
      <div className="flex flex-col flex-1 py-4">
        <h1 className="font-semibold">Kamus SIBI</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {constantKamus.map((item, index) => (
            <CardKamus
              handleClick={() => {
                setSelectedKamus(item);
                setShowDialog(true);
              }}
              key={index}
              title={`Abjad ${item.abjad.toUpperCase()}`}
              image={`/assets/kamus/${item.abjad}.jpg`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[999] justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowDialog(false);
              }
            }}
          >
            <motion.div
              className="bg-white max-h-[90%] px-12 py-8 rounded-md flex flex-col max-w-[90%] md:min-w-[600px] md:max-w-[800px] w-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex gap-2 justify-between items-center pb-8">
                <h1 className="font-semibold">
                  Huruf {selectedKamus?.abjad.toUpperCase()}
                </h1>
                <button
                  onClick={() => setShowDialog(false)}
                  className="hover:bg-base-100 p-3 rounded-md"
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 overflow-y-auto flex-1">
                <div className="flex flex-col order-2 md:order-1">
                  <p>{selectedKamus?.keterangan}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedKamus?.badge.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-primary rounded-md text-xs text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <img
                  className="h-[250px] object-cover rounded-md order-1 md:order-2"
                  src={`/assets/kamus/${selectedKamus?.abjad}.jpg`}
                  alt="Kamus SIBI"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutPage>
  );
};

const CardKamus = ({
  title,
  image,
  handleClick,
}: {
  title: string;
  image: string;
  handleClick: () => void;
}) => {
  return (
    <div
      onClick={handleClick}
      className="flex flex-col rounded-md bg-white hover:bg-base-100 cursor-pointer shadow-lg overflow-hidden"
    >
      <img className="h-[250px] object-cover" src={image} alt="Kamus SIBI" />
      <div className="p-3 flex items-center justify-center font-semibold">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Kamus;
