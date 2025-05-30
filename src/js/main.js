// Function to create a skill card
function createSkillCard(skill) {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.innerHTML += `
        <h3>${skill.name}</h3>
        p>${skill.level}</p>
        <p>${skill.description}</p>
        <p>${skill.tags}</p>
    `;
    return card;
}

async function skillsSectionComplete() {
    try {
        console.log("Fetching skills data...");

        const skillsUrl =
            "https://github.com/Ali-Sultann/Awep/blob/main/src/json/skills.json"; // Path to the JSON file
        // fetch the skills data from the JSON file using axios
        const response = await axios.get(skillsUrl);
        console.log("Response:", response);

        // let skills = response.data; // Assuming the JSON structure has a 'skills' array
        // console.log("Skills data:", skills);

        // Loop through the skills and create cards for each
        for (const skill of skills) {
            const card = createSkillCard(skill);
            document.querySelector("#skills").appendChild(card);
        }
    } catch (err) {
        console.error("Error in skillsSectionComplete:", err);
    }
}

skillsSectionComplete(); // Call the function to populate the skills section
