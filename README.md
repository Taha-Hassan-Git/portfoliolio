# Portfoliolio [Work in Progress] 

A ChatGPT powered web application that helps you write a portfolio for a level 4 software developer apprenticeship. It is intended to produce a starting point for future edits. A first draft. It also functions as a decent starting point for an essay-writing application, feel free to fork it and adapt it to whatever you need.

## How does it work?

The application takes a conversational-based approach to gathering information and uses it to structure and then write the sections of the portfolio. There are three main routes: plan, write and view. 
- ### Plan:
  - When planning the portfolio, the assistant will ask you general questions about where you work and what projects you've done, when it has enough info it will then output a plan for your portfolio along with KSBs mapped to each section.
- ### Write:
  - When writing the portfolio, if the plan for the portfolio exists, you can select the subsection you want to work on, and engage in a conversation with the assistant. It will ask more probing questions and try to make sure you demonstrate the KSBs the section requires. When it feels it has enough information it will output the content for that section.
- ### View:
  - This is the part of the application where you can review the content that has been generated and make any changes
 
## Making a contribution

Most features aren't yet fully-functional, feel free to fix something and push up a PR, I'd welcome the help.

## Getting Started

First clone the repo and install dependencies:

```bash
git clone https://github.com/Taha-Hassan-Git/portfoliolio
cd portfoliolio
npm i
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
