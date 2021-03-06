import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://masterp6:macaron2022@cluster0.ck76z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
  ],
  // initialisation des que possible a la bdd mongoose
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
