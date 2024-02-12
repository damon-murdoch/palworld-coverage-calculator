// Effectiveness Values
// Define effectiveness values for type matchups.
const EFFECTIVENESS = {
  "-2": "very strong",
  "-1": "strong",
  0: "neutral",
  1: "weak",
  2: "very weak",
};

// Effectiveness Table
// Define type matchups: which types are effective against or resistant to others.
// Each type is also resistant to itself.
const ELEMENTS = {
  water: ["fire"],
  fire: ["grass", "ice"],
  grass: ["ground"],
  ground: ["electric"],
  electric: ["water"],
  ice: ["dragon"],
  dragon: ["dark"],
  dark: ["neutral"],
  neutral: [],
};

// List of Pal Skills
const SKILLS = [
  "Cooling",
  "Electricity",
  "Farming",
  "Gathering",
  "Handiwork",
  "Kindling",
  "Lumbering",
  "Medicine",
  "Mining",
  "Planting",
  "Transporting",
  "Watering",
]

// Single-Type Functions
// Function to get weaknesses of a given type.
function getTypeWeaknesses(element) {
  const weaknesses = [];
  for (const otherElement in ELEMENTS) {
    if (ELEMENTS[otherElement].includes(element)) {
      weaknesses.push(otherElement);
    }
  }
  return weaknesses;
}

// Function to get resistances of a given type.
function getTypeResistances(element) {
  const resistances = [...ELEMENTS[element]]; // Shallow copy to prevent mutation
  resistances.push(element); // Each type is resistant to itself.
  return resistances;
}

// Multi-Type Functions
// Function to get weaknesses of multiple types combined.
function getWeaknesses(elements) {
  const weaknesses = {};
  elements.forEach((element) => {
    getTypeWeaknesses(element).forEach((elementWeakness) => {
      weaknesses[elementWeakness] = (weaknesses[elementWeakness] || 0) + 1;
    });
  });
  return weaknesses;
}

// Function to get resistances of multiple types combined.
function getResistances(elements) {
  const resistances = {};
  elements.forEach((type) => {
    getTypeResistances(type).forEach((elementResistance) => {
      resistances[elementResistance] = (resistances[elementResistance] || 0) + 1;
    });
  });
  return resistances;
}

// Function to calculate coverage based on types' weaknesses and resistances.
function getCoverage(elements) {
  const coverage = {};

  // Initialize coverage with neutral values for all types.
  for (const type in ELEMENTS) {
    coverage[type] = 0; // Neutral
  }

  // Calculate weaknesses and subtract from coverage.
  const weaknesses = getWeaknesses(elements);
  for (const weakness in weaknesses) {
    coverage[weakness] -= weaknesses[weakness];
  }

  // Calculate resistances and add to coverage.
  const resistances = getResistances(elements);
  for (const resistance in resistances) {
    coverage[resistance] += resistances[resistance];
  }

  return coverage;
}

// Function to calculate the coverage score based on coverage dictionary.
function getCoverageScore(coverage) {
  let score = 0;

  // Sum up coverage values.
  for (const element in coverage) {
    score += coverage[element];
  }

  return score;
}

// Function to represent coverage dictionary as a string.
function getCoverageStr(coverage) {
  const strings = [];

  // Generate strings for each type's coverage value.
  for (const element in coverage) {
    strings.push(`${element}: ${coverage[element]}`);
  }

  return strings.join(", ");
}
