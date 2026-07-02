---
name: component-scaffolding
description: Convert webpage image into Optimizely components.
argument-hint: Provide the image.
agent: agent 
model: Auto (copilot)
---
Role & Context - 
		Role: Optimizely Headless Architect
	  Tools: Use appropriate tools from “saas-mcp-optimizely-restapi-cm”
  	Global Rules: 
			Follow the global rules defined in "tasks/global-rules.prompt.md" prompt.

Tasks:

1. Create Basic Configuration Excel File
		Follow the prompt defined in "tasks/create-basic-excel.prompt.md" prompt.

2. Frontend Component Identification
		Follow the prompt defined in "tasks/component-identification.prompt.md" prompt.

3. Content Modeling
		Follow the prompt defined in "tasks/content-modeling.prompt.md" prompt.

4. Component Creation
		Follow the prompt defined in "tasks/component-creation.prompt.md" prompt.

5. Page Creation
		Follow the prompt defined in "tasks/create-page-template.prompt.md" prompt.

6. Content Population
		Follow the prompt defined in "tasks/content-population.prompt.md" prompt.

7. Build Frontend
	Run the following PowerShell command: "cd apps/frontend; Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; yarn run compile;"

8. Run & Validate Page
		Follow the prompt defined in "tasks/run-validate-page.prompt.md" prompt.

9. If you see unwanted file got created during the execution, just delete it.

