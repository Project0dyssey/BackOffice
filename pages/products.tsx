import { CheckBox } from "@/components/singleComponents/CheckBox";
import { ProductCard } from "@/components/singleComponents/ProductCard";
import { SearchInputs } from "@/components/singleComponents/SearchInputs";
import { GetToken } from "@/logic/frontend/auth";
import { products } from "@/logic/frontend/fetchs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";//coisas do rafa
import { SearchBar } from "@/components/singleComponents/SearchBar"; 


interface filterType {
  category: string;
  collection: Array<string>;
}

interface productType {
  productName?: string;
  productNameEng?: string;
  collection: string;
  category: string;
  _id: string; 
  descriptionPt: string;
  descriptionEng: string;
  imgUrl?: string;
  smallImgs?: Array<string>;
}

export default function Products() {
  const [filter, setFilter] = useState<filterType>({
    category: "All",
    collection: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>(''); // para a pesquisa
  const [product, setProduct] = useState<productType[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getLoggedIn() {
      const getToken = await GetToken();
      if (!getToken) return router.push("/");

      const fetchProducts = await products(filter);
      setProduct(fetchProducts);
    }
    getLoggedIn();
  }, [filter]);

  const filteredProducts = product.filter((el) => 
    (el.productName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     el.productNameEng?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (el._id.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  return (
    <div className=" gap-6 w-4/5 mx-auto rounded-md bg-stone-800 p-6">
      <div className="flex text-center text-2xl font-bold text-yellow-500 tracking-wide">
        <p>P</p>
        <p className="text-stone-200">rodutos</p>
      </div>
      <SearchBar setSearchTerm={setSearchTerm} /> 
      <SearchInputs setFilter={setFilter} />

      {filteredProducts.length > 0 ? ( 
        <div className="w-full mt-10 bg-stone-900 rounded-lg shadow-lg p-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-stone-300 text-sm border-b border-stone-700">
                <th className="p-2">ID</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Coleção</th>
                <th className="p-2">Categoria</th>
                <th className="p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((el: productType) => (
                <ProductCard
                  key={el._id}
                  productInfo={{
                    ...el,
                    _id: el._id || "",
                    productName: el.productName || "",
                    productNameEng: el.productNameEng || "",
                    descriptionPt: el.descriptionPt || "",
                    descriptionEng: el.descriptionEng || "",
                    imgUrl: el.imgUrl || "",
                    smallImgs: el.smallImgs || [],
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-stone-300">Nenhum produto encontrado...</p>
      )}
    </div>
  );
}
