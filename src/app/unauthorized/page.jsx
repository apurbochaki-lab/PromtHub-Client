import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-[#062726] flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#a06cd5] mb-4">
                403 - Access Denied
            </h1>
            <p className="text-[#e2cfea] text-lg max-w-md mb-8">
                You do not have permission to access this page. Please contact your administrator if you think this is a mistake.
            </p>
            <Link
                href="/"
                className="bg-[#102b3f] hover:bg-[#6247aa] text-white font-semibold px-6 py-3 rounded-xl border border-[#6247aa]/50 transition-all"
            >
                Back to Home
            </Link>
        </div>
    );
}