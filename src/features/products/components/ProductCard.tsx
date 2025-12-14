import React from 'react';
import { View, Text } from 'react-native';
import { Product } from '../../../shared/types';
import Card from '../../../shared/components/Card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <Card item={product} />;
};
