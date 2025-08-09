import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  title: string;
  price: string;
  priceNum: number;
  category: string;
  artist: string;
  image: string;
  description: string;
  tracks?: string[];
  specifications?: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const artists = [
    {
      name: "Royal Crush",
      subtitle: "(ex. TEDDIBEAR)",
      description: "Premium K-pop collectibles and exclusive merchandise"
    },
    {
      name: "2COOL", 
      subtitle: "",
      description: "Limited edition albums and photo cards"
    },
    {
      name: "NO1CE",
      subtitle: "Members: Jonhie (solo), Haerin (solo)", 
      description: "Official merchandise and fan goods"
    }
  ];

  const products: Product[] = [
    {
      id: 1,
      title: "Jonhie - OR: T&T (Saddest Ver.)",
      price: "$34.99",
      priceNum: 34.99,
      category: "Albums",
      artist: "Jonhie",
      image: "https://cdn.poehali.dev/files/884c6520-bb55-46cf-b85f-528136f7741d.jpg",
      description: "1st Mini Album by Jonhie from NO1CE. Limited Saddest Version with exclusive photobook and photo cards.",
      tracks: ["Track 1: OR", "Track 2: T&T", "Track 3: Saddest", "Track 4: Outro"],
      specifications: ["CD + Photobook (64 pages)", "2 Photo Cards", "1 Poster", "Limited Edition Packaging"]
    },
    {
      id: 2,
      title: "Royal Crush Limited Album",
      price: "$29.99",
      priceNum: 29.99,
      category: "Albums",
      artist: "Royal Crush",
      image: "/img/454527d2-1c11-42ea-ae90-d2f1356dcc26.jpg",
      description: "Latest album from Royal Crush with exclusive content and premium packaging.",
      tracks: ["Track 1: Royal", "Track 2: Crush", "Track 3: Dreams", "Track 4: Forever"],
      specifications: ["CD + Booklet (32 pages)", "3 Photo Cards", "1 Poster", "Special Packaging"]
    },
    {
      id: 3,
      title: "2COOL Photo Card Set",
      price: "$19.99",
      priceNum: 19.99,
      category: "Photo Cards",
      artist: "2COOL",
      image: "/placeholder.svg",
      description: "Complete photo card collection featuring all members of 2COOL.",
      specifications: ["15 Photo Cards", "Special Holographic Finish", "Collector's Box", "Certificate of Authenticity"]
    },
    {
      id: 4,
      title: "NO1CE Official Hoodie",
      price: "$49.99",
      priceNum: 49.99,
      category: "Apparel",
      artist: "NO1CE",
      image: "/placeholder.svg",
      description: "Premium quality hoodie with NO1CE official logo and design.",
      specifications: ["100% Cotton", "Available Sizes: S-XL", "Official Logo Print", "Comfortable Fit"]
    },
    {
      id: 5,
      title: "Haerin Solo Poster",
      price: "$14.99",
      priceNum: 14.99,
      category: "Posters", 
      artist: "Haerin",
      image: "/placeholder.svg",
      description: "Exclusive poster featuring Haerin from NO1CE in high-quality print.",
      specifications: ["Size: 24x36 inches", "High-Quality Print", "Matte Finish", "Tube Packaging"]
    },
    {
      id: 6,
      title: "EXPERIMENT Bundle",
      price: "$89.99",
      priceNum: 89.99,
      category: "Bundles",
      artist: "All Artists",
      image: "/img/c7f4118d-bb2b-4f43-88cc-2f65138a351b.jpg",
      description: "Complete bundle with items from all EXPERIMENT ENTERTAINMENT artists.",
      specifications: ["3 Albums", "Photo Card Set", "2 Posters", "Limited Edition Items"]
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.product.priceNum * item.quantity), 0).toFixed(2);
  };

  const filteredProducts = products.filter(product => {
    const artistMatch = selectedArtist === "All" || product.artist === selectedArtist;
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    return artistMatch && categoryMatch;
  });

  const artistsList = ["All", ...Array.from(new Set(products.map(p => p.artist)))];
  const categoriesList = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EXPERIMENT STORE
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#artists" className="text-foreground hover:text-primary transition-colors">Artists</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors">Shop</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Search" size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Heart" size={16} />
              </Button>
              
              {/* Cart Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon name="ShoppingCart" size={16} />
                    {getTotalItems() > 0 && (
                      <Badge variant="destructive" className="ml-1">{getTotalItems()}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart ({getTotalItems()} items)</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img 
                              src={item.product.image} 
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.product.title}</h4>
                              <p className="text-primary font-bold">{item.product.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Total: ${getTotalPrice()}</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Checkout
                            <Icon name="CreditCard" size={16} className="ml-2" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 gradient-bg text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              EXPERIMENT ENTERTAINMENT
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Official K-pop merchandise store featuring Royal Crush, 2COOL & NO1CE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Shop Now
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                Browse Artists
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Icon name="Music" size={60} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Icon name="Star" size={80} />
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Our Artists</h3>
            <p className="text-xl text-muted-foreground">
              Discover exclusive merchandise from EXPERIMENT ENTERTAINMENT artists
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div 
                  className="h-48 relative bg-cover bg-center"
                  style={{
                    backgroundImage: index === 0 ? 
                      `url(/img/68b5a8ec-8a9a-4e59-9a43-6f71dfe8e748.jpg)` :
                      'linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 100%)'
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-2xl font-bold">{artist.name}</h4>
                    {artist.subtitle && (
                      <p className="text-sm opacity-90">{artist.subtitle}</p>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{artist.description}</p>
                  <Button className="w-full">
                    View Merchandise
                    <Icon name="ShoppingBag" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Featured Products</h3>
            <p className="text-xl text-muted-foreground">
              Exclusive K-pop merchandise and limited edition items
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Artists:</span>
              {artistsList.map(artist => (
                <Button 
                  key={artist}
                  variant={selectedArtist === artist ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedArtist(artist)}
                >
                  {artist}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Categories:</span>
              {categoriesList.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">
                    {product.category}
                  </Badge>
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    {product.artist}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{product.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Icon name="Plus" size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Badge>{selectedProduct.category}</Badge>
                      <Badge variant="secondary">{selectedProduct.artist}</Badge>
                    </div>
                    <p className="text-3xl font-bold text-primary">{selectedProduct.price}</p>
                  </div>
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                  
                  <Tabs defaultValue="specs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="specs">Specifications</TabsTrigger>
                      <TabsTrigger value="tracks">Track List</TabsTrigger>
                    </TabsList>
                    <TabsContent value="specs" className="space-y-2">
                      {selectedProduct.specifications?.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Icon name="Check" size={16} className="text-primary" />
                          <span className="text-sm">{spec}</span>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="tracks" className="space-y-2">
                      {selectedProduct.tracks ? (
                        selectedProduct.tracks.map((track, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Icon name="Music" size={16} className="text-primary" />
                            <span className="text-sm">{track}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No track list available</p>
                      )}
                    </TabsContent>
                  </Tabs>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Add to Cart - {selectedProduct.price}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EXPERIMENT STORE
              </h5>
              <p className="text-background/70">
                Official merchandise store for EXPERIMENT ENTERTAINMENT artists.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4 text-background">Artists</h6>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">Royal Crush</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">2COOL</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">NO1CE</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Jonhie (Solo)</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Haerin (Solo)</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4 text-background">Shop</h6>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">Albums</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Photo Cards</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Apparel</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Limited Edition</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4 text-background">Connect</h6>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 mt-8 pt-8 text-center">
            <p className="text-background/50">© 2024 EXPERIMENT ENTERTAINMENT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}