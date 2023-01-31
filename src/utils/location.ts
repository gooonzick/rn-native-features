const token =
  "pk.eyJ1IjoiZ29vb256aWNrIiwiYSI6ImNsZGV6c2YxczBpcDIzb211cGdnMDR4MjcifQ.oZr3kMjFjNB9zwB5P23-4A";

export const getStaticMap = ({
  lat,
  lon,
}: { lon?: number; lat?: number } = {}) => {
  if (lat && lon) {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lon},${lat},14,90,0/400x200?access_token=${token}`;
  }
};

// https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-122.4241,37.78,14.25,90,0/600x600?access_token=pk.eyJ1IjoiZ29vb256aWNrIiwiYSI6ImNsZGV6c2YxczBpcDIzb211cGdnMDR4MjcifQ.oZr3kMjFjNB9zwB5P23-4A
