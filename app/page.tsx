import { FrameHeader } from '@/components/FrameHeader';
import { ContentFeed } from '@/components/ContentFeed';
import { RevenueStats } from '@/components/RevenueStats';
import { ActionButtons } from '@/components/ActionButtons';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-4 py-6 space-y-6">
        <FrameHeader />
        <RevenueStats />
        <ContentFeed />
        <ActionButtons />
      </div>
    </div>
  );
}
