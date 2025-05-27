class Skill {
    constructor(name, category, level, description) {
        this.name = name;
        this.category = category;
        this.level = level;
        this.description = description;
    }

    // Getters and Setters

    get getName() {
        return this.name;
    }

    get getCategory() {
        return this.category;
    }

    get getLevel() {
        return this.level;
    }

    get getDescription() {
        return this.description;
    }

    set setName(name) {
        this.name = name;
    }

    set setCategory(category) {
        this.category = category;
    }

    set setLevel(level) {
        this.level = level;
    }

    set setDescription(description) {
        this.description = description;
    }

    // Methods
    toString() {
        return `Skill: ${this.name}, Type: ${this.type}, Level: ${this.level}, Description: ${this.description}`;
    }
    static fromJSON(json) {
        return new Skill(json.name, json.type, json.level, json.description);
    }

    toJSON() {
        return {
            name: this.name,
            type: this.type,
            level: this.level,
            description: this.description,
        };
    }

    static validate(skill) {
        if (!skill.name || !skill.type || !skill.level || !skill.description) {
            throw new Error("All fields are required.");
        }
        if (
            typeof skill.name !== "string" ||
            typeof skill.type !== "string" ||
            typeof skill.level !== "number" ||
            typeof skill.description !== "string"
        ) {
            throw new Error("Invalid data types.");
        }
    }
}
