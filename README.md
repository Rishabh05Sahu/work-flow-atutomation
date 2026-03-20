# Workflow Automation System

A full-stack workflow automation system built with Next.js, TypeScript, MongoDB, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- User authentication with JWT
- Create and update tasks
- Create automation workflows using:
  - IF Task Created → THEN Action
  - IF Task Updated → THEN Action
- Supported actions:
  - Log a message
  - Save an entry in database
- Automatic workflow execution logs
- Dashboard with overview stats, workflows, tasks, and logs

## Tech Stack

- Next.js
- TypeScript
- MongoDB + Mongoose
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Hook Form
- Zod
- JWT Authentication

## Folder Structure

Explain your app, components, lib, models, services, and workflow-engine folders.

## Workflow Logic

1. User creates a workflow with a trigger and action.
2. User creates or updates a task.
3. Task service calls the workflow execution engine.
4. Matching workflows are fetched by trigger and user.
5. Each workflow action is executed.
6. Execution result is stored in logs.

## Setup Instructions

1. Clone the repository
2. Install dependencies
3. Create `.env.local`
4. Add:
   - `MONGODB_URI=...`
   - `JWT_SECRET=...`
5. Run:
   ```bash
   npm install
   npm run dev