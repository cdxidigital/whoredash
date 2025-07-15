# Whoredash - Premium Companion Booking Platform

## Overview
A comprehensive full-stack companion booking platform built with React, TypeScript, Express, and PostgreSQL. Features complete authentication, database integration, and a DoorDash-style interface with dynamic category switching.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state

## Database Schema
- **users**: Stores authenticated user data with Replit Auth integration
- **companions**: Professional companion profiles with verification status
- **bookings**: Booking transactions with client/companion relationships
- **reviews**: Rating and feedback system
- **testimonials**: Featured client testimonials
- **sessions**: Session storage for authentication

## Authentication System
- Full Replit Auth integration with OpenID Connect
- Protected routes with authentication middleware
- User session management with PostgreSQL storage
- Role-based access control (client, companion, admin)
- Automatic user upsert on login

## Key Features
- Dynamic category switching (female/male/trans) with distinct branding
- Comprehensive companion profiles with verification badges
- Transparent pricing information and booking flow
- Real-time authentication status in header
- Error boundary for graceful error handling
- SEO optimization with Open Graph metadata

## Recent Changes
- **2024-12-31**: Complete database integration with PostgreSQL
- **2024-12-31**: Full authentication system implementation with Replit Auth
- **2024-12-31**: Database schema migration and sample data population
- **2024-12-31**: Frontend authentication hooks and protected routes
- **2024-12-31**: Header authentication UI with user dropdown

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `REPL_ID`: Replit application ID
- `REPLIT_DOMAINS`: Allowed domains for authentication

## User Preferences
- Focus on production-ready implementation
- Prioritize security and data integrity
- Maintain consistent TypeScript typing
- Use modern React patterns and hooks