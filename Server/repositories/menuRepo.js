import db from "../config/db.js";

export const getMenuByRestaurant = async (restaurantId) => {
  const [rows] = await db.query(
    "SELECT * FROM Menus WHERE restaurantId = ?",
    [restaurantId]
  );
  return rows;
};

export const getAllMenus = async () => {
  const [rows] = await db.query("SELECT * FROM Menus");
  return rows;
};

export const getMenuById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Menus WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const createMenu = async (data) => {
  const [result] = await db.query(
    `INSERT INTO Menus
     (name, price, category, taste, description, image, restaurantId)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.price,
      data.category,
      data.taste,
      data.description,
      data.image,
      data.restaurantId,
    ]
  );

  return result.insertId;
};

export const updateMenu = async (id, data) => {
  await db.query(
    "UPDATE Menus SET ? WHERE id = ?",
    [data, id]
  );
};

export const deleteMenu = async (id) => {
  await db.query(
    "DELETE FROM Menus WHERE id = ?",
    [id]
  );
};
