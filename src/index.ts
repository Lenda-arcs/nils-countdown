import "./style.css";
const pic_nils = require("../assets/nils_lol.JPG");

let timeCache: { time: number; label: string }[];

const head = document.querySelector("head")!;
const ogMetatag = document.createElement("meta");
ogMetatag.setAttribute("property", "og:image");
ogMetatag.content = pic_nils;

head.appendChild(ogMetatag);

const body = document.querySelector("body")!;
body.className = " bg-gradient-to-r from-cyan-500 to-blue-500 ";

const container = document.createElement("div");
container.className = "flex flex-col h-1/2 items-center justify-center my-8";
body.appendChild(container);

const headline = document.createElement("main");
headline.className = "my-8 flex justify-center";
headline.innerHTML = `<h1 class="text-zinc-50 font-mono text-2xl font-semibold antialiased">Nils we miss you </h1>`;
body.appendChild(headline);

const toPadString = (time: number): string => {
  return String(time).padStart(2, "0");
};

const x = setInterval(() => {
  const returnDate = new Date("2022-11-27T22:30:00").getTime();
  const currentDate = new Date().getTime();

  const diffTime = returnDate - currentDate;

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  const timeList: { time: number; label: string }[] = [
    { time: days, label: "Days" },
    { time: hours, label: "Hours" },
    { time: minutes, label: "Minutes" },
    { time: seconds, label: "Seconds" },
  ];

  const timeCards = timeList.map(({ time, label }) => {
    const cachedTime = timeCache?.find((t) => label === t.label) ?? undefined;
    const bounceAnimation =
      cachedTime && cachedTime.time !== time ? "animate-pulse" : "";
    return `
    <div class=${bounceAnimation}>
     <div class="flex flex-col justify-center items-center my-6 h-32 w-32 rounded-md bg-cyan-500 shadow-lg shadow-cyan-500/50 ">
      <p class=" text-zinc-50 font-mono text-2xl font-semibold antialiased hover:subpixel-antialiased">${toPadString(
        time
      )}</p>
      <h2 class="text-zinc-100 font-mono font-light antialiased transition-all">${label}</h2>
      </div>
    </div>
       `;
  });

  timeCache = timeList;

  container.innerHTML = timeCards.join("");

  if (diffTime < 0) {
    clearInterval(x);
    container.innerHTML = "EXPIRED";
  }
}, 1000);
