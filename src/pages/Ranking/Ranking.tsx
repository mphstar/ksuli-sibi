import LayoutPage from "@/components/templates/LayoutPage";
import useNavbarStore from "@/stores/NavbarStore";
import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { debounce } from "@/utils/debounce";

const Ranking = () => {
  const store = useNavbarStore();

  const [tabSelected, setTabSelected] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const size = 20;

  const { data, error, isLoading } = useSWR(
    `https://ksuli-api.deno.dev/ranking?page=${page}&search=${search}&size=${size}&kategori_id=${
      tabSelected == 0 ? "rec_cuum78tqrj678tmbcjh0" : "rec_cuum7c5qrj60bgubcjog"
    }`,
    fetcher
  );

  const handleSearch = debounce((term) => {
    setSearch(term);
  }, 500);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPage(1);
    handleSearch(value);
  };

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

        <div className="md:max-w-[500px] w-full flex flex-col mt-6 md:items-center h-full flex-1">
          <div className="flex md:items-center gap-3 md:gap-0">
            <button
              onClick={() => {
                setTabSelected(0);
                setPage(1);
              }}
              className={`btn btn-link p-0 md:p-2 ${
                tabSelected === 0 ? "" : "no-underline text-gray-500"
              }`}
            >
              Tebak Huruf
            </button>
            <button
              onClick={() => {
                setTabSelected(1);
                setPage(1);
              }}
              className={`btn btn-link p-0 md:p-2 ${
                tabSelected === 1 ? "" : "no-underline text-gray-500"
              }`}
            >
              Menyusun Huruf
            </button>
          </div>

          <label className="input input-bordered flex items-center gap-2 w-full mt-6 mb-4">
            <input
              onChange={handleChangeSearch}
              type="text"
              className="grow"
              placeholder="Search"
            />
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

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full flex-1">
              <div className="loader"></div>
              <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full flex-1">
              <img
                src="/assets/images/nodata.svg"
                className="h-44"
                alt="Error Image"
              />
              <p className="mt-4 text-md text-center text-gray-700">
                Sedang terjadi error, silakan coba lagi nanti.
              </p>
            </div>
          )}

          {data && data.records.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full flex-1">
              <img
                src="/assets/images/nodata.svg"
                className="h-44"
                alt="Error Image"
              />
              <p className="mt-4 text-md text-center text-gray-700">
                Data tidak ditemukan
              </p>
            </div>
          )}

          {data &&
            data.records
              .sort((a: any, b: any) =>
                tabSelected === 0 ? b.score - a.score : a.score - b.score
              )
              .map((item: any, index: number) => (
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
                    src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${item.person_name}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                    alt=""
                  />
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold">{item.person_name}</p>
                    <div className="flex items-center flex-wrap">
                      <p className="text-sm">
                        {item.score} {tabSelected == 0 ? "Point" : "Detik"}
                      </p>
                      <div className="w-2"></div>
                      {index < 3 && (
                        <p className="text-xs text-primary">
                          ⭐ Top Score {index + 1}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      {new Date(item.xata.createdAt).toLocaleString()}
                    </p>
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
          {data && (
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="btn btn-primary btn-xs"
                disabled={page === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="btn btn-primary btn-xs"
                disabled={!data.meta.page.more}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutPage>
  );
};

export default Ranking;
