"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export type Location = {
  lat: number;
  lng: number;
  title: string;
  description: string;
  images: string[];
};

const locations: Location[] = [
  {
    lat: 43.65107,
    lng: -79.347015,
    title: "Toronto, Canada",
    description: "Toronto has always been the closest major city to me. Even with such close proximity, I haven't been too many times, but it has always been a blast!",
    images: ["/toronto.jpg"],
  },

  {
    lat: 45.5019,
    lng: -73.5674,
    title: "Montreal, Canada",
    description: "During Victoria Day long weekend, my parents and I went to Montreal for a short trip. This was my first ever roadtrip where I drove, and it was really fun! Montreal itself was beautiful. The architecture was very Neo-Gothic and European, which was so cool to see in a city just 6 hours away from me! I hope to visit many times in the future!",
    images: ["/montreal.jpg"],
  },

  {
    lat: 49.2827,
    lng: -123.1207,
    title: "Vancouver, Canada",
    description: "I'm in love with Vancouver's ability to have a double edged sword layout with both a bustling city life along with breathtaking nature just a few kilometers away!",
    images: ["/vancouver.jpg"], 
  },

  {
    lat: 45.4201,
    lng: -75.7003,
    title: "Ottawa, Canada",
    description: "I've been to Ottawa a couple of times, and I've always had so much fun learning about the history of both Ontario and Canada!",
    images: ["/ottawa.png"],
  },

  {
    lat: 48.4284,
    lng: -123.3656,
    title: "Victoria, Canada",
    description: "Taking the ferry across to Vancouver Island in itself was already beautiful, but being able to experience British Columbia's capital was an experience in its own. There was a rich history to experience throughout the city, and I'm happy I was able to go!",
    images: ["/victoria.jpg"], 
  },

  {
    lat: 42.3297,
    lng: -83.0425,
    title: "Detroit, USA",
    description: "Detroit is one of my favourite underrated cities. Being so close has allowed to go a couple of times, and something about their downtown is mesmerizing to me!",
    images: ["/detroit.jpg"], 
  },

  {
    lat: 38.9072,
    lng: -77.0369,
    title: "Washington D.C., USA",
    description: "I have family that lives nearby so I've been able to visit a few times, and there's always been so much history to learn! I love all of the museums, especially the National Portrait Gallery. Can't wait to visit again soon!",
    images: ["/washingtonDC.jpg"], 
  },


  {
    lat: 53.3498,
    lng: -6.2603,
    title: "Dublin, Ireland",
    description: "Dublin was my first stop on a solo Europe trip I went on in June, 2025. The city was very vibrant and filled with so much history! The culture was ever present, and I really enjoyed my time there!",
    images: ["/dublin.jpg"],
  },

  {
    lat: 50.8477,
    lng: 4.3572,
    title: "Brussels, Belgium",
    description: "Brussels had architecture to die for. The whole city felt like a royal dream. No matter where you were, there was some massive gold plated building to look at!",
    images: ["/brussels.jpg"],
  },

  {
    lat: 47.4979,
    lng: 19.0402,
    title: "Budapest, Hungary",
    description: "Budapest was a city I knew nothing about before coming, but I'm so grateful I decided to visit, and I recommend everyone do so as well. At night, the city is spirited with people young and old! Architecture out of Disney movies!",
    images: ["/budapest.jpg"],
  },

  {
    lat: 41.8967,
    lng: 12.4822,
    title: "Rome, Italy",
    description: "Rome is a classic location to visit, and I'm so happy I did. Seeing my favourite piece of art in the world, ('The School of Athens' by Raphael, which depicts many of the greatest mathematicians, philosophers, and scientists all gathered together) was a key factor for my enjoyment of Rome and The Vatican!",
    images: ["/rome.jpg"],
  },

  {
    lat: 55.6761,
    lng: 12.5683,
    title: "Copenhagen, Denmark",
    description: "Copenhagen is in competition for my favourite place I've ever visited. I felt relaxed, calm, and at peace. It wasn't so much about what I saw, but was about how I felt. A city I hope I have the pleasure of visiting many times again in the future!",
    images: ["/copenhagen.jpg"],
  },

  {
    lat: 55.9533,
    lng: -3.1883,
    title: "Edinburgh, Scotland",
    description: "I was in Edinburgh for one day, but it was an eventful day! I was able to see the city, go on a hike, and even be part of a busking magic show! A city filled with a lot of history and culture!",
    images: ["/edinburgh.jpg"],
  },

  {
    lat: 33.5731,
    lng: -7.5898,
    title: "Casablanca, Morocco",
    description: "Casablanca was the first stop on a month long trip with my parents this summer. We were only here for one day, but we were able to see the beauty that resides within this city. The city was quite modern.",
    images: ["/casablanca.jpg"],
  },

  {
    lat: 41.0082,
    lng: 28.9784,
    title: "Istanbul, Turkey",
    description: "A city that had an intricate blend between Asian and European culture. Exploding with energy at every corner, and a beautiful city to walk around and see! The food is also outstanding in Istanbul.",
    images: ["/istanbul.jpg"],
  },

  {
    lat: 41.3895,
    lng: 60.3415,
    title: "Khiva, Uzbekistan",
    description: "A city of pure history. As soon as you enter the gates into Khiva and the sights of the ancient city hits you, it's truly an unspeakable feeling. SO SO SO cool to walk through a city that contributed so much to Asian history.",
    images: ["/khiva.jpg"],
  },

  {
    lat: 39.7681,
    lng: 64.4556,
    title: "Bukhara, Uzbekistan",
    description: "Bukhara was my favourite city in Uzbekistan. Filled with endless history and madrasas, truly a city to visit. As someone who speaks Farsi, this was my first time using the language to communicate with locals of a country, and that was so cool for me!",
    images: ["/bukhara.jpg"],
  },

  {
    lat: 39.6508,
    lng: 66.9654,
    title: "Samarkand, Uzbekistan",
    description: "Registan Square (as pictured above) in Samarkand was the first landmark we saw, and I knew we were in for an amazing time! Just like every other city we visited in Uzbekistan, Samarkand had loads of history. The local people of Uzbekistan are extremely hospitable and always wanting to talk, and it helped that we were able to speak Farsi with them since we know the language!",
    images: ["/samarkand.jpg"],
  },

  {
    lat: 41.2995,
    lng: 69.2401,
    title: "Tashkent, Uzbekistan",
    description: "Tashkent was a fascinating city to visit. We went to a few other cities in Uzbekistan before ending up in Tashkent. It's a complete different vibe since Tashkent is the capital, and also a business central location for Uzbekistan and Central Asia. The highlight is the beautiful metro station designs at every stop (one of my favourites pictured above).",
    images: ["/tashkent.jpg"],
  },

  {
    lat: 25.2854,
    lng: 51.5310,
    title: "Doha, Qatar",
    description: "For my parents and I, one of the main attractions in Doha was going to Tim Hortons 😂. I grew up on Tim Hortons, so it was cool to try it in another country! Doha had many impressive buildings all throughout the city.",
    images: ["/doha1.jpg", "/doha2.jpg"],
  },

  {
    lat: 52.3676,
    lng: 4.9041,
    title: "Amsterdam, The Netherlands",
    description: "I went on a solo trip to Amsterdam for my 20th birthday, and its ecosystem and atmosphere was a beautiful culture shock for me! The ease of biking as a means of transportation is something I envy as a Canadian.",
    images: ["/amsterdam.jpg"], 
  },

  {
    lat: 23.1339,
    lng: -82.3586,
    title: "Havana, Cuba",
    description: "Havana is genuinely one of my favourite cities I've ever been to. A city with endless history and culture embedded into it, I was mesmerized with every turn we made!",
    images: ["/havana.jpg"], 
  },

  {
    lat: 23.0303,
    lng: -81.5322,
    title: "Matanzas, Cuba",
    description: "Similar to Havana, Matanzas has a rich history that is ever present and visible all throughout the city",
    images: ["/matanzas.jpg"], 
  },

  {
    lat: 18.5601,
    lng: -68.3725,
    title: "Punta Cana, Dominican Republic",
    description: "In Punta Cana, we mostly stayed in our resort, so I didn't get to experience any culture per se, but the beaches along with the hot sun were the perfect combination to make an amazing vacation!",
    images: ["/puntaCana.jpg"], 
  },

  /*{
    lat: 48.8575,
    lng: 2.3514,
    title: "Paris, France",
    description: "",
    images: ["/paris.jpg"], 
  },*/

  {
    lat: 51.5072,
    lng: -0.1276,
    title: "London, England",
    description: "London was such a fascinating place for me. A city with literally infinite possibilities and things to do! I definitely have to go again",
    images: ["/london.jpg"], 
  },

  {
    lat: 64.1470,
    lng: -21.9408,
    title: "Reykjavík, Iceland",
    description: "Iceland is my favourite place I've ever travelled to. The raw beauty of the country is unmatched to any location I've ever been to. All of the nature is untouched and non-commercialized. If you're at a landmark past 6PM, it's practically just you and the nature. Truly beautiful. I can't wait for my next trip back!",
    images: ["/reykjavik.jpg"], 
  },

  {
    lat: 43.2380,
    lng: 76.8829,
    title: "Almaty, Kazakhstan",
    description: "I have family that lives in Almaty, so about 10 years ago my parents and I went to visit them for about a month. This summer, we visited them again. I've grown to love mountains, and Almaty has a surplus of them. Truly one of the best cities I've been to. I'm excited to see Almaty continue to develop everyday!",
    images: ["/almaty1.jpg", "/almaty2.jpg"], 
  },

  {
    lat: 50.9375,
    lng: 6.9603,
    title: "Cologne, Germany",
    description: "The highlight of my trip to Cologne was meeting the NBA players above! Cologne is a beautiful city on the Rhine River with an enchanting city core. I have family that lives nearby in Düsseldorf, so I will definitely be back soon!",
    images: ["/cologne.jpg"], 
  },

  {
    lat: 48.1351,
    lng: 11.5820,
    title: "Munich, Germany",
    description: "Munich is my favourite city I've been to in Germany. I have family that lives in Munich, so I was able to go as a child a few times, and the McDonalds pictured behind me has so many memories for me, so I had to take a selfie with it when I went this past summer! The city has a rich history that can be experienced as you walk through Marienplatz and other major city sections.",
    images: ["/munich.jpg"], 
  },

 /* {
    lat: 50.0755,
    lng: 14.4378,
    title: "Prague, Czech Republic",
    description: "Amazing city with endless possibilities!",
    images: ["/prague.jpg"], 
  },*/

  {
    lat: 47.8014,
    lng: 13.0448,
    title: "Salzburg, Austria",
    description: "Since my family lives in Munich, my Dad and I were able to take a day trip to Salzburg. Salzburg is the most beautiful city I've ever experienced. It felt like we were in a fairytale!",
    images: ["/salzburg.jpg"], 
  },

  {
    lat: 45.4685,
    lng: 9.1824,
    title: "Milan, Italy",
    description: "The one day we spent in Milan was like a dream. Every building looked like it was built for royalty. As the day grew old and the moon came out, I was surprised to see that the city got even more busy! Unfortunately that's when we had to leave, but I can only imagine that Milan at night would've been an unforgettable experience.",
    images: ["/milan.jpg"], 
  },

  {
    lat: 45.4384,
    lng: 10.9917,
    title: "Verona, Italy",
    description: "My favourite part of my visit to Verona was seeing the Verona Arena which was built in 30 AD. I think it's so mesmerizing that we can experience something so 'old' in such perfect condition.",
    images: ["/verona.jpg"], 
  },

  {
    lat: 45.8064,
    lng: 9.0852,
    title: "Como, Italy",
    description: "Como was a beautiful city on the lake. As soon as you get in, you're in awe of the beauty of the city and the surrounding nature. Quite possibly one of the nicest views I've ever seen was off of the nearby mountains. You can see the whole city from a bird's eye view, and I'll forever remember that beauty!",
    images: ["/como.jpg"], 
  },

  /*{
    lat: 36.8969,
    lng: 30.7133,
    title: "Antalya, Turkey",
    description: "Amazing city with endless possibilities!",
    images: ["/antalya.jpg"],
  },*/


  
  
];

