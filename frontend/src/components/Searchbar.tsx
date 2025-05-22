type SearchbarProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function Searchbar({value, onChange}: SearchbarProps) {

    return (
        <>
            <div className="px-4 pt-2 pb-4">
                <input
                    type={"text"}
                    placeholder={"Search..."}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-zinc-100 text-sm text-zinc-800 placeholder-zinc-400 rounded-lg px-3 py-2 shadow-inner outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
            </div>
        </>
    )
}
