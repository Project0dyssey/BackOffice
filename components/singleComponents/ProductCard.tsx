import { ToastElement } from "@/logic/frontend/notifications";
import { notifyToast } from "@/logic/frontend/notify";
import { useRouter } from "next/router";
import { useState } from "react";

interface productProps {
  productInfo: productInfoType;
}

interface productInfoType {
  _id: string;
  category: string;
  collection: string;
  descriptionPt: string;
  descriptionEng: string;
  imgUrl: string;
  smallImgs: Array<string>;
  productName: string;
  productNameEng: string;
  name?: string;
  nameEng?: string;
}

export function ProductCard({ productInfo }: productProps) {
  const truncatedId = `${productInfo._id.slice(0, 4)}-${productInfo._id.slice(-4)}`;

  const router = useRouter();

  function toEditPage(productInfo: productInfoType) {
    return router.push(`/${productInfo._id}`);
  }

  async function deleteProduct(productId: string) {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(`/api/v1/manage/delete?id=${productId}`, options);
    if (res.status === 200) {
      notifyToast("Peça eliminada com sucesso!", true);
      setTimeout(() => router.reload(), 2000);
    } else {
      notifyToast("Ocorreu um erro.", false);
    }
  }

  return (
    <tr className="text-sm text-stone-300 hover:bg-stone-800 transition duration-200">
      <td className="p-2 text-stone-200">{truncatedId}</td>
      <td className="p-2">{productInfo.productName}</td>
      <td className="p-2">{productInfo.collection}</td>
      <td className="p-2">{productInfo.category}</td>
      <td className="p-2 flex justify-center gap-4">
        <button
          onClick={() => deleteProduct(productInfo._id)}
          className="bg-stone-950 text-stone-200 px-3 py-1 rounded-md hover:bg-red-700 transition duration-200"
        >
          ❌ Eliminar
        </button>
        <button
          onClick={() => toEditPage(productInfo)}
          className="bg-stone-700 text-stone-200 px-3 py-1 rounded-md hover:bg-orange-700 transition duration-200"
        >
          ✏️ Editar
        </button>
      </td>
      <ToastElement />
    </tr>
  );
}
