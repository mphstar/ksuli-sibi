import LayoutPage from "@/components/templates/LayoutPage";
import useNavbarStore from "@/stores/NavbarStore";
import { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    name: "Asep",
    score: 100,
    time: "15-08-2021 12:40",
  },
  {
    id: 2,
    name: "Budi",
    score: 90,
    time: "15-08-2021 12:40",
  },
  {
    id: 3,
    name: "Cecep",
    score: 80,
    time: "15-08-2021 12:40",
  },
  {
    id: 4,
    name: "Dedi",
    score: 70,
    time: "15-08-2021 12:40",
  },
  {
    id: 5,
    name: "Euis",
    score: 60,
    time: "15-08-2021 12:40",
  },
  {
    id: 6,
    name: "Fafa",
    score: 50,
    time: "15-08-2021 12:40",
  },
  {
    id: 7,
    name: "Gaga",
    score: 40,
    time: "15-08-2021 12:40",
  },
  {
    id: 8,
    name: "Haha",
    score: 30,
    time: "15-08-2021 12:40",
  },
  {
    id: 9,
    name: "Ii",
    score: 20,
    time: "15-08-2021 12:40",
  },
  {
    id: 10,
    name: "Jaja",
    score: 10,
    time: "15-08-2021 12:40",
  },
];

const Ranking = () => {
  const store = useNavbarStore();

  const [tabSelected, setTabSelected] = useState(0);

  useEffect(() => {
    store.setNavSelected("kuis");
  }, []);

  return (
    <LayoutPage>
      <div className="flex flex-col flex-1 py-4 relative items-center">
        <ul className="flex gap-3 mt-4 w-full">
          <li className="hover:text-primary cursor-default flex gap-2 items-center">
            <HiOutlineHome />
            <p>Home</p>
          </li>
          <li>{">"}</li>
          <Link to="/kuis" className="hover:text-primary">
            Kuis
          </Link>
          <li>{">"}</li>
          <li className="font-medium text-gray-500">Ranking</li>
        </ul>

        <div className="md:max-w-[500px] w-full flex flex-col mt-6 items-center">
          <div className="flex items-center">
            <button
              onClick={() => setTabSelected(0)}
              className={`btn btn-link ${
                tabSelected === 0 ? "" : "no-underline text-gray-500"
              }`}
            >
              Tebak Huruf
            </button>
            <button
              onClick={() => setTabSelected(1)}
              className={`btn btn-link ${
                tabSelected === 1 ? "" : "no-underline text-gray-500"
              }`}
            >
              Menyusun Huruf
            </button>
          </div>

          <label className="input input-bordered flex items-center gap-2 w-full mt-6 mb-4">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {data.map((item, index) => (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.1, delay: index * 0.1 },
              }}
              key={item.id}
              className="flex justify-between mt-4 bg-base-100 hover:bg-base-200 duration-300 ease-in-out px-6 py-4 rounded-md w-full items-center gap-4"
            >
              <img
                className="bg-green-400 rounded-full h-14 w-14 object-cover"
                src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${item.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                alt=""
              />
              <div className="flex flex-col flex-1">
                <p className="font-semibold">{item.name}</p>
                <p>{item.score} Poin</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex justify-center items-center p-5 `}
                style={{
                  backgroundColor: ["#b6e3f4", "#c0aede", "#d1d4f9"][
                    Math.floor(Math.random() * 3)
                  ],
                }}
              >
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </LayoutPage>
  );
};

export default Ranking;
