import Address from "../models/Address";

export const api = (req, res) => {
  console.log("api");
};

export const apiAddressSearch = async (req, res) => {
  const {
    body: { searchingAddress },
  } = req;
  try {
    const searchAddress = await Address.find({ add3: { $regex: searchingAddress } });
    res.json(searchAddress);
  } catch (error) {
    console.log("주소 검색중 오류발생: " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiTrainerPhoto = (req, res) => {
  console.log("helloe");
};
