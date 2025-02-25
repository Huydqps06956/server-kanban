export const register = async (req: any, res: any) => {
  const body = req.body;
  try {
    console.log(body);
    res
      .status(200)
      .json({ message: "User registered successfully", data: body });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
