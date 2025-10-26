# W3rk - Professional Web3 Networking Platform

[![ASI Alliance](https://img.shields.io/badge/Powered%20by-ASI%20Alliance-96EA8C)]()
[![Hackathon](https://img.shields.io/badge/ASI%20Alliance-Hackathon-green)]()
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6)]()

> 🚀 **A decentralized professional networking platform powered by ASI Alliance technology**

W3rk is a revolutionary Web3 professional networking platform that combines real wallet integration, AI-powered career assistance, and decentralized storage to create the ultimate professional networking experience in the blockchain era.

## 🌟 Features

### 🔗 **Real Wallet Integration**
- **MetaMask** support for Ethereum and EVM chains
- **ASI Wallet** support for ASI Alliance network
- Session-based connection (data lost on page reload as intended)
- Real-time wallet status and balance display

### 🤖 **AI Career Assistant** 
- Conversational AI chat powered by ASI Alliance technology
- File attachment system with image preview capabilities
- Automatic social wall post generation
- Profile analysis and career recommendations
- Agentverse protocol simulation

### 👥 **Social Professional Network**
- Wallet-based user identification
- Real-time social wall with professional posts
- AI-powered profile analysis and insights
- Network growth tracking and analytics
- Professional skill assessments

### 📄 **CV Builder & IPFS Storage**
- Three-step CV creation process
- Decentralized storage on IPFS simulation
- Permanent, tamper-proof professional records
- Content-addressed storage with unique CIDs
- Wallet-linked professional credentials

### 🤖 **ASI Alliance Agent Network**
- **Profile Optimizer**: AI-driven profile analysis
- **Opportunity Matcher**: Job and project matching
- **Performance Analytics**: Network growth tracking
- **Reputation Guardian**: Professional reputation monitoring
- **Knowledge Curator**: MeTTa knowledge graph integration

### 🌐 **ASI Alliance Technology Stack**
- **Agentverse Protocol**: Decentralized agent coordination
- **uAgents Framework**: Autonomous agent development
- **MeTTa Knowledge Graphs**: Professional knowledge organization
- **Fetch.ai Integration**: Advanced AI capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask or Phantom wallet extension
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/DevCristobalvc/sabionet.git
cd sabionet

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to access the application.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 User Journey

### 1. **Connect Wallet**
- Connect MetaMask (Ethereum/EVM) or Phantom (Solana) wallet
- Automatic profile creation based on wallet address
- Session-based authentication (lost on page reload)

### 2. **AI Chat Experience**
- Access the AI Career Assistant
- Upload files and documents for analysis
- Receive personalized career recommendations
- Automatic integration with social wall

### 3. **Social Networking**
- View and interact with the professional social wall
- Share achievements and professional updates
- Get AI-powered profile insights and analysis
- Connect with other Web3 professionals

### 4. **CV Creation & IPFS**
- Build professional CV with guided wizard
- Add skills, experience, and professional summary
- Publish to IPFS for permanent, decentralized storage
- Receive unique content identifier (CID)

### 5. **Agent Network Management**
- Monitor your personalized ASI agent ecosystem
- View real-time agent activity and task completion
- Benefit from 24/7 professional optimization
- Access advanced analytics and insights

## 🏗️ Architecture

### Frontend Stack
- **React 18.3.1** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** component library

### Web3 Integration
- **MetaMask** wallet connection
- **Phantom** wallet support
- **Session storage** for temporary data
- **IPFS simulation** for decentralized storage

### ASI Alliance Integration
- **Agentverse Protocol** simulation
- **uAgents Framework** concepts
- **MeTTa Knowledge Graphs** representation
- **Fetch.ai** technology inspiration

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── CV/             # CV-related components
│   └── Navbar.tsx      # Main navigation
├── hooks/              # Custom React hooks
│   ├── useWallet.ts    # Wallet connection logic
│   ├── useCV.ts        # CV and IPFS functionality
│   └── useTheme.ts     # Theme management
├── pages/              # Application pages
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # Social wall & networking
│   ├── AIChat.tsx      # AI assistant interface
│   ├── CreateCV.tsx    # CV creation wizard
│   ├── Agents.tsx      # ASI agent network
│   └── IPFS.tsx        # Decentralized storage
├── layouts/            # Layout components
└── lib/                # Utility functions
```

## 🔧 Configuration

### Environment Setup
No environment variables required for hackathon demo. All integrations are simulated for demonstration purposes.

### Session Storage
The application uses `sessionStorage` for all data persistence, ensuring data is lost when the browser tab is closed or refreshed, as specified in the requirements.

## 🎨 Design System

### Colors
- **Primary Green**: `#96EA8C` (ASI Alliance brand color)
- **Hover Green**: `#7BD474`
- **Background**: Pure white (`#FFFFFF`)
- **Text**: Various shades of gray for hierarchy

### Typography
- System font stack for optimal performance
- Clear hierarchy with Tailwind CSS classes
- Professional, clean appearance

## 🧪 Key Features Demo

### Wallet Integration Demo
1. Click "Connect Wallet" on the homepage
2. Select MetaMask or Phantom from the modal
3. Simulate wallet connection (works without actual wallet for demo)
4. View wallet status in the navigation bar

### AI Chat Demo
1. Navigate to "AI Chat" after connecting wallet
2. Type messages and attach files
3. Receive AI-generated responses simulating ASI Alliance technology
4. See automatic social wall integration

### CV & IPFS Demo
1. Access "CV Builder" from the navigation
2. Complete the 3-step CV creation process
3. Publish to simulated IPFS storage
4. Receive mock CID and view in IPFS section

### Agent Network Demo
1. Visit "Agents" page to see ASI agent ecosystem
2. View real-time agent activity logs
3. Monitor agent status and capabilities
4. See ASI Alliance technology integration

## 🏆 ASI Alliance Integration

This project showcases the potential of ASI Alliance technologies:

- **Autonomous Agents**: Simulated agent network for professional optimization
- **Decentralized AI**: AI chat system representing distributed intelligence
- **Knowledge Graphs**: MeTTa-inspired professional knowledge organization
- **Agent Communication**: Simulated inter-agent coordination
- **Fetch.ai Ecosystem**: Integration concepts for real-world deployment

## 🔜 Future Enhancements

- Real IPFS integration with Pinata or similar service
- Actual Agentverse protocol implementation
- Live blockchain integration for credential verification
- Advanced MeTTa knowledge graph visualization
- Multi-chain wallet support
- Real-time collaboration features

## 👥 Team

**Developer**: Cristobal Valencia (@DevCristobalvc)
**Hackathon**: ASI Alliance Hackathon 2024
**Technology Stack**: React + TypeScript + ASI Alliance Concepts

## 📝 License

This project is created for the ASI Alliance Hackathon and is open for educational and demonstration purposes.

---

**Built with ❤️ for the ASI Alliance Hackathon - Showcasing the future of Web3 professional networking**