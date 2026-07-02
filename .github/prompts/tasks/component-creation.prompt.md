---
name: component-creation
description: Create Optimizely components based on the provided Excel sheet and image.
agent: agent
model: Auto (copilot)
---
Iterate below task for Each Component where Should Create? = Yes in the Excel sheet.

1. Create Content Types
	- For each component marked Yes:
	- Find the Excel sheet with the exact component name.
	- Read its contents.
	- Create an Optimizely Block Content Type. [Excel sheet could have multiple content type definitions (parent-child case), create content type for each definition]
	- Include only fields marked as “Accept”.
	- Update content type settings:
			Enable “Available for composition in Visual Builder” setting.
			Ensure Section checkbox is selected.
2. Frontend Component Development
	- Build the corresponding frontend component.
	- Ensure styling and theme exactly match the image section.
	- Use the component name from the Excel sheet as the frontend component name.
	- Add fallback image for each image field in the component to handle cases where the image might not be available in Optimizely. We can use https://placehold.co/{width}x{heigth} as a placeholder image where width and height should match the dimensions of section in provided image.
					
					