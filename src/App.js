import React, { useState } from 'react';
import './App.css';
import coldImage from './cold.jpeg';
import mildImage from './mild.jpeg';
import hotImage from './hot.jpeg';

function App() {
  const [inputTemperature, setInputTemperature] = useState('');
  const [unit1, setUnit1] = useState('celsius');
  const [unit2, setUnit2] = useState('celsius');
  const [result, setResult] = useState(null);
  const [advice, setAdvice] = useState('');
  const [image, setImage] = useState(mildImage);

  const convertTemperature = () => {
    const temp = parseFloat(inputTemperature);
    let result;

    if (unit1 === unit2) {
      result = temp;
    } else if (unit1 === 'celsius' && unit2 === 'fahrenheit') {
      result = (temp * 9/5) + 32;
    } else if (unit1 === 'celsius' && unit2 === 'kelvin') {
      result = temp + 273.15;
    } else if (unit1 === 'fahrenheit' && unit2 === 'celsius') {
      result = (temp - 32) * 5/9;
    } else if (unit1 === 'fahrenheit' && unit2 === 'kelvin') {
      result = ((temp - 32) * 5/9) + 273.15;
    } else if (unit1 === 'kelvin' && unit2 === 'celsius') {
      result = temp - 273.15;
    } else if (unit1 === 'kelvin' && unit2 === 'fahrenheit') {
      result = ((temp - 273.15) * 9/5) + 32;
    }

    setResult(result.toFixed(2));
    provideAdvice(result, unit2);
  };

  const provideAdvice = (temperature, unit) => {
    let tempInCelsius;

    if (unit === 'celsius') {
      tempInCelsius = temperature;
    } else if (unit === 'fahrenheit') {
      tempInCelsius = (temperature - 32) * 5/9;
    } else if (unit === 'kelvin') {
      tempInCelsius = temperature - 273.15;
    }

    let adviceText = '';

    if (tempInCelsius <= 0) {
      adviceText = 'It is freezing! Wear heavy winter clothing and stay indoors if possible.';
      setImage(coldImage);
    } else if (tempInCelsius > 0 && tempInCelsius <= 15) {
      adviceText = 'It is quite cold. Wear warm clothing and stay in a heated environment.';
      setImage(coldImage);
    } else if (tempInCelsius > 15 && tempInCelsius <= 25) {
      adviceText = 'The temperature is mild. Light to moderate clothing is recommended.';
      setImage(mildImage);
    } else if (tempInCelsius > 25 && tempInCelsius <= 35) {
      adviceText = 'It is warm. Wear light clothing and stay hydrated.';
      setImage(hotImage);
    } else if (tempInCelsius > 35) {
      adviceText = 'It is very hot! Stay cool, wear light clothing, and avoid direct sunlight.';
      setImage(hotImage);
    }

    setAdvice(adviceText);
  };

  return (
    <div className="App">
      <div className="header">
        <img className="logo" src={image} alt="temperature advice" />
        <div className="heading">
          <h1><b>TEMPERATURE CONVERTER</b></h1>
          <p className="sub">Convert temperatures between different units easily.</p>
        </div>
        <img className="logo" src={image} alt="temperature advice" />
      </div>
      <div className="form-container">
        <form id="temperatureConverter" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="inputTemperature">Enter Temperature:</label>
          <input
            type="number"
            id="inputTemperature"
            placeholder="Enter temperature"
            step="0.01"
            value={inputTemperature}
            onChange={(e) => setInputTemperature(e.target.value)}
            required
          />
          <label htmlFor="unit1">Initial Unit:</label>
          <select id="unit1" value={unit1} onChange={(e) => setUnit1(e.target.value)} required>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
          <label htmlFor="unit2">Unit after conversion:</label>
          <select id="unit2" value={unit2} onChange={(e) => setUnit2(e.target.value)} required>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
          <button type="button" className="btn" onClick={convertTemperature}>Convert</button>
        </form>
        <h2>Result:</h2>
        <p id="result">{result !== null && `Result: ${result} ${unit2}`}</p>
        <h2>Advice:</h2>
        <p id="advice">{advice}</p>
      </div>
    </div>
  );
}

export default App;
