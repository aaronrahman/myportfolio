"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// We'll load Leaflet on the client via a useEffect
let L: typeof import("leaflet") | null = null;

type Location = {
  lat: number;
  lng: number;
  title: string;
  description: string;
  imageUrl: string;
};

const locations: Location[] = [
  {
    lat: 43.65107,
    lng: -79.347015,
    title: "Toronto, Canada",
    description: "Toronto has always been the closest major city to me. Even with such close proximity, I haven't been too many times, but it has always been a blast!",
    imageUrl: "/toronto.jpg",
  },

  {
    lat: 52.3676,
    lng: 4.9041,
    title: "Amsterdam, The Netherlands",
    description: "I went on a solo trip to Amsterdam for my 20th birthday, and its ecosystem and atmosphere was a beautiful culture shock for me! The ease of biking as a means of transportation is something I envy as a Canadian.",
    imageUrl: "/amsterdam.jpg", 
  },

  {
    lat: 49.2827,
    lng: -123.1207,
    title: "Vancouver, Canada",
    description: "I'm in love with Vancouver's ability to have a double edged sword layout with both a bustling city life along with breathtaking nature just a few kilometers away!",
    imageUrl: "/vancouver.jpg", 
  },


  {
    lat: 42.3297,
    lng: -83.0425,
    title: "Detroit, USA",
    description: "Detroit is one of my favourite underrated cities. Being so close has allowed to go a couple of times, and something about their downtown is mesmerizing to me!",
    imageUrl: "/detroit.jpg", 
  },

  {
    lat: 38.9072,
    lng: -77.0369,
    title: "Washington D.C., USA",
    description: "I have family that lives nearby so I've been able to visit a few times, and there's always been so much history to learn! I love all of the museums, especially the National Portrait Gallery. Can't wait to visit again soon!",
    imageUrl: "/washingtonDC.jpg", 
  },

  {
    lat: 45.4201,
    lng: -75.7003,
    title: "Ottawa, Canada",
    description: "I've been to Ottawa a couple of times, and I've always had so much fun learning about the history of both Ontario and Canada!",
    imageUrl: "/ottawa.png",
  },

  {
    lat: 48.4284,
    lng: -123.3656,
    title: "Victoria, Canada",
    description: "Taking the ferry across to Vancouver Island in itself was already beautiful, but being able to experience British Columbia's capital was an experience in its own. There was a rich history to experience throughout the city, and I'm happy I was able to go!",
    imageUrl: "/victoria.jpg", 
  },

  {
    lat: 23.1339,
    lng: -82.3586,
    title: "Havana, Cuba",
    description: "Havana is genuinely one of my favourite cities I've ever been to. A city with endless history and culture embedded into it, I was mesmerized with every turn we made!",
    imageUrl: "/havana.jpg", 
  },

  {
    lat: 23.0303,
    lng: -81.5322,
    title: "Matanzas, Cuba",
    description: "Similar to Havana, Matanzas has a rich history that is ever present and visible all throughout the city",
    imageUrl: "/matanzas.jpg", 
  },

  {
    lat: 18.5601,
    lng: -68.3725,
    title: "Punta Cana, Dominican Republic",
    description: "In Punta Cana, we mostly stayed in our resort, so I didn't get to experience any culture per se, but the beaches along with the hot sun were the perfect combination to make an amazing vacation!",
    imageUrl: "/puntaCana.jpg", 
  },

  /*{
    lat: 48.8575,
    lng: 2.3514,
    title: "Paris, France",
    description: "",
    imageUrl: "/paris.jpg", 
  },*/

  {
    lat: 51.5072,
    lng: -0.1276,
    title: "London, England",
    description: "London was such a fascinating place for me. A city with literally infinite possibilities and things to do! I definitely have to go again",
    imageUrl: "/london.jpg", 
  },

  {
    lat: 64.1470,
    lng: -21.9408,
    title: "Reykjavík, Iceland",
    description: "Iceland is my favourite place I've ever travelled to. The raw beauty of the country is unmatched to any location I've ever been to. All of the nature is untouched and non-commercialized. If you're at a landmark past 6PM, it's practically just you and the nature. Truly beautiful. I can't wait for my next trip back!",
    imageUrl: "/reykjavik.jpg", 
  },

  {
    lat: 43.2380,
    lng: 76.8829,
    title: "Almaty, Kazakhstan",
    description: "I have family that lives in Almaty, so about 10 years ago my parents and I went to visit them for about a month. Although it was a while ago, I remember the vibrant city and the endless mountains that were visible from almost any point. ",
    imageUrl: "/almaty.jpg", 
  },

  {
    lat: 50.9375,
    lng: 6.9603,
    title: "Cologne, Germany",
    description: "The highlight of my trip to Cologne was meeting the NBA players above! Cologne is a beautiful city on the Rhine River with an enchanting city core. I have family that lives nearby in Düsseldorf, so I will definitely be back soon!",
    imageUrl: "/cologne.jpg", 
  },

  {
    lat: 48.1351,
    lng: 11.5820,
    title: "Munich, Germany",
    description: "Munich is my favourite city I've been to in Germany. I have family that lives in Munich, so I was able to go as a child a few times, and the McDonalds pictured behind me has so many memories for me, so I had to take a selfie with it when I went this past summer! The city has a rich history that can be experienced as you walk through Marienplatz and other major city sections.",
    imageUrl: "/munich.jpg", 
  },

 /* {
    lat: 50.0755,
    lng: 14.4378,
    title: "Prague, Czech Republic",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/prague.jpg", 
  },*/

  {
    lat: 47.8014,
    lng: 13.0448,
    title: "Salzburg, Austria",
    description: "Since my family lives in Munich, my Dad and I were able to take a day trip to Salzburg. Salzburg is the most beautiful city I've ever experienced. It felt like we were in a fairytale!",
    imageUrl: "/salzburg.jpg", 
  },

  {
    lat: 45.4685,
    lng: 9.1824,
    title: "Milan, Italy",
    description: "The one day we spent in Milan was like a dream. Every building looked like it was built for royalty. As the day grew old and the moon came out, I was surprised to see that the city got even more busy! Unfortunately that's when we had to leave, but I can only imagine that Milan at night would've been an unforgettable experience.",
    imageUrl: "/milan.jpg", 
  },

  {
    lat: 45.4384,
    lng: 10.9917,
    title: "Verona, Italy",
    description: "My favourite part of my visit to Verona was seeing the Verona Arena which was built in 30 AD. I think it's so mesmerizing that we can experience something so 'old' in such perfect condition.",
    imageUrl: "/verona.jpg", 
  },

  {
    lat: 45.8064,
    lng: 9.0852,
    title: "Como, Italy",
    description: "Como was a beautiful city on the lake. As soon as you get in, you're in awe of the beauty of the city and the surrounding nature. Quite possibly one of the nicest views I've ever seen was off of the nearby mountains. You can see the whole city from a bird's eye view, and I'll forever remember that beauty!",
    imageUrl: "/como.jpg", 
  },

  /*{
    lat: 36.8969,
    lng: 30.7133,
    title: "Antalya, Turkey",
    description: "Amazing city with endless possibilities!",
    imageUrl: "/antalya.jpg",
  },*/


  
  
];

