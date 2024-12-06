import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Context {
  id: string;
  text: string;
}

// Interface for the search result
interface SearchResult {
  id: string;
  text: string;
  context: Context[];
}

// Refactor result type
interface RefactorResult {
  text: string;
  pincode: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// @ts-nocheck
export const refactor = (
  searchData: {
    context: {
      id: string;
      text: string;
    }[];
  }[]
) => {
  const arr: { text: string; pincode: number; id: string }[] = [];

  searchData?.map((data) => {
    const context = data.context;

    const city: string =
      context.filter((item: { id: string; text: string }) =>
        item.id.includes("district")
      )[0]?.text ?? "";
    const state: string =
      context.filter((item: { id: string; text: string }) =>
        item.id.includes("region")
      )[0]?.text ?? "";
    const pincode: number = parseInt(
      context.filter((item) => item.id.includes("postcode"))[0]?.text ?? "0"
    );

    if (city && state && pincode) {
      arr.push({
        text: `${city},${state},${pincode}`,
        pincode: pincode,
        id: JSON.stringify(pincode),
      });
    }
  });
  console.log("arr", arr);
  return arr;
};
