---
name: create-basic-excel
description: This prompt is used to create a basic Excel file with a predefined structure.
agent: agent
model: Claude Opus 4.6
---

1. Create a new Excel file at: /.ai/MCP-Generated.xlsx. Delete existing excel file, if present.
2. Read /.ai/MCP-Generated.xlsx.
3. Insert a new sheet named "Page Detail" as the first sheet.
4. Add the following rows:
		- key= Generate a random unique key (e.g. 019003fe597f70c8b9b5f6231c74ed96)
		- New Page Name
		- Page Type = BlankExperience
		- Locale
		- Container
		- displayName
		- OpenGraph Type = Undefined
5. Make it more readable by applying the following formatting:
		- Set the header row (first row) to bold.
		- Auto-fit the column widths to match the content.
6. Save the file.