/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { CourseRepository } from 'src/repository/product.repository';
@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly courseRepository: CourseRepository
  ) {}
 
  async insertProduct(title: string, desc: string, price: number) {
    
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await this.courseRepository.saveToDb(newProduct);
    console.log(result);
    return result.id as string;
  }

  // pour avoir tous les produits
  async getProduct() {
    const products = await this.courseRepository.findAll()
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
    const product = await this.courseRepository.findOne(productId);
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
    const updateProduct = await this.courseRepository.findOne(productId);
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.courseRepository.saveToDb(updateProduct)
  }

  // pour supprimer un produit
  async deleteProduct(id: string) {
    const result = await this.courseRepository.deleteOne(id)
    if (result === null) {
      throw new NotFoundException('Aucun produit trouver');
    }
  }
}
