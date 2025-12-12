import React from 'react';
import './App.scss';
import MultiSelect from "./components";

export default function App() {
  return (
    <div className="app-root">
      <h1>MultiSelect MVP - Demo</h1>
      <MultiSelect placeholder="select topic" />
    </div>
  );
}
