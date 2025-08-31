# Producer Dashboard Components

This directory contains modular components for the Producer Dashboard, each handling a specific section of the dashboard functionality.

## Components Overview

### 1. ProducerOverview
- **File**: `ProducerOverview.tsx`
- **Purpose**: Main dashboard overview with KPIs, quick actions, AI subsidy recommendations, market intelligence, production facilities, and risk assessment
- **Features**:
  - Key Performance Indicators (KPIs)
  - Quick action buttons
  - AI-powered subsidy recommendations
  - Real-time market intelligence
  - Production facilities overview
  - Risk assessment display

### 2. ProductionDashboard
- **File**: `ProductionDashboard.tsx`
- **Purpose**: Detailed production analytics and facility management
- **Features**:
  - Production overview cards (capacity, utilization, output)
  - Detailed production facilities table
  - Technology and capacity information
  - Operational status tracking

### 3. SubsidiesDashboard
- **File**: `SubsidiesDashboard.tsx`
- **Purpose**: AI-powered subsidy recommendations and applications
- **Features**:
  - Detailed subsidy recommendations
  - Match scoring system
  - Eligibility reasoning
  - Application deadlines
  - Direct application links

### 4. AnalyticsDashboard
- **File**: `AnalyticsDashboard.tsx`
- **Purpose**: Financial analytics and ROA (Return on Assets) calculations
- **Features**:
  - ROA calculator for each project
  - Financial projections
  - Market assumptions
  - Performance metrics (IRR, NPV, Payback Period)

### 5. CertificatesDashboard
- **File**: `CertificatesDashboard.tsx`
- **Purpose**: Green hydrogen certificates (NFTs) management
- **Features**:
  - Certificate portfolio display
  - Verification status tracking
  - Carbon intensity information
  - Certificate creation workflow

### 6. MapDashboard
- **File**: `MapDashboard.tsx`
- **Purpose**: Geographic visualization of production facilities
- **Features**:
  - Interactive map interface
  - Regional facility overview
  - Capacity and status information
  - Geographic distribution insights

## Data Types

All components use shared type definitions from:
- `@/types/dashboard.ts` - Dashboard-specific types
- `@/types/project.ts` - Project-related types
- `@/types/company.ts` - Company-related types

## Features Implemented

Based on the feature screenshot provided, the dashboard includes:

✅ **AI Subsidy Recommendation** - Smart matching of available subsidies to producer profile
✅ **Real-time Market Intelligence** - Live H₂ pricing and market trends
✅ **ROA Calculator (Profitability)** - Financial return calculations
✅ **Risk Scoring for Producer** - Comprehensive risk assessment
✅ **Green H2 Certificates (NFTs)** - Digital certificate management
✅ **Region-wise Live Map** - Geographic facility visualization
✅ **Subsidy Benefits for Consumers** - Information on consumer benefits

## Usage

Import components individually:
```typescript
import ProducerOverview from '@/components/producer-dashboard/ProducerOverview';
```

Or use the index file:
```typescript
import { ProducerOverview, ProductionDashboard } from '@/components/producer-dashboard';
```

## Props Interface

Each component accepts:
- Relevant data props (projects, subsidies, stats, etc.)
- `setActiveView` function to handle navigation between dashboard views

## Responsive Design

All components are built with responsive design principles:
- Mobile-first approach
- Tailwind CSS responsive utilities
- Flexible grid layouts
- Touch-friendly interactions

## Future Enhancements

- Real-time data integration with backend APIs
- Advanced charting and visualization
- Export functionality for reports
- Advanced filtering and search capabilities
- Integration with external market data sources
