import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
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

  const buvette = {
    Boire: {
      "Bière pression locale Prisca": [2.5],
      "Jus de fruits locaux (25cl)": [1.5],
      "Eau (50cl / 1L)": [0.5, 1.0],
      "Café / Thé": [0.0],
    },
    Manger: {
      "Croque-Monsieur": [2.0],
      "Sandwich (Jambon / Jambon Fromage / Saucisson)": [3.0],
      Pizza: [1.5],
      Quiche: [1.5],
      "Salade composée (pates ou riz), mayonnaise maison": [2.0],
    },
    Grignoter: {
      Gateau: [1.0],
      "Barre de céréales": [0.5],
      Fruit: [0.5],
      "Crêpes (Pate à tartiner / Confiture / Sucre)": [1.5],
    },
  };

  const footer = "Vente d'alcool interdite aux mineurs";

  useEffect(() => {
    onValue(matchNumberRef, (snapshot) => {
      const data = snapshot.val();
      setMatchNumber(data);
    });
  });

  const toEuro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)

  return (
    <div className="flex flex-col items-center justify-center gap-20 p-4">
      <h1 className="text-5xl font-bold mt-10">Prochain match : {matchNumber}</h1>

      <div className="flex flex-col gap-10">
        {Object.entries(buvette).map(([category, items]) => (
          <div className="flex flex-col gap-2" key={category}>
            <h2 className="text-2xl font-bold border-b">{category}</h2>
            {Object.entries(items).map(([item, prices]) => (
              <div className="flex flex-row gap-10 justify-between text-gray-700" key={item}>
                <h3 className="text-xl font-medium">{item} :</h3>
                <h3 className="text-xl font-medium">
                  {prices
                    .map((price) =>
                      price === 0 ? "Gratuit" : toEuro(price)
                    )
                    .join(" / ")}
                </h3>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-gray-600">Vente d&apos;alcool interdite aux mineurs</p>
    </div>
  );
}
