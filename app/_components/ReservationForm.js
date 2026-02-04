"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import Image from "next/image";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="bg-primary-900 border-t border-primary-800 lg:border-t-0 lg:border-l">
      <div className="bg-primary-800 text-primary-200 px-4 sm:px-8 py-3 flex flex-wrap gap-3 items-center justify-between">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex gap-3 items-center">
          <Image
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full w-8 h-8"
            referrerPolicy="no-referrer"
          />
          <p className="text-sm sm:text-base">{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-8 text-base sm:text-lg flex gap-4 sm:gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-md"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-md min-h-[96px]"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end items-start sm:items-center gap-3 sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
