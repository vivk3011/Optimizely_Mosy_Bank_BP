---
name: content-modeling
description: This prompt is used to suggest content models in Optimizely based on the component sheet from the generated Excel file.
agent: agent
model: Auto (copilot)
---
1. Read the component sheet from /.ai/MCP-Generated.xlsx.
2. For each component where Should Create? = Yes:
		- Suggest an Optimizely Block Content Type.
		- if component has similar element structure than, create parent-child structure. for example - 		carousal (Parent content type) and it's slides (Child content type). parent should have field which should allow multiple child content type.
		- In case pf parent-child structure, we dont need to have sepearte sheet for child content type. just add the content type in seperate table in the same sheet with parent content type.
		- Add a new Excel sheet named the same as the component name.
		- Populate the sheet with:
				Field Name
				Field Type
				Field Purpose
				Decision (Accept / Reject / Modify) [this columns should appear as dropdown with value]
				Comment
3. Save the file at the same location.
4. Make it more robust by adding any other necessary information which you think is required for content modeling.
5. Make it more readable by formatting the excel with proper font size, color and cell size.
6. Ask for user confirmation before proceeding to the next step. 
7. User may update the excel as per requirement. Use the user updated excel for next step.