import { SVGProps } from "react"

export default function Testomonial(props: { quote: string, person: string }) {
    return (
        <div className="max-w-xl p-6 mx-auto bg-white border rounded-lg shadow-md">
            <div className="relative mb-4">
                <div className="absolute top-0 left-0 w-full h-2 bg-accent rounded-t-lg" />
            </div>
            <div className="flex items-start mb-4">
                <QuoteIcon className="w-8 h-8 text-black" />
            </div>
            <p className="text-lg text-justify leading-relaxed text-gray-800">
                {props.quote}
            </p>
            <p className="mt-4 text-right text-gray-600">- {props.person}</p>
        </div>
    )
}

function QuoteIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
    )
}
