export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        message: "Ecwid discount endpoint working"
      });
    }

    const cart = req.body?.cart || {};
    const items = Array.isArray(cart.items) ? cart.items : [];

    let honeyQty = 0;

    for (const item of items) {
      if (item.sku === "HHH-RSB") {
        honeyQty += Number(item.amount || 0);
      }
    }

    if (honeyQty >= 3) {
      return res.status(200).json({
        value: 2.5,
        type: "ABSOLUTE",
        description: "3 Raw Honey jars for £23",
        appliesToProducts: [801576266]
      });
    }

    return res.status(200).json({});
  } catch (error) {
    console.log("Discount error:", error);
    return res.status(200).json({});
  }
}
