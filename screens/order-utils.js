const ORDERS_STORAGE_KEY = 'lestariOrders';

export function getOrders() {
    try {
        const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Unable to read orders from storage', error);
        return [];
    }
}

export function saveOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function formatCurrency(amount) {
    return `RM${Number(amount || 0).toFixed(2)}`;
}

export function buildOrderRecord(cart, paymentMethod = 'Visa', customerName = 'Guest', customerEmail = 'guest@example.com', status = 'Pending') {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    return {
        id: orderId,
        customerName,
        customerEmail,
        paymentMethod,
        createdAt: new Date().toLocaleString(),
        status,
        total: subtotal,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }))
    };
}

export function persistOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    return order;
}

export function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const targetOrder = orders.find(order => order.id === orderId);

    if (!targetOrder) {
        return null;
    }

    targetOrder.status = newStatus;
    saveOrders(orders);
    return targetOrder;
}

export function generateOrderText(order) {
    const lines = [
        'LESTARI CAFE ORDER DETAILS',
        '=========================',
        `Order ID: ${order.id}`,
        `Date: ${order.createdAt}`,
        `Customer: ${order.customerName}`,
        `Email: ${order.customerEmail}`,
        `Payment Method: ${order.paymentMethod}`,
        `Status: ${order.status}`,
        '',
        'Items:',
        ...order.items.map(item => `- ${item.name} x${item.quantity} @ ${formatCurrency(item.price)} each`),
        '',
        `Total: ${formatCurrency(order.total)}`
    ];
    return lines.join('\n');
}

export function downloadOrderDetails(order) {
    const text = generateOrderText(order);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
