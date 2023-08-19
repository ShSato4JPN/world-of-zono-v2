"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function useCurrentPage() {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentPage = Number(searchParams?.get("page") || 1);
  const path = pathName || "/";

  return { path, currentPage };
}
