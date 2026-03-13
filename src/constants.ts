import { Pet, Feature } from './types';

export const PETS: Pet[] = [
  {
    id: '1',
    name: 'Axolotl Mágico',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
    category: 'Aquatic',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Shiba Inu Alegre',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    category: 'Mammal',
  },
  {
    id: '3',
    name: 'Gato Calicó',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    category: 'Mammal',
  },
  {
    id: '4',
    name: 'Pingüino Chill',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=800&q=80',
    category: 'Bird',
  },
  {
    id: '5',
    name: 'Ranita Kawaii',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?auto=format&fit=crop&w=800&q=80',
    category: 'Amphibian',
  },
  {
    id: '6',
    name: 'Conejito Algodón',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
    category: 'Mammal',
  },
];

export const FEATURES: Feature[] = [
  {
    icon: 'install_desktop',
    title: 'Instalador Sencillo',
    description: 'Configuración en un clic. Una vez instalado, tu mascota aparecerá automáticamente cada vez que inicies sesión.',
  },
  {
    icon: 'layers',
    title: 'Proyección en Pantalla',
    description: 'Tecnología de superposición que permite que la mascota camine sobre tus ventanas de trabajo sin estorbar.',
  },
  {
    icon: 'touch_app',
    title: 'Interacción Kawaii',
    description: 'Reaccionan a tus clics, te saludan y realizan animaciones adorables mientras usas tu ordenador.',
  },
];
