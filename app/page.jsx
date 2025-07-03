"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  ShoppingCart,
  Star,
  StarHalf,
  Share2,
  ArrowLeft,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Product data
const products = [
  {
    id: 1,
    name: "24K Gold Ring",
    description: "Pure 24K gold ring for special occasions with intricate craftsmanship.",
    pricePerGram: 62,
    weightGrams: 5.7,
    category: "Ring",
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e5ad3e89-8b24-48e5-ac8a-cd9c102b48d6.png",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Golden Necklace",
    description: "Lustrous golden necklace with fine details and elegant design.",
    pricePerGram: 63,
    weightGrams: 10.5,
    category: "Necklace",
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5c27ea33-c61f-4133-ac44-0769b8e09ac0.png",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Gold Bangles Set",
    description: "Set of 4 classic gold bangles with traditional patterns.",
    pricePerGram: 60,
    weightGrams: 15.4,
    category: "Bangle",
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd3d4684-ad24-48ca-aed7-c697a803bfd6.png",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Gorgeous Earrings",
    description: "Shiny golden earrings with traditional style and modern appeal.",
    pricePerGram: 61,
    weightGrams: 7.2,
    category: "Earring",
    image:
      "./aniket-sharma-mWNZNbaeSXo-unsplash.jpg",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 5,
    name: "Gold Pendant",
    description: "Delicate pendant in pure gold with exquisite detailing.",
    pricePerGram: 62,
    weightGrams: 4.8,
    category: "Pendant",
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eb6fcc3e-e2db-4a8d-88be-f45e029c3a07.png",
    rating: 4.8,
    reviews: 97,
  },
  {
    id: 6,
    name: "Gold Bracelet",
    description: "Elegant bracelet with polished finish and comfortable fit.",
    pricePerGram: 64,
    weightGrams: 9.7,
    category: "Bracelet",
    image:
      "./sama-hosseini-h_ssRPj8UZo-unsplash.jpg",
    rating: 4.5,
    reviews: 78,
  },
  {
    id: 7,
    name: "Traditional Jhumka",
    description: "Ethnic bell-shaped gold jhumka with intricate work.",
    pricePerGram: 61,
    weightGrams: 11.8,
    category: "Jhumka",
    image: "./parisa-safaei-RIqNLZ_h2X8-unsplash.jpg",
    rating: 4.9,
    reviews: 198,
  },
  {
    id: 8,
    name: "Ethnic Gold Kada",
    description: "Heavy gold kada with carved motifs and traditional design.",
    pricePerGram: 62,
    weightGrams: 18.5,
    category: "Kada",
    image: "./mansi-shah-cDcAmSCru9E-unsplash.jpg",
    rating: 4.8,
    reviews: 234,
  },
]

const heroImages = [
  {
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b0a789fe-73a3-4913-afe6-ff275cd0c6da.png",
    title: "Discover Timeless Gold Jewellery",
    subtitle: "Explore our exclusive curated collections, crafted with love and precision",
    buttonText: "Shop Now",
  },
  {
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bd425997-5d0e-42f9-a73c-96c141a667b5.png",
    title: "Exquisite Diamond Rings",
    subtitle: "Shimmer with our premium collection made for special moments",
    buttonText: "Shop Rings",
  },
  {
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f7bc56e3-6579-4b48-bfa5-f207cf96750b.png",
    title: "Elegant Pendants & Necklaces",
    subtitle: "Add grace to your style with our handcrafted pendants",
    buttonText: "Shop Pendants",
  },
]

const categories = [
  "All",
  "Ring",
  "Necklace",
  "Bangle",
  "Earring",
  "Pendant",
  "Bracelet",
  "Chain",
  "Anklet",
  "Choker",
  "Nose Pin",
  "Toe Ring",
  "Armlet",
  "Waist Belt",
  "Brooch",
  "Stud",
  "Jhumka",
  "Hoop",
  "Kada",
  "Drop",
  "Locket",
  "Mangalsutra",
]

