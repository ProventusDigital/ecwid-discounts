export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        message: "Ecwid discount endpoint working"
      });
    }

    const body = req.body || {};
    const cart = body.cart || {};
    const items = Array.isArray(cart.items) ? cart.items : [];

    console.log("Incoming cart items:", JSON.stringify(items, null, 2));

    let honeyQty = 0;
    let honeyProductId = null;

    for (const item of items) {
      if (item.sku === "HHH-RSB") {
        honeyQty += Number(item.amount || 0);
        honeyProductId = item.productId;
      }
    }

    console.log("Matched SKU qty:", honeyQty);
    console.log("Matched productId:", honeyProductId);

    if (honeyQty >= 3 && honeyProductId) {
      return res.status(200).json({
        value: 2.5,
        type: "ABSOLUTE",
        description: "3 Raw Honey jars for £23",
        appliesToProducts: [honeyProductId]
      });
    }

    return res.status(200).json({});
  } catch (error) {
    console.log("Discount error:", error);
    return res.status(200).json({});
  }
}
