---
name: component-identification
description: This prompt is used to identify reusable UI components from a provided image and document them in an Excel file.
agent: agent
model: Claude Opus 4.6
---

As a Frontend Architect:

1. Identify all unique, reusable UI components from the provided image (exclude header and footer).
2. Prefer configurable components (alignment, color, spacing, layout) over visual duplicates.
3. Name components using React / Next.js naming conventions.
4. Output- 
		Create a new Excel sheet at second index in file /.ai/MCP-Generated.xlsx
		Sheet containing the following columns:
			Component Name
			Brief Visual Identifier / Hint
			Should Create? (Yes / No) [this columns should appear as dropdown with value]
5. Make it more readable by applying the following formatting:
		- Set the header row (first row) to bold.
		- Auto-fit the column widths to match the content.
6. Save the file.