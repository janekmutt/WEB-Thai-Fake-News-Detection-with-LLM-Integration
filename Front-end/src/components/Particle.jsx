// import { useCallback, useEffect, useState } from "react";
// import Particles from "@tsparticles/react";
// import { loadFull } from "tsparticles";

// export default function Particle() {
//   const [init, setInit] = useState(false);

//   const customInit = useCallback(async (engine) => {
//     // โหลดโมดูล tsparticles
//     await loadFull(engine);
//     setInit(true);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={customInit} // เรียก customInit
//       style={{
//         zIndex: -1,
//       }}
//       options={{
//         background: {
//           color: {
//             value: "#ffffff",
//           },
//         },
//         fpsLimit: 120,
//         interactivity: {
//           events: {
//             onClick: { enable: true, mode: "push" },
//             onHover: { enable: true, mode: "repulse" },
//             resize: true,
//           },
//           modes: {
//             push: { quantity: 4 },
//             repulse: { distance: 200, duration: 0.4 },
//           },
//         },
//         particles: {
//           color: { value: "#ed2218" },
//           links: {
//             color: "#f7655e",
//             distance: 150,
//             enable: true,
//             opacity: 0.5,
//             width: 1,
//           },
//           move: {
//             direction: "none",
//             enable: true,
//             outModes: { default: "bounce" },
//             speed: 1.2,
//           },
//           number: { density: { enable: true, area: 800 }, value: 160 },
//           opacity: { value: 0.5 },
//           shape: { type: "circle" },
//           size: { value: { min: 1, max: 5 } },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// }

// import { useCallback, useEffect, useState } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";

// import { loadFull } from "tsparticles";
// export default function Particle() {
//   const [init, setInit] = useState(false);
//   useEffect(() => {
//     console.log("init");
//     initParticlesEngine(async (engine) => {
//       await loadFull(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   const particlesLoaded = (container) => {};

//   return (
//     <>
//       {init && (
//         <Particles
//           id="tsparticles"
//           particlesLoaded={particlesLoaded}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%", // เต็มพื้นที่ของ parent container
//             height: "100%", // เต็มพื้นที่ของ parent container
//             zIndex: -1,
//           }}
//           options={{
//             background: {
//               color: {
//                 value: "#transparent",
//               },
//             },
//             fpsLimit: 120,
//             interactivity: {
//               events: {
//                 onClick: {
//                   enable: true,
//                   mode: "push",
//                 },
//                 onHover: {
//                   enable: true,
//                   mode: "repulse",
//                 },
//                 resize: true,
//               },
//               modes: {
//                 push: {
//                   quantity: 4,
//                 },
//                 repulse: {
//                   distance: 200,
//                   duration: 0.4,
//                 },
//               },
//             },
//             particles: {
//               color: {
//                 value: "#ed2218",
//               },
//               links: {
//                 color: "#f7655e",
//                 distance: 150,
//                 enable: true,
//                 opacity: 0.5,
//                 width: 1,
//               },
//               move: {
//                 direction: "none",
//                 enable: true,
//                 outModes: {
//                   default: "bounce",
//                 },
//                 random: false,
//                 speed: 1.2,
//                 straight: false,
//               },
//               number: {
//                 density: {
//                   enable: true,
//                   area: 800,
//                 },
//                 value: 160,
//               },
//               opacity: {
//                 value: 0.5,
//               },
//               shape: {
//                 type: "circle",
//               },
//               size: {
//                 value: { min: 1, max: 5 },
//               },
//             },
//             detectRetina: true,
//           }}
//         />
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function Particle() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1, // ให้ Particle อยู่ด้านล่าง
            overflow: "hidden",
          }}
        >
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#89CFF0",
                },
                links: {
                  color: "#00BFFF",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 1.2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 160,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}
    </>
  );
}
