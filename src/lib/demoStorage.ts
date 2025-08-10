export type DemoProduct = {
  id: string;
  name: string;
  sku: string;
  price: number;
  description?: string;
  createdAt: string;
};

const KEY = "demo_products";

export const demoStorage = {
  getProducts(): DemoProduct[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as DemoProduct[]) : [];
    } catch {
      return [];
    }
  },
  saveProduct(p: Omit<DemoProduct, "id" | "createdAt">): DemoProduct {
    const prod: DemoProduct = {
      ...p,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const list = this.getProducts();
    const next = [prod, ...list];
    localStorage.setItem(KEY, JSON.stringify(next));
    return prod;
  },
  hasProducts(): boolean {
    return this.getProducts().length > 0;
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};
