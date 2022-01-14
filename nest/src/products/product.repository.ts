/* eslint-disable prettier/prettier */
import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    public readonly productModel: Model<Product>,
  ) {}

  createProduct(title: string, desc: string, price: number):Product{
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    return newProduct
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Aucun produit trouver');
    }
    if (!product) {
      throw new NotFoundException('Aucun produit trouver');
    }
    return product;
  }

  async deleteOne(id: string){
    this.productModel.deleteOne({ _id: id }).exec();
  }

  async saveToDb(product: Product){
    return product.save()
  }
}
