interface LocationStore {
  latitude?: number;
  longitude?: number;

  saveLocation: (latitude: number, longitude: number) => void;
}
