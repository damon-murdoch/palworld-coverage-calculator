function sanitiseSprite(str) {
  return str.toLowerCase().replace(" ", "-");
}

function sanitiseStr(str) {
  return str.toLowerCase().replace("-", "").replace(" ", "");
}

// toCapitalCase(str: string)
// Returns the provided string
// with the first letter of each
// word capitalised.
function toCapitalCase(str) {
  // Split the string on the spaces
  let spl = str.split(" ");

  // Loop over the string splits
  for (let i = 0; i < spl.length; i++) {
    // If the string is greater
    // than one character
    if (spl[i].length > 1) {
      // Capitalise the first letter, add the rest as lowercase
      spl[i] = spl[i].charAt(0).toUpperCase() + spl[i].slice(1).toLowerCase();
    } // String is one or less characters
    else {
      // Convert the string to upper case
      spl[i] = spl[i].toUpperCase();
    }
  }

  // Join the split string on spaces
  return spl.join(` `);
}

// pad(n: int, width: int, z: int
// n: number we are padding
// width: maximum width we are padding to
// z: character we are padding with
function pad(n, width, z = 0) {
  // Convert input number to a string
  n = n + "";

  // Return the padded number as a string
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Renders the table rows for each type to the screen
function loadElements() {
  // Update the table headers
  document.getElementById("table-header").innerHTML = `<tr>
  <th scope="col">Element</th>
  <th scope="col">4x Resist</th>
  <th scope="col">2x Resist</th>
  <th scope="col">Neutral</th>
  <th scope="col">2x Weak</th>
  <th scope="col">4x Weak</th>
  <th scope="col">Rating</th>
</tr>`;

  // Dereference the table object
  const table = document.getElementById("table-content");

  // Reset table contents
  table.innerHTML = "";

  // Current row in the table we are working with
  // Used to designate the id given to each row
  let i = 0;

  // Iterate over each type
  for (const element in ELEMENTS) {
    const icon = `img/element/${element}_sm.png`;

    // Generate the row for the new type
    const row =
      `<tr id='row-` +
      i +
      `'><td><img src='${icon}' style='width:32px;'></img></td>` +
      `<td id='` +
      i +
      `-0'> 0 </td>` +
      `<td id='` +
      i +
      `-1'> 0 </td>` +
      `<td id='` +
      i +
      `-2'> 0 </td>` +
      `<td id='` +
      i +
      `-3'> 0 </td>` +
      `<td id='` +
      i +
      `-4'> 0 </td>` +
      `<td id='` +
      i +
      `-rating'> No Rating </td>` +
      `</tr>`;

    // Add the new row to the table
    table.innerHTML += row;

    // Increment the current row
    i++;
  }
}

// Renders the skills menu
function loadSkills() {
  // Update the table headers
  document.getElementById("table-header").innerHTML = `<tr>
    <th scope="col">Skill</th>
    <th scope="col">None</th>
    <th scope="col">Level 1</th>
    <th scope="col">Level 2</th>
    <th scope="col">Level 3</th>
    <th scope="col">Level 4</th>
    <th scope="col">Rating</th>
  </tr>`;

  // Dereference the table object
  const table = document.getElementById("table-content");

  // Reset table contents
  table.innerHTML = "";

  // Current row in the table we are working with
  // Used to designate the id given to each row
  let i = 0;

  // Iterate over each type
  for (const skill of SKILLS) {
    const icon = `img/skill/${skill}.png`;

    // Generate the row for the new type
    const row =
      `<tr id='row-` +
      i +
      `'><td><img src='${icon}' style='width:32px;'></img></td>` +
      `<td id='` +
      i +
      `-0'> 0 </td>` +
      `<td id='` +
      i +
      `-1'> 0 </td>` +
      `<td id='` +
      i +
      `-2'> 0 </td>` +
      `<td id='` +
      i +
      `-3'> 0 </td>` +
      `<td id='` +
      i +
      `-4'> 0 </td>` +
      `<td id='` +
      i +
      `-rating'> No Rating </td>` +
      `</tr>`;

    // Add the new row to the table
    table.innerHTML += row;

    // Increment the current row
    i++;
  }
}

// Set the selected pal for the pal id
function setPal(id, species = "cattiva") {
  // Get the pal select drop-down menu
  const select = document.getElementById(`pal-species-${id}`);

  // Update the selected species
  select.value = species;

  // Update form
  update(id);
}

// Adds a new pokemon selection tab to the window
function addPal(set = null) {
  // Dereference the table object
  let table = document.getElementById("table-pal-contents");

  // Dereference the pokemon count object,
  // and increment it after assignment
  let id = document.palCount++;

  // Create the data row
  let data = document.createElement("tr");

  // Set the data row id
  data.id = "pal-" + id + "-info";

  // Species placeholder element id
  const speciesId = `pal-species-${id}`;

  // Set the data row content
  data.innerHTML =
    `<td><img style='width: 64px' id='pal-${id}-sprite' src='img/box/egg.png'></img></td>` +
    `<td><div>` +
    `<select id='${speciesId}' class='form-control' name='pal-species-${id}' onChange='update(${id})'></select>` +
    `<div class='input-group-prepend'><span class="input-group-text">Amount</span>` +
    `<input class='form-control' type='number' min='1' max='999' value='1' id='pal-amount-${id}' onChange='update(${id})'>` +
    `</div></div></td>`;

  // Add the data row to the form
  table.appendChild(data);

  // Create the moves selection row
  let move = document.createElement("tr");

  // Set the move row id
  move.id = "pal-" + id + "-active-skills";

  // Set the move row content
  move.innerHTML =
    `<td><div class=''>` +
    `<td><select id='pal-${id}-skill-1' class='form-control' name='pal-active-skill-1-${id}' onChange='update(${id})'></select>` +
    `<select id='pal-${id}-skill-2' class='form-control' name='pal-active-skill-2-${id}' onChange='update(${id})'></select>` +
    `<select id='pal-${id}-skill-3' class='form-control' name='pal-active-skill-3-${id}' onChange='update(${id})'></select>` +
    `</div></td>`;

  // Add the move row to the form
  table.appendChild(move);

  // Create the control row
  let ctrl = document.createElement("tr");

  // Set the control row id
  ctrl.id = "pal-" + id + "-ctrl";

  // Set the control row content
  ctrl.innerHTML =
    `<td colspan=2><div class='row'>` +
    `<button id='pal-rmov-${id}' class='col btn btn-danger ml-3 mr-1 mt-1' onClick='removePal(${id})'>Remove Pal</button>` +
    `<button id='pal-hide-${id}' class='col btn btn-secondary mr-3 ml-1 mt-1' onClick='toggleActiveSkills(${id})'>Show Active Skills</button>` +
    `</div></td>`;

  // Add the control row to the form
  table.appendChild(ctrl);

  // Populate the species drop-down
  populateSpeciesDropdown(speciesId);

  // Loop over move drop-downs
  for (let i = 1; i <= 3; i++) {
    // Populate the move drop-down
    populateElementsDropdown(`pal-${id}-skill-${i}`);
  }

  // Hide the moves from the form to save space by default
  toggleActiveSkills(id);

  // If a pokemon set  is
  // provided in the arguments
  if (set) {
    // Import it into the row
    importPal(set, id);
  } else {
    // Set to default
    setPal(id);
  }
}

// removePal(id: int): void
// Removes the Pal selection tab from the window
function removePal(id) {
  // Remove the related elements from the form
  document.getElementById("pal-" + id + "-info").remove();
  document.getElementById("pal-" + id + "-active-skills").remove();
  document.getElementById("pal-" + id + "-ctrl").remove();

  // Update the table
  update();
}

// Hides the selected pokemon tab from the form to save space
function hideActiveSkills(id) {
  // Hide the moves display of the pokemon
  document.getElementById("pal-" + id + "-active-skills").style.display =
    "none";

  // Update the hide-active-skillss button to be a show-active-skillss button
  let toggle = document.getElementById("pal-hide-" + id);

  // Set the display text on the button
  toggle.innerHTML = "Show Skills";
}

// Shows the selected pokemon tab on the form
function showActiveSkills(id) {
  // Hide the moves display of the pokemon
  document.getElementById("pal-" + id + "-active-skills").style.display =
    "table-row";

  // Update the hide-active-skillss button to be a show-active-skillss button
  let toggle = document.getElementById("pal-hide-" + id);

  // Set the display text on the button
  toggle.innerHTML = "Hide Skills";
}

// toggleActiveSkills(id: int): void
// Depending on the current style
function toggleActiveSkills(id) {
  // Dereference the move control tab
  let elem = document.getElementById("pal-" + id + "-active-skills");

  // If the element is currently hidden
  if (elem.style.display == "none") {
    // Run the display routine
    showActiveSkills(id);
  } // Element is currently displayed
  else {
    // Run the hide routine
    hideActiveSkills(id);
  }
}

// Given an (image) element, verify
// that the image has been rendered
// successfully.
function verifySprite(img) {
  // If image failed to load,
  // naturalWidth will be zero.
  if (img.naturalWidth === 0) {
    return false;
  }

  // No other way of checking: assume it’s ok.
  return true;
}

// Given a pokemon id, (attempt to)
// update the sprite displayed in
// the sprite box for the given pokemon.
function setSprite(id) {
  // Dereference the sprite object for the pokemon
  let sprite = document.getElementById(`pal-${id}-sprite`);

  // Get the species for the Pokemon with the given id, converted to lower case
  const speciesId = document.getElementById("pal-species-" + id).value;

  // Convert the species to lower case
  const speciesLower = speciesId.toLowerCase();

  // Find the species in the pokedex entry
  const speciesData = PALDEX[speciesLower];

  // If the search was successful
  if (speciesData) {
    // Generate the sprite reference
    const speciesSprite = sanitiseSprite(speciesData.species);

    // Generate the filename
    let filename = `img/pal/${speciesSprite}.png`;

    // Set the sprite source to the generated image name
    sprite.src = filename;

    // If the sprite is verified successfully
    if (verifySprite(speciesSprite)) {
      // Script has worked as expected, return true
      return true;
    }
  }

  // False indicates sprite was not set properly
  return false;
}

// Given a list of types, returns the defensive values
// Which should be inserted into the display table.
function getTableDefensive(elements) {
  // Generate default map
  const map = getMap(Object.keys(ELEMENTS).length, 5);

  // Loop over the elements
  for(const element of elements) {
  
    // Get the defensive coverage for the element
    const coverage = getCoverage(element);

    // Loop over the element keys
    for(const key in coverage) {
      // Get the index of the element in the table keys
      const index = Object.keys(ELEMENTS).indexOf(key);

      // Add the resistance to the table
      map[index][(2 - coverage[key])]++;
    }
  }

  // Return map
  return map;
}

function setTableDefensive() {
  document.active = 0;

  document.getElementById("option-defensive").className = "bg-secondary";
  document.getElementById("option-offensive").className = "bg-dark";
  document.getElementById("option-skills").className = "bg-dark";

  loadElements();
  update();
}

function getTableOffensive(elements) {
  // Generate default map
  const map = getMap(Object.keys(ELEMENTS).length, 5);

  // TODO

  // Return map
  return map;
}

function setTableOffensive() {
  document.active = 1;

  document.getElementById("option-defensive").className = "bg-dark";
  document.getElementById("option-offensive").className = "bg-secondary";
  document.getElementById("option-skills").className = "bg-dark";

  loadElements();
  update();
}

function getTableSkills(skills) {
    // Generate default map
    const map = getMap(SKILLS.length, 5);

    // TODO
  
    // Return map
    return map;
}

function setTableSkills() {
  document.active = 2;

  document.getElementById("option-defensive").className = "bg-dark";
  document.getElementById("option-offensive").className = "bg-dark";
  document.getElementById("option-skills").className = "bg-secondary";

  loadSkills();
  update();
}

function evaluateRow(row) {
  // ROW INDEXES:
  // 0: 4x resists
  // 1: 2x resists
  // 2: neutrals
  // 3: 2x weaks
  // 4: 4x weaks
  // 5: rating

  // This will serve as
  // a mathematical rating
  // for how good your coverage
  // for the given type is.

  // Weights:
  // 4x resists and immunities add 2, regular resists add 1
  // 4x weaks remove 2, regular weaks remove 1
  // neutral hits neither add nor remove anything

  // Switch on active page
  switch (document.active) {
    case 0: { // Defensive
      return (((row[0] * 2) + row[1]) - (row[3] + (row[4] * 2)));
    };
    case 1: { // Offensive
      return -(((row[0] * 2) + row[1]) - (row[3] + (row[4] * 2)));
    };
    case 2: { // Skills
      return (2 - (row[1] + (row[2] * 2) + (row[3] * 3) + (row[4] * 4)));
    }
  }

  return 0; // Default Rating
}

// Given a map (list[]) object generated by the offensive
// or defensive table generation functions, inserts the
// values into the display table on the page.
function populateTable(map) {
  // iterate over map 'x'
  for (let i = 0; i < map.length; i++) {
    // Iterate over map 'y'
    for (let j = 0; j < map[i].length; j++) {
      // Dereference the row on the table
      document.getElementById(i + "-" + j).innerHTML = map[i][j];
    }

    // Get a mathematical rating of the row
    let rating =
      document.active == 0 ? evaluateRow(map[i]) : -evaluateRow(map[i]);

    // Dereference the row we are looking at
    const elemRow = document.getElementById("row-" + i);

    // Dereference row element containing the rating
    const elemRating = document.getElementById(i + "-rating");

    // If the rating is greater than or equal to two
    // Meaning that, we have 2 or more resistances than weaknesses
    if (rating >= 2) {
      // Very good coverage
      elemRating.innerHTML = "Very Good";

      // Row background dark green
      elemRow.style[`background-color`] = getColor("verygood");
    }

    // If we have one more resistance than weaknesses
    else if (rating > 0) {
      // Good coverage
      elemRating.innerHTML = "Good";

      // Row background light green
      elemRow.style[`background-color`] = getColor("good");
    }

    // If we have the same number of weaknesses and resistances
    else if (rating == 0) {
      // Even coverage
      elemRating.innerHTML = "Even";

      // Row background white
      elemRow.style[`background-color`] = getColor("neutral");
    }

    // If we have 2 or more weaknesses than resistances
    else if (rating <= -2) {
      // Very poor coverage
      elemRating.innerHTML = "Very Poor";

      // Row background dark red
      elemRow.style[`background-color`] = getColor("verybad");
    }

    // If we have one more weakness than resistances
    else if (rating < 0) {
      // Poor Coverage
      elemRating.innerHTML = "Poor";

      // Row background light red
      elemRow.style[`background-color`] = getColor("bad");
    }

    // Unknown Rating
    else {
      // No coverage
      elemRating.innerHTML = "Not Calculated";

      // Row background white
      elemRow.style[`background-color`] = getColor("neutral");
    }
  }
}

function update(id = null) {
  // If the given id is null or undefined
  if (id == null || id == undefined) {
    // No need to update sprites
  } else {
    // Attempt to update sprite
    setSprite(id);
  }

  // Array of base skills
  document.skillsList = {};

  // Array of pal elements
  document.elementList = [];

  // Array of active skill types
  document.activeSkillsList = [];

  // Iterate over all of the elements which start with 'pal-species-'
  document
    .querySelectorAll(`*[id*='pal-species-']`)
    .forEach(function (element) {
      // Dereference the ID Value of the species
      const id = element.id.split("pal-species-")[1];

      // Get the amount of pals which should be added
      const amount = document.getElementById('pal-amount-' + id).value;

      // Convert the species to lower case
      const speciesLower = element.value.toLowerCase();

      // Find the species in the pokedex entry
      const speciesData = PALDEX[speciesLower];

      // Species found
      if (speciesData) {

        // Loop 'amount' times
        for (let i = 0; i < amount; i++) {
          // Add the type combination to the list of types
          document.elementList.push(speciesData.element);

          // Add the pal skills to the list of skills
          for (const skill in speciesData.skills) {
            // If the skill is already in the skills list
            if (Object.keys(document.skillsList).includes(skill)) {
              // Add the level to the existing skills list
              document.skillsList[skill].push(speciesData.skills[skill]);
            }
            else // Skill is not in the skills list
            {
              // Create a new array for the skill, including the new level
              document.skillsList[skill] = [speciesData.skills[skill]];
            }
          }

          // Add active skill elements
          for (let j = 1; j <= 3; j++) {
            const activeSkill = document.getElementById(`pal-${id}-skill-${j}`).value;

            // Add active skill, if not none
            if (activeSkill != 'none') {
              document.activeSkillsList.push(activeSkill);
            }
          }
        }

      } else {
        console.warn(`Warning: Species '${speciesLower}' not found!`);
      }
    });

  switch (document.active) {
    case 0:
      {
        // Defensive Table
        // Populate the displayed table using the defensive data

        document.defense = getTableDefensive(document.elementList);
        populateTable(document.defense);
      }
      break;
    case 1:
      {
        // Offensive Table
        // Populate the displayed table using the offensive data

        document.offense = getTableOffensive(document.activeSkillsList);
        populateTable(document.offense);
      }
      break;
    case 2:
      {
        // Skill Table
        // Populate the displayed table using the skills data

        document.skills = getTableSkills(document.skillsList);
        populateTable(document.skills);
      }
      break;
  }
}

// --- Program Variables --- //

// 2D Array for building the defensive calculations table
// Empty / undefined by default, is built during update
document.defense = null;

// 2D Array for building the offensive calculations table
// Empty / undefined by default, is built during update
document.offense = null;

// 2D Array for building the skills calculations table
// Empty / undefined by default, is built during update
document.skills = null;

// Specifies which table is active
// 0: Defense, 1: Offense, 2: Skills
document.active = 0;

// Number of pals in the page
// Used for generating pal id
document.palCount = 0;

// --- Run Startup Scripts --- //

// Set the active table to the defenses table
setTableDefensive();
