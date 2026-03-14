# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a delivery service agent system built on the nanobot framework. The system is designed to provide intelligent support for field implementation personnel by creating an AI-powered delivery agent that answers questions, provides guided diagnosis, and enables escalation to human support. The system integrates with Feishu (Lark) knowledge base via MCP (Model Context Protocol) for real-time document retrieval, and provides mobile-friendly interaction through H5 pages.

The project consists of:
- A backend service built on nanobot framework (Go + Svelte 5 frontend)
- An H5 mobile-friendly frontend application
- Feishu MCP integration for document retrieval
- User authentication system with phone number/password
- Conversation management with history and cleanup

## Architecture

The system follows the nanobot architecture pattern with the following components:

### Backend (nanobot)
- Located at /Users/jokeoops/Projects/nanobot (linked as ./backend)
- Built with Go (backend) and Svelte 5 + TypeScript (frontend UI)
- Uses MCP (Model Context Protocol) to connect to external services
- Integrates with Feishu API for document search and messaging
- Supports various LLM providers (OpenAI, Anthropic, etc.)

### Frontend
- H5 mobile-friendly interface (located in ./frontend/)
- Designed for field personnel mobile access
- WebSocket-based real-time communication
- User authentication and session management

### Key Services
- User authentication: Phone number + password with JWT tokens
- FAQ Q&A: Natural language questions answered via Feishu document search
- Guided diagnosis: Step-by-step problem diagnosis flows
- Escalation: Transfer to human support when needed
- Conversation management: Session history with 7-day automatic cleanup

## Build and Development Commands

### Backend (nanobot)
```bash
# Build the nanobot binary (includes UI compilation)
cd backend && make

# Run nanobot with a configuration file
cd backend && ./bin/nanobot run ./nanobot.yaml

# Run Go tests
cd backend && go test ./...

# Format Go code
cd backend && gofmt -w .
```

### Frontend Development
```bash
# The frontend is located in the frontend directory
cd frontend/

# Note: Specific frontend build commands are TBD based on the actual implementation
# (The frontend directory appears to be empty currently)
```

## Configuration Structure

The project follows OpenSpec methodology for change management, with specifications located in `openspec/changes/delivery-agent-nanobot/`. This includes:

- `proposal.md` - High-level feature proposal and capabilities
- `design.md` - System design decisions and architecture
- `specs/` directory - Detailed specifications for each capability:
  - `faq-qa/` - FAQ question and answer system
  - `user-auth/` - User authentication system
  - `conversation-mgmt/` - Conversation management
  - `guided-diagnosis/` - Guided diagnosis flows
  - `escalation/` - Escalation to human support
- `tasks.md` - Complete implementation roadmap

## Key Technologies and Dependencies

- **nanobot framework**: Standalone MCP (Model Context Protocol) host for AI agents
- **Feishu MCP integration**: Real-time document search and retrieval from Feishu knowledge base
- **JWT authentication**: Secure user authentication with phone number/password
- **Redis**: Session state management and caching
- **WebSocket**: Real-time communication for chat interface
- **Mobile-first H5**: Responsive interface optimized for field personnel

## Development Workflow

This project uses the OpenSpec methodology for development:

1. **Change Identification**: New features and changes are documented as OpenSpec changes
2. **Proposal Phase**: High-level proposal with goals and capabilities
3. **Design Phase**: Architectural decisions and technical constraints
4. **Specification Phase**: Detailed requirements for each capability
5. **Implementation Phase**: Development following the specifications
6. **Verification Phase**: Validation against specifications
7. **Archival Phase**: Completion and documentation

## Key Directories and Files

- `openspec/changes/delivery-agent-nanobot/` - Complete specifications for the delivery agent
- `backend/` - Link to nanobot framework (Go + Svelte)
- `frontend/` - Mobile H5 interface
- `.claude/skills/` - Claude Code skills for OpenSpec workflow

## Security and Compliance

- All conversations are secured with JWT authentication
- Phone number/password authentication with encrypted password storage
- 7-day automatic conversation cleanup to control storage costs
- Access limited to authenticated field personnel
- Session management with automatic expiration

## Important Files to Reference

- `/openspec/changes/delivery-agent-nanobot/proposal.md` - High-level capabilities
- `/openspec/changes/delivery-agent-nanobot/design.md` - Architectural decisions
- `/openspec/changes/delivery-agent-nanobot/tasks.md` - Complete implementation tasks
- Individual spec files in `/openspec/changes/delivery-agent-nanobot/specs/` for detailed requirements