'use server';

import { db} from "../util/db";


export async function fetchProductsFromDB() {
    try {
      const rows = await db.execute('SELECT * FROM products');
      return rows;
    } catch (error) {
      console.error('Error fetching products from database:', error);
      throw error;
    }
  }
  