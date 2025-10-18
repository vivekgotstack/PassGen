import React from "react";

interface ColorButtonsProps {
  setColor: (color: string) => void;
}

const gradients = [
  {
    name: "Vibrant Sunset",
    value: "bg-gradient-to-r from-orange-600 via-pink-600 to-red-700",
  },
  {
    name: "Tropical Sea",
    value: "bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-800",
  },
  {
    name: "Lush Forest",
    value: "bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800",
  },
  {
    name: "Royal Gold",
    value: "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-700",
  },
  {
    name: "Arctic Ice",
    value: "bg-gradient-to-r from-blue-200 via-cyan-300 to-teal-400",
  },
  {
    name: "Olive Grove",
    value: "bg-gradient-to-r from-lime-600 via-green-700 to-olive-800",
  },
  {
    name: "Crimson Flame",
    value: "bg-gradient-to-r from-red-800 via-rose-700 to-pink-600",
  },
];

const ColorButtons: React.FC<ColorButtonsProps> = ({ setColor }) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 px-4">
      <div className="flex overflow-x-auto sm:overflow-visible gap-3 justify-center flex-wrap">
        {gradients.map((g, index) => (
          <button
            key={index}
            onClick={() => setColor(g.value)}
            className={`flex-shrink-0 px-3 py-2 rounded-2xl shadow-lg text-white text-sm font-semibold ${g.value}`}
          >
            {g.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorButtons;