export default function JeweluxeStore() {
  const [cart, setCart] = useState({})
  const [wishlist, setWishlist] = useState({})
  const [currentView, setCurrentView] = useState("products")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortFilter, setSortFilter] = useState("default")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  })

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("jeweluxe_cart")
    const savedWishlist = localStorage.getItem("jeweluxe_wishlist")

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  // Save to localStorage when cart or wishlist changes
  useEffect(() => {
    localStorage.setItem("jeweluxe_cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("jeweluxe_wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Toast auto-hide
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
  }

  const formatPrice = (pricePerGram, weightGrams) => {
    return `₹${(pricePerGram * weightGrams).toFixed(2)}`
  }

  const generateStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />)
      }
    }
    return stars
  }

  const getFilteredProducts = () => {
    let filtered = [...products]

    if (categoryFilter !== "All") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    switch (sortFilter) {
      case "price-asc":
        filtered.sort((a, b) => a.pricePerGram * a.weightGrams - b.pricePerGram * b.weightGrams)
        break
      case "price-desc":
        filtered.sort((a, b) => b.pricePerGram * b.weightGrams - a.pricePerGram * a.weightGrams)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    return filtered
  }

  const addToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
    showToast("Product added to cart!")
  }

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev }
      delete newCart[productId]
      return newCart
    })
    showToast("Product removed from cart!")
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity > 0) {
      setCart((prev) => ({ ...prev, [productId]: quantity }))
    } else {
      removeFromCart(productId)
    }
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = { ...prev }
      if (newWishlist[productId]) {
        delete newWishlist[productId]
        showToast("Product removed from wishlist!")
      } else {
        newWishlist[productId] = true
        showToast("Product added to wishlist!")
      }
      return newWishlist
    })
  }

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const wishlistCount = Object.keys(wishlist).length

  const ProductCard = ({ product }) => (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white"
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className={`w-4 h-4 ${wishlist[product.id] ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  text: product.description,
                  url: window.location.href,
                })
              } else {
                showToast("Product link copied to clipboard!")
              }
            }}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <Badge className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{generateStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-yellow-600">
            {formatPrice(product.pricePerGram, product.weightGrams)}
          </span>
          <span className="text-sm text-gray-500">{product.weightGrams}g</span>
        </div>
        <div className="space-y-2">
          <Button
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="w-full border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent"
            onClick={() => {
              setSelectedProduct(product)
              setShowModal(true)
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const HeroCarousel = () => (
    <div className="relative mx-6 my-6 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-[600px]">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                  {image.title}
                </h1>
                <p className="text-gray-600 text-lg mb-6">{image.subtitle}</p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-8 py-3 rounded-full"
                  onClick={() => setCurrentView("products")}
                >
                  {image.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full p-0 bg-white/80 hover:bg-white"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="secondary"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full p-0 bg-white/80 hover:bg-white"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-yellow-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Jeweluxe
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                className="font-medium hover:text-yellow-600 transition-colors"
                onClick={() => setCurrentView("products")}
              >
                Products
              </button>
              <a href="#about" className="font-medium hover:text-yellow-600 transition-colors">
                About
              </a>
              <a href="#testimonials" className="font-medium hover:text-yellow-600 transition-colors">
                Reviews
              </a>
              <a href="#contact" className="font-medium hover:text-yellow-600 transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="relative border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                onClick={() => setCurrentView("wishlist")}
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="relative border-green-400 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() => setCurrentView("cart")}
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-green-500 text-white text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {currentView === "products" && <HeroCarousel />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === "products" && (
          <>
            {/* Filters */}
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      className="w-full p-2 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <select
                      className="w-full p-2 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      value={sortFilter}
                      onChange={(e) => setSortFilter(e.target.value)}
                    >
                      <option value="default">Default</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A-Z</option>
                      <option value="name-desc">Name: Z-A</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {currentView === "cart" && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                onClick={() => setCurrentView("products")}
                className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
              <h2 className="text-3xl font-bold text-yellow-600">Shopping Cart</h2>
            </div>

            {Object.keys(cart).length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
                  onClick={() => setCurrentView("products")}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find((p) => p.id === Number.parseInt(productId))
                  if (!product) return null

                  return (
                    <Card key={productId} className="bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.description}</p>
                            <p className="text-sm text-gray-500">{product.weightGrams}g</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCartQuantity(product.id, quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="font-semibold w-8 text-center">{quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCartQuantity(product.id, quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-yellow-600 text-lg">
                              {formatPrice(product.pricePerGram, product.weightGrams * quantity)}
                            </div>
                            <Button size="sm" variant="destructive" onClick={() => removeFromCart(product.id)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Total</h3>
                      <div className="text-2xl font-bold text-yellow-600">
                        ₹
                        {Object.entries(cart)
                          .reduce((total, [productId, quantity]) => {
                            const product = products.find((p) => p.id === Number.parseInt(productId))
                            return total + (product ? product.pricePerGram * product.weightGrams * quantity : 0)
                          }, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {currentView === "wishlist" && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                onClick={() => setCurrentView("products")}
                className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
              <h2 className="text-3xl font-bold text-yellow-600">My Wishlist</h2>
            </div>

            {Object.keys(wishlist).length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">Add items to your wishlist to see them here</p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
                  onClick={() => setCurrentView("products")}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.keys(wishlist).map((productId) => {
                  const product = products.find((p) => p.id === Number.parseInt(productId))
                  if (!product) return null
                  return <ProductCard key={productId} product={product} />
                })}
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        {currentView === "products" && (
          <>
            <section className="py-16 my-16 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-3xl">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                  Why Choose Jeweluxe?
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: Shield,
                      title: "Warranty & Authenticity",
                      desc: "Enjoy peace of mind with our 1-year warranty on all genuine jewellery.",
                    },
                    {
                      icon: Truck,
                      title: "Express Shipping",
                      desc: "Fast, free & secure shipping on all orders above ₹15,000.",
                    },
                    {
                      icon: RotateCcw,
                      title: "Easy Returns",
                      desc: "Hassle-free 30-day returns and exchanges for your peace of mind.",
                    },
                    {
                      icon: Headphones,
                      title: "24/7 Support",
                      desc: "Our gold experts are always available to help you.",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Priya K.",
                    rating: 5,
                    text: "Absolutely stunning jewellery with unmatched quality and craftsmanship. Highly recommend Jeweluxe!",
                  },
                  {
                    name: "Vijay M.",
                    rating: 5,
                    text: "The live gold price display helped me confidently choose the perfect gold ring. Excellent service.",
                  },
                  {
                    name: "Anjali S.",
                    rating: 4,
                    text: "Wide range of elegant designs, superb packaging and fast delivery. I will shop here again.",
                  },
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex mb-3">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="italic mb-4 text-gray-600">"{testimonial.text}"</p>
                      <p className="font-bold text-yellow-600">- {testimonial.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-yellow-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">Jeweluxe</span>
              </div>
              <p className="text-yellow-100">Elegant gold and diamond jewellery for your special moments.</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-yellow-100">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-yellow-400 transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-yellow-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-4">Contact Us</h3>
              <ul className="space-y-2 text-yellow-100">
                <li>support@jeweluxe.com</li>
                <li>+1 123 456 7890</li>
                <li>123 Gold Street, New York, USA</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-4">Newsletter</h3>
              <p className="mb-4 text-yellow-100">Subscribe for exclusive offers</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-yellow-400 text-white placeholder:text-yellow-200"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">Subscribe</Button>
              </div>
            </div>
          </div>
          <hr className="my-8 border-yellow-700" />
          <div className="text-center text-yellow-200">
            <p>&copy; 2024 Jeweluxe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <Button variant="ghost" onClick={() => setShowModal(false)} className="text-3xl leading-none">
                  ×
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full rounded-lg"
                />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{generateStars(selectedProduct.rating)}</div>
                    <span className="text-sm text-gray-500">({selectedProduct.reviews} reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-yellow-600">
                      {formatPrice(selectedProduct.pricePerGram, selectedProduct.weightGrams)}
                    </span>
                    <Badge className="bg-yellow-100 text-yellow-800">{selectedProduct.weightGrams}g</Badge>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <strong>Category:</strong> {selectedProduct.category}
                    </div>
                    <div>
                      <strong>Rating:</strong> {selectedProduct.rating}/5
                    </div>
                    <div>
                      <strong>Weight:</strong> {selectedProduct.weightGrams} grams
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
                      onClick={() => {
                        addToCart(selectedProduct.id)
                        setShowModal(false)
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-400 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => {
                        toggleWishlist(selectedProduct.id)
                        setShowModal(false)
                      }}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {wishlist[selectedProduct.id] ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className={`${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Jeweluxe</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                >
                  ×
                </Button>
              </div>
              <p className="mt-1">{toast.message}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
