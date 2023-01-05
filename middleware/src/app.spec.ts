import { expect } from "chai";
import request from "supertest";

import app from "./app";

describe("Express", () => {
  it("should return ok", (done) => {
    request(app)
      .get("/health-check")
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.deep.equal({ status: "ok" });
        if (err) return done(err);
        return done();
      });
  });
});
