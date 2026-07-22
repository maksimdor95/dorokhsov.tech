export type BackdropVariant = "orbit" | "square" | "triangle";

const STORAGE_KEY = "dorokhov-hero-backdrop-v6";
const VARIANTS: BackdropVariant[] = ["orbit", "square", "triangle"];

/** Survives Strict Mode double-invoke within one page load. */
let pickedThisLoad: BackdropVariant | null = null;

/** One shape per page load — shared by Hero and About. */
export function getBackdropVariant(): BackdropVariant {
  if (pickedThisLoad) return pickedThisLoad;

  try {
    const last = localStorage.getItem(STORAGE_KEY);
    const lastIndex = VARIANTS.indexOf(last as BackdropVariant);
    const next = VARIANTS[(lastIndex + 1) % VARIANTS.length];
    localStorage.setItem(STORAGE_KEY, next);
    pickedThisLoad = next;
    return next;
  } catch {
    pickedThisLoad = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    return pickedThisLoad;
  }
}
