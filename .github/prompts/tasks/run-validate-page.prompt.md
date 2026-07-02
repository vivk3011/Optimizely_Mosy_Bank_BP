---
name: run-validate-page
description: Run the dev server, access the page created in previous steps, and validate the rendering and styling against the provided image.
agent: agent
model: Auto (copilot)
---
1. Run the dev server on port 3003.
2. Access the page created in previous steps.
3. If runtime errors occur, fix them.
4. If the page returns 200 OK but renders empty, use below debug checklist first:
		a. Missing .component.graphql files
			Each CMS component folder must include: <ComponentName>.component.graphql and index.tsx
			The GraphQL fragment (e.g. DemoV1HeadlineBandData) is required for codegen.
			Missing fragments silently exclude data → empty render.
		b. Regenerate artifacts after changes - Rerun STEP 7
		c. Stop the server running on 3003 and rerun it.
5. Access the page and try to compare the styling of page and provided image. if there is any differences, than use provided image as reference and adjust created component style. if required, than override the base theme of layout.