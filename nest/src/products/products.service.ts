/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/products/product.repository';
@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProductRepository
  ) {}
 
  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = this.productRepository.createProduct(title, desc, price)
    const result = await this.productRepository.saveToDb(newProduct);
    console.log(result);
    return result.id as string;
  }

  // pour avoir tous les produits
  async getProduct() {
    const products = await this.productRepository.findAll()
    console.log(products);
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  // pour avoir un produits
  async getSingleProduct(productId: string) {
    const product = await this.productRepository.findOne(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  // pour modifier un produit
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updateProduct = await this.productRepository.findOne(productId);
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.productRepository.saveToDb(updateProduct)
  }

  // pour supprimer un produit
  async deleteProduct(id: string) {
    const result = await this.productRepository.deleteOne(id)
    if (result === null) {
      throw new NotFoundException('Aucun produit trouver');
    }
  }
}
