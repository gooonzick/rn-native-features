export class Place {
  id: string;
  title: string;
  img: string;
  location: {
    lat: number;
    lon: number;
  };

  constructor(
    title: string,
    img: string,
    location: {
      lat: number;
      lon: number;
    },
    id?: number
  ) {
    this.title = title;
    this.img = img;
    this.location = location;
    this.id = String(id) ?? new Date().toString() + Math.random().toString();
  }
}