export default function Map() {
  const [highlightedLocation, setHighlightedLocation] = useState<number | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        L = leaflet;
        setLeafletLoaded(true);
      });
    }
  }, []);

  // Helper: Return a custom icon for the marker, with a different style if highlighted.
  const getCustomIcon = (index: number): L.DivIcon | undefined => {
    if (!L) return undefined;
    const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="40" fill="#FF5733">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 3.54 3 7.75 7 12.13 4-4.38 7-8.59 7-12.13 0-3.87-3.13-7-7-7zM12 12.25c-1.48 0-2.67-1.19-2.67-2.67S10.52 7.92 12 7.92s2.67 1.19 2.67 2.67-1.19 2.66-2.67 2.66z"/>
    </svg>`;

    const isHighlighted = index === highlightedLocation;
    const size: [number, number] = isHighlighted ? [40, 50] : [30, 40];
    const anchor: [number, number] = isHighlighted ? [20, 50] : [15, 40];

    return L.divIcon({
      html: pinSvg,
      className: isHighlighted ? "custom-pin highlighted" : "custom-pin",
      iconSize: size,
      iconAnchor: anchor,
      popupAnchor: [0, -anchor[1]] as [number, number],
    });
  };

  return (
    <section id="map" className="min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h2 className="mb-8 text-5xl font-bold gradient-title">
        Places I&apos;ve Been
      </h2>
      <div className="mt-6 w-full h-[500px] md:w-3/4">
        {leafletLoaded && (
          <MapContainer center={[43.65107, -79.347015]} zoom={3} className="w-full h-full rounded-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lng]}
                icon={getCustomIcon(index) ?? undefined}
                eventHandlers={{
                  click: () => setHighlightedLocation(index),
                }}
              >
                <Popup>
                  <h3 className="text-xl font-semibold">{location.title}</h3>
                  <Image
                    src={location.imageUrl}
                    alt={location.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mt-2"
                  />
                  <p className="mt-2">{location.description}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

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