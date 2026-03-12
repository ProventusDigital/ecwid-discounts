export default function handler(req, res) {

  const cart = req.body.cart || {};
  const items = cart.items || [];

  const honey = items.find(item => item.productId === 801576266);

  if (!honey) {
    return res.status(200).json({ discounts: [] });
  }

  const qty = honey.amount || 0;

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
}
