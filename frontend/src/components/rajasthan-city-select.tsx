"use client";

import { RajasthanCityCombobox } from "./rajasthan-city-combobox";

type Props = {
  value: string;
  onChange: (cityName: string) => void;
};

export function RajasthanCitySelect({ value, onChange }: Props) {
  return (
    <RajasthanCityCombobox
      id="rajasthan-city-search"
      label="City in Rajasthan *"
      value={value}
      onChange={onChange}
      required
      placeholder="Search and select city, e.g. Jaipur"
    />
  );
}
