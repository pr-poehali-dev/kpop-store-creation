import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export default function Index() {
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

  const products = [
    {
      title: "Royal Crush Limited Album",
      price: "$29.99",
      category: "Albums",
      image: "/placeholder.svg"
    },
    {
      title: "2COOL Photo Card Set",
      price: "$19.99", 
      category: "Photo Cards",
      image: "/placeholder.svg"
    },
    {
      title: "NO1CE Official Hoodie",
      price: "$49.99",
      category: "Apparel",
      image: "/placeholder.svg"
    },
    {
      title: "Jonhie Solo Poster",
      price: "$14.99",
      category: "Posters", 
      image: "/placeholder.svg"
    },
    {
      title: "Haerin Photobook",
      price: "$34.99",
      category: "Books",
      image: "/placeholder.svg"
    },
    {
      title: "EXPERIMENT Bundle",
      price: "$89.99",
      category: "Bundles",
      image: "/placeholder.svg"
    }
  ];

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
              <Button variant="ghost" size="sm">
                <Icon name="ShoppingCart" size={16} />
                <Badge variant="destructive" className="ml-1">3</Badge>
              </Button>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Package" size={60} className="text-muted-foreground/40" />
                  </div>
                  <Badge className="absolute top-4 left-4">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{product.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <Button size="sm">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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