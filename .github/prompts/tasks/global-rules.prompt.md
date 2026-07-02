---
name: global-rules
description: This prompt defines the global rules that must be followed during the execution of tasks in the component scaffolding process.
agent: agent
model: Auto (copilot)
---
1. All new content types, content, and frontend components must begin with "shops_".
2. Do not assume functionality unless it is explicitly stated.
3. Always refer /.ai/.system/learning.txt file for common issue while execution.
4. Execution must be done sequentially as mentioned in the tasks. Do not jump to next task without completing the previous one.
5. Format the excel file to make it more readable, such as bolding the header row, adjusting column widths, applying colors, and applying cell borders.
6. if there is parent-child relationship between the components, than only add parent component in "component detail" sheet and add only one sheet for parent component but  manage parent and child content type in same parent sheet. Do not create separate sheet for child component. 
7. use .ai/.temp/ folder to save any temporary file during execution and delete it after use.