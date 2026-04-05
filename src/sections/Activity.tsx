"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { motion, type Variants } from "motion/react";
import {
    BookMarked,
    GitCommitHorizontal,
    GitPullRequest,
    Star,
} from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const Activity = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<
        { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[]
    >([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const getLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
            if (count === 0) return 0;
            if (count <= 3) return 1;
            if (count <= 6) return 2;
            if (count <= 9) return 3;
            return 4;
        };

        const fetchGitHubData = async () => {
            try {
                const response = await fetch(
                    "https://github-contributions-api.jogruber.de/v4/Adityakbr01?y=last",
                );
                if (!response.ok) throw new Error("Failed to fetch");
                const apiData = await response.json();
                const contributions = apiData?.contributions;
                if (!Array.isArray(contributions))
                    throw new Error("Invalid data format");

                setData(
                    contributions.map((day: { date: string; count: number }) => ({
                        date: day.date,
                        count: day.count,
                        level: getLevel(day.count),
                    })),
                );
                setTotalCount(
                    contributions.reduce(
                        (sum: number, day: { count: number }) => sum + day.count,
                        0,
                    ),
                );
                setIsLoading(false);
            } catch {
                setHasError(true);
                setIsLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    const stats = [
        {
            icon: GitCommitHorizontal,
            value: isLoading ? "-" : `${totalCount}`,
            label: "Contributions",
        },
        { icon: BookMarked, value: "12", label: "Public Repos" },
        { icon: GitPullRequest, value: "24", label: "PRs Merged" },
        { icon: Star, value: "8", label: "Stars Earned" },
    ];

    return (
        <motion.section
            id="activity"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="relative z-20 w-full bg-[#171717] py-8 isolate"
        >
            {/* Ambient glows */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-125 h-125 rounded-full bg-amber-400/6 blur-[130px]" />
                <div className="absolute bottom-0 right-1/4 w-75 h-75 rounded-full bg-orange-400/5 blur-[100px]" />
            </div>

            {/* Noise texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] -z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <motion.div variants={itemVariants} className="mb-12">
                    <p className="font-display uppercase text-amber-200/60 tracking-[0.25em] md:tracking-[0.3em] text-xs sm:text-sm mb-3">
                        Consistent Progress
                    </p>
                    <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl md:text-7xl text-white leading-[0.9]">
                        Activity
                    </h2>
                    <div className="mt-4 h-px w-16 bg-amber-200/40" />
                    <p className="mt-6 font-body text-sm sm:text-base text-white/50 max-w-xl leading-relaxed">
                        A view into the rhythm behind the portfolio — shipping, iterating,
                        and learning in public through real product work.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="
                                flex items-center gap-4 rounded-full
                                apple-border-shine bg-white/3 p-5 sm:p-6
                                transition-all duration-300
                                hover:border-amber-200/20 hover:bg-white/5
                                hover:-translate-y-1
                            "
                        >
                            <div className="relative apple-border-shine p-2.5 rounded-full bg-white/5 text-amber-200/80">
                                <stat.icon size={18} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="font-display font-bold text-2xl text-amber-200 leading-none">
                                    {stat.value}
                                </p>
                                <p className="font-body text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="overflow-hidden rounded-3xl apple-border-shine bg-white/3 p-5 sm:p-8"
                >
                    {isLoading && (
                        <div className="h-[220px] animate-pulse rounded-2xl bg-white/5" />
                    )}
                    {hasError && !isLoading && (
                        <div className="flex h-[220px] items-center justify-center text-center text-sm font-body text-white/40">
                            Unable to load the activity calendar right now. Check my GitHub
                            profile directly.
                        </div>
                    )}
                    {!isLoading && !hasError && data.length > 0 && (
                        <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
                            <div className="min-w-[800px] w-full pt-2 px-1">
                                <ActivityCalendar
                                    data={data}
                                    colorScheme="dark"
                                    blockSize={14}
                                    blockMargin={4}
                                    blockRadius={1}
                                    fontSize={13}
                                    showWeekdayLabels
                                    weekStart={0}
                                    showMonthLabels={true}
                                    theme={{
                                        light: [
                                            "#ede7de",
                                            "#ffd7ba",
                                            "#ffb27e",
                                            "#f16001",
                                            "#df3405",
                                        ],
                                        dark: [
                                            "rgba(255,255,255,0.03)",
                                            "rgba(251,191,36,0.15)",
                                            "rgba(251,191,36,0.3)",
                                            "rgba(251,191,36,0.5)",
                                            "rgba(251,191,36,0.9)",
                                        ],
                                    }}
                                    labels={{
                                        legend: { less: "Less", more: "More" },
                                        totalCount: "{{count}} contributions in the last year",
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </motion.section>
    );
};

export default Activity;