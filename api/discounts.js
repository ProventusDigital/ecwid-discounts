export default async function handler(req, res) {

  // Always return something so Ecwid never crashes
  try {

    // If Ecwid sends GET request (like browser)
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
      if (item.productId == 801576266) {
        honeyQty += item.amount;
      }
    });

    if (honeyQty >= 3) {
      return res.status(200).json({
        discounts: [
          {
            value: 2.5,
            type: "ABS",
            description: "3 Honey Jars for £23"
          }
        ]
      });
    }

    return res.status(200).json({
      discounts: []
    });

  } catch (error) {

    console.log("Error:", error);

    return res.status(200).json({
      discounts: []
    });

  }
}
