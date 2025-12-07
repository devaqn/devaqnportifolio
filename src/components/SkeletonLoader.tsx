import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  isDark: boolean;
}

const SkeletonLoader = ({ isDark }: SkeletonLoaderProps) => {
  return (
    <div className="w-full max-w-[280px] xs:max-w-xs sm:max-w-sm mx-auto">
      <div
        className={cn(
          "rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 flex flex-col items-center gap-4 sm:gap-6",
          isDark
            ? "bg-[hsl(0_0%_8%/0.9)] border border-[hsl(0_85%_45%/0.2)]"
            : "bg-[hsl(270_20%_98%/0.9)] border border-[hsl(270_70%_60%/0.3)]"
        )}
      >
        {/* Avatar skeleton */}
        <div
          className={cn(
            "w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full animate-pulse",
            isDark
              ? "bg-gradient-to-br from-[hsl(350_70%_20%)] via-[hsl(0_50%_15%)] to-[hsl(350_60%_25%)]"
              : "bg-gradient-to-br from-[hsl(270_60%_90%)] via-[hsl(270_50%_85%)] to-[hsl(280_55%_88%)]"
          )}
        />

        {/* Name skeleton */}
        <div
          className={cn(
            "h-5 xs:h-6 sm:h-7 w-32 xs:w-36 sm:w-40 rounded-full animate-pulse",
            isDark
              ? "bg-gradient-to-r from-[hsl(0_0%_15%)] via-[hsl(350_40%_18%)] to-[hsl(0_0%_15%)]"
              : "bg-gradient-to-r from-[hsl(270_40%_88%)] via-[hsl(270_50%_82%)] to-[hsl(270_40%_88%)]"
          )}
          style={{ animationDelay: "0.1s" }}
        />

        {/* Subtitle skeleton */}
        <div
          className={cn(
            "h-3 xs:h-4 w-40 xs:w-44 sm:w-48 rounded-full animate-pulse",
            isDark
              ? "bg-gradient-to-r from-[hsl(0_0%_12%)] via-[hsl(350_30%_15%)] to-[hsl(0_0%_12%)]"
              : "bg-gradient-to-r from-[hsl(270_35%_90%)] via-[hsl(270_45%_85%)] to-[hsl(270_35%_90%)]"
          )}
          style={{ animationDelay: "0.2s" }}
        />

        {/* Button skeletons */}
        <div className="flex flex-col gap-2.5 xs:gap-3 w-full mt-2">
          {[0.3, 0.4, 0.5, 0.6].map((delay, i) => (
            <div
              key={i}
              className={cn(
                "h-10 xs:h-11 sm:h-12 w-full rounded-full animate-pulse",
                isDark
                  ? "bg-gradient-to-r from-[hsl(0_0%_10%)] via-[hsl(350_50%_12%)] to-[hsl(0_0%_10%)]"
                  : "bg-gradient-to-r from-[hsl(270_30%_92%)] via-[hsl(270_50%_86%)] to-[hsl(270_30%_92%)]"
              )}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
