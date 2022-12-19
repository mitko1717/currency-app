import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { state, getExchangeForConvertation } from "../features/exchanger/exchangerSlice";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";

const Convertation = () => {
  const { currencies, apiResult } = useAppSelector(state);
  const dispatch = useAppDispatch();

  const [firstInputValue, setFirstInputValue] = useState<number>(1);
  const [secondInputValue, setSecondInputValue] = useState<number>(1);

  const [firstSelectValue, setFirstSelectValue] = useState<string>("UAH");
  const [secondSelectValue, setSecondSelectValue] = useState<string>("USD");

  const [isChangingFirstInput, setIsChangingFirstInput] = useState(false)
  const [isChangingSecondInput, setIsChangingSecondInput] = useState(false)

  const getExchangeHandler = async () => {    
    await dispatch(getExchangeForConvertation({currencyBase: firstSelectValue, targetCode: secondSelectValue}));
  };

  const handleChangeFirstInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsChangingFirstInput(true)
    setIsChangingSecondInput(false)
    setFirstInputValue(+e.target.value);
  };

  const handleChangeSecondInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsChangingFirstInput(false)
    setIsChangingSecondInput(true)
    setSecondInputValue(+e.target.value);
  };

  const handleChangeFirstSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setFirstSelectValue(e.target.value);
  };

  const handleChangeSecondSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSecondSelectValue(e.target.value)
  };

  useEffect(() => {
    getExchangeHandler();
  }, [firstSelectValue, secondSelectValue]);

  useEffect(() => {
    setSecondInputValue(apiResult[0]?.conversion_rate)
  }, [apiResult]);

  useEffect(() => {
    if(isChangingSecondInput) {
        setFirstInputValue(+(secondInputValue / apiResult[0]?.conversion_rate).toFixed(2))
    }
  }, [firstInputValue, secondInputValue, firstSelectValue, secondSelectValue]);

  useEffect(() => {    
    if(isChangingFirstInput) {
        setSecondInputValue(+(firstInputValue * apiResult[0]?.conversion_rate).toFixed(2))
    }
  }, [firstInputValue, secondInputValue, firstSelectValue, secondSelectValue]);

  return (
    <div className="flex bg-slate-400 p-4 h-[90vh] w-full flex-col">
      <h2 className="text-center uppercase text-2xl">CONVERTATION</h2>

      <div className="flex w-full justify-center gap-16 mt-8">
        <div className="flex gap-8">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={firstInputValue || 0}
            type="number"
            onChange={handleChangeFirstInput}
          />
          <NativeSelect defaultValue={firstSelectValue} 
          onChange={handleChangeFirstSelect}
          >
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
            value={secondInputValue || 0}
            type="number"
            onChange={handleChangeSecondInput}
          />
          <NativeSelect defaultValue={secondSelectValue} onChange={handleChangeSecondSelect}>
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
