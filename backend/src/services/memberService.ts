import pool from "../db";
import { GetAllMembersOptions, Member } from "../interfaces/member";

export const getAllMembers = async ({
  page = 1,
  limit = 10,
  sortBy = "name",
  order = "asc",
  search = "",
}: GetAllMembersOptions): Promise<{
  items: Member[];
  count: number;
}> => {
  const offset = (page - 1) * limit;
  const searchQuery = search ? `%${search}%` : "%";

  const query = `
    SELECT * FROM members
    WHERE name ILIKE $1
    ORDER BY ${sortBy} ${order}
    LIMIT $2 OFFSET $3
  `;
  const countQuery = `
    SELECT COUNT(*) FROM members
    WHERE name ILIKE $1
  `;

  const { rows } = await pool.query(query, [searchQuery, limit, offset]);
  const countResult = await pool.query(countQuery, [searchQuery]);

  return { items: rows, count: parseInt(countResult.rows[0].count, 10) };
};

export const getMemberById = async (id: number): Promise<Member | null> => {
  const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
    id,
  ]);
  return rows[0] || null;
};

export const createMember = async (
  name: string,
  email: string
): Promise<Member> => {
  const { rows } = await pool.query(
    "INSERT INTO members (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return rows[0];
};

export const updateMember = async (
  id: number,
  name: string,
  email: string
): Promise<Member | null> => {
  const { rows } = await pool.query(
    "UPDATE members SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return rows[0] || null;
};

export const deleteMember = async (id: number): Promise<Member | null> => {
  const { rows } = await pool.query(
    "DELETE FROM members WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0] || null;
};
