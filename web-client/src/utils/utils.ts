import { AxiosResponse } from "axios";
import { UnionToTuple } from "../types";

export function generateArray(str:string): string[]{

  return str.split(',').map(s=>s.trim());

}

export function generateRandomString(length: number, seed?: string) {
  let result = "";
  const characters =
    seed ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function clampValue(
  value: number,
  { min, max }: { min?: number; max?: number }
) {
  let ans = value;
  if (max && min && max < min) {
    return value;
  }
  if (min && ans < min) {
    ans = min;
  }
  if (max && ans > max) {
    ans = max;
  }
  return ans;
}

export function linearMap(
  value: number,
  mapFrom: { from: number; to: number },
  mapTo: { from: number; to: number },
  clamp = true
) {
  const slope = (mapTo.to - mapTo.from) / (mapFrom.to - mapFrom.from);
  const ans = slope * (value - mapFrom.from) + mapTo.from;
  return clamp
    ? clampValue(ans, {
        min: Math.min(mapTo.from, mapTo.to),
        max: Math.max(mapTo.from, mapTo.to),
      })
    : ans;
}

export function convertColorToRGBVec(color: string): [number, number, number] {
  let rgb: [number, number, number] = [0, 0, 0];

  if (color.startsWith("#")) {
    color = color.slice(1);

    if (color.length === 3) {
      color = color
        .split("")
        .map((char) => char + char)
        .join("");
    }

    rgb = [
      parseInt(color.substr(0, 2), 16) / 255,
      parseInt(color.substr(2, 2), 16) / 255,
      parseInt(color.substr(4, 2), 16) / 255,
    ];
  } else if (color.startsWith("rgb(")) {
    const values = color
      .substring(4, color.length - 1)
      .split(",")
      .map((value) => parseInt(value.trim(), 10));

    rgb = values.map((value) => value / 255) as [number, number, number];
  }

  return rgb;
}

export function getCoords(elem: HTMLElement) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export function mapValueToColor(
  value: number,
  ranges: number[],
  colors: number[][]
) {
  value = Math.min(Math.max(value, ranges[0]), ranges[ranges.length - 1]);
  let index = 0;
  while (value > ranges[index + 1]) {
    index++;
  }

  const rangeStart = ranges[index];
  const rangeEnd = ranges[index + 1];
  const colorStart = colors[index];
  const colorEnd = colors[index + 1];

  const t = (value - rangeStart) / (rangeEnd - rangeStart);

  const r = Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * t)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * t)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * t)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function isEmail(script: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(script);
}

export function getObjectKeys<T extends object>(obj: T) {
  if (typeof obj !== "object")
    throw new Error("Not a valid object to get keys");

  return Object.keys(obj) as Array<keyof T>;
}

export function getRandomFromArray<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem("codemaster_JWT_stored", token);
}

export function getTokenFromLocalStorage() {
  const localCookie = localStorage.getItem("codemaster_JWT_stored");
  if (!localCookie) return false;
  return localCookie;
}

export function clearTokenFromLocalStorage() {
  localStorage.removeItem("codemaster_JWT_stored");
}

export async function getDominantColorFromImage(
  imageUrl: string
): Promise<string> {
  const image = new Image();
  image.crossOrigin = "Anonymous";

  // Wrap the image loading in a Promise
  const loadImage = () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imageUrl;
    });
  };

  try {
    await loadImage();

    // Create a canvas and draw the image on it
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to get 2D context");
    }

    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    // Get pixel data from the entire image
    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    // Count occurrences of each color in the image
    const colorCounts: { [key: string]: number } = {};

    for (let i = 0; i < imageData.length; i += 4) {
      const color = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${
        imageData[i + 2]
      })`;
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    }

    // Find the color with the highest count
    const dominantColor = Object.keys(colorCounts).reduce((a, b) =>
      colorCounts[a] > colorCounts[b] ? a : b
    );

    return dominantColor;
  } catch (error) {
    console.error("Error loading image:", error);
    throw error;
  }
}

export function formatCurrency(number: number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

export function getTypedKeys<T extends object>(obj: T) {
  return Object.keys(obj) as UnionToTuple<keyof T>;
}

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const paramsObject: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value;
  }

  return paramsObject;
}

export function objectToQueryString(obj: { [key: string]: any }): string {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return queryString;
}
