import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { state, getExchange } from "../features/exchanger/exchangerSlice";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";

const Convertation = () => {
  const { currencies } = useAppSelector(state);
  const dispatch = useAppDispatch();
  const [firstInputValue, setFirstInputValue] = useState<number>(1);
  const [secondInputValue, setSecondInputValue] = useState<number>(1);
  const [firstSelectValue, setFirstSelectValue] = useState<string>("UAH");
  const [secondSelectValue, setSecondSelectValue] = useState<string>("USD");

  return (
    <div className="flex bg-slate-400 p-4 h-[90vh] w-full flex-col">
      <h2 className="text-center uppercase text-2xl">CONVERTATION</h2>

      <div className="flex w-full justify-center gap-16 mt-8">
        <div className="flex gap-8">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={firstInputValue}
          />
          <NativeSelect defaultValue={firstSelectValue}>
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </NativeSelect>
        </div>
        <div className="flex gap-8">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={secondInputValue}
          />
          <NativeSelect defaultValue={secondSelectValue}>
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </NativeSelect>
        </div>
      </div>
    </div>
  );
};

export default Convertation;
