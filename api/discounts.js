export default async function handler(req, res) {
  try {
    console.log("METHOD:", req.method);
    console.log("FULL BODY:", JSON.stringify(req.body, null, 2));

    if (req.method !== "POST") {
      return res.status(200).json({
        discounts: []
      });
    }

    const body = req.body || {};
    const cart = body.cart || {};
    const items = Array.isArray(cart.items) ? cart.items : [];

    console.log("ITEMS:", JSON.stringify(items, null, 2));

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

    console.log("HONEY QTY:", honeyQty);
    console.log("BUNDLE COUNT:", bundleCount);
    console.log("DISCOUNT VALUE:", discountValue);
    console.log("PRODUCT ID:", honeyProductId);

    if (bundleCount > 0 && honeyProductId) {
      const response = {
        discounts: [
          {
            value: discountValue,
            type: "ABSOLUTE",
            description: "3 Raw Honey jars for £23",
            appliesToProducts: [honeyProductId]
          }
        ]
      };

      console.log("RESPONSE:", JSON.stringify(response, null, 2));
      return res.status(200).json(response);
    }

    console.log("RESPONSE: no discount");
    return res.status(200).json({
      discounts: []
    });
  } catch (error) {
    console.log("ERROR:", error);
    return res.status(200).json({
      discounts: []
    });
  }
}
