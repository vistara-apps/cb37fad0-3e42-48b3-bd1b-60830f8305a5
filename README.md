# CreatorDAO Share

A Base MiniApp that enables creators to implement revenue-sharing models and foster community engagement through content remixing and feature enhancements.

## Features

- **Revenue Sharing**: Creators can define revenue split percentages that are automatically distributed to community participants
- **Community Engagement**: Tools for co-creation loops, voting, and content remixing with credit and revenue sharing
- **Content Enhancement**: Platform for purchasing and earning enhancements with revenue sharing back to creators

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
   - `NEXT_PUBLIC_MINIKIT_API_KEY`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture

### Data Model
- **Creator**: User profiles with revenue sharing preferences
- **ContentPiece**: Individual content items with monetization settings
- **Remix**: Community-created variations of original content
- **Enhancement**: Purchasable features and effects
- **Transaction**: On-chain revenue sharing records

### Key Components
- **FrameHeader**: User profile and navigation
- **RevenueStats**: Live revenue and engagement metrics
- **ContentFeed**: Scrollable content with interaction options
- **ShareConfigurator**: Revenue split configuration interface
- **ActionButtons**: Quick access to main features

## Revenue Sharing Model

Creators can set custom revenue sharing percentages (5-50%) that automatically distribute earnings to:
- Community members who engage with content
- Remixers who create variations
- Enhancement purchasers and creators

All transactions are handled on-chain via Base for transparency and trust.

## Development

### Building
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Deployment

This app is designed to be deployed as a Base MiniApp and can be accessed through:
- Base App (primary)
- Farcaster clients with frame support
- Direct web access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
