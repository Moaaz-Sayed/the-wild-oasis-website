"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between items-center px-2 sm:px-4 lg:px-6">
      <DayPicker
        className="scale-[0.85] sm:scale-[0.95] lg:scale-[0.95] xl:scale-100 w-full max-w-[520px] lg:max-w-[600px] xl:max-w-[620px] mx-auto"
        classNames={{
          months: "flex justify-center gap-6",
          nav: "hidden",
          caption: "flex justify-center text-lg font-medium",
          selected: "bg-accent-500 text-white",
          range_start: "bg-accent-500 text-white rounded-l-full",
          range_end: "bg-accent-500 text-white rounded-r-full",
          range_middle: "bg-accent-500 text-white",
        }}
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3 bg-accent-500 text-primary-800 w-full max-w-[560px] lg:max-w-[640px]">
        <div className="flex flex-wrap items-baseline gap-4">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-base sm:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold self-start sm:self-auto"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
