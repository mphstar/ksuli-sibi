import LayoutPage from "@/components/templates/LayoutPage";
import useNavbarStore from "@/stores/NavbarStore";
import useTebakHurufStore from "@/stores/TebakHurufStore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TebakHuruf = () => {
  const quizStore = useTebakHurufStore();

  const store = useNavbarStore();

  useEffect(() => {
    store.setNavSelected("kuis");
  }, []);

  const shuffleSoal = () => {
    const arr = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
    ];

    const shuffledArr = arr.sort(() => 0.5 - Math.random()).slice(0, 10);
    return shuffledArr;
  };

  const saveData = async () => {
    let score = 0;
    let benar = 0;
    let salah = 0;
    try {
      quizStore.jawaban.forEach((jawaban) => {
        if (jawaban.isCorrect) {
          score += 10;
          benar += 1;
        } else {
          salah += 1;
        }
      });

      await fetch("https://ksuli-api.deno.dev/proses-kuis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer KSULI_TOKEN_321`,
        },
        body: JSON.stringify({
          kategori_id: "rec_cuum78tqrj678tmbcjh0",
          person_name: quizStore.name,
          score: score,
        }),
      });

      Swal.close();
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while saving your data!",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Kuis telah selesai",
      html: `
      <p>Anda menyelesaikan kuis dengan score: ${score}</p>
      <p>Jawaban benar: ${benar}</p>
      <p>Jawaban salah: ${salah}</p>
      `,
    });
  };

  const router = useNavigate();

  const ProsesKuis = () => {
    if (quizStore.name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi nama terlebih dahulu",
      });
      return;
    }

    quizStore.setSoalIndex(0);
    quizStore.setSession(true);
    quizStore.setListSoal(shuffleSoal());

    router("/kuis/tebak-huruf/app");
  };

  useEffect(() => {
    if (quizStore.isFinish) {
      saveData();
    }

    return () => {
      quizStore.setIsFinish(false);
    };
  }, [quizStore.isFinish]);

  return (
    <LayoutPage>
      <div className="flex flex-col flex-1 py-4 relative">
        <ul className="flex gap-3 mt-4">
          <li className="hover:text-primary cursor-default">Home</li>
          <li>{">"}</li>
          <Link to="/kuis" className="hover:text-primary">
            Kuis
          </Link>
          <li>{">"}</li>
          <li className="font-medium text-gray-500">Tebak Huruf</li>
        </ul>

        <div className="flex-1 flex flex-col mt-12 md:mt-24 w-full md:w-[500px]">
          <h1 className="text-5xl font-semibold">
            Start Your <span className="text-primary">Quiz!</span>
          </h1>
          <div className="flex flex-col gap-3 w-full mt-24 md:mt-36">
            <h1 className="font-semibold text-xl">Masukkan Nama</h1>
            <div className="bg-[#F2F2F2] rounded-full pr-4 flex py-2 items-center">
              <input
                placeholder="Name.."
                type="text"
                value={quizStore.name}
                onChange={(e) => quizStore.setName(e.target.value)}
                className="bg-transparent outline-none p-2 px-8 flex-1 w-full"
              />
              <button
                onClick={() => {
                  ProsesKuis();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-full whitespace-nowrap"
              >
                Mulai Kuis
              </button>
            </div>
            <span className="text-primary">Lihat Ranking</span>
          </div>
        </div>
        <img
          className="absolute right-0 md:top-36 bottom-0 pointer-events-none"
          src="/assets/images/overlay-bg.png"
          alt="Overlay Background"
        />
      </div>
    </LayoutPage>
  );
};

export default TebakHuruf;
