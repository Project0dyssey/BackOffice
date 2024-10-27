import { CheckBox } from "./CheckBox";

export function SearchInputs({ setFilter }: any) {
    return (
        <div className="text-white flex flex-col gap-10">
            <div className="flex flex-col ">
                <div className="flex  mb-2">
                    <p className="text-yellow-400 text-lg">C</p>
                    <p className="text-white text-lg font-semibold">oleção:</p>
                </div>
                <div className="flex gap-4">
                    <CheckBox description="Nature" typeC="category" setFilter={setFilter} />
                    <CheckBox description="Oceanic" typeC="category" setFilter={setFilter} />
                    <CheckBox description="Geometric" typeC="category" setFilter={setFilter} />
                    <CheckBox description="Enigmatic" typeC="category" setFilter={setFilter} />
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center  mb-2">
                    <p className="text-yellow-400 text-lg">C</p>
                    <p className="text-white text-lg font-semibold">ategoria:</p>
                </div>
                <div className="flex gap-4">
                    <CheckBox description="Anéis" typeC="collection" setFilter={setFilter} />
                    <CheckBox description="Brincos" typeC="collection" setFilter={setFilter} />
                    <CheckBox description="Pendentes" typeC="collection" setFilter={setFilter} />
                    <CheckBox description="Pulseiras" typeC="collection" setFilter={setFilter} />
                </div>
            </div>
        </div>
    );
}
