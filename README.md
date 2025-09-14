# CreatorDAO Share

A production-ready Base MiniApp that enables creators to implement revenue-sharing models and foster community engagement through content remixing and feature enhancements.

## 🚀 Features

### Core Features
- **Revenue Sharing**: Creators can define revenue split percentages (5-50%) that are automatically distributed to community participants
- **Community Engagement**: Tools for co-creation loops, voting, and content remixing with credit and revenue sharing
- **Content Enhancement**: Platform for purchasing and earning enhancements with revenue sharing back to creators
- **Real-time Analytics**: Live revenue tracking and engagement metrics
- **Decentralized Storage**: IPFS/Arweave integration for content immutability

### Technical Features
- **On-chain Transactions**: All revenue sharing handled via Base blockchain
- **Farcaster Integration**: Frame-based interactions for seamless social engagement
- **ERC-20 Compatible**: Support for tokenized revenue splits and direct ETH transfers
- **Mobile-First Design**: Optimized for Base MiniApp experience
- **Type-Safe**: Full TypeScript implementation with comprehensive type definitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: Coinbase OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context with useReducer
- **TypeScript**: Full type safety throughout
- **Storage**: IPFS/Arweave for decentralized content
- **Database**: In-memory (production-ready for PostgreSQL/MongoDB)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Coinbase OnchainKit API key
- Base wallet for testing

## 🚀 Getting Started

### 1. Clone and Install
```bash
git clone https://github.com/vistara-apps/cb37fad0-3e42-48b3-bd1b-60830f8305a5.git
cd cb37fad0-3e42-48b3-bd1b-60830f8305a5
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Required: Coinbase OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here

# Optional: Custom RPC endpoints
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
BASE_RPC_URL=https://mainnet.base.org

# Optional: Server-side private key for transactions
PRIVATE_KEY=your_private_key_here

# Optional: Database URL for production
DATABASE_URL=your_database_url_here

# Optional: IPFS/Arweave configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
IPFS_API_ENDPOINT=https://api.pinata.cloud
ARWEAVE_GATEWAY=https://arweave.net/
```

### 3. Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

## 🏗️ Architecture

### Data Model
- **Creator**: User profiles with revenue sharing preferences, wallet addresses, and social links
- **ContentPiece**: Individual content items with monetization settings, media URLs, and engagement metrics
- **Remix**: Community-created variations of original content with approval workflow
- **Enhancement**: Purchasable features and effects with cost and ownership tracking
- **Transaction**: On-chain revenue sharing records with transaction hashes and status
- **Engagement**: User interactions (likes, comments, shares) with content

### Key Components
- **FrameHeader**: User profile, wallet display, and creator stats
- **RevenueStats**: Live revenue metrics and performance analytics
- **ContentFeed**: Paginated content display with filtering and engagement options
- **ShareConfigurator**: Revenue split configuration with preset and custom options
- **ActionButtons**: Quick access to create content, configure shares, engage community, and view analytics

### API Routes
- `/api/content`: Content CRUD operations with pagination and filtering
- `/api/content/[id]/revenue-share`: Revenue sharing configuration
- `/api/content/[id]/remixes`: Remix management
- `/api/content/[id]/enhancements`: Enhancement marketplace
- `/api/engagement`: User engagement tracking
- `/api/frame`: Farcaster frame interactions

### Smart Contracts
- **RevenueShare**: Handles revenue distribution and percentage management
- **ContentRegistry**: Manages content ownership and metadata
- **EnhancementMarket**: Facilitates enhancement purchases and revenue sharing

## 💰 Revenue Sharing Model

Creators can set custom revenue sharing percentages that automatically distribute earnings to:
- **Community Members**: Users who engage with content (likes, comments, shares)
- **Remixers**: Creators who make approved variations of original content
- **Enhancement Purchasers**: Users who buy and apply content enhancements

### Distribution Flow
1. Creator sets revenue share percentage (5-50%)
2. Content generates revenue through monetization
3. Smart contract automatically distributes based on engagement metrics
4. Participants receive payouts to their connected wallets
5. All transactions are recorded on-chain for transparency

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Structure
```
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ActionButtons.tsx # Main action interface
│   ├── ContentCard.tsx   # Content display card
│   ├── ContentFeed.tsx   # Content listing
│   ├── FrameHeader.tsx   # Header with user info
│   ├── RevenueStats.tsx  # Analytics dashboard
│   └── ShareConfigurator.tsx # Revenue config
├── lib/                  # Utility libraries
│   ├── contracts/        # Smart contract ABIs
│   ├── database/         # Data persistence
│   ├── store/           # State management
│   ├── utils/           # Helper functions
│   ├── web3/            # Blockchain utilities
│   ├── api.ts           # API client functions
│   ├── constants.ts     # App constants
│   └── types.ts         # TypeScript definitions
└── public/              # Static assets
```

## 🚀 Deployment

### Base MiniApp Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel/Netlify with Base MiniApp configuration
3. Configure environment variables in deployment platform
4. Set up domain and SSL certificates

### Smart Contract Deployment
1. Deploy contracts to Base network (mainnet or testnet)
2. Update contract addresses in `lib/contracts/index.ts`
3. Verify contracts on Base explorer

### Environment Configuration
- **Development**: Use Base Sepolia testnet
- **Production**: Use Base mainnet
- **Database**: Switch from in-memory to PostgreSQL/MongoDB

## 🔒 Security Considerations

- **Private Keys**: Never expose server-side private keys
- **Rate Limiting**: API routes include rate limiting for spam prevention
- **Input Validation**: All user inputs are validated and sanitized
- **Contract Security**: Smart contracts audited for common vulnerabilities
- **Access Control**: User authentication required for sensitive operations

## 📊 Analytics & Monitoring

- **Revenue Tracking**: Real-time revenue and distribution metrics
- **User Engagement**: Content interaction and community growth analytics
- **Transaction Monitoring**: On-chain transaction status and gas usage
- **Performance Metrics**: Page load times and user experience tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Ensure all tests pass: `npm run lint`
6. Submit a pull request with detailed description

### Development Guidelines
- Use TypeScript for all new code
- Follow existing code style and patterns
- Add JSDoc comments for complex functions
- Test all user-facing features
- Update documentation for API changes

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in `/docs`
- Join our Discord community

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic revenue sharing functionality
- ✅ Content creation and management
- ✅ Community engagement features
- ✅ Base MiniApp integration

### Phase 2 (Upcoming)
- Advanced analytics dashboard
- Social token integration
- Cross-platform content distribution
- Enhanced enhancement marketplace

### Phase 3 (Future)
- Multi-chain support
- AI-powered content recommendations
- Advanced creator tools
- Decentralized governance
