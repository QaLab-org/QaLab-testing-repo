const fs = require('fs');
const xml2js = require("xml2js");
const parseString = require('xml2js').parseString;
const builder = require('xml2js').Builder;

const xmlFilePath = 'test-results/cucumber-report.xml';

const REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const author = process.env.GITHUB_TRIGGERING_ACTOR;
const triggeringEvent = process.env.GITHUB_EVENT_NAME;

console.log('REPOSITORY_OWNER: ', REPOSITORY_OWNER);
console.log('GITHUB_REPOSITORY: ', GITHUB_REPOSITORY);
console.log('author: ', author);

function modifyXML(xmlContent) {
    parseString(xmlContent, (err, result) => {
        if (err) {
            console.error('Error parsing the XML:', err);
            return;
        }

        const testcases = result.testsuite.testcase;

        for (const testcase of testcases) {
            const testName = testcase.$.name;
            const steps = testcase['system-out'][0].split('\n').filter(step => step.trim() !== '');

            const properties = {
                property: steps.map(step => ({
                    '$': {
                        name: `step[${step.includes('failed') ? 'failure' : step.includes('skipped') ? 'skipped' : 'passed'}]`,
                        value: step.replace(/^\S+\s/, '').replace(/\.{3,}.*$/, '.'),
                    }
                }))
            };

            if (testcase.failure) {
                const attachmentLink = `[[ATTACHMENT|/e2e-tests/screenshots/${testName}.png]]`;
                const testMoAttachmentLink = `https://github.com/${process.env.GITHUB_REPOSITORY}/blob/gh-pages/e2e-tests/screenshots/${encodeURIComponent(testName)}.png`;
                testcase['system-out'][0] = `${attachmentLink}\n${testcase['system-out'][0]}`;
                properties.property.push({ '$': { name: 'url:screenshot', value: testMoAttachmentLink } });
                properties.property.push({ '$': { name: 'attachment', value: testMoAttachmentLink } });
                properties.property.push({ '$': { name: 'Event', value: triggeringEvent } });
                properties.property.push({ '$': { name: 'Author', value: author } });
            }

            testcase.properties = properties;
        }

        const xmlBuilder = new builder();
        const modifiedXML = xmlBuilder.buildObject(result);

        fs.writeFile(xmlFilePath, modifiedXML, 'utf8', (err) => {
            if (err) {
                console.error('Error writing the modified XML file:', err);
                return;
            }

            console.log('XML file successfully modified.');
        });
    });

    const xml2js = require('xml2js');

    const inputFile = 'test-results/cucumber-report.xml';
    const outputFile = 'test-results/testmo-report.xml';

    fs.readFile(inputFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the XML file:', err);
            return;
        }

        xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                return;
            }

            traverseAndRemoveSystemOut(result);

            const builder = new xml2js.Builder();
            const modifiedXml = builder.buildObject(result);

            fs.writeFile(outputFile, modifiedXml, (writeErr) => {
                if (writeErr) {
                    console.error('Error writing the modified XML to a file:', writeErr);
                } else {
                    console.log('Modified XML saved to', outputFile);
                }
            });
        });
    });

    function traverseAndRemoveSystemOut(obj) {
        if (obj instanceof Array) {
            for (let i in obj) {
                traverseAndRemoveSystemOut(obj[i]);
            }
        } else if (typeof obj === 'object') {
            for (let prop in obj) {
                if (prop === 'system-out') {
                    delete obj[prop];
                } else {
                    traverseAndRemoveSystemOut(obj[prop]);
                }
            }
        }
    }
}

fs.readFile(xmlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the XML file:', err);
        return;
    }

    modifyXML(data);
});
