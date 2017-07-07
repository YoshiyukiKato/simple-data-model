const Ajv = require("ajv");
const ajv = new Ajv();

class Model{
  constructor(schema={}){ //ajv format schema
    schema.additionalProperties = false;
    this.schema = schema;
  }

  validate(params){
    const validate = ajv.compile(this.schema);
    const isValid = validate(params);
    if(!isValid){
      return null;
    }else{
      return params;
    }
  }

  create(params){
    return new Instance(this, params);
  }

  save(params){
    params = this.validate(params);
    if(!params){
      return Promise.reject(new Error("Invalid params. Cannot be saved."));
    }
    if(!!this._save){
      return this._save(params);
    }else{
      return Promise.reject(new Error("_save method is not inplemented."))
    }
  }

  delete(id){
    if(!!this._delete){
      this._delete(id);
    }else{
      return Promise.reject(new Error("_delete method is not inplemented."))
    }
  }
}

class Instance{
  constructor(model, params={}){
    this.model = model;
    this.params = params; 
  }
  
  setParams(params){
    const nextParams = Object.assign(this.params, params);
    this.params = nextParams;
  }

  save(){
    return this.model.save(this.params); //Async
  }
}

module.exports = Model;