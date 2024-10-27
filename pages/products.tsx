import { CheckBox } from "@/components/singleComponents/CheckBox";
import { ProductCard } from "@/components/singleComponents/ProductCard";
import { SearchInputs } from "@/components/singleComponents/SearchInputs";
import { GetToken } from "@/logic/frontend/auth";
import { products } from "@/logic/frontend/fetchs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

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

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "productNameEng",
    header: "Name",
  },
  {
    accessorKey: "collection",
    header: "Collection",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
];

export default function Products() {
  const [filter, setFilter] = useState<filterType>({
    category: "All",
    collection: [],
  });
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

  return (
    <div className="flex flex-col gap-6 items-center w-4/5 mx-auto rounded-md bg-stone-800 p-6">
      <div className="flex items-center justify-center text-2xl font-bold text-yellow-500 tracking-wide">
        <p>P</p>
        <p className="text-stone-200">rodutos</p>
      </div>
      <SearchInputs setFilter={setFilter} />

      {product.length > 0 ? (
        <div className="w-full bg-stone-900 rounded-lg shadow-lg p-4">
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
              {product.map((el: productType) => (
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
        <p className="text-stone-300">A Carregar Produtos...</p>
      )}
    </div>
  );
}
