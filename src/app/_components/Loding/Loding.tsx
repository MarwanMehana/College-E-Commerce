import { LuLoader } from "react-icons/lu";

type LoadingProps = {
  type?: "circle" | "dots" | "wave"; // نوع السبينر
  color?: string; // اللون
  size?: number; // الحجم
};

export default function Loading({
  type = "circle",
  color = "green",
  size = 100,
}: LoadingProps) {
  if (type === "dots") {
    return (
      <div className="flex justify-center items-center gap-2">
        <span
          className={`w-${size / 4} h-${size / 4} bg-${color}-500 rounded-full animate-bounce`}
        ></span>
        <span
          className={`w-${size / 4} h-${size / 4} bg-${color}-500 rounded-full animate-bounce [animation-delay:-0.2s]`}
        ></span>
        <span
          className={`w-${size / 4} h-${size / 4} bg-${color}-500 rounded-full animate-bounce [animation-delay:-0.4s]`}
        ></span>
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="flex justify-center items-end gap-1 h-10">
        {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
          <div
            key={i}
            className={`w-2 bg-${color}-500 animate-[pulse_0.6s_ease-in-out_infinite]`}
            style={{
              animationDelay: `${delay}s`,
              height: `${Math.floor(Math.random() * (size - 4) + 4)}px`,
            }}
          ><LuLoader /></div>
        ))}
      </div>
    );
  }

  // Circle spinner
  return (
    <div className="flex justify-center items-center h-screen bg-black/20">
      <div
        className={`border-4 border-green-800 border-t-transparent rounded-full animate-spin`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
