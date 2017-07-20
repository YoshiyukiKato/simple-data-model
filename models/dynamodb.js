const aws = require('aws-sdk');
const documentClient = new aws.DynamoDB.DocumentClient();

const Model = require("../index").Model;

class DynamoDB extends Model{
  constructor(tableName, schema, primaryKey){
    super(schema);
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

  all(){
    const dbParams = {
      TableName : this.tableName
    };
    
    return documentClient.scan(dbParams).promise()
    .then((result) => {
      return {
        Items : result.Items.map(this.validate.bind(this))
      };
    });
  }

  find(key){
    const dbParams = {
      TableName : this.tableName,
      Key : {}
    }
    dbParams.Key[this.primaryKey] = key;
    return documentClient.get(dbParams).promise()
    .then((result) => {
      return {
        Item : this.validate(result.Item)
      };
    });
  }

  _save(params){
    const dbParams = {
      TableName : this.tableName,
      Item : params
    };
    return documentClient.put(dbParams).promise();
  }
  
  _delete(id){
    const dbParams = {
      TableName : this.tableName,
      Key : {}
    };
    dbParams[this.primaryKey] = id;
    return documentClient.delete(dbParams).promise();
  }
}