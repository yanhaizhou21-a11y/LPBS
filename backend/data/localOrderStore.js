import { readFile, rename, writeFile } from 'node:fs/promises';

const fileUrl = new URL('./orders.local.json', import.meta.url);
const tempUrl = new URL('./orders.local.json.tmp', import.meta.url);
let writeQueue = Promise.resolve();

async function readOrders() {
  try {
    return JSON.parse(await readFile(fileUrl, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

async function mutateOrders(change) {
  let result;
  const operation = writeQueue.then(async () => {
    const orders = await readOrders();
    result = change(orders);
    await writeFile(tempUrl, JSON.stringify(orders, null, 2), 'utf8');
    await rename(tempUrl, fileUrl);
  });
  writeQueue = operation.catch(() => undefined);
  await operation;
  return result;
}

export const localOrderStore = {
  list: readOrders,
  async insert(order) {
    return mutateOrders((orders) => {
      if (orders.some((item) => item.orderNumber === order.orderNumber)) {
        const error = new Error('Duplicate order number');
        error.code = 11000;
        throw error;
      }
      orders.unshift(order);
      return order;
    });
  },
  async find(orderNumber) {
    return (await readOrders()).find((order) => order.orderNumber === orderNumber) || null;
  },
  async updateStatus(orderNumber, status) {
    return mutateOrders((orders) => {
      const order = orders.find((item) => item.orderNumber === orderNumber);
      if (!order) return false;
      order.status = status;
      order.updatedAt = new Date();
      return true;
    });
  },
};