export default function Map() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Zoom on click
  useEffect(() => {
    if (selectedLocation && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: selectedLocation.lat, lng: selectedLocation.lng, altitude: 1.83 },
        1500
      );
      setCurrentImageIndex(0);
    }
  }, [selectedLocation]);

  // Auto-rotation + starfield
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;

      const scene = globeRef.current.scene();
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 2000;
      const positions: number[] = []; // avoid implicit any
      for (let i = 0; i < starCount; i++) {
        positions.push((Math.random() - 0.5) * 2000);
        positions.push((Math.random() - 0.5) * 2000);
        positions.push((Math.random() - 0.5) * 2000);
      }
      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
      const starMesh = new THREE.Points(starGeometry, starMaterial);
      scene.add(starMesh);
    }
  }, []);

  const handleNextImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedLocation.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex((prev) =>
        (prev - 1 + selectedLocation.images.length) % selectedLocation.images.length
      );
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="map"
      className="min-h-screen flex flex-col items-center justify-center text-center p-10"
    >
      <h2 className="mb-8 text-5xl font-bold gradient-title">
        Places I&apos;ve Been
      </h2>

      <div className="w-full h-[500px] md:w-[60%] mx-auto relative flex justify-center">
        <Globe
          ref={globeRef}
          globeImageUrl="/earth.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere={true}
          atmosphereColor="#88ccee"
          atmosphereAltitude={0.25}
          pointsData={locations}
          backgroundColor="rgba(0,0,0,0)"
          // ---- FIX: use (d: object) and cast inside to Location ----
          pointLat={(d: object) => (d as Location).lat}
          pointLng={(d: object) => (d as Location).lng}
          pointColor={() => "purple"}
          pointAltitude={0.01}
          htmlElementsData={locations}
          htmlElement={(d: object) => {
            // cast safely to Location for IntelliSense and to use fields
            const loc = d as Location;
            const el = document.createElement("div");
            el.style.width = "14px";
            el.style.height = "14px";
            el.style.borderRadius = "50%";
            el.style.background =
              loc === hoveredLocation
                ? "radial-gradient(circle, #7DF9FF, #5B21B6)"
                : "linear-gradient(90deg, #5B21B6, #7DF9FF)";
            el.style.cursor = "pointer";
            el.style.boxShadow = "0 0 10px rgba(125,249,255,0.8)";
            el.style.pointerEvents = "auto"; // allow clicks
            el.style.zIndex = "2"; // ensure above canvas

            // note: these event handlers capture loc (cast) — same runtime behavior
            el.onmouseenter = () => setHoveredLocation(loc);
            el.onmouseleave = () => setHoveredLocation(null);
            el.onclick = () => setSelectedLocation(loc);
            return el;
          }}
          htmlLat={(d: object) => (d as Location).lat}
          htmlLng={(d: object) => (d as Location).lng}
          htmlTransitionDuration={300}
          width={500}
          height={500}
        />

        {selectedLocation && (
          <div className="absolute top-4 right-4 bg-purple-800/10 text-white backdrop-blur-md border-purple-800/30 rounded-lg shadow-2xl max-w-xs z-10 animate-fade-in border border-gray-200 overflow-hidden text-xl font-extrabold tracking-wide">
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-white hover:text-white-700 font-bold text-xl absolute top-2 right-3 z-20"
            >
              ×
            </button>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white-900 mb-2">
                {selectedLocation.title}
              </h3>
              <div className="relative">
                <Image
                  src={selectedLocation.images[currentImageIndex]}
                  alt={selectedLocation.title}
                  width={300}
                  height={200}
                  className="w-full h-auto rounded mb-3 shadow"
                />
                {selectedLocation.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl font-bold hover:scale-110 transition"
                    >
                      ◀
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl font-bold hover:scale-110 transition"
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>
              <p className="text-sm text-white-700 leading-relaxed">
                {selectedLocation.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Instagram posts container */} 
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "20px", 
          marginTop: "30px", 
          flexWrap: "wrap", 
          maxWidth: "1000px", 
          }} 
          > 
          {/* Paste your Instagram embed blocks here */} 
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/p/DMyeRfNtcCa/?utm_source=ig_embed&amp;utm_campaign=loading" 
            data-instgrm-version="14" 
            style={{ maxWidth: "320px", width: "100%", margin: "auto" }} 
            > 
            <a 
            href="https://www.instagram.com/p/DMyeRfNtcCa/?utm_source=ig_embed&amp;utm_campaign=loading" 
            target="_blank" 
            rel="noopener noreferrer" 
            > 
            Instagram Post 1 
            </a> 
            </blockquote> 

            <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/p/DKqH2DINVqC/?utm_source=ig_embed&amp;utm_campaign=loading" 
            data-instgrm-version="14" 
            style={{ maxWidth: "320px", width: "100%", margin: "auto" }} 
            > 
            <a 
            href="https://www.instagram.com/p/POST_ID_2/" 
            target="_blank" 
            rel="noopener noreferrer" 
            > 
            Instagram Post 2 
            </a> 
            </blockquote> 
            
            <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/p/DM1AjRpNa9P/?utm_source=ig_embed&amp;utm_campaign=loading" 
            data-instgrm-version="14" 
            style={{ maxWidth: "320px", width: "100%", margin: "auto" }}
             >
               <a
                href="https://www.instagram.com/p/DM1AjRpNa9P/?utm_source=ig_embed&amp;utm_campaign=loading" 
                target="_blank" 
                rel="noopener noreferrer" 
                > 
                Instagram Post 3 
                </a> 
              </blockquote>
                
             </div>

      <style jsx>{`
        .gradient-title {
          background: linear-gradient(90deg, #5b21b6, #7df9ff);
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
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}