// This module provides runtime access to the data object declared by data.js
// Modules import named exports which are read from window.SARATHI_DATA at runtime.
function get(key) {
  return (window.SARATHI_DATA && window.SARATHI_DATA[key]) || [];
}

export const DESTS = get("DESTS");
export const HOTELS = get("HOTELS");
export const ROUTES = get("ROUTES");
export const METRO_STATIONS = get("METRO_STATIONS");
export const PT_CITY_PAIRS = get("PT_CITY_PAIRS");
export const POI_ICON = get("POI_ICON");
