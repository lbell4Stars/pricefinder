
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../lib/products";

export default function Home() {
  const [search, setSearch] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter((product) => {
    const words = search.toLowerCase().trim().split(/\s+/).filter(Boolean);

    const productInfo = [
      product.name,
      product.color,
      product.category,
      product.sku,
      product.id
    ].join(" ").toLowerCase();

    return words.every((word) => productInfo.includes(word));
  });

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f9fc",
      color: "#111827",
      fontFamily: "Arial, sans-serif"
    }}>

      {/* TOP NAVIGATION */}
      <header style={{
        background: "white",
        padding: "25px 4%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd"
      }}>
        <h1 style={{ color: "#6512a5", margin: 0 }}>
          PriceFinder
        </h1>

        <nav style={{ display: "flex", gap: "30px" }}>
          <Link href="/" style={{ color: "#111827" }}>Home</Link>
          <Link href="/favorites" style={{ color: "#111827" }}>Favorites</Link>
          <Link href="/account" style={{ color: "#111827" }}>My Account</Link>
        </nav>
      </header>

      {/* MAIN SEARCH AREA */}
      <section style={{
        textAlign: "center",
        padding: "90px 20px 65px"
      }}>

        <p style={{
          color: "#8615d5",
          fontWeight: "bold",
          letterSpacing: "3px"
        }}>
          SHOP SMARTER. SAVE MORE.
        </p>

        <h2 style={{
          fontSize: "clamp(34px, 5vw, 68px)",
          margin: "20px auto",
          maxWidth: "850px",
          lineHeight: 1.05
        }}>
          Find the same product.
          <br />
          Find the best price.
        </h2>

        <p style={{
          fontSize: "19px",
          color: "#475569",
          maxWidth: "800px",
          margin: "25px auto 60px",
          lineHeight: 1.6
        }}>
          Search by product name, SKU, barcode, or picture.
          Compare prices across your favorite retailers
          and discover where to get the best deal.
        </p>

        {/* SEARCH BAR */}
        <div style={{
          display: "flex",
          gap: "15px",
          maxWidth: "980px",
          margin: "auto",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="Try Red Stanley, Pink Nike sneakers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "20px 25px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "18px",
              background: "white",
              color: "#111827"
            }}
          />

          <button
            onClick={() => setSearch(search.trim())}
            style={{
              background: "#7412b5",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "18px 45px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </div>

        {/* UPLOAD AND SCAN BUTTONS */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "35px"
        }}>

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            hidden
          />

          <input
            ref={cameraInput}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
          />

          <button
            onClick={() => fileInput.current?.click()}
            style={secondaryButton}
          >
            Upload a Price Tag
          </button>

          <button
            onClick={() => alert("Barcode scanning is coming soon!")}
            style={secondaryButton}
          >
            Scan Barcode
          </button>

          <button
            onClick={() => cameraInput.current?.click()}
            style={secondaryButton}
          >
            Use Camera
          </button>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      <section style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px 30px 70px"
      }}>

        <h2>
          {search ? "Search Results" : "Featured Products"}
        </h2>

        {filteredProducts.length === 0 && (
          <p style={{ color: "#64748b" }}>
            No products found. Try another search.
          </p>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "25px"
        }}>

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "15px",
                boxShadow: "0 3px 15px rgba(0,0,0,0.06)"
              }}
            >

              <div style={{
                height: "230px",
                background: "#f1edf7",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                />
              </div>

              <h3>{product.name}</h3>
              <p>Color: {product.color}</p>
              <p>SKU: {product.sku}</p>

              <p style={{ color: "#7412b5", fontWeight: "bold" }}>
                Compare prices at {product.stores.length} stores
              </p>

              {product.stores.map((store) => (
                <p key={store.name}>
                  {store.name}: $
                  {(store.salePrice ?? store.price).toFixed(2)}
                </p>
              ))}

            </div>
          ))}

        </div>
      </section>

      {/* RETAILER NAMES */}
      <footer style={{
        background: "white",
        textAlign: "center",
        padding: "35px 20px",
        borderTop: "1px solid #ddd"
      }}>
        <h3>Shop Your Favorite Stores</h3>
        <p style={{ color: "#64748b", lineHeight: 2 }}>
          Walmart · Target · Kohl&apos;s · Macy&apos;s · JCPenney
          <br />
          Nordstrom · Amazon · More Stores
        </p>
      </footer>

    </main>
  );
}

const secondaryButton = {
  background: "white",
  color: "#111827",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  padding: "18px 25px",
  fontSize: "16px",
  cursor: "pointer"
};
