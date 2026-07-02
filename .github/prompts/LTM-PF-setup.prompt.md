---
name: LTM-PF-setup-accelerator
description: Initial setup of accelerator for a new project.
argument-hint: No arguments needed. Just run the prompt to set up the accelerator.
agent: agent 
model: Auto (copilot)
---
1. Create .ai folder in root directory if not present.
2. Add entry of .ai folder in .gitignore file.
3. Create .system and .temp folder in .ai directory if not present.
4. Create learning.txt file in .ai/.system folder to add any learning or common issue while execution.
5. Create frontend.md file in .ai/.system/ folder to add any learning related to frontend.
6. create .example folder in .ai/ directory if not present.
7. install 'npm install exceljs' to read and write excel file.
8. Frontend Solution Understanding
        Follow the prompt defined in "tasks/setup/existing-frontend-analysis.prompt.md" prompt.
