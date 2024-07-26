import logo from "@/assets/logo.png";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";

export enum ProductType {
  INVERSOR = "INVERSOR",
  MODULO = "MODULO",
  ESTRUTURA = "ESTRUTURA",
  ELETRICO = "ELETRICO",
}

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString().trim();
  const productType = formData.get("productType")?.toString();

  if (searchQuery || productType) {
    const query = new URLSearchParams();
    if (searchQuery) query.append("query", searchQuery);
    if (productType) query.append("type", productType);
    redirect("/search?" + query.toString());
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form id="searchForm" action={searchProducts} role="search" className="flex items-center gap-2">
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input-bordered input w-full min-w-[100px]"
                aria-label="Search"
              />
            </div>
            <div className="form-control">
              <select name="productType" className="select-bordered select w-full min-w-[100px]" aria-label="Product Type" >
                <option value="">Select Product Type</option>
                {Object.values(ProductType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <Link href="/add-product" className="btn btn-primary">
              Add Products
            </Link>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}