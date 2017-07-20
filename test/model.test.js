const assert = require("power-assert");
const Model = require("../index").Model;

describe("model", () => {
  describe("extends", () => {
    it("is extended to generate concrete Model class", () => {
      class TestModel extends Model{
        _save(){}
        _delete(){}
      }
      const testModel = new TestModel();
      assert(testModel);
    });
  });

  describe("validate", () => {
    it("validate data", () => {
      const model = new Model({
        properties : {
          id : { type : "string" },
          additionalProperties : false
        }
      });
      let params = { id : "hoge", targetURL : "fuga" };
      const result = model.validate(params);
      assert(result);
    });
  });
});