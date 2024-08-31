# Refatoração e Melhoria - Código parcial já existente

Este documento apresenta a refatoração do código do serviço, utilizado para gerenciar produtos em um sistema baseado no framework NestJS. O código original apresentava algumas ineficiências e falta de clareza na organização. A refatoração visou melhorar a consistência de dados, otimizar consultas MongoDB e aprimorar a organização e legibilidade do código.

## Código Original

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Product } from './product.model';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<string> {
    const { title, description, price, category } = createProductDto;

    if (!title || !price) {
      throw new BadRequestException('Title and Price are required');
    }

    const session: ClientSession = await this.productModel.db.startSession();
    session.startTransaction();

    try {
      const newProduct = new this.productModel({
        title,
        description,
        price,
        category,
      });

      const result = await newProduct.save({ session });
      await session.commitTransaction();
      return result.id as string;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to create product');
    } finally {
      session.endSession();
    }
  }

  async getProducts(filters?: any): Promise<Product[]> {
    const { category, minPrice, maxPrice } = filters || {};
    const query = this.productModel.find();

    if (category) {
      query.where('category').equals(category);
    }

    if (minPrice !== undefined) {
      query.where('price').gte(minPrice);
    }

    if (maxPrice !== undefined) {
      query.where('price').lte(maxPrice);
    }

    const products = await query.select('title description price category').exec();

    if (products.length === 0) {
      throw new NotFoundException('No products found with the given criteria');
    }

    return products;
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<void> {
    const { title, description, price, category } = updateProductDto;

    const session: ClientSession = await this.productModel.db.startSession();
    session.startTransaction();

    try {
      const updatedProduct = await this.findProduct(productId, session);
      if (title) updatedProduct.title = title;
      if (description) updatedProduct.description = description;
      if (price) updatedProduct.price = price;
      if (category) updatedProduct.category = category;

      await updatedProduct.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to update product');
    } finally {
      session.endSession();
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    const session: ClientSession = await this.productModel.db.startSession();
    session.startTransaction();

    try {
      const result = await this.productModel.deleteOne({ _id: productId }, { session }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Could not find product.');
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to delete product');
    } finally {
      session.endSession();
    }
  }

  private async findProduct(id: string, session?: ClientSession): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).session(session).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
```
## Código refatorado

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Product } from './product.model';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  // Refatoração do método createProduct para simplificar a validação e reutilizar lógica de transação
  async createProduct(createProductDto: CreateProductDto): Promise<string> {
    const { title, description, price, category } = createProductDto;

    // Mudança: Utilizando `price === undefined` em vez de `!price` para permitir valores numéricos como 0
    if (!title || price === undefined) {
      throw new BadRequestException('Title and Price are required');
    }

    const session = await this.startTransaction();

    try {
      const newProduct = new this.productModel({ title, description, price, category });
      const result = await newProduct.save({ session });

      await session.commitTransaction();
      return result.id;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to create product');
    } finally {
      session.endSession();
    }
  }

  // Refatoração da consulta de produtos para evitar encadeamento e melhorar a performance
  async getProducts(filters?: any): Promise<Product[]> {
    const { category, minPrice, maxPrice } = filters || {};
    const query: any = {};

    // Mudança: Uso de operadores MongoDB diretamente, evitando `query.where()`
    if (category) query.category = category;
    if (minPrice !== undefined) query.price = { ...query.price, $gte: minPrice };
    if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };

    const products = await this.productModel
      .find(query)
      .select('title description price category')
      .exec();

    if (products.length === 0) {
      throw new NotFoundException('No products found with the given criteria');
    }

    return products;
  }

  // Método getProduct refatorado com lógica centralizada de busca por ID
  async getProduct(productId: string): Promise<Product> {
    const product = await this.findProductById(productId);
    return product;
  }

  // Refatoração do método updateProduct para usar Object.assign e simplificar lógica de atualização
  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<void> {
    const session = await this.startTransaction();

    try {
      const product = await this.findProductById(productId, session);
      // Mudança: Uso de `Object.assign()` para evitar múltiplas verificações de campos
      Object.assign(product, updateProductDto);

      await product.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to update product');
    } finally {
      session.endSession();
    }
  }

  // Refatoração do método deleteProduct para manusear transações de forma consistente
  async deleteProduct(productId: string): Promise<void> {
    const session = await this.startTransaction();

    try {
      const result = await this.productModel.deleteOne({ _id: productId }, { session }).exec();

      if (result.deletedCount === 0) {
        throw new NotFoundException('Could not find product.');
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to delete product');
    } finally {
      session.endSession();
    }
  }

  // Mudança: Função para centralizar a busca por produto com handling de sessão
  private async findProductById(id: string, session?: ClientSession): Promise<Product> {
    const product = await this.productModel.findById(id).session(session).exec();

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return product;
  }

  // Método privado para iniciar transações, evitando repetição de código
  private async startTransaction(): Promise<ClientSession> {
    const session = await this.productModel.db.startSession();
    session.startTransaction();
    return session;
  }
}
```
## Comentários sobre as Mudanças
1. **Melhoria na Validação de Preços:**

- **Antes:** if (!title || !price)
- **Depois:** if (!title || price === undefined)
- **Motivo:** Preços como 0 (zero) seriam considerados falsos na verificação anterior, o que poderia gerar erros na validação. Alterei para price === undefined para aceitar valores 0.

2. **Otimização de Consultas MongoDB:**

- **Antes:** Uso de query.where().equals() para construir consultas.
- **Depois:** Uso de operadores MongoDB diretamente ($gte, $lte).
- **Motivo:** Reduz a complexidade da consulta e melhora a performance ao evitar o uso de métodos encadeados, que podem ser menos eficientes e mais propensos a erros em consultas complexas.

## Links

- **Arquivo principal de instrução** [README.md](../README.md)
- **Parte 1: Análise e Planejamento**  [planning.md](./planning.md)
- **Parte 2: Implementação Técnica** [api.md](./api.md)
- **Parte 3: Refatoração e Melhoria** [refactoring.md](./refactoring-code.md)