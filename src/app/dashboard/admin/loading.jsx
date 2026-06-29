export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div className="space-y-3">
                <div className="h-8 w-64 rounded-lg bg-emerald-900/70" />
                <div className="h-4 w-96 rounded-lg bg-emerald-900/50" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-emerald-900/40 bg-emerald-950/30 p-6"
                    >
                        <div className="mb-4 h-5 w-24 rounded bg-emerald-900/60" />
                        <div className="mb-3 h-10 w-20 rounded bg-emerald-800/70" />
                        <div className="h-4 w-32 rounded bg-emerald-900/50" />
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/30 p-6">
                <div className="mb-6 h-6 w-40 rounded bg-emerald-900/60" />

                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between border-b border-emerald-900/30 py-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-emerald-900/60" />

                            <div className="space-y-2">
                                <div className="h-4 w-52 rounded bg-emerald-900/60" />
                                <div className="h-3 w-32 rounded bg-emerald-900/40" />
                            </div>
                        </div>

                        <div className="h-8 w-20 rounded-lg bg-emerald-900/60" />
                    </div>
                ))}
            </div>
        </div>
    );
}