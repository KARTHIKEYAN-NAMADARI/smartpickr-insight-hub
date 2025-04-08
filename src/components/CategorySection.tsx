
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

interface CategorySectionProps {
  title: string;
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, categories }) => {
  return (
    <section className="py-8 bg-secondary">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105">
                <div className="aspect-square overflow-hidden bg-white">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <CardContent className="p-3 text-center">
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
