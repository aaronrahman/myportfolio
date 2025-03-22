"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Sample locations data
const locations = [
  {
    lat: 43.65107,
    lng: -79.347015,
    title: "Toronto, Canada",
    description: "Home base. A beautiful city in Canada.",
    imageUrl: "/toronto.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 40.712776,
    lng: -74.005974,
    title: "New York, USA",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 52.3676,
    lng: 4.9041,
    title: "Amsterdam, The Netherlands",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 49.2827,
    lng: -123.1207,
    title: "Vancouver, Canada",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 49.2827,
    lng: -123.1207,
    title: "Vancouver, Canada",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 42.3297,
    lng: -83.0425,
    title: "Detroit, USA",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 38.9072,
    lng: -77.0369,
    title: "Washington D.C., USA",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 45.4201,
    lng: -75.7003,
    title: "Ottawa, Canada",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 48.4284,
    lng: -123.3656,
    title: "Victoria, Canada",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 23.1339,
    lng: -82.3586,
    title: "Havana, Cuba",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 18.5601,
    lng: -68.3725,
    title: "Punta Cana, Dominican Republic",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 48.8575,
    lng: 2.3514,
    title: "Paris, France",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 51.5072,
    lng: -0.1276,
    title: "London, England",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 64.1470,
    lng: -21.9408,
    title: "Reykjavík, Iceland",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 43.2380,
    lng: 76.8829,
    title: "Almaty, Kazakhstan",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 50.9375,
    lng: 6.9603,
    title: "Cologne, Germany",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 48.1351,
    lng: 11.5820,
    title: "Munich, Germany",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 50.0755,
    lng: 14.4378,
    title: "Prague, Czech Republic",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 47.8014,
    lng: 13.0448,
    title: "Salzburg, Austria",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 45.4685,
    lng: 9.1824,
    title: "Milan, Italy",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },

  {
    lat: 36.8969,
    lng: 30.7133,
    title: "Antalya, Turkey",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/nyc.jpg", // Replace with your actual image in public folder
  },


  
  
];

export default function Map() {
  const [highlightedLocation, setHighlightedLocation] = useState<number | null>(null);

  // Define the custom SVG pin as a string
  const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="40" fill="#FF5733">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.54 3 7.75 7 12.13 4-4.38 7-8.59 7-12.13 0-3.87-3.13-7-7-7zM12 12.25c-1.48 0-2.67-1.19-2.67-2.67S10.52 7.92 12 7.92s2.67 1.19 2.67 2.67-1.19 2.66-2.67 2.66z"/>
  </svg>`;

  // Create a custom DivIcon based on whether the marker is highlighted
  const createCustomIcon = (isHighlighted: boolean) => {
    const size = isHighlighted ? [40, 50] : [30, 40];
    const anchor = isHighlighted ? [20, 50] : [15, 40];
    return new L.DivIcon({
      html: pinSvg,
      className: isHighlighted ? "custom-pin highlighted" : "custom-pin",
      iconSize: size,
      iconAnchor: anchor,
      popupAnchor: [0, -anchor[1]],
    });
  };

  return (
    <section id="map" className="min-h-screen flex flex-col items-center justify-center text-center p-10">
      {/* Animated Gradient Title */}
      <h2 className="mb-8 text-5xl font-bold gradient-title">
        Places I've Been
      </h2>
      <div className="mt-6 w-full h-[500px] md:w-3/4">
        <MapContainer center={[43.65107, -79.347015]} zoom={3} className="w-full h-full rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(highlightedLocation === index)}
              eventHandlers={{
                click: () => setHighlightedLocation(index),
              }}
            >
              <Popup>
                <h3 className="text-xl font-semibold">{location.title}</h3>
                <img
                  src={location.imageUrl}
                  alt={location.title}
                  className="w-full h-48 object-cover rounded-md mt-2"
                />
                <p className="mt-2">{location.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .gradient-title {
          background: linear-gradient(90deg, #5B21B6, #7DF9FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulse 2s infinite alternate;
        }
        @keyframes pulse {
          from {
            opacity: 0.8;
          }
          to {
            opacity: 1;
          }
        }
        .custom-pin.highlighted {
          transform: scale(1.2);
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
}