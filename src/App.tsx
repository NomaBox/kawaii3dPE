import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingCart, PawPrint, Download, LayoutGrid, SlidersHorizontal, MonitorDown, Layers, MousePointer2 } from 'lucide-react';
import { PETS, FEATURES } from './constants';
import { Pet } from './types';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLivePet, setShowLivePet] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = ['All', ...new Set(PETS.map(pet => pet.category))];

  const suggestions = searchQuery.trim() !== '' 
    ? PETS.filter(pet => pet.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const filteredPets = PETS.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleDownloadInstaller = () => {
    window.location.href = '/api/download-installer';
    setShowLivePet(true);
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-background-light"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Live Pet Preview */}
      {showLivePet && (
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          animate={{ 
            x: mousePos.x - 40, 
            y: mousePos.y - 40,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="fixed z-[999] pointer-events-none cursor-grab active:cursor-grabbing"
        >
          <div className="relative group pointer-events-auto">
            <img 
              src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&q=80" 
              alt="Live Pet" 
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-2xl animate-bounce"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ¡Hola! Soy tu nueva mascota ✨
            </div>
          </div>
        </motion.div>
      )}
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10 px-6 py-4 lg:px-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <PawPrint className="w-8 h-8" />
            <h2 className="text-slate-900 text-xl font-black tracking-tight">Kawaii 3D Pets</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalogo" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">Catálogo</a>
            <a href="#como-funciona" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">Cómo funciona</a>
            <a href="#soporte" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">Soporte</a>
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="hidden sm:flex flex-col relative max-w-64 w-full">
            <div className="flex items-center bg-primary/5 border border-primary/10 rounded-xl px-4 h-10 w-full">
              <Search className="w-5 h-5 text-primary/60" />
              <input 
                type="text" 
                placeholder="Buscar mascota..." 
                className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full ml-2 placeholder:text-primary/40"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-primary/10 rounded-xl shadow-xl overflow-hidden z-50"
              >
                {suggestions.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => handleSuggestionClick(pet.name)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3 border-b border-primary/5 last:border-none"
                  >
                    <img src={pet.imageUrl} alt="" className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                    {pet.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 h-10 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 sm:hidden" />
            <span className="hidden sm:inline">Carrito ({cartCount})</span>
          </button>
        </div>
      </header>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">Tu Carrito</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-primary transition-colors">
                <SlidersHorizontal className="w-6 h-6 rotate-90" />
              </button>
            </div>
            
            {cartCount > 0 ? (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <PawPrint className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{cartCount} Mascotas seleccionadas</p>
                    <p className="text-sm text-slate-500">Total: {(cartCount * 3.99).toFixed(2)}€</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-white h-14 rounded-xl font-bold shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all">
                  Finalizar Adopción
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <p className="text-slate-500 font-medium">Tu carrito está vacío</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Explorar catálogo
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-20 py-12 lg:py-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 aspect-square rounded-3xl overflow-hidden relative shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80" 
              alt="Kawaii Pets Collection" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-widest">
                Interactive Desktop Pets
              </span>
              <h1 className="text-slate-900 text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                Mascotas para tu <span className="text-primary">escritorio</span>
              </h1>
              <p className="text-slate-600 text-lg lg:text-xl font-medium leading-relaxed max-w-lg">
                Por solo <span className="text-primary font-bold">3.99€</span>, descarga el instalador y deja que tu nueva mascota viva e interactúe directamente en tu pantalla mientras trabajas.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleDownloadInstaller}
                className="bg-primary text-white px-8 h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all"
              >
                Adoptar e Instalar
              </button>
              <a 
                href="#catalogo"
                className="bg-white border-2 border-primary/20 text-slate-900 px-8 h-14 rounded-xl text-lg font-bold hover:border-primary transition-all flex items-center justify-center"
              >
                Ver Catálogo
              </a>
            </div>
            <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2"><Download className="w-5 h-5 text-primary" /> Instalador Sencillo</div>
              <div className="flex items-center gap-2"><Layers className="w-5 h-5 text-primary" /> Vive en tu Pantalla</div>
            </div>
          </motion.div>
        </section>

        {/* Product Grid */}
        <section id="catalogo" className="bg-white py-16 px-6 lg:px-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-slate-900 text-3xl font-black tracking-tight">Mascotas Disponibles</h2>
                <p className="text-slate-500 mt-2">Elige tu compañero ideal para decorar tu escritorio hoy mismo.</p>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                  <LayoutGrid className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 text-slate-400">
                  <SlidersHorizontal className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} onAdd={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="como-funciona" className="bg-background-light py-20 px-6 lg:px-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-slate-900 text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Tu escritorio cobrará vida
              </h2>
              <p className="text-slate-600 text-lg">Más que simples modelos 3D, son compañeros interactivos que habitan en tu monitor.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="bg-white p-10 rounded-3xl border border-primary/10 shadow-sm flex flex-col gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon === 'install_desktop' && <MonitorDown className="w-10 h-10" />}
                    {feature.icon === 'layers' && <Layers className="w-10 h-10" />}
                    {feature.icon === 'touch_app' && <MousePointer2 className="w-10 h-10" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-slate-900 text-2xl font-bold">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 lg:px-20 py-20">
          <div className="max-w-7xl mx-auto bg-primary rounded-3xl p-12 lg:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            <h2 className="text-white text-4xl lg:text-6xl font-black tracking-tight z-10">Dale vida a tu escritorio hoy</h2>
            <p className="text-white/90 text-lg lg:text-xl max-w-2xl font-medium z-10">
              Únete a más de 5,000 usuarios que ya tienen su compañero 3D animando sus horas de trabajo.
            </p>
            <button 
              onClick={handleDownloadInstaller}
              className="bg-white text-primary px-10 py-5 rounded-2xl text-xl font-black shadow-2xl hover:scale-105 transition-transform active:scale-95 z-10"
            >
              Descargar Instalador y Elegir Mascota
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="soporte" className="px-6 lg:px-20 py-12 border-t border-primary/10 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <PawPrint className="w-8 h-8" />
            <h2 className="text-slate-900 text-xl font-black">Kawaii 3D Pets</h2>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-primary transition-colors font-medium">Términos</a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors font-medium">Privacidad</a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors font-medium">Licencia Desktop</a>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2024 Kawaii 3D Shop. Hecho con ♡ para tu escritorio.</p>
        </div>
      </footer>
    </div>
  );
}

interface PetCardProps {
  key?: string;
  pet: Pet;
  onAdd: () => void;
}

function PetCard({ pet, onAdd }: PetCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-background-light rounded-3xl p-4 border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="w-full aspect-square rounded-2xl overflow-hidden mb-5 relative bg-white">
        <img 
          src={pet.imageUrl} 
          alt={pet.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {pet.isBestSeller && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold">
            Best Seller
          </span>
        )}
      </div>
      <div className="flex justify-between items-start px-2">
        <div>
          <h3 className="text-slate-900 text-xl font-bold">{pet.name}</h3>
          <p className="text-primary text-lg font-black mt-1">{pet.price}€</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
        >
          <Download className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
