import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./Components/ui/button";

export default function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [pass, setPass] = useState("");
  const input = useRef<HTMLInputElement | null>(null);
  const inputFocus = () => {
    input.current?.select();
  };
  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/`~-=";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setPass(password);
  }, [length, numAllowed, charAllowed, setPass]);
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 justify-between bg-gray-300 p-4">
          <input
            type="text"
            className="outline-none w-full"
            value={pass}
            placeholder="Password..."
            readOnly
          />
          <Button onClick={inputFocus}>Copy</Button>
        </div>
        <div className="flex justify-around">
          <div className="text-white font-semibold flex flex-col">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
              className="cursor-pointer"
            />
            <label className="">Length: {length}</label>
          </div>
          <div className="text-white font-semibold">
            <input
              type="checkbox"
              checked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="ml-2">
              Add Numbers
            </label>
          </div>
          <div className="text-white font-semibold">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput" className="ml-2">
              Add Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
