export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ discounts: [] });
  }

  try {
    const body = req.body || {};
    const cart = body.cart || {};
    const items = Array.isArray(cart.items) ? cart.items : [];

    const honey = items.find(
      (item) => Number(item.productId) === 801576266
    );

    if (!honey) {
      return res.status(200).json({ discounts: [] });
    }

    const qty = Number(honey.amount || 0);

    if (qty < 3) {
      return res.status(200).json({ discounts: [] });
    }

    return res.status(200).json({
      discounts: [
        {
          value: 2.5,
          type: "ABS",
          description: "3 Raw Honey jars for £23"
        }
      ]
    });
  } catch (e) {
    return res.status(200).json({ discounts: [] });
  }
}
