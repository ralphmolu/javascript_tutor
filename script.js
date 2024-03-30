//dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');

//Create and store a wrapper for the OpenAi package along with basic config
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0, // values range from 0 - 1. 0 is higher precision (choose the most likely next word every time) and less creativity whilst 1 is lower precision and higher variation and creativity
    model: 'gpt-3.5-turbo'
});

console.log({ model });

const promptFunc = async (input) => {
    try {
        const res = await model.call(input);
        console.log(res);
    }
    catch (err) {
        console.error(err);
    }
};

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