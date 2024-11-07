"use client";

import { useEffect } from "react";
import { useBook } from "@/context/BookContext";
import { useRouter } from "next/navigation";
import BookDetail from "@/components/BookDetail";

export default function BookDetailPage() {
  const { selectedBook } = useBook();
  const router = useRouter();

  useEffect(() => {
    if (!selectedBook) {
      router.push("/");
    }
  }, [selectedBook, router]);

  if (!selectedBook) {
    return <p>Redirigiendo...</p>;
  }

  return <BookDetail book={selectedBook} onBack={() => router.back()} />;
}
