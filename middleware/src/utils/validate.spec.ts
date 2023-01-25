import { expect } from "chai";

import { isValidHash, isValidPublicKey } from "./validate";

describe("Validator util", () => {
  it("should validate hash", () => {
    const validHash =
      "bf93cc4d1c9f91875a70d1554603d84a88e4daf246e0404245a61df51414919a";
    let result = isValidHash(validHash);
    expect(result).to.be.true;

    const invalidHash =
      "bf93cc4d1c9f91875a70d1554603d84a88e4daf246e0404245a61df51414919a123";
    result = isValidHash(invalidHash);
    expect(result).to.be.false;
  });

  it("should validate public key", () => {
    const validPublicKey =
      "0146c64d0506c486f2b19f9cf73479fba550f33227b6ec1c12e58b437d2680e96d";
    let result = isValidPublicKey(validPublicKey);
    expect(result).to.be.true;

    const invalidPublicKey =
      "0146c64d0506c486f2b19f9cf73479fba550f33227b6ec1c12e58b437d2680e96d123";
    result = isValidPublicKey(invalidPublicKey);
    expect(result).to.be.false;
  });
});
