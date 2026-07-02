---
name: create-page-template
description: This prompt is used to create a page template in Optimizely CMS using the details provided in an Excel file.
agent: agent
model: Auto (copilot)
---
1. Read the Page Detail sheet from /.ai/MCP-Generated.xlsx
2. Create a page using the provided details.
3. We have parent content id mentioned as container. create new page under that container.
4. Reference documentation:
		https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/create-content-and-a-page-using-the-api#create-a-page
5. Refer .ai/.system/learning.txt file for more details on how to use the tools effectively.
