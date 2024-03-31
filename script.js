//dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
const { PromptTemplate } = require('langchain/prompts');
const { StructuredOutputParser } = require('langchain/output_parsers');

//Create and store a wrapper for the OpenAi package along with basic config
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0, // values range from 0 - 1. 0 is higher precision (choose the most likely next word every time) and less creativity whilst 1 is lower precision and higher variation and creativity
    model: 'gpt-3.5-turbo'
});

console.log({ model });

const promptFunc = async (input) => {
    try {
        //instantiate a new object "prompt" based on the promptTemplate class
        const prompt = new PromptTemplate({
            template: "You are a JavaScript expert and will answer the user's coding question as thoroughly as possible. \n{question}",
            inputVariables: ['question'],
            partialVariables: { format_instructions: formatInstructions }
        })
        const res = await model.call(input);
        console.log(await parser.parse(res));

        const promptInput = await prompt.format({
            question: input,
        });
    }
    catch (err) {
        console.error(err);
    }
};

const parser = StructuredOutputParser.fromNamesAndDescriptions({
    code: "JavaScript code that answers the user's questions",
    explanation: "detailed explanation of the example code provided",
})


const formatInstructions = parser.getFormatInstructions();

// initialization function that uses inquirer to prompt the user and return a promise. It takes the user input and passes it through the call method
const init = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
        }
    ])
    .then((inquirerResponse) => {
        promptFunc(inquirerResponse.name);
    });
}

// calls the initialization function and starts the script
init();