// Populate new species dropdown on element
function populateSpeciesDropdown(id) {
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "Select Species";
  select.appendChild(option);

  // Loop over each dex entry
  for(const species in PALDEX){
    // Get the species data
    const speciesData = PALDEX[species];

    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = species;

    // Convert the pokemon value to upper case
    option.innerHTML = toCapitalCase(speciesData.species);

    // Add the option to the element
    select.appendChild(option);
  }
}

// Populate new moves dropdown on element
function populateElementsDropdown(id) {

  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "No Skill";
  select.appendChild(option);

  // Loop over each dex entry
  for(const element in ELEMENTS) {

    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = element;
    
    // Convert the move value to upper case
    option.innerHTML = toCapitalCase(element);

    // Add the option to the element
    select.appendChild(option);
  };
}
