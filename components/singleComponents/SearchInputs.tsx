import { CheckBox } from "./CheckBox";

export function SearchInputs({ setFilter }: any) {
    return (
        <div className="text-white flex flex-col gap-4">
            <div className="flex gap-7">
                <div className="flex">
                    <p className="text-yellow-400 flex">C</p>
                    <p className="text-white">oleção:</p>
                </div>
                <CheckBox description="Nature" typeC="category" setFilter={setFilter} />
                <CheckBox description="Oceanic" typeC="category" setFilter={setFilter} />
                <CheckBox description="Geometric" typeC="category" setFilter={setFilter} />
                <CheckBox description="Enigmatic" typeC="category" setFilter={setFilter} />
            </div>
            <div className="flex gap-7">
                <div className="flex">
                    <p className="text-yellow-400">C</p>
                    <p className="text-white">ategoria:</p>
                </div>
                <CheckBox description="Anéis" typeC="collection" setFilter={setFilter} />
                <CheckBox description="Brincos" typeC="collection" setFilter={setFilter} />
                <CheckBox description="Pendentes" typeC="collection" setFilter={setFilter} />
                <CheckBox description="Pulseiras" typeC="collection" setFilter={setFilter} />
            </div>
        </div>
    )
}