export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        discounts: []
      });
    }

    const body = req.body || {};
    const cart = body.cart || {};
    const items = Array.isArray(cart.items) ? cart.items : [];

    let honeyQty = 0;
    let honeyProductId = null;

    for (const item of items) {
      if (item.sku === "HHH-RSB") {
        honeyQty += Number(item.amount || 0);
        honeyProductId = Number(item.productId);
      }
    }

    const bundleCount = Math.floor(honeyQty / 3);
    const discountValue = bundleCount * 2.5;

    if (bundleCount > 0 && honeyProductId) {
      return res.status(200).json({
        discounts: [
          {
            value: discountValue,
            type: "ABSOLUTE",
            description: "3 Raw Honey jars for £23",
            appliesToProducts: [honeyProductId]
          }
        ]
      });
    }

    return res.status(200).json({
      discounts: []
    });
  } catch (error) {
    console.log("Discount error:", error);
    return res.status(200).json({
      discounts: []
    });
  }
}
