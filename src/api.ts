import mockData from "./mockData.json";
import { Contact } from "./types";

let cursor = -1;
const size = 50;

function delay(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export default async function apiData(): Promise<Contact[]> {
  await delay(1000);

  return new Promise((resolve, reject) => {
    if (Math.random() > 0.7) {
      return reject("Something went wrong");
    }

    cursor += 1;
    const start = cursor * size;
    const end = cursor * size + size;

    return resolve(mockData.slice(start, end));
  });
}
