export default async function handler(req, res) {

  try {

    // allow browser checks
    if (req.method !== "POST") {
      return res.status(200).json({
        message: "Ecwid discount endpoint working",
        discounts: []
      });
    }

    const cart = req.body?.cart || {};
    const items = cart.items || [];

    let honeyQty = 0;

    items.forEach(item => {
      if (item.sku === "HHH-RSB") {
        honeyQty += Number(item.amount || 0);
      }
    });

    if (honeyQty >= 3) {
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
