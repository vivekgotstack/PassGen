import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "./Components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import ColorButtons from "./Components/ui/ColorButtons";

export default function App() {
  const [length, setLength] = useState<number>(6);
  const [numAllowed, setNumAllowed] = useState<boolean>(false);
  const [charAllowed, setcharAllowed] = useState<boolean>(false);
  const [pass, setPass] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [bgColor, setBgColor] = useState<string>(
    "bg-gradient-to-r from-purple-700 via-indigo-800 to-gray-900 p-4"
  );

  const input = useRef<HTMLInputElement | null>(null);

  const copyPass = useCallback(() => {
    if (input.current) {
      input.current.select();
      window.navigator.clipboard.writeText(pass);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  }, [pass]);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/`~-=";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setPass(password);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className={`min-h-screen flex flex-col duration-200 ${bgColor}`}>
      {showAlert && (
        <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <CheckCircle2Icon />
          <AlertTitle>Password Copied to Clipboard</AlertTitle>
          <AlertDescription>
            Your password has been successfully copied.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-800/35 rounded-lg shadow-lg p-6 backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4 justify-between bg-gray-300 p-4">
            <input
              type="text"
              className="outline-none w-full"
              value={pass}
              ref={input}
              placeholder="Password..."
              readOnly
            />
            <Button onClick={copyPass}>Copy</Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-around gap-4">
            <div className="text-white font-semibold flex flex-col">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="cursor-pointer"
              />
              <label>Length: {length}</label>
            </div>
            <div className="text-white font-semibold flex items-center">
              <input
                type="checkbox"
                checked={numAllowed}
                id="numberInput"
                onChange={() => setNumAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput" className="ml-2">
                Add Numbers
              </label>
            </div>
            <div className="text-white font-semibold flex items-center">
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => setcharAllowed((prev) => !prev)}
              />
              <label htmlFor="charInput" className="ml-2">
                Add Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
      <ColorButtons setColor={setBgColor} />
    </div>
  );
}
