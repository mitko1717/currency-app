import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
    state,
    getExchange
} from "../features/exchanger/exchangerSlice";

const Header = () => {
    const { uah_currencies_header, currencies } = useAppSelector(state);
    const dispatch = useAppDispatch();

    const getExchangeHandler = async (currency: string) => {        
        await dispatch(getExchange(currency));
      };
    
      useEffect(() => {
        currencies.forEach((currency: any) => {
            currency !== "UAH" && getExchangeHandler(currency);
        });
      }, [currencies]);

    return (
        <div className="flex bg-slate-400 p-4 h-[10vh] w-full flex-col">
            <h2 className="text-center uppercase text-2xl">current uah exchange</h2>
            {
            uah_currencies_header && uah_currencies_header.length > 0 ? 
            <div className="flex mx-auto my-2">
                {uah_currencies_header.map(currency => {
                    return (
                        <p key={currency.base_code} className="mx-2 inline-block font-bold">1 {currency.base_code} = {currency.conversion_rates.UAH.toFixed(2)} UAH</p>
                    )
                })}
            </div> :
            <div className="flex mx-auto mt-2">NO CURRENCIES YET</div>
            }
        </div>
    )
}

export default Header
