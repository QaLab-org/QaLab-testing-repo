const fs = require('fs');
const path = require('path');

const featureFileName = 'saucedemo.feature';
const baseName = path.basename(featureFileName, '.feature');
const tsFileName = `${baseName}.ts`;

const stepsDirectory = path.join(__dirname, '..', 'steps');

if (!fs.existsSync(stepsDirectory)) {
    fs.mkdirSync(stepsDirectory);
}

const featureContent = fs.readFileSync(featureFileName, 'utf-8');

const stepRegex = /(Given|When|Then|And)\s(.*)/g;
const steps = [];
const definedSteps = new Set();
let previousStepType = '';

let match;
while ((match = stepRegex.exec(featureContent)) !== null) {
    let stepType = match[1];
    let stepDescription = match[2].trim();

    if (stepType === 'And') {
        stepType = previousStepType === 'When' ? 'When' : 'Then';
    }

    let stepKey = `${stepType} ${stepDescription}`;

    // Check if the step is already defined in existing .ts files
    let stepAlreadyDefined = false;
    const tsFiles = fs.readdirSync(stepsDirectory);
    for (const tsFile of tsFiles) {
        const tsContent = fs.readFileSync(path.join(stepsDirectory, tsFile), 'utf-8');
        if (tsContent.includes(`"${stepDescription}"`)) {
            stepAlreadyDefined = true;
            break;
        }
    }

    if (!stepAlreadyDefined && !definedSteps.has(stepKey)) {
        const parameterMatches = stepDescription.match(/("[^"]+"|<[^>]+>)/g);

        if (parameterMatches) {
            const parameters = parameterMatches.map((param, index) => `valueString${index + 1}: string`).join(', ');
            stepDescription = stepDescription.replace(/("[^"]+"|<[^>]+>)/g, '{string}');
            steps.push({
                type: stepType,
                description: stepDescription,
                parameters,
            });
        } else {
            steps.push({
                type: stepType,
                description: stepDescription,
                parameters: '',
            });
        }

        definedSteps.add(stepKey);
    }

    previousStepType = stepType;
}

const tsContent = `import { When, Then, Given } from "@cucumber/cucumber";

${steps.map((step, index) => `
${step.type}("${step.description}", async (${step.parameters}): Promise<void> => {
  // Implement your step here
});`).join('\n')}`;

const tsFilePath = path.join(stepsDirectory, tsFileName);

fs.writeFileSync(tsFilePath, tsContent);

console.log(`Generated ${tsFileName} file with steps in 'steps' directory.`);
