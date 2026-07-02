---
name: content-population
description: Populate the page with content based on the provided image and content types.
agent: agent
model: Auto (copilot)
---
1. Add content types created in previous step to the page’s outline layout.
2. Extract text from the provided image:
		If text is not visible, use placeholder text.
		Leave image fields empty.
3. Content rules:
		- Content must be added via composition.nodes.
		- Do NOT add as child content items.
		- Only composition nodes drive rendering.
		- Patch composition nodes on a DRAFT page, then publish the page and content.