export default async function handler(req, res) {
  try {
    // Only process POST requests from Ecwid
    if (req.method !== "POST") {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ discounts: [] });
    }

    const body = req.body || {};
    const cart = body.cart || {};
    const items = Array.isArray(cart.items) ? cart.items : [];

    let honeyQty = 0;
    let honeyProductId = null;

    // Find honey product and count quantity
    for (const item of items) {
      if (item.sku === "HHH-RSB") {
        honeyQty += Number(item.amount || 0);
        honeyProductId = Number(item.productId);
      }
    }

    // Calculate bundles of 3
    const bundleCount = Math.floor(honeyQty / 3);
    const discountValue = bundleCount * 2.5;

    // Build response
    let response = { discounts: [] };

    if (bundleCount > 0 && honeyProductId) {
      response = {
        discounts: [
          {
            value: discountValue,
            type: "ABSOLUTE",
            description: "3 Raw Honey jars for £23",
            appliesToProducts: [honeyProductId]
          }
        ]
      };
    }

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(response);

  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ discounts: [] });
  }
}
