import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  databaseURL:
    "https://abc69-tournament-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Home() {
  const matchNumberRef = ref(database, "match_number");
  const [matchNumber, setMatchNumber] = useState(0);

  useEffect(() => {
    onValue(matchNumberRef, (snapshot) => {
      const data = snapshot.val();
      setMatchNumber(data);
    });
  });

  return (
    <div className="flex items-center w-screen h-screen justify-center gap-10">
      <button
        onClick={() => set(matchNumberRef, matchNumber - 1)}
        className="text-5xl font-bold bg-gray-200 border-2 py-4 px-8"
      >
        -
      </button>
      <h1 className="text-5xl font-bold">Prochain match : {matchNumber}</h1>
      <button
        onClick={() => set(matchNumberRef, matchNumber + 1)}
        className="text-5xl font-bold bg-gray-200 border-2 py-4 px-8"
      >
        +
      </button>
    </div>
  );
}
