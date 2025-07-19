"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  //
  const updateRange = (newRange) => {
    if (!newRange?.from) {
      setRange(initialState);
      return;
    }

    if (
      newRange.from &&
      newRange.to &&
      newRange.from.getTime?.() === newRange.to.getTime?.()
    ) {
      setRange(initialState);
    } else {
      setRange(newRange);
    }
  };

  return (
    <ReservationContext.Provider
      value={{ range, setRange: updateRange, resetRange }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context eas used outside the provider");
  return context;
}
export { ReservationProvider, useReservation };
