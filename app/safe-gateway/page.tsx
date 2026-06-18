'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { SafeGatewayContent } from '@/components/safe-gateway/SafeGatewayContent';
import MatrixRain from '@/components/ui/matrix-code';

export default function DarkWebPage() {
  return (
    <LanguageProvider>
      <div className="relative">
        <div className="fixed inset-0 z-0">
          <MatrixRain
            fontSize={14}
            color="#df2531"
            characters="01アイウエオカキクケコサシスセソタチツテト"
            fadeOpacity={0.08}
            speed={0.8}
          />
        </div>
        <div className="relative z-[1]">
          <SafeGatewayContent />
        </div>
      </div>
    </LanguageProvider>
  );
}
