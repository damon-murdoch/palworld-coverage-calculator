# Effectiveness Values
# Define effectiveness values for type matchups.
EFFECTIVENESS = {
    -2: "very strong",
    -1: "strong",
    -0: "neutral",
    1: "weak",
    2: "very weak",
}

# Effectiveness Table
# Define type matchups: which types are effective against or resistant to others.
# Each type is also resistant to itself.
TYPES = {
    "water": ["fire"],
    "fire": ["grass", "ice"],
    "grass": ["ground"],
    "ground": ["electric"],
    "electric": ["water"],
    "ice": ["dragon"],
    "dragon": ["dark"],
    "dark": ["neutral"],
    "neutral": [],
}

# Single-Type Functions
# Function to get weaknesses of a given type.
def get_type_weaknesses(type):
    weaknesses = []
    for otherType in TYPES:
        if type in TYPES[otherType]:
            weaknesses.append(otherType)
    return weaknesses

# Function to get resistances of a given type.
def get_type_resistances(type):
    resistances = []
    for resistance in TYPES[type]:
        resistances.append(resistance)
    resistances.append(type)  # Each type is resistant to itself.
    return resistances

# Multi-Type Functions
# Function to get weaknesses of multiple types combined.
def get_weaknesses(types: [str]):
    weaknesses = {}
    for type in types:
        type_weaknesses = get_type_weaknesses(type)
        for type_weakness in type_weaknesses:
            if type_weakness in weaknesses:
                weaknesses[type_weakness] += 1
            else: 
                weaknesses[type_weakness] = 1
    return weaknesses

# Function to get resistances of multiple types combined.
def get_resistances(types: [str]):
    resistances = {}
    for type in types:
        type_resistances = get_type_resistances(type)
        for type_resistance in type_resistances:
            if type_resistance in resistances:
                resistances[type_resistance] += 1
            else: 
                resistances[type_resistance] = 1
    return resistances

# Function to calculate coverage based on types' weaknesses and resistances.
def get_coverage(types: [str]):

    coverage = {}

    # Initialize coverage with neutral values for all types.
    for type in TYPES:
        coverage[type] = 0 # Neutral

    # Calculate weaknesses and subtract from coverage.
    weaknesses = get_weaknesses(types)
    for weakness in weaknesses:
        coverage[weakness] -= weaknesses[weakness]

    # Calculate resistances and add to coverage.
    resistances = get_resistances(types)
    for resistance in resistances:
        coverage[resistance] += resistances[resistance]

    return coverage

# Function to calculate the coverage score based on coverage dictionary.
def get_coverage_score(coverage: dict):

    score = 0

    # Sum up coverage values.
    for type in coverage:
        score += coverage[type]

    return score

# Function to represent coverage dictionary as a string.
def get_coverage_str(coverage: dict):

    str = []

    # Generate strings for each type's coverage value.
    for type in coverage: 
        str.append(f"{type}: {coverage[type]}")

    return ", ".join(str)
