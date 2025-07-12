import React, { useEffect } from "react";

import man from "./categories/man.jpg";
import woman from "./categories/woman.jpg";
import sports from "./categories/sports.jpg";
import kid from "./categories/kid.jpg";
import summer from "./categories/summer.jpg";
import winter from "./categories/winter.jpg";

const categories = [
  { name: "Man's wear", src: man },
  { name: "Woman's wear", src: woman },
  { name: "Sport's wear", src: sports },
  { name: "Kid's wear", src: kid },
  { name: "Summer's wear", src: summer },
  { name: "Winter's wear", src: winter },
];

const LandingPage = () => {
  useEffect(() => {
    // You can place all your slider and event logic here or split into functions/hooks
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">Rewear</div>
            <ul className="nav-items" id="navItems">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#products">Items</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <button className="mobile-menu-btn" id="mobileMenuBtn">
              ☰
            </button>
          </nav>
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search for products..."
                id="searchInput"
              />
              <span className="search-icon" id="searchBtn">
                🔍
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Slider Section */}
      <section className="image-slider">
        <div className="slider-container">
          <div className="slider-wrapper" id="sliderWrapper">
            {[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexandra-gorn-WF0LSThlRmw-unsplash.jpg-f9FdF0M15NcvAX2Ka1x6UnJWpdKMeY.jpeg",
                title: "Fashion Aesthetics",
                desc: "Redefine your style every season.",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/md-salman-tWOz2_EK5EQ-unsplash.jpg-X1dewtNMfypmBrf6X7ZSNw8MMjecfA.jpeg",
                title: "Urban Wear",
                desc: "Explore trendy casuals for everyday comfort.",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artificial-photography-vB5qtt8X4NA-unsplash.jpg-Hayrcujpds7tyNwlO0Dx6Y6iAiYLx3.jpeg",
                title: "Sustainable Style",
                desc: "Eco-friendly outfits that make a statement.",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marcus-loke-xXJ6utyoSw0-unsplash.jpg-AeJbwkaZbbk4V2uNoAPwm6r5AKQwzo.jpeg",
                title: "Youth Collection",
                desc: "Fresh looks for Gen Z fashionistas.",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/keagan-henman-Won79_9oUEk-unsplash.jpg-MvyDndBg37yWpCDyKzlpTuTelzPz4t.jpeg",
                title: "Minimalist Fashion",
                desc: "Sleek, simple, and stylish for all.",
              },
            ].map((slide, i) => (
              <div className={`slide${i === 0 ? " active" : ""}`} key={i}>
                <img src={slide.src} alt={`Slide ${i + 1}`} />
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-btn prev-btn" id="prevBtn">
            ❮
          </button>
          <button className="slider-btn next-btn" id="nextBtn">
            ❯
          </button>
          <div className="slider-dots" id="sliderDots">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`dot${i === 0 ? " active" : ""}`}
                data-slide={i}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories">
        <h2 className="section-title">Categories Section</h2>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div className="category-card" key={i}>
              <img src={cat.src} alt={cat.name} className="category-image" />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="section" id="products">
        <h2 className="section-title">Product Listings</h2>
        <div className="products-grid">
          {[
            {
              name: "Super Hat",
              price: "Rs 490",
              src: "/product/felipe-galvan-AhfrA5VQNpM-unsplash.jpg",
            },
            {
              name: "Dashing Tshirt",
              price: "Rs 490",
              src: "/product/christian-bolt-VW5VjskNXZ8-unsplash.jpg",
            },
            {
              name: "Flexible Sweater",
              price: "Rs 490",
              src: "/product/jimmy-jimenez-pPEGKZ4uSts-unsplash.jpg",
            },
            // ... continue the rest of the 12 products
          ].map((prod, i) => (
            <div className="product-card" key={i}>
              <div className="product-image">
                <img src={prod.src} alt={prod.name} />
              </div>
              <div className="product-info">
                <div className="product-name">{prod.name}</div>
                <div className="product-price">{prod.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
