import { create } from "zustand";

interface CameraStore {
  photoUri?: string;

  setPhoto: (photoUri: string) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  photoUri: undefined,

  setPhoto: (photoUri) => set({ photoUri }),
}));
