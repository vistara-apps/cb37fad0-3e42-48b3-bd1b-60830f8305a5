import { FrameHeader } from '@/components/FrameHeader';
import { ContentFeed } from '@/components/ContentFeed';
import { RevenueStats } from '@/components/RevenueStats';
import { ActionButtons } from '@/components/ActionButtons';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
        <FrameHeader />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <ContentFeed />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RevenueStats />
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
