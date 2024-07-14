import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

let currencies = "TRY,EUR,USD,JPY,CAD,BGN";

const getCurrency = async () => {
   try {
      const { data } = await axios.get(
         `${import.meta.env.VITE_BASE_URL}/currencies?apikey=${
            import.meta.env.VITE_TOKEN
         }&currencies=${currencies}`
      );

      return data.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export default function Currency() {
   const [latest, setLatest] = useState({});
   const [fromCode, setFromCode] = useState("USD");
   const [fromPrice, setFromPrice] = useState(10);
   const [toCode, setToCode] = useState("TRY");
   const [toPrice, setToPrice] = useState(0);
   const [currencies, setCurrencies] = useState([]);
   const [loading, setLoading] = useState(true);

   const currentDate = new Date();

   useEffect(() => {
      (async () => {
         const data = await getCurrency();
         const currencyArray = Object.keys(data).map((key) => {
            return data[key];
         });
         setCurrencies(currencyArray);
         setLoading(false);
      })();
   }, []);

   const changeFromPrirce = (fromPrice) => {
      if (fromPrice && latest[fromCode] && latest[toCode]) {
         const fromCurrency = latest[fromCode];
         const toCurrency = latest[toCode];
         const result = (fromPrice / fromCurrency) * toCurrency;
         setToPrice(result);
      }
   };

   const changeToPrice = (toPrice) => {
      if (toPrice && latest[fromCode] && latest[toCode]) {
         const fromCurrency = latest[fromCode];
         const toCurrency = latest[toCode];
         const result = (toPrice / toCurrency) * fromCurrency;
         setFromPrice(result);
      }
   };

   useEffect(() => {
      changeFromPrirce(fromPrice);
   }, [toCode, latest]);

   useEffect(() => {
      changeToPrice(toPrice);
   }, [fromCode, latest]);

   useEffect(() => {
      (async () => {
         const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/latest?apikey=${
               import.meta.env.VITE_TOKEN
            }&base_currency=${fromCode}`
         );
         setLatest(data.data);
      })();
   }, [fromCode]);

   if (loading) {
      return (
         <div className='loading'>
            <div className='spiner'></div>
         </div>
      );
   }

   return (
      <main>
         <div>
            <h2>Döviz Kuru Dönüştürücü</h2>
            <p>Gerçek zamanlı döviz kuru dönüştürücüsü</p>
            <div>
               <span>{`${currentDate.toDateString()} - ${currentDate.toLocaleTimeString()}`}</span>
               <div className='convert-area'>
                  <div>
                     <div className='buttons'>
                        {currencies.map((currency, index) => (
                           <button
                              onClick={() => setFromCode(currency.code)}
                              className={`${fromCode === currency.code ? "active" : ""}`}
                              key={index}>
                              {currency.code}
                           </button>
                        ))}
                     </div>
                     <div className='input-area'>
                        <input
                           type='number'
                           value={fromPrice.toFixed()}
                           onInput={(e) => {
                              setFromPrice(Number(e.target.value));
                              changeFromPrirce(Number(e.target.value));
                           }}
                        />
                        <span>{`1 ${fromCode} = ${latest[toCode]?.toFixed(
                           2
                        )} ${toCode}`}</span>
                     </div>
                  </div>
                  <button
                     onClick={() => {
                        const temp = fromCode;
                        const tempPrice = fromPrice;
                        setFromCode(toCode);
                        setToCode(temp);
                        setFromPrice(toPrice);
                        setToPrice(tempPrice);
                     }}>
                     <HiOutlineArrowPathRoundedSquare />
                  </button>
                  <div>
                     <div className='buttons'>
                        {currencies.map((currency, index) => (
                           <button
                              onClick={() => setToCode(currency.code)}
                              className={`${toCode === currency.code ? "active" : ""}`}
                              key={index}>
                              {currency.code}
                           </button>
                        ))}
                     </div>
                     <div className='input-area'>
                        <input
                           type='number'
                           value={toPrice.toFixed()}
                           onInput={(e) => {
                              setToPrice(Number(e.target.value));
                              changeToPrice(Number(e.target.value));
                           }}
                        />
                        <span>{`1 ${toCode} = ${(
                           latest[fromCode] / latest[toCode]
                        )?.toFixed(2)} ${fromCode}`}</span>
                     </div>
                  </div>
               </div>
               <div></div>
            </div>
         </div>
      </main>
   );
}
