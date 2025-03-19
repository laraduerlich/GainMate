type SearchbarProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function Searchbar({value, onChange}: SearchbarProps) {

    return (
        <>
            <input
                type={"text"}
                placeholder={"Suche..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    )
}
