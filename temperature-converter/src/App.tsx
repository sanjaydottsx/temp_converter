import React, { useState, ChangeEvent } from "react";
import "./TemperatureConverter.css";

// Conversion constants
const CELSIUS_TO_FAHRENHEIT_RATIO = 9 / 5;
const FAHRENHEIT_TO_CELSIUS_RATIO = 5 / 9;
const FAHRENHEIT_OFFSET = 32;
const INVALID_INPUT_MESSAGE = "Invalid input";

// TemperatureConverter component
const TemperatureConverter: React.FC = () => {
  // State for input temperature, selected unit, and converted temperature
  const [inputTemperature, setInputTemperature] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [convertedTemperature, setConvertedTemperature] = useState("");
  const [temperatureClass, setTemperatureClass] = useState("");
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Handle input temperature change
  const handleTemperatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTemperature(event.target.value);
    setIsInputInvalid(false);
  };

  // Handle unit change
  const handleUnitChange = (selectedUnit: "C" | "F") => {
    setUnit(selectedUnit);
  };

  // Convert temperature based on selected unit
  const convertTemperature = () => {
    // Check for valid numeric input
    const validInputRegex = /^[0-9.-]+$/;
    if (!validInputRegex.test(inputTemperature)) {
      setConvertedTemperature("");
      setIsInputInvalid(true);
      return;
    }

    const tempValue = parseFloat(inputTemperature);
    if (isNaN(tempValue)) {
      setIsLoading(false);
      // setConvertedTemperature(INVALID_INPUT_MESSAGE);
      return;
    }

    // Perform temperature conversion
    if (unit === "C") {
      const convertedTemp =
        tempValue * CELSIUS_TO_FAHRENHEIT_RATIO + FAHRENHEIT_OFFSET;
      setConvertedTemperature(`${convertedTemp.toFixed(2)} °F`);

      // Add conditional class based on temperature value
      if (convertedTemp > 80) {
        setTemperatureClass("hot");
      } else if (convertedTemp < 50) {
        setTemperatureClass("cold");
      } else {
        setTemperatureClass("");
      }
    } else {
      const convertedTemp =
        (tempValue - FAHRENHEIT_OFFSET) * FAHRENHEIT_TO_CELSIUS_RATIO;
      setConvertedTemperature(`${convertedTemp.toFixed(2)} °C`);

      // Add conditional class based on temperature value
      if (convertedTemp > 27) {
        setTemperatureClass("hot");
      } else if (convertedTemp < 10) {
        setTemperatureClass("cold");
      } else {
        setTemperatureClass("");
      }
    }
    setIsLoading(false);
  };

  // Handle unit swap
  const handleSwap = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    setConvertedTemperature("");
  };

  return (
    <div className="temperature-converter-container">
      <div className="temperature-converter">
        <h2>Temperature Converter</h2>
        <div
          className={`input-container ${isInputInvalid ? "error-input" : ""}`}
        >
          <input
            type="text"
            value={inputTemperature}
            onChange={handleTemperatureChange}
            placeholder="Enter temperature"
          />
        </div>
        <div className="unit-container">
          <label className="radio-label">
            <input
              type="radio"
              value="C"
              checked={unit === "C"}
              onChange={() => handleUnitChange("C")}
            />
            Celsius
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="F"
              checked={unit === "F"}
              onChange={() => handleUnitChange("F")}
            />
            Fahrenheit
          </label>
        </div>
        {isInputInvalid && <div className="error-message">Invalid input</div>}
        <div className={`converted-result ${temperatureClass}`}>
          {convertedTemperature}
        </div>
        <div className="button-container">
          <button className="convert-button" onClick={convertTemperature}>
            Convert
          </button>
          <button className="swap-button" onClick={handleSwap}>
            Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
