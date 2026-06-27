export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div className="space-y-3">
                <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
                    >
                        <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800 mb-4" />
                        <div className="h-10 w-20 rounded bg-gray-200 dark:bg-gray-800 mb-2" />
                        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-800 mb-6" />

                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-800" />
                            <div className="space-y-2">
                                <div className="h-4 w-52 rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                            </div>
                        </div>

                        <div className="h-8 w-20 rounded-lg bg-gray-200 dark:bg-gray-800" />
                    </div>
                ))}
            </div>
        </div>
    );
}