import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toLocalTimeFromUTC(date: string) {
  const storedUtcDate = new Date(date);
  const localDate = new Date(storedUtcDate.toLocaleString());

  return localDate;
}
